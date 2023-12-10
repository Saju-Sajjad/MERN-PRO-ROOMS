import Hotel from "../models/hotelmodels.js";
import Room from "../models/roomsmodels.js";
import { createError } from "../utils/err.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;

    try {
        const roomData = {
            title: req.body.title,
            price: req.body.price,
            maxPeople: req.body.maxPeople,
            desc: req.body.desc,
            roomNumbers: req.body.roomNumbers.map((room) => ({
              number: room.number,
              unavailableDates: room.unavailableDates,
            })),
          };
          
        const newRoom = new Room(roomData);

        const savedRoom = await newRoom.save();

        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
            });
        } catch (err) {
            next(err);
        }

        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
};


export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true }
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};
export const updateRoomAvailability = async(req, res, next) => {
    try {
        await Room.updateOne({ "roomNumbers._id": req.params.id }, {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            },
        });
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
};
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        // await Room.findByIdAndDelete(req.params.id);

        try {
        //   await  removeRoomFromAllHotels(req.params.id)
            // await Hotel.updateMany(
            //     {
            //         $pull: { rooms: req.params.id },
            //     },
            //     { multi: true }
            // );
            // await Hotel.findByIdAndUpdate(hotelId, {
            //     $pull: { rooms: req.params.id },

            // });
        } catch (err) {
            console.log("error", err)
            next(err);
        }
        res.status(200).json("Room has been deleted.");
    } catch (err) {
        next(err);
    }
};
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};

async function removeRoomFromAllHotels(roomId) {
    try {
      // Find all hotels that contain the room to be removed
      const hotelsToUpdate = await Hotel.find({ rooms: roomId });
  console.log("hotelsss updatee",hotelsToUpdate)
      // Use a loop or Promise.all to update each hotel document
      await Promise.all(
        hotelsToUpdate.map(async (hotel) => {
          // Remove the room ID from the hotel's rooms array
          hotel.rooms = hotel.rooms.filter((room) => room !== roomId);
          await hotel.save();
        })
      );
  
      // Now, you can delete the room document if it's no longer associated with any hotel
      const room = await Room.findById(roomId);
      if (room && hotelsToUpdate.length === 0) {
        await Room.findByIdAndDelete(roomId);
      }
  
      console.log('Room removed from all hotels');
    } catch (error) {
      console.error('Error removing room from all hotels:', error);
    }
  }
export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};