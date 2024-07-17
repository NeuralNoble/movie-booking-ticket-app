import asyncHandler from 'express-async-handler';
import Movie from '../models/Movie.js';

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
export const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({});
  res.json(movies);
});

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
export const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    throw new Error('Movie not found');
  }
});

// @desc    Create a movie
// @route   POST /api/movies
// @access  Admin
export const createMovie = asyncHandler(async (req, res) => {
  const { title, description, genre, duration, rating, releaseDate } = req.body;

  const movie = new Movie({
    title,
    description,
    genre,
    duration,
    rating,
    releaseDate,
  });

  const createdMovie = await movie.save();
  res.status(201).json(createdMovie);
});

// @desc    Update a movie
// @route   PUT /api/movies/:id
// @access  Admin
export const updateMovie = asyncHandler(async (req, res) => {
  const { title, description, genre, duration, rating, releaseDate } = req.body;

  const movie = await Movie.findById(req.params.id);

  if (movie) {
    movie.title = title;
    movie.description = description;
    movie.genre = genre;
    movie.duration = duration;
    movie.rating = rating;
    movie.releaseDate = releaseDate;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } else {
    res.status(404);
    throw new Error('Movie not found');
  }
});

// @desc    Delete a movie
// @route   DELETE /api/movies/:id
// @access  Admin
export const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    await movie.remove();
    res.json({ message: 'Movie removed' });
  } else {
    res.status(404);
    throw new Error('Movie not found');
  }
});
