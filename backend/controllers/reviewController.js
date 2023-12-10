import Hotel from '../models/hotelmodels.js';
import Comment from '../models/reviewmodels.js';

export const createReview = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    const { userName, text, rating } = req.body;

    const comment = new Comment({
      userName,
      text,
      rating, // Ensure the rating is correctly set here
    });

    await comment.save();

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    hotel.comments.push(comment); // Push the entire comment object, not just its ID
    await hotel.save();

    res.status(201).json({ message: 'Comment Saved Successfully!', comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ... (previous code)

// Controller to get all ratings for a hotel
// Controller to get all ratings for a hotel
export const getRatings = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findById(hotelId).populate('comments');

    // Assuming 'comments' is an array of comments and each comment has a 'rating' field.
    const ratings = hotel.comments.map(comment => comment.rating);

    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// ... (export statements)


// Controller to get all reviews for a hotel
export const getReviews = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findById(hotelId).populate('comments');

    res.status(200).json(hotel.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  createReview,
  getRatings,
  getReviews,
};
