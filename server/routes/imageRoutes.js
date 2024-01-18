const express = require('express');
const imageRoute = express.Router();

const {
    uploadImage,
    getImages,
    updateCount
} = require('../controllers/ImageOperation');

const {auth} = require('../middleware/auth');


imageRoute.get('/get-all' , getImages);
imageRoute.post('/upload' ,uploadImage);
imageRoute.put('/count' , updateCount);


module.exports = imageRoute;