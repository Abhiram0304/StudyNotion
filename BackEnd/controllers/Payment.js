const mongoose = require('mongoose');
const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const courseProgress = require('../models/CourseProgess');
const {SendEmail} = require('../utilities/MailSender');
const {courseEnrollmentEmail} = require('../mailTemplates/courseEnrollment');
const {paymentSuccessEmail} = require('../mailTemplates/paymentSuccessful');

// capture the payment and initiate razorpay order
exports.capturePayment = async (req,res) => {
    try{
        // get course and user ID
        const {courseId} = req.body;
        const userId = req.user.id;

        // validate Id's
        const user = await User.findById({userId});
        const course = await Course.findById({courseId});

        if(!user || !course){
            return res.status(404).json({
                success:false,
                message:"User or Course Not found"
            });
        };

        // user already bought this course
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)){
            return res.status(400).json({
                success:false,
                message:"Student Already Enrolled in the course"
            });
        }

        // create order
        const amount = course.price;
        const currency = "INR";
        const options = {
            amount:amount*100,
            currency,
            receipt:Math.random(Date.now().toString()),
            notes:{
                courseId:courseId,
                userId:userId
            }
        };
        try{
            // initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
        }
        catch(e){
            console.log(e.message);
        }

        // return response
        return res.status(200).json({
            success:true,
            message:"Captured Payment Successfully",
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount
        });
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Not Able to capture the payment"
        });
    }
};

exports.verifySignature = async (req,res) => {
    const webhookSecret = "123456";
    const signature = req.headers["x-razorpay-signature"];
        
    const shaKey = crypto.createHmac("sha256",webhookSecret);
    shaKey.update(JSON.stringify(req.body));
    const digest = shaKey.digest('hex');

    if(signature === digest){
        console.log("Payment Is Authorized");

        const {courseId,userId} = req.body.payload.payment.entity.notes;

        try{
            // fulfill action
            // find the course and enroll student into it
            const enrolledCourse = await Course.findByIdAndUpdate({courseId},{$push:{studentsEnrolled:userId}},{new:true});
            
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course Not found"
                });
            }

            // find student and add course into it
            const enrolledStudent = await User.findByIdAndUpdate({userId},{$push:{courses:courseId}},{new:true});

            // send confirmation mail
            const emailResponse = await SendEmail(enrolledStudent.email,"Congrats || Onboared into studyNotion Course","SuccessFully enrolled into the course");

            return res.status(200).json({
                success:true,
                message:"Successfully veried Signature and Course Added"
            })

        }catch(e){
            return res.status(400).json({
                success:false,
                message:"Cannot verify Signature"
            });
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Invalid request"
        });
    }

}

exports.sendPaymentSuccessfulEmail = async (req,res) => {
    try{
        const {orderId,paymentId,amount} = req.bosdy;

        const userId = req.user.id;

        if(!orderId || !paymentId || !amount){
            return res.stauts(400).json({
                success:false,
                message:"All fields are not filled"
            })
        }

        const enrolledStudent = await User.findById(userId);

        await SendEmail(enrolledStudent.email,paymentSuccessEmail(`${enrolledStudent.firstName} ${enrolledStudent.lastName}`, amount/100, orderId, paymentId));


    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Not Able to send Payment Success Mail"
        })
    }
}

exports.enrollStudentIntoCourse = async (req,res) => {
    const courses = req.body;
    const userId = req.user.id;

    if(!courses || !userId){   // courses -> array, student can enroll innto multiple courses at once
        return res.status(404).json({
            success:false,
            message:"Please provide userId and courseId"
        })
    }

    for(const courseId of courses){
        try{
            const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true});

            if(!enrolledCourse){
                return res.status(400).json({
                    success:false,
                    message:"Cannot Enroll student into the course"
                })
            }

            const courseProgress = await courseProgress.create({courseId:courseId,userId:userId,completedVideos:[]});

            const enrolledStudent = await User.findByIdAndUpdate({userId},{$push:{courses:courseId,courseProgress:courseProgress._id}},{new:true});


            const emailResponse = await SendEmail(enrolledStudent.email,`Successfully Enrolled into ${enrolledCourse.courseName}`,courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`));

            return res.stauts(200).json({
                success:true,
                message:"Successfully Enrolled Student into the Course(s)"
            })

        }catch(e){
            return res.status(400).json({
                success:false,
                message:"Not Able to enroll student into Course(s)"
            })
        }
    }
}