const express = require('express');
const imageRouter = express.Router();
const {postImage, deleteImage} = require('../controllers/imageController.js');
const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"img");
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname);
    },
});

const upload = multer({storage:fileStorage});

imageRouter.post('/', upload.array('images',40), postImage);
imageRouter.delete('/:name', deleteImage);

module.exports = imageRouter;