const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

// auth
exports.auth = async (req,res,next) => {
    try{
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

        // if token is missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is Missing"
            });
        };

        // verify token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(e){
            return res.status(400).json({
                success:false,
                message:"Token is Invalid"
            });
        }

        next();
    }
    catch(e){
        return res.status(400).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}

// isStudent
exports.isStudent = async (req,res,next) => {
    try{
        const userDetails = await User.findOne({email:req.user.email});
        if(userDetails.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a route for Students only"
            })
        };

        next();
    }
    catch(e){
        return res.status(400).json({
            success:false,
            message:"User Role cannot be verified"
        })
    }
}

// IsInstructor
exports.isInstructor = async (req,res,next) => {
    try{
        const userDetails = await User.findOne({email:req.user.email});
        if(userDetails.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a route for Instructors only"
            })
        };

        next();
    }
    catch(e){
        return res.status(400).json({
            success:false,
            message:"User Role cannot be verified"
        })
    }
}

// isAdmin
exports.isAdmin = async (req,res,next) => {
    try{
        const userDetails = await User.findOne({email:req.user.email});
        if(userDetails.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a route for Admins only"
            })
        };

        next();
    }
    catch(e){
        return res.status(400).json({
            success:false,
            message:"User Role cannot be verified"
        })
    }
}