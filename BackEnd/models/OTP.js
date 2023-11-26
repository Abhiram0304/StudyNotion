const mongoose = require('mongoose');
const sendEmail = require('../utilities/MailSender');
const emailTemplate = require('../mailTemplates/emailVerification');

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60          // 5min
    }
});

// function to send verification EMail
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await sendEmail(email,"Verification Email From StudyNotion || MegaProject",emailTemplate(otp));
        console.log("Email Sent Successfully");
    }
    catch(e){
        console.log("Error Occured While Sending Mail");
        console.log(e.message);
        throw e;
    }
};

// pre middleware
otpSchema.pre("save",async function(next) {
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",otpSchema);