import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
