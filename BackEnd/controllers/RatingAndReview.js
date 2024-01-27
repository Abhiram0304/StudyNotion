const RatingAndReview = require("../models/RatingAndReview");
const Course = require('../models/Course');
const { default : mongoose } = require("mongoose");

exports.createRatingAndReview = async (req,res) => {
    try{
        // get user id
        const userId = req.user.id;
        // fetch data from req body
        const {courseId,rating,review} = req.body;
        // check if user is enrolled in that course
        const courseDetails = await Course.findOne({_id:courseId,studentsEnrolled:{$elemMatch:{$eq:userId}}});
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Student Not Enrolled into the course"
            });
        }
        // if user already gave review
        const ratingExist = await RatingAndReview.findOne({user:userId,course:courseId});
        if(ratingExist){
            await RatingAndReview.findByIdAndUpdate({user:userId,courseId:courseId},{rating : rating, review : review},{new:true});
            return res.status(200).json({
                success:true,
                message:"Updated rating and review SuccessFully",
            })
        }

        // create rating and review
        const createdRatingAndReview = await RatingAndReview.create({rating,review,course:courseId,user:userId});
        // attach it to course model
        await Course.findByIdAndUpdate({_id:courseId},{$push:{ratingAndReviews:createdRatingAndReview._id}},{new:true});
        // return response
        return res.status(200).json({
            success:true,
            message:"Successfully created Rating and review",
            createdRatingAndReview
        });
    }catch(e){
        console.log(e);
        return res.status(400).json({
            success:false,
            message:"Cannot Create Rating and Review"
        });
    }
}

exports.getStudentCourseRatingAndReview = async (req,res) => {
    try{
        const userId = req.user.id;
        const {courseId} = req.body;

        const ratingAndReview = await RatingAndReview.findOne({course:courseId,user:userId});
        if(!ratingAndReview){
            return res.status(400).json({
                success:false,
                message:"No rating and review Found",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Rating and Review Found",
            data:ratingAndReview,
        })
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Unable to fetch rating and reviews"
        })
    }
}

exports.getAverageRating = async (req,res) => {
    try{
        // get course ID
        const {courseId} = req.body;

        // calculate Average rating
        const answer = await RatingAndReview.aggregate([         // returns answer in array
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating : {$avg : "$rating"}
                }
            }
        ])

        // if rating exists
        if(answer.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:answer[0].averageRating,
                message:"SuccessFully found Average Rating"
            });
        }

        // if no rating exists
        return res.status(200).json({
            success:true,
            message:"No Rating Available",
            averageRating:0
        })  

    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Cannot fetch Average Rating"
        })
    }
}

exports.getAllRatingAndReview = async (req,res) => {
    try{
        const allRatingsAndReviews = await RatingAndReview.find().sort({rating: "desc"}).populate({path:"user",select:"firstName lastName email image"}).populate({path:"course",select:"courseName"}).exec();

        if(!allRatingsAndReviews){
            return res.status(400).json({
                success:false,
                message:"Cannot find Ratings and reviews"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Found All ratings and reviews Successfully",
            allRatingsAndReviews
        })
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Cannot fetch all ratings and reviews"
        })
    }
}

exports.getCourseRatingAndReview = async (req,res) => {
    try{
        const {courseId} = req.body;
        const courseRatingAndReview = await RatingAndReview.find({course:courseId}).sort({rating}).populate({path:"user",select:"firstName lastName email image"}).populate({path:"course",select:"courseName"}).exec();

        if(!courseRatingAndReview){
            return res.status(400).json({
                success:false,
                message:"cannot find rating and review of the course"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Successfully found all ratings and reviews of the course",
            courseRatingAndReview
        });

    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Cannot find all rating and review"
        })
    }
}