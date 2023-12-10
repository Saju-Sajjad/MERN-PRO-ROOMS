import express from 'express';
import {
  createBooking,
  deleteBooking,
  getBooking,
  getAllBookings,
  updateBooking,
  getBookingDetails,
  cancelBooking,
   // Import the function for fetching booking details
} from "../controllers/bookingsController.js";

import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/:id', getBooking);
router.get('/details/:id', getBookingDetails); // Add this route for fetching booking details
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);
router.delete('/cancel/:id', cancelBooking)

export default router;
