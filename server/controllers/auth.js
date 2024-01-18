const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    try {
        const { userName, email, password, confirmPassword } = req.body;

        // Ensure that all fields are present and have minimum length requirements
        if (!userName || !email || !password || !confirmPassword ) {
            return res.status(400).json({
                success: false,
                message: "Please fill required fields",
            });
        }

        // Checking for password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password not matched",
            });
        }

        // Check if username already exists
        const alreadyUserName = await User.findOne({ userName: userName });
        if (alreadyUserName) {
            return res.status(400).json({
                success: false,
                message: "UserName already used !!!",
            });
        }

        // Check if email already exists
        const alreadyEmail = await User.findOne({ email: email });
        if (alreadyEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already used !!!",
            });
        }

        // Encrypt password before storing it in the database
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            userName: userName,
            email: email,
            password: hashPassword
        });

        return res.status(200).json({
            success: true,
            message: "User Created Successfully"
        });

    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({
            success: false,
            message: "Error during SignUp",
            error: error
        });
    }
};

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Ensure that all fields are present
        if (!userName || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill required fields",
            });
        }

        // Trying to fetch user from the database using given credentials
        const user = await User.findOne({ userName: userName });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "SignUp first !!!",
            });
        }

        // Checking whether the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Wrong Password"
            });
        }

        const payload = {
            userName: userName,
            id: user._id,
            email:user.email
        };

        // Creating JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

        const options = {
            expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // Expires in 2 hours
            httpOnly: true,
            samesite: 'None',
        };

        // Remove sensitive information from the user object
        user.password = undefined;

        // Cookie is added so that the user does not need to log in again and again
        res.cookie("token", token, options).status(200).json({
            success: true,
            message: "Login Successfully",
            user: user,
            token: token,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Login Failure, please try again!!",
            error:error.message,
        });
    }
};

const session = async (req , res)=>{
    try {
        return res.status(200).json({
            success:true,
            message:"Token is valid"
        })
    }
     catch (error) {
        return res.status(500).json({
            success:false,
            message:"Session expired"
        })
    }
}

module.exports = {
    signUp,
    login,
    session
};
