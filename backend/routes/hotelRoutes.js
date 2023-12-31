
import express from "express";
import {
    countByCity,
    countByType,
    createHotel,
    deleteHotel,
    getHotel,
    getHotelRooms,
    getHotels,
    updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import hotelmodels from "../models/hotelmodels.js";
import upload from "../utils/multer.js";
const router = express.Router();

//CREATE
router.post("/",upload.single('photos'), createHotel);

//UPDATE
router.put("/:id",verifyAdmin, updateHotel);
//DELETE
router.delete("/:id", deleteHotel);
//GET

router.get("/find/:id", getHotel);
//GET ALL


// router.get("/find/:id", getHotel);
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/rooms/:id", getHotelRooms);

export default router;