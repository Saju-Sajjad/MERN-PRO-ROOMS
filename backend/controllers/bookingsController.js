import Booking from "../models/Bookingmodels.js";
// import Room from "../models/roomsmodels.js";
import Hotel from '../models/hotelmodels.js'
import Room from "../models/roomsmodels.js";

// Create a new booking
const createBooking = async (req, res) => {
    console.log("in Booking controller");

    try {
        const { roomName, hotelName, userName, toDate, fromDate } = req.body;

        // Ensure fromDate and toDate are valid Date objects
        const fromDateObj = new Date(fromDate);
        let toDateObj = new Date(toDate);

        // If the booking is for the same day, set toDate to the next day
        if (fromDateObj.toDateString() === toDateObj.toDateString()) {
            toDateObj.setDate(toDateObj.getDate() + 1);
        }

        const newBooking = new Booking({
            roomName,
            hotelName,
            userName,
            fromDate: fromDateObj,
            toDate: toDateObj,
        });

        const savedBooking = await newBooking.save();
        console.log("savedBooking ", savedBooking);
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getBookingDetails = async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      console.log('Booking Room Name:', booking.roomName);
  
      // Fetch room details using roomName from the booking
      const room = await Room.findOne({ 'roomNumbers.number': booking.roomName });
  
      console.log('Room Details:', room);
  
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      // Find the specific room number within the array
      const roomNumberObject = room.roomNumbers.find((num) => num.number === booking.roomName);
  
      if (!roomNumberObject) {
        return res.status(404).json({ message: 'Room number not found in the room details' });
      }
  
      // Extract room number from the found object
      const roomNumber = roomNumberObject.number;
  
      console.log('Room Number:', roomNumber);
  
      // Combine booking and room details
      const bookingDetails = {
        _id: booking._id,
        hotelName: booking.hotelName,
        userName: booking.userName,
        fromDate: booking.fromDate,
        toDate: booking.toDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
        roomNumber,
      };
  
      res.status(200).json(bookingDetails);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
  };
  



// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a booking by ID
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a booking by ID
const updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const cancelBooking = async (req, res, next)=>{
    const roomId = req.params.id;
    try {
            console.log('In CancelBooking Function', roomId)
            const bookingDetails = await Booking.findOneAndDelete({ roomName: roomId }).exec();
            console.log(bookingDetails)

        
        
        res.status(200).json({message: 'Success'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    createBooking,
    getBooking,
    getAllBookings,
    getBookingDetails,
    getBookingById,
    deleteBooking,
    updateBooking,
    cancelBooking
};
