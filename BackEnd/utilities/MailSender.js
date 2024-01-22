const nodemailer = require("nodemailer");
require('dotenv').config();

const SendEmail = async (email,title,body) => {
    console.log("Email :",email);
    console.log("title :",title);
    console.log("body : ",body);
    console.log("MAIL HOST :",process.env.MAIL_HOST);
    console.log("MAIL USER :",process.env.MAIL_USER);
    console.log("MAIL PASS :",process.env.MAIL_PASS);
    try{
        const transporter = nodemailer.createTransport({
            service:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });

        let info = await transporter.sendMail({
            from:'StudyNotion || MegaProject',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        });

        return info;
    }
    catch(e){
        console.log(e.message);
    }
}

module.exports = SendEmail;