const nodemailer = require("nodemailer");
require('dotenv').config();

const SendEmail = async (email,title,body) => {
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