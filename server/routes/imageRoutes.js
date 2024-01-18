const express = require('express');
const imageRoute = express.Router();

const {
    uploadImage,
    getImages,
    updateCount
} = require('../controllers/ImageOperation');

const {auth} = require('../middleware/auth');


imageRoute.get('/get-all' , auth , getImages);
imageRoute.post('/upload' , auth , uploadImage);
imageRoute.put('/count' ,auth ,  updateCount);


module.exports = imageRoute;