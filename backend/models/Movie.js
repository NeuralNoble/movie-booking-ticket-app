import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
});

const Movie = model('Movie', movieSchema);

export default Movie;
