const User = require('../models/User');
const SendEmail = require('../utilities/MailSender');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const resetPassword = require('../mailTemplates/resetPassword');

// reset password token
exports.resetPasswordToken = async (req,res) => {
    try{
        // get email from req
        const {email} = req.body;

        // verify email
        const findUser = await User.findOne({email:email});
        if(!findUser){
            return res.status(400).json({
                success:false,
                message:"Email is not registered"
            });
        };

        // generate token
        const token = crypto.randomBytes(20).toString("hex");

        // update user by adding token and expiration time
        const updatedUser = await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires : Date.now() + 5*60*1000,  // 5 mins
            },
            {new:true});

        // link generate based on token
        const url = `http://localhost:3000/updatePassword/${token}`;

        // send mail containing link
        await SendEmail(email,"Reset Password Link | StudyNotion",resetPassword(url));

        return res.status(200).json({
            success:true,
            message:"Successfully Sent Reset Password Mail"
        });
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Unable to send reset Password Email"
        })
    }
}

// reset password
exports.resetPassword = async (req,res) => {
    try{
        // fetch data 
        const {newPassword,confirmNewPassword,token} = req.body;

        // validation
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"Both fields doesn't Match"
            });
        }

        // get user details from db using token
        const findUser = await User.findOne({token:token});

        // if no entry -> invalid token
        if(!findUser){
            return res.status(400).json({
                success:false,
                message:"Token Invalid"
            });
        };

        // token expire check
        if(findUser.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Token Expired"
            });
        };

        // hash password
        const hashedPassword = await bcrypt.hash(newPassword,10);

        // update password
        await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});

        return res.status(200).json({
            success:true,
            message:"Password Reset Successful"
        })

    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Unable to Reset Password"
        });
    }
}