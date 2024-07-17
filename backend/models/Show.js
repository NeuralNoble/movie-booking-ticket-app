import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Movie',
  },
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Theater',
  },
  showtime: {
    type: Date,
    required: true,
  },
  seats: {
    type: [Number], // Array of numbers to represent seat availability
    required: true,
    default: [], // Initialize as an empty array
  },
});

const Show = mongoose.model('Show', showSchema);

export default Show;
