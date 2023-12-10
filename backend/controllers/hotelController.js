import Hotel from "../models/hotelmodels.js";
import Room from "../models/roomsmodels.js";
import upload from "../utils/multer.js";


export const createHotel = async (req, res, next) => {
  try {
   
    try {
      
      const photo = req.file.path;
      console.log(photo)

      const {
        name,
        type,
        city,
        address,
        distance,
        title,
        desc,
        rating,
        rooms,
        cheapestPrice,
        featured,
      } = req.body;



      const newHotel = new Hotel({
        name,
        type,
        city,
        address,
        distance,
        photos: [ photo],
        title,
        desc,
        rating,
        cheapestPrice,
        featured,
      });

      console.log(rooms[0]);

      const room = new Room(rooms[0]);
      await room.save();
      newHotel.rooms.push(room._id);

      const savedHotel = await newHotel.save();
      console.log(savedHotel)
      res.status(200).json(savedHotel);
    } catch (err) {
      console.error("Error in creating Hotel:", err); // Log the error for debugging
      next(err);
    }
  } catch (err) {
    console.error("Error in createHotel:", err); // Log the error for debugging
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    console.log(req.params.id)
    console.log('In Get Hotel Controller')
    const hotel = await Hotel.findById(req.params.id).populate();
    console.log(hotel)
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};


export const getHotels = async (req, res, next) => {

const { min, max, limit } = req.query;
const filter = {}
// console.log("log",min,max,limit)
try {
  if (min || max || limit) {
    const hotels = await Hotel.find({
      cheapestPrice: { $gt: min | 1, $lt: max || 10000 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);

  } else {
    const hotels = await Hotel.find()
    res.status(200).json(hotels);
  }


} catch (err) {
  next(err);
}
};


export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotels" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartments" });
      const resortCount = await Hotel.countDocuments({ type: "resorts" });
      const guestCount = await Hotel.countDocuments({ type: "guests" });
      const cabinCount = await Hotel.countDocuments({ type: "cabins" });
  
      res.status(200).json([
        { type: "hotels", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "guests", count: guestCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  };

  export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      console.log("errr",err)
      next(err);
    }
  };
// import Hotel from "../models/hotelmodels.js";
// import Room from "../models/roomsmodels.js";
// import upload from "../utils/multer.js";


// export const createHotel = async (req, res, next) => {
//   try {

 
//     try {
      
//       const photo = req.file.path;
//       console.log(photo)

//       const {
//         name,
//         type,
//         city,
//         address,
//         distance,
//         title,
//         desc,
//         rating,
//         rooms,
//         cheapestPrice,
//         featured,
//       } = req.body;


//       const newHotel = new Hotel({
//         name,
//         type,
//         city,
//         address,
//         distance,
//         photos: [ photo],
//         title,
//         desc,
//         rating,
//         rooms,
//         cheapestPrice,
//         featured,
//       });

//       const savedHotel = await newHotel.save();
//       res.status(200).json(savedHotel);
//     } catch (err) {
//       console.error("Error in creating Hotel:", err); // Log the error for debugging
//       next(err);
//     }
//   } catch (err) {
//     console.error("Error in createHotel:", err); // Log the error for debugging
//     next(err);
//   }
// };

//   export const updateHotel = async (req, res, next) => {
//     try {
//       const updatedHotel = await Hotel.findByIdAndUpdate(
//         req.params.id,
//         { $set: req.body },
//         { new: true }
//       );
//       res.status(200).json(updatedHotel);
//     } catch (err) {
//       next(err);
//     }
//   };
//   export const deleteHotel = async (req, res, next) => {
//     try {
//       await Hotel.findByIdAndDelete(req.params.id);
//       res.status(200).json("Hotel has been deleted.");
//     } catch (err) {
//       next(err);
//     }
//   };
//   export const getHotel = async (req, res, next) => {
//     try {
//       const hotel = await Hotel.findById(req.params.id);
//       res.status(200).json(hotel);
//     } catch (err) {
//       next(err);
//     }
//   };
 

// export const getHotels = async (req, res, next) => {

//   const { min, max, limit } = req.query;
//   const filter = {}
  
//   try {
//     if (min || max || limit) {
//       const hotels = await Hotel.find({
//         cheapestPrice: { $gt: min | 1, $lt: max || 10000 },
//       }).limit(req.query.limit);
//       res.status(200).json(hotels);

//     } else {
//       const hotels = await Hotel.find()
//       res.status(200).json(hotels);
//     }


//   } catch (err) {
//     next(err);
//   }
// };


//   export const countByCity = async (req, res, next) => {
//     const cities = req.query.cities.split(",");
//     try {
//       const list = await Promise.all(
//         cities.map((city) => {
//           return Hotel.countDocuments({ city: city });
//         })
//       );
//       res.status(200).json(list);
//     } catch (err) {
//       next(err);
//     }
//   };
//   export const countByType = async (req, res, next) => {
//       try {
//         const hotelCount = await Hotel.countDocuments({ type: "hotels" });
//         const apartmentCount = await Hotel.countDocuments({ type: "apartments" });
//         const resortCount = await Hotel.countDocuments({ type: "resorts" });
//         const guestCount = await Hotel.countDocuments({ type: "guests" });
//         const cabinCount = await Hotel.countDocuments({ type: "cabins" });
    
//         res.status(200).json([
//           { type: "hotels", count: hotelCount },
//           { type: "apartments", count: apartmentCount },
//           { type: "resorts", count: resortCount },
//           { type: "guests", count: guestCount },
//           { type: "cabins", count: cabinCount },
//         ]);
//       } catch (err) {
//         next(err);
//       }
//     };
  
//   export const getHotelRooms = async (req, res, next) => {
//     try {
//       const hotel = await Hotel.findById(req.params.id);
//       const list = await Promise.all(
//         hotel.rooms.map((room) => {
//           return Room.findById(room);
//         })
//       );
//       res.status(200).json(list)
//     } catch (err) {
//       console.log("errr",err)
//       next(err);
//     }
//   };