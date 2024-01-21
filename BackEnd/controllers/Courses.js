const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const {uploadImage} = require('../utilities/ImageUploader');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const {convertTimeFormat} = require('../utilities/convertTimeFormat');
const CourseProgess = require('../models/CourseProgess');

require('dotenv').config();

exports.createCourse = async (req,res) => {
    try{
       // fetch data
       const {courseName,courseDescription,whatYouWillLearn,price,category,tags,instructions} = req.body;

       // get thumbnail
       const thumbnail = req.files.thumbnail;

      // validation
      if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tags || !instructions){
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

      // check given category is valid or not
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
      const newCourse = await Course.create({courseName,courseDescription,instructor:instructor._id,whatYouWillLearn,price,categeory:categoryDetails._id,thumbnail:thumbnailImage.secure_url,instructions:instructions,tags:tags,status:"Draft"});

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

exports.editCourseDetails = async(req,res) => {
    try{

        const {courseId} = req.body;
        const changesMade = req.body;
        const course = await Course.findById({courseId});

        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not Found",
            })
        }

        // check if thumbnail is changed
        if(req.file){
            const thumbnailImage = req.files.thumbnail;
            const response = await uploadImage(thumbnailImage,process.env.FOLDER_NAME);
            course.thumbnail = response.secure_url;
        }

        // only update the required data
        for(const key in changesMade){
            if(key=="tags" || key=="instructions"){
                course[key] = JSON.parse(changesMade[key]);
            }else{
                course[key] = changesMade[key];
            }
        }

        Course.save();

        const updatedCourseDetails = await Course.findById({_id:courseId}).populate({path:"instructor",populate:{path:"additonalDetails"}})
                                                                            .populate("category")
                                                                            .populate("ratindAndReviews")
                                                                            .populate({path:"courseContent",populate:{path:"subSection"}})
                                                                            .exec();;

        return res.status(200).json({
            success:true,
            message:"SuccessFully Updated Course Details",
            updatedDetails : updatedCourseDetails,
        });

    }catch(e){
        console.log(e);
        return res.status(400).json({
            success:false,
            message:"Unable Edit Course Details",
        })
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
        const completeDetails = await Course.findById({_id:courseId}).populate({path:"instructor",populate:{path:"additionalDetails"}})
                                                                        .populate("category")
                                                                        .populate("ratingAndReviews")
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
            data : completeDetails
        })
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Unable to fetch details of course"
        })
    }
}

exports.deleteCourse = async(req,res) => {
    try{
        const {courseId} = req.body;

        const course = await Course.findById({_id:courseId});
        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course Not Found",
            })
        }

        // unenroll the students from this course
        const studentsEnrolled = course.studentsEnrolled;
        for(const sid of studentsEnrolled){
            await User.findByIdAndUpdate({_id:sid},{$pull : {courses : courseId}});
        }

        // delete Sections and sub Sections of this course
        const courseSubParts = course.courseContent;
        for(const sectionId of courseSubParts){
            const section = await Section.findById({_id:sectionId});
            if(section){
                for(const subSectionId of section?.subSection){
                    const subSection = await SubSection.findById(subSectionId);
                    if(subSection){
                        await SubSection.findByIdAndDelete(subSectionId);
                    }
                }
            }
            await Section.findByIdAndDelete({_id:sectionId});
        }

        await Course.findByIdAndDelete(courseId);

        const updatedCourses = await Course.find();
        
        return res.status(200).json({
            success:true,
            message:"Course Deleted SuccessFully",
            updatedCourses,
        })
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"UnsuccessFul deletion of Course",
        })
    }
}

exports.getInstructorCourses = async(req,res) => {
    try{
        const instructorId = req.user.id;
        
        const instructorCourses = await Course.find({instructor:instructorId}).sort({createdAt : -1}).populate("ratingAndReviews").populate("instructor").exec();

        return res.status(200).json({
            success:true,
            message:"Successfully fetched all Instructor Courses",
            instructorCourses
        })
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Unable to Fetch Instructor's Courses",
        })
    }
}

exports.changeStatus = async(req,res) => {
    try{
        const {courseId,publishCourse} = req.body;

        if(publishCourse){
            await Course.findOneAndUpdate({_id:courseId},{status:"Published"});
        }else{
            await Course.findOneAndUpdate({_id:courseId},{status:"Draft"});
        }

        return res.status(200).json({
            success:true,
            message:"Changed the status of Course Successfully",
        });
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Unable to change the status of Course",
        });
    }
}

exports.getFullCourseDetails = async (req,res) => {
    try{
        const {courseId} = req.body;
        const userId = req.user.id;
        
        if(!courseId){
            return res.status(404).json({
                success:false,
                message:"Course Id not found",
            })
        }

        const courseDetails = await Course.findById({_id:courseId}).populate({path:"instructor",populate:{path:"additionalDetails"}}).populate("category").populate("ratingAndReviews").populate({path:"courseContent",populate:{path:"subSection"}}).exec();

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Course details not found",
            })
        }

        const courseProgress = await CourseProgess.findOne({courseId:courseId,userId:userId});

        let totalCourseDuration = 0;
        let totalLectures = 0;
        courseDetails?.courseContent.forEach((section) => {
            section?.subSection.forEach((subSection) => {
                const timeInSec = parseInt(subSection?.timeDuration);
                totalCourseDuration += timeInSec;
                totalLectures++;
            })
        });

        totalCourseDuration = convertTimeFormat(totalCourseDuration);

        return res.status(200).json({
            success:true,
            message:"Fetched course data successfully",
            data : {courseDetails,totalCourseDuration,completedVideos : courseProgress?.completedVideos ? courseProgress?.completedVideos : [],totalLectures},
        })

    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Unable to Fetch the Data",
        })
    }
}