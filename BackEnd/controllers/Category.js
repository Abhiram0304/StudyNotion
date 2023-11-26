const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createCategory = async (req,res) => {
    try{
        // fetch data
        const {name,description} = req.body;

        // validate data
        if(!name || !description){
            return res.stauts(401).json({
                success:false,
                message:"All Fields are required"
            })
        }

        // create a entry in DB
        const createCategory = await Category.create({name:name,description:description});

        return res.status(200).json({
            success:true,
            message:"Category created Successfully"
        })
    }catch(e){  
        return res.status(400).json({
            success:false,
            message:"Cannot create Category"
        })
    }
}

exports.showAllCategory = async (req,res) => {
    try{
        const allCategory = await Category.find({},{name:true,description:true}); 
        return res.status(200).json({
            success:true,
            message:"All Category returned Successfully",
            allCategory
        });
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Cannot Show all category"
        })
    }
}

exports.getCategoryPageDetails = async (req,res) => {
    try{
        // get category id
        const {categoryId} = req.body;
        // fetch all courses corresponding to that category
        const currentCategory = await Category.findById(categoryId).populate("course").exec();
        // validation
        if(!currentCategory){
            return res.status(400).json({
                success:false,
                message:"Courses not Found for this Category"
            })
        }
        // get courses from other categories
        const otherCategory = await Category.findById({_id:{$ne:categoryId}}).populate("course").exec();
        // get top selling courses
        const topSellingCourses = await Course.find({}).sort({studentsEnrolled:"desc"}).limit(10);
        // return response
        res.status(200).json({
            success:true.valueOf,
            message:"Found category page details",
            recommandation:{
                currentCategory,otherCategory,topSellingCourses
            }
        })
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"not able to get category page details"
        })
    }
}