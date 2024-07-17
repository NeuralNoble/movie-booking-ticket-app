import asyncHandler from 'express-async-handler';
import Show from '../models/Show.js';
import Theater from '../models/Theater.js';
import Movie from '../models/Movie.js';

// @desc    Get all shows
// @route   GET /api/shows
// @access  Public
const getShows = asyncHandler(async (req, res) => {
  const shows = await Show.find({}).populate('movie').populate('theater');
  res.json(shows);
});

// @desc    Get shows by movie
// @route   GET /api/shows/movie/:movieId
// @access  Public
const getShowsByMovie = asyncHandler(async (req, res) => {
  const shows = await Show.find({ movie: req.params.movieId }).populate('movie').populate('theater');
  res.json(shows);
});

// @desc    Get shows by theater
// @route   GET /api/shows/theater/:theaterId
// @access  Public
const getShowsByTheater = asyncHandler(async (req, res) => {
  const shows = await Show.find({ theater: req.params.theaterId }).populate('movie').populate('theater');
  res.json(shows);
});

// @desc    Get a show by ID
// @route   GET /api/shows/:id
// @access  Public
const getShowById = asyncHandler(async (req, res) => {
  const show = await Show.findById(req.params.id).populate('movie').populate('theater');
  if (!show) {
    res.status(404);
    throw new Error('Show not found');
  }
  res.json(show);
});

// @desc    Create a show
// @route   POST /api/shows
// @access  Admin
const createShow = asyncHandler(async (req, res) => {
  const { movie, theater, showtime, totalSeats } = req.body;

  // Validate input
  if (!movie || !theater || !showtime || !totalSeats) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Check if the movie exists
  const foundMovie = await Movie.findById(movie);
  if (!foundMovie) {
    res.status(404);
    throw new Error('Movie not found');
  }

  // Check if the theater exists
  const foundTheater = await Theater.findById(theater);
  if (!foundTheater) {
    res.status(404);
    throw new Error('Theater not found');
  }

  // Initialize seats array with all seats available (1)
  const seats = Array(totalSeats).fill(1);

  // Create a new show
  const show = new Show({
    movie,
    theater,
    showtime,
    seats,
  });

  const createdShow = await show.save();
  res.status(201).json(createdShow);
});

// @desc    Update a show
// @route   PUT /api/shows/:id
// @access  Admin
const updateShow = asyncHandler(async (req, res) => {
  const { movie, theater, showtime, totalSeats, seats } = req.body;

  const show = await Show.findById(req.params.id);
  if (!show) {
    res.status(404);
    throw new Error('Show not found');
  }

  if (movie) show.movie = movie;
  if (theater) show.theater = theater;
  if (showtime) show.showtime = showtime;
  if (seats) show.seats = seats; // Update seat configuration
  if (totalSeats) show.seats = Array(totalSeats).fill(1); // Initialize seats array with available seats

  const updatedShow = await show.save();
  res.json(updatedShow);
});

// @desc    Delete a show
// @route   DELETE /api/shows/:id
// @access  Admin
const deleteShow = asyncHandler(async (req, res) => {
  const show = await Show.findById(req.params.id);
  if (!show) {
    res.status(404);
    throw new Error('Show not found');
  }

  await show.remove();
  res.json({ message: 'Show removed' });
});

export { getShows, getShowsByMovie, getShowsByTheater, getShowById, createShow, updateShow, deleteShow };
