import File from "../models/fileuploadmodels.js";
import upload from "../utils/multer.js";

// Handle file upload
export const uploadFile = async(req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const file = new File({
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path,
    });
    console.log(file);
    try {
        upload.single('photo')(res, req, async (error)=>{
            if (error){
                console.error("error uploadeing image: ",error);
                return res.status(404).send({error:"error uploadeing image"})
            }
            await file.save();
            res.send("File uploaded successfully.");
        })
        return req.file.path
    } catch (error) {
        res.status(500).send("An error occurred while uploading the file.");
    }
};

// Retrieve all files
export const getAllFiles = async(req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (error) {
        res.status(500).send("An error occurred while retrieving the files.");
    }
};