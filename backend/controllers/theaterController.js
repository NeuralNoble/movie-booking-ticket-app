import asyncHandler from 'express-async-handler';
import Theater from '../models/Theater.js';

// @desc    Get all theaters
// @route   GET /api/theaters
// @access  Public
const getTheaters = asyncHandler(async (req, res) => {
  const theaters = await Theater.find({});
  res.json(theaters);
});

// @desc    Create a theater
// @route   POST /api/theaters
// @access  Admin
const createTheater = asyncHandler(async (req, res) => {
  const { name, location } = req.body;

  const theater = new Theater({
    name,
    location,
  });

  const createdTheater = await theater.save();
  res.status(201).json(createdTheater);
});

export { getTheaters, createTheater };
