const Section = require('../models/Section');
const Course = require("../models/Course");
const SubSection = require('../models/SubSection');

exports.createSection = async (req,res) => {
    try{
        // data fetch
        const{sectionName,courseId} = req.body;

        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Fill all given fields"
            });
        }

        // create section
        const newSection = await Section.create({sectionName});

        // update course scheme
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{$push:{courseContent:newSection._id}},{new:true}).populate({path:"courseContent",populate:{path:"subSection"}}).exec();

        return res.status(200).json({
            success:true,
            message:"Created Section SuccessFully",
            updatedCourse
        });
        
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Unable to create Section",
            updatedCourse,
            error:e.message
        })
    }
}   

exports.updateSection = async (req,res) => {
    try{
        // data input
        const {sectionName,sectionId, courseId} = req.body;

        // validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Fill all given fields"
            })
        }

        // update data
        const updatedSection = await Section.findByIdAndUpdate({sectionId},{sectionName:sectionName},{new:true});

        const updatedCourse = await Course.findById(courseId).populate({path:"CourseContent",populate:{path:"subSection"}});

        // return response
        return res.status(200).json({
            success:true,
            message:"updated Section Successfully",
            data:{
                updatedCourse:updatedCourse,
                updatedSection:updatedSection
            }
        })
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Unable to update Section"
        })
    }
}

exports.deleteSection = async (req,res) => {
    try{
        const {sectionId,courseId} = req.body;

        // we need to delete the entry from Course Schema
        await Course.findByIdAndUpdate(courseId,{$pull:{courseContent:sectionId}});

        const section = await Section.findById(sectionId);
        
        if(!section){
            return res.status(404).json({
                success:false,
                message:"Section Not found"
            })
        }

        // delete all it's sub sections
        await SubSection.deleteMany({_id:{$in:section.subSection}});
        await Section.findByIdAndDelete(sectionId);

        const updatedCourse = await Course.findById(courseId).populate({path:"courseContent",populate:{path:"subSection"}});

        return res.status(200).json({
            success:true,
            message:"deleted Section Successfully",
            updatedCourse
        })

    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Unable to delete Section"
        })
    }
}

