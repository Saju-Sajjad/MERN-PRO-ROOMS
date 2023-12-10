// reviewRoutes.js
import express from 'express';
import { createReview, getReviews,getRatings } from '../controllers/reviewController.js';

const router = express.Router();

// Create a new review
router.post('/:hotelId/comments', createReview);

// Get all reviews for a hotel
router.get('/:hotelId/comments', getReviews);
router.get('/:hotelId/ratings', getRatings);
export default router;
