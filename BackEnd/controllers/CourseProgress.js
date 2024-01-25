const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const CourseProgress = require('../models/CourseProgess');
const Course = require("../models/Course")

exports.updateCourseProgress = async (req,res) => {
    
    const {courseId,subSectionId} = req.body;
    const userId = req.user.id;

    try{
        const subSection = await SubSection.findById(subSectionId);

        if(!subSection){
            return res.stauts(404).json({
                success:false,
                message:"Cannot find Sub Section"
            })
        }

        const courseProgress = await CourseProgress.findOne({courseId:courseId,userId:userId});


        if(!courseProgress){
            return res.stauts(404).json({
                success:false,
                message:"Cannot find Course Progress"
            })
        }
        else{
            // If course progress exists, check if the subsection is already completed
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    error:"SubSection Already Completed"
                })
            }

            // else push the sub section into completedVideos
            courseProgress.completedVideos.push(subSectionId);
        }

        await courseProgress.save();

        return res.status(200).json({
            success:true,
            message:"Course progress Updated Successfully"
        })

    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Cannot update Course Progress"
        })
    }
}