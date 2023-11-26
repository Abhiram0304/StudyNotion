const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const {uploadImage} = require('../utilities/ImageUploader');

require('dotenv').config();

exports.createCourse = async (req,res) => {
    try{
       // fetch data
       const {courseName,courseDescription,whatYouWillLearn,price,category} = req.body;

       // get thumbnail
       const thumbnail = req.files.thumbnailImage;

      // validation
      if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        });
      };

      // check for instructor
      const userId = req.user.id;
      const instructor = await User.findById(userId);
      
      if(!instructor){
        return res.status(404).json({
            success:false,
            message:"Instructor Details Not Found"
        });
      };

      // check given tag is valid or not
      const categoryDetails = await Category.findById(category);
      if(!categoryDetails){
        return res.status(404).json({
            success:false,
            message:"Category details not Found"
        });
      };

      // Upload image to cloudinary
      const thumbnailImage = await uploadImage(thumbnail,process.env.FOLDER_NAME);

      // create an entry for new post
      const newCourse = await Course.create({courseName,courseDescription,instructor:instructor._id,whatYouWillLearn,price,categeory:categoryDetails._id,thumbnail:thumbnailImage.secure_url});

      // update Instructor user schema with new course
      await User.findByIdAndUpdate({_id:instructor._id},{$push:{courses:newCourse._id}},{new:true});

      // add new course to the categories
      await Category.findByIdAndUpdate({_id:categoryDetails._id},{$push:{course:newCourse._id}},{new:true});

      return res.status(200).json({
        success:true,
        message:"Course Created Successfully",
        data:newCourse
      });
       
    }catch(e){
        console.error(e);
        return res.status(404).json({
            success:false,
            message:"Failed to create course",
            error:e.message
        });
    }
}

exports.getAllCourses = async (req,res) => {
    try{

        const allCourses = await Course.find({},{courseName:true,price:true,thumbnail:true,instructor:true,ratingAndReviews:true,studentsEnrolled:true}).populate("instructor").exec();

        return res.status(200).json({
            success:true,
            message:"All courses returned Successfully",
            data:allCourses
        })

    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Cannot fetch all courses"
        });
    }
}

exports.getCourseDetails = async (req,res) => {
    try{
        const {courseId} = req.body;
        const completeDetails = await Course.findById({courseId}).populate({path:"instructor",populate:{path:"additonalDetails"}})
                                                                 .populate("category")
                                                                 .populate("ratindAndReviews")
                                                                 .populate({path:"courseContent",populate:{path:"subSection"}})
                                                                 .exec();
        
        if(!completeDetails){
            return res.status(400).json({
                success:false,
                message:"Could not find the details"
            });
        }

        return res.status(200).json({
            success:true,
            message:"Successfully found course details",
            completeDetails
        })
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Unable to fetch details of course"
        })
    }
}