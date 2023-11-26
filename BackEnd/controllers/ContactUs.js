const SendEmail = require('../utilities/MailSender')
const {contactUs} = require('../mailTemplates/contactUs')

exports.contactUs = async (req,res) => {
    const {firstName,lastName,email,phoneNumber,countryCode,message} = req.body;

    if(!firstName || !lastName || !email || !phoneNumber || !message){
        return res.status(404).json({
            success:false,
            message:"Fill all required Fields"
        });
    }

    try{
        const mailresponse = await SendEmail(email,"Successfully Noted Your Response | StudyNotion",contactUs(email,firstName,lastName,message,phoneNumber,countryCode));
        return res.status(200).json({
            success:true,
            message:"Mail response sent Successfully"
        })
    }catch(e){
        console.log(e);
        return res.status(400).json({
            success:false,
            message:"Unable to send Email"
        })
    }
}