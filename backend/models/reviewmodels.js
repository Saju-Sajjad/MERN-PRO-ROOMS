import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number, // Change the type to Number to match the Rating model
    ref: 'Rating',
  },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
