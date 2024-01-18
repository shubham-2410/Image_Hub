const express = require('express');
const app = express(); //creating instance

const bodyParser = require('body-parser');
const { connectDB } = require('./config/database');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRoute = require('./routes/authRoutes');
const resetRoute = require('./routes/resetPasswordRoutes');
const imageRoute = require('./routes/imageRoutes');
const fileUpload = require("express-fileupload");
const { connectCloudinary } = require('./config/cloudinary');

require('dotenv').config();

// to parse the info from body
app.use(bodyParser.json());

// frontend
app.use(
    cors({
        origin:"https://image-hub-psi.vercel.app",
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type,Authorization",
    })
);


app.use(cookieParser());

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",
}));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/password', resetRoute);
app.use('/api/v1/image', imageRoute);

app.get('/', async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Your Server is up and running....."
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    // Ensuring that DB is connected first and then app is listing
    try {
        await connectDB(process.env.MONGODB_URL);

        console.log("Database Connection Successful");
      await  connectCloudinary();
    } catch (error) {
        console.log("Error while Database Connection ", error);
    }

    console.log(`App is running at http://localhost:${PORT}`);
});
