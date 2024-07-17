import asyncHandler from 'express-async-handler';
import Booking from '../models/Booking.js';
import Show from '../models/Show.js';
import nodemailer from 'nodemailer';

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const { show: showId, seats } = req.body;
  const user = req.user._id;

  // Check if the show exists
  const show = await Show.findById(showId);
  if (!show) {
    res.status(404);
    throw new Error('Show not found');
  }

  // Check if seats are available
  const seatStatus = show.seats;
  const unavailableSeats = seats.filter(seat => seatStatus[seat] === 0);
  if (unavailableSeats.length > 0) {
    res.status(400);
    throw new Error(`Seats ${unavailableSeats.join(', ')} are already booked`);
  }

  // Mark seats as booked
  seats.forEach(seat => {
    seatStatus[seat] = 0;
  });

  show.seats = seatStatus;
  await show.save();

  // Create booking
  const booking = new Booking({
    user,
    show: showId,
    seats,
    paymentStatus: 'Confirmed', // For demo purposes
  });

  const createdBooking = await booking.save();

  // Send email confirmation
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: req.user.email,
    subject: 'Booking Confirmation',
    text: `Your booking for show ${showId} with seats ${seats.join(', ')} is confirmed.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.status(201).json(createdBooking);
});

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
const getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('show');
  res.json(bookings);
});

export { createBooking, getUserBookings };
