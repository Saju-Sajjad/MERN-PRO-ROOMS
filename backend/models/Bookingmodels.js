// Bookingmodels.js
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  roomName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  hotelName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  fromDate: {
    type: Date,  
    required: true,
  },
  toDate: {
    type: Date,  
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema);
