const Gallery = require('../models/Gallery');
const User = require('../models/user');
const { uploadImageToClodinary } = require('./imageUploader');


const uploadImage = async (req, res) => {
    try {
        const { title, description } = req.body;

        const photo = req.files.photo;

        if (!req.files || !req.files.photo) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image",
            });
        }

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Please fill all details"
            });
        }

        const email = req.user.email;

        const isExist = await User.findOne({ email: email });

        if (!isExist) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const uploadUrl = await uploadImageToClodinary(photo, process.env.FOLDER_NAME);


        const newImage = await Gallery.create({
            title: title,
            description: description,
            image: uploadUrl.secure_url,
            count: 0
        });

        isExist.images.push(newImage._id);

        isExist.save();
        return res.status(200).json({
            success: true,
            message: "New Image added to Gallery",
            data: newImage
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while adding image to gallery",
            error: error.message
        })
    }
}


const getImages = async (req, res) => {
    try {
        const email = req.user.email;
        const isExist = await User.findOne({ email: email }).populate("images").exec();

        if (!isExist) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Images fetched successfully",
            data: isExist.images
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching images",
            error: error
        })
    }
}


const updateCount = async (req, res) => {
    try {
        // console.log("i am in for count")
        const email = req.user.email;
        // console.log("emai; " , email);
        const { imageId, count } = req.body;

        if (!email) {
            return res.status(401).json({
                success: false,
                message: "You can't access this image",
            });
        }
        // console.log("before")

        const img = await Gallery.findByIdAndUpdate({ _id: imageId }, { count: count + 1 });

        // console.log("after")
        if (!img) {
            return res.status(404).json({
                success: false,
                message: "Image not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Count Increased successfully"
        })
    }
    catch (error) {
        console.log("error to update count" , error)
        return res.status(500).json({
            success: false,
            message: "Error while increasing count",
            error:error.message
        })
    }
}

module.exports = {
    uploadImage,
    getImages,
    updateCount
}