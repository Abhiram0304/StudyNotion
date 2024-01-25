const mongoose = require('mongoose');
const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const courseProgress = require('../models/CourseProgess');
const SendEmail = require('../utilities/MailSender');
const {courseEnrollmentEmail} = require('../mailTemplates/courseEnrollment');
const {paymentSuccessEmail} = require('../mailTemplates/paymentSuccessful');
const CourseProgess = require('../models/CourseProgess');

// capture the payment and initiate razorpay order
exports.capturePayment = async (req,res) => {
    try{
        // get course and user ID
        const {coursesId} = req.body;
        const userId = req.user.id;

        if(coursesId.length == 0){
            return res.status(404).json({
                success:false,
                message:"Invalid Input",
            })
        }

        let totalAmount = 0;
        for(const courseId of coursesId){
            let course;
            try{
                course = await Course.findById(courseId);
                if(!course){
                    return res.status(404).json({
                        success:false,
                        message:"Course Not Found",
                    })
                }

                const uid = new mongoose.Types.ObjectId(userId);
                if(course.studentsEnrolled.includes(uid)){
                    return res.status(400).json({
                        success:false,
                        message:"Already enrolled in the course",
                    })
                }

                totalAmount += course.price;
            }catch(e){
                return res.status(400).json({
                    success:false,
                    message:e,
                })
            }
        }

        // create order
        const options = {
            amount:totalAmount*100,
            currency : "INR",
            receipt:Math.random(Date.now()).toString(),
        };

        try{
            // initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            return res.status(200).json({
                success:true,
                message:"Captured Payment Successfully",
                paymentResponse,
            });
        }
        catch(e){
            console.log(e.message);
            return res.status(403).json({
                success:false,
                message:e,
            })
        }

    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Not Able to capture the payment"
        });
    }
};

exports.buyCourseForFree = async (req,res) => {
    try{
        const userId = req.user.id;
        const {coursesId} = req.body;

        if(coursesId.length==0){
            return res.status(403).json({
                success:false,
                message:"Invalid Input",
            })
        }

        for(const courseId of coursesId){
            let course;
            try{
                course = await Course.findById(courseId);
                if(!course){
                    return res.status(404).json({
                        success:false,
                        message:"Course Not Found",
                    })
                }

                const uid = new mongoose.Types.ObjectId(userId);
                if(course.studentsEnrolled.includes(uid)){
                    return res.status(400).json({
                        success:false,
                        message:"Already enrolled in the course",
                    })
                }
            }catch(e){
                return res.status(400).json({
                    success:false,
                    message:e,
                })
            }
        }
        
        try{
            for(const courseId of coursesId){
                // find the courses and enroll student into them
                const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true});
                if(!enrolledCourse){
                    return res.status(403).json({
                        success:false,
                        message:"Course Not Found",
                    })
                }

                const courseProgress = await CourseProgess.create({courseId:courseId,userId:userId,completedVideos:[]});

                // find student and add course(s) into them
                const enrolledStudent = await User.findByIdAndUpdate({_id:userId},{$push:{courses:courseId,courseProgress:courseProgress._id}},{new:true});
                if(!enrolledStudent){
                    return res.status(404).json({
                        success:false,
                        message:"User not Found",
                    })
                }

                // send confirmation mail
                const emailResponse = await SendEmail(enrolledStudent?.email,"Congratulations | Successfully Onboarded into studyNotion Course",courseEnrollmentEmail(enrolledCourse?.courseName,enrolledStudent?.firstName + " " + enrolledStudent?.lastName));
                if(!emailResponse){
                    console.log(e);
                    return res.status(400).json({
                        success:false,
                        message:"Error while sending Email",
                    })
                }
            }    
            return res.status(200).json({
                success:true,
                message:"Successfully verified Signature and Added Course(s)"
            })
        }catch(e){
            return res.status(400).json({
                success:false,
                message:"Cannot verify Signature"
            });
        }

    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Operation Failed",
        })
    }
} 

exports.verifySignature = async (req,res) => {

    const {razorpay_order_id} = req.body;
    const {razorpay_payment_id} = req.body;
    const {razorpay_signature} = req.body;

    const {courses} = req.body;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(400).json({
            success:false,
            message:"Payment Failed",
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
        
    const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

    if(expectedSignature === razorpay_signature){
        console.log("Payment Is Authorized");

        try{
            for(const courseId of courses){
                // find the courses and enroll student into them
                const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true});
                if(!enrolledCourse){
                    return res.status(403).json({
                        success:false,
                        message:"Course Not Found",
                    })
                }

                const courseProgress = await CourseProgess.create({courseId:courseId,userId:userId,completedVideos:[]});

                // find student and add course(s) into them
                const enrolledStudent = await User.findByIdAndUpdate({_id:userId},{$push:{courses:courseId,courseProgress:courseProgress._id}},{new:true});
                if(!enrolledStudent){
                    return res.status(404).json({
                        success:false,
                        message:"User not Found",
                    })
                }

                // send confirmation mail
                const emailResponse = await SendEmail(enrolledStudent.email,"Congrats || Successfully Onboarded into studyNotion Course",courseEnrollmentEmail(enrolledCourse?.title,enrolledStudent?.firstName + " " + enrolledStudent?.lastName));
                if(!emailResponse){
                    return res.status(400).json({
                        success:false,
                        message:"Error while sending Email",
                    })
                }
            }    

            return res.status(200).json({
                success:true,
                message:"Successfully verified Signature and Added Course(s)"
            })

        }catch(e){
            return res.status(400).json({
                success:false,
                message:"Cannot verify Signature"
            });
        }
    }else{
        return res.status(400).json({
            success:false,
            message:"Invalid request"
        });
    }

}

exports.sendPaymentSuccessEmail = async (req,res) => {
    const {orderId,paymentId,amount} = req.body;
    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(404).json({
            success:false,
            message:"Invalid Inputs",
        })
    }

    try{
        const enrolledStudent = await User.findById({_id:userId});

        await SendEmail(enrolledStudent.email,"Payment Received SuccessFully",paymentSuccessEmail(enrolledStudent?.firstName+" "+enrolledStudent?.lastName,amount/100,orderId,paymentId));
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Could not send Email",
        })
    }
}