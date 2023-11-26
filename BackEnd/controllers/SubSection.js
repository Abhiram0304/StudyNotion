const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const {uploadImage} = require('../utilities/ImageUploader');

require('dotenv').config();

exports.createSubSection  = async (req,res) => {
    try{
        const {sectionId,title,timeDuration,description} = req.body;

        // fetch video and upload to cloudinary
        const video = req.files.videoFile;

        if(!title || !timeDuration || !description || !sectionId || !video){
            return res.status(400).json({
                success:false,
                message:"Fill all the given fields"
            });
        };

        const uploadVideo = await uploadImage(video,process.env.FOLDER_NAME);

        const createdSubSection = await SubSection.create({title:title,description:description,timeDuration:timeDuration,videoUrl:uploadVideo.secure_url});

        const updatedSection = await Section.findByIdAndUpdate(sectionId,{$push:{subSection:createdSubSection._id}},{new:true}).populate("subSection").exec();

        return res.status(200).json({
            success:true,
            updatedSection,
            message:"Created Sub Section Successfully"
        });

    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Unable to create Sub Section",
            error:e.message
        });
    }
}

exports.updatedSubSection = async (req,res) => {
    try{
        const {sectionId,subSectionId,title,timeDuration,description} = req.body;

        const subSection = await SubSection.findById({subSectionId});

        if(!subSection){
            return res.status(400).json({
                success:false,
                message:"SubSection Not found"
            })
        }

        if (title !== undefined) {
            subSection.title = title
        }
      
        if (description !== undefined) {
            subSection.description = description
        }

        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(
              video,
              process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            // subSection.timeDuration = `${uploadDetails.duration}`
        }
        await subSection.save();

        const updatedSection = await Section.findById({sectionId}).populate("subSection");

        return res.status(200).json({
            success:true,
            message:"updated Sub Section Successfully",
            data:updatedSection
        });

    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Unable to update sub section"
        });
    }
}

exports.deleteSubSection = async (req,res) => {
    try{
        const {sectionId,subSectionId} = req.body;

        await Section.findByIdAndUpdate({sectionId},{$pull:{SubSection:subSectionId}});

        const subSection = await SubSection.findByIdAndDelete({subSectionId});
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"SubSection Not found"
            })
        }
        
        const updatedSection = await SubSection.findById(sectionId).populate("subSection");

        return res.status(200).json({
            success:true,
            message:"Deleted Sub Section Successfully",
            data:updatedSection
        })
        
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Unable to delete sub section"
        });
    }
}