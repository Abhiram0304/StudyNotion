const OTPgenerator = require('otp-generator');
const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SendEmail = require('../utilities/MailSender');
const {passwordUpdated} = require('../mailTemplates/passwordUpdate');

// send OTP
exports.sendOTP = async (req,res) => {
    try{
        // fetch email from request
        const {email} = req.body;

        // check if user already exists
        const emailExists = await User.findOne({email});
        
        // if user already exists, return a response
        if(emailExists){
            return res.status(401).json({
                success:false,
                message:"Email already Registered"
            });
        };

        // if user is NEW --> generate OTP
        const options = {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
            digits:true
        };
        let otp = OTPgenerator.generate(6,options);

        // check unique OTP or NOT
        let result = await OTP.findOne({otp:otp});

        while(result){
            // generate new OTP
            otp = OTPgenerator.generate(6,options);
            result = await OTP.findOne({otp:otp});
        }

        const otpPayload = {email,otp};

        // create an entry in DB of OTP
        const otpBody = await OTP.create(otpPayload);

        // return success
        return res.status(200).json({
            success:true,
            OTP:otp,
            message:"OTP Successfully created and Entered into DB"
        });

    }
    catch(e){
        console.log(e.message);
        return res.status(400).json({
            success:false,
            message:"Unable to create a OTP"
        })
    }
}

// signup
exports.signup = async (req,res) => {
    try{
        // fetch data from request
        const {firstName,lastName,email,password,confirmPassword,accountType,otp} = req.body;

        // validate data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"Invalid Data Input"
            });
        };

        // check both passwords
        if(password != confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Both Passwords Does Not Match"
            });
        };

        // user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).josn({
                success:false,
                message:"User Already Registered"
            });
        };

        // find most recent OTP for the user
        const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        // validate OTP
        if(recentOTP.length == 0){
            return res.status(400).json({
                success:false,
                message:"OTP Not Found"
            });
        }
        else if(otp !== recentOTP[0].otp){
            // invalid OTP
            return res.status(400).json({
                success:false,
                message:"OTP Not Matching"
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password,10);

        // entry created into DB

        const profile = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        }) 

        const user = await User.create({
            firstName,lastName,email,password:hashedPassword,accountType,additionalDetails:profile._id,image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}+${lastName}`
        });

        // return response
        return res.status(200).json({
            success:true,
            message:"User Registered Successfully"
        })
        }
        catch(e){
            console.log(e.message);
            return res.status(401).json({
                success:false,
                message:"Cannot Sign Up"
            })
        }
}

// login
exports.login = async (req,res) => {
    try{

        // fetch data from request
        const {email,password} = req.body;

        // validate data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"Fill all fields"
            });
        };

        // user exist check
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(402).json({
                success:false,
                message:"User Not Registered"
            })
        }

        // generate jwt, after matching password
        const matchPassword = await bcrypt.compare(password,user.password);
        if(matchPassword){

            const payload = {
                email : user.email,
                id : user._id,
                accountType : user.accountType
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            });
            user.token = token;
            user.password = undefined;

            // create cookie and send response

            const options2 = {
                expires : new Date(Date.now() + 3*24*60*60*1000),  // 3days
                httpOnly:true
            }
            res.cookie("token",token,options2).status(200).json({
                success:true,
                token,
                user,
                message:"Logged In Successfully"
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Password is Incorrect"
            })
        }

        

    }
    catch(e){
        console.log(e.message);
        return res.status(401).json({
            success:false,
            message:"Cannot Log In"
        })
    }
}

// change password
exports.changePassword = async (req,res) => {
    try{
        // get data from request
        const {oldPassword,newPassword} = req.body;
        const id = req.user.id;
        
        const user = await User.findOne({_id:id});

        // validate data
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid User Details"
            });
        };

        const validPassword = await bcrypt.compare(oldPassword,user.password);

        if(!validPassword){
            return res.status(400).json({
                success:false,
                message:"Invalid Password"
            });
        };

        // update pwd in DB
        const newHashedPassword = await bcrypt.hash(newPassword,10);
        const updatedUser = await User.findByIdAndUpdate(req.user.id,{password:newHashedPassword},{new:true});

        console.log(updatedUser);

        // send mail - password Updated
        try{
            const mailResponse = await SendEmail(updatedUser.email,"Password Changed || StudyNotion",passwordUpdated(updatedUser.email,updatedUser.firstName,updatedUser.lastName));
        }catch(e){
            return res.status(400).json({
                success:false,
                message:"Error occured while sending Mail"
            })
        }

        // return response
        return res.status(200).json({
            success:true,
            message:"Password has been changed Successfully"
        });
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Password Cannot be Changed"
        });
    };
}
