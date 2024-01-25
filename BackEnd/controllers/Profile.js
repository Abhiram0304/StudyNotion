const { default: mongoose } = require('mongoose');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Course = require('../models/Course');
const {uploadImage} = require('../utilities/ImageUploader'); 
const { convertTimeFormat } = require('../utilities/convertTimeFormat');
const CourseProgess = require('../models/CourseProgess');
// already profile is created, while creating the user it is set to NULL, so we just need to update it.
exports.updateProfile = async (req,res) => {
    try{
        // get data, userId
        const {firstName,lastName,dateOfBirth,about,contactNumber,gender,countryCode} = req.body;
        const id = req.user.id;

        // validation
        if(!id || !firstName || !lastName){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            });
        };

        // find profile
        const user = await User.findById(id);
        const profileId = user.additionalDetails;
        const profile = await Profile.findById(profileId);

        // update profile
        user.firstName = firstName;
        user.lastName = lastName;
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.gender = gender;
        profile.contactNumber = contactNumber;
        profile.countryCode = countryCode;
        await user.save();
        await profile.save();

        const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();

        // return response
        return res.status(200).json({
            success:true,
            message:"Successfully updated message",
            updatedData : updatedUserDetails,
        })

    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Unable to update Profile",
            error:e.message
        })
    }
}

exports.deleteAccount = async (req,res) => {
    try{
        const id = req.user.id;

        const user = await User.findById(id);

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not found"
            });
        };

        await Profile.findByIdAndDelete({_id:new mongoose.Types.ObjectId(user.additionalDetails)});
    
        // unenroll user from all enrolled courses
        for(const courseId of user.courses){
            await Course.findByIdAndDelete(courseId,{$pull:{studentsEnrolled:id}},{new:true});
        }
        
        // schedule jobs --> Cron job

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            message:"SuccessFully Deleted Acoount"
        });

    }catch(e){
        console.log("HIII");
        return res.status(400).json({
            success:false,
            message:"Unable to delete Account",
            error:e.message
        })
    }
}

exports.getAllDetails = async (req,res) => {
    try{
        const id = req.user.id;
        const user = await User.findById(id).populate("additionalDetails").exec();

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Found"
            });
        };

        return res.status(200).json({
            success:true,
            message:"User details Found",
            user
        });

    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Cannot fetch Details",
            error:e.message
        })
    }
}

require('dotenv').config();

exports.updateDP = async (req,res) => {
    try{
        const dp = req.files.displayPicture;
        const userId = req.user.id;
        const image = await uploadImage(dp,process.env.FOLDER_NAME,1000,1000);
        const updatedProfile = await User.findByIdAndUpdate(userId,{image:image.secure_url},{new:true});

        return res.status(200).json({
            success:true,
            message:"Uploaded Display Picture Successfully",
            updatedProfile : updatedProfile,
        })
    }catch(e){
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

exports.getEnrolledCourses = async (req,res) => {
    try{
        const userId = req.user.id;
        let details = await User.findOne({_id:userId}).populate({path:"courses",populate:{path:"courseContent",populate:{path:"subSection"}}}).exec();

        if(!details){
            return res.status(404).json({
                success:false,
                message:"User Not Found",

            })
        }
        details = details.toObject();
        let subSectionLength = 0;
        for(let i=0; i<details.courses.length; i++){
            let totalDurationInSeconds = 0;
            subSectionLength = 0;
            if(details.courses[i].courseContent && details.courses[i].courseContent.length > 0){
                for(let j=0; j<details.courses[i].courseContent.length; j++){
                    totalDurationInSeconds += details.courses[i].courseContent[j].subSection.reduce((acc,curr) => acc + parseInt(curr.timeDuration),0);
                    details.courses[i].totalDuration = convertTimeFormat(totalDurationInSeconds);
                    subSectionLength += details.courses[i].courseContent[j].subSection.length;
                }
            }
            let courseProgressCount = await CourseProgess.findOne({courseId:details.courses[i]._id,userId:userId});
            courseProgressCount = courseProgressCount?.completedVideos.length;
            if(subSectionLength===0){
                details.courses[i].progressPercentage = 100;
            }else{
                const multiplier = Math.pow(10,2);
                details.courses[i].progressPercentage = Math.round((courseProgressCount/subSectionLength) * 100 * multiplier) / multiplier;
            }
        }

        return res.status(200).json({
            success:true,
            message:"Data found",
            data:details.courses,
        })
    }catch(e){
        console.log(e);
        return res.status(400).json({
            success:false,
            message:e.message,
        })
    }
}

exports.getInstructorData = async (req,res) => {
    try{
        const userId = req.user.id;
        const courses = await Course.find({instructor : userId}).populate("instructor").populate("ratingAndReviews").exec();

        const completeData = courses.map((course,i) => {
            const totalEnrolledStudent = course?.studentsEnrolled?.length;
            const totalIncome = totalEnrolledStudent * course?.price;
            
            const courseDataWithStats = {
                courseId : course._id,
                courseName : course?.courseName,
                courseDescription : course?.courseDescription,
                instructor : course?.instructor,
                ratingsAndReviews:course?.ratingAndReviews,
                thumbnail:course?.thumbnail,
                price:course?.price,
                totalEnrolledStudent,
                totalIncome,
            }

            return courseDataWithStats;
        });

        return res.status(200).json(({
            success:true,
            message:"SuccessFully fetched the data",
            data:completeData,
        }));
        
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Unable to fetch the data",
        })
    }
}