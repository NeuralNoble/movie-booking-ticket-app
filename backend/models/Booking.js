import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Show',
  },
  seats: [
    {
      type: String,
      required: true,
    },
  ],
  paymentStatus: {
    type: String,
    required: true,
    default: 'Pending',
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
