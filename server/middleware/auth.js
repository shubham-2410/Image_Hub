const jwt = require("jsonwebtoken");
require('dotenv').config();


// not used yet , it validate the token and add essential details to user.body which can be utilized further 


const auth = async (req , res , next)=>{

    try {
        const token = req.body.token || req.cookies.token || (req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : null);

        // console.log( "im in token " , token)
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token Absent",
            });
        }

        try {
            const decoded = jwt.verify(token , process.env.JWT_SECRET);
            req.user=decoded;
            next();
        } 
        catch (error) {
            return res.status(401).json({
                success:false,
                message:"Session Expires , Please login again",
            })
        }
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while validating token",
        });
    }
}

module.exports={
    auth,
}