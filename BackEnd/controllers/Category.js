const Category = require('../models/Category');
const Course = require('../models/Course');

function getRandomInt(n){
    return Math.floor(Math.random() * n);
}

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
        const currentCategory = await Category.findById({_id:categoryId}).populate({path:"course",populate:"ratingAndReviews",populate:"instructor"}).exec();

        // validation
        if(!currentCategory){
            return res.status(404).json({
                success:false,
                message:"Category Not Found"
            })
        }
        if(currentCategory.length==0){
            return res.status(404).json({
                success:false,
                message:"No Courses present in this category",
            })
        }

        // get courses from other categories
        const otherThanCurrentCategory = await Category.find({_id:{$ne:categoryId}});
        const otherCategoryCourse = await Category.findOne(otherThanCurrentCategory[getRandomInt(otherThanCurrentCategory.length)]._id).populate({path:"course",populate:"ratingAndReviews",populate:"instructor"}).exec();

        // get top selling courses
        const topSellingCourses = await Course.find()
                                    .sort({ "studentsEnrolled" : -1 })
                                    .limit(10)
                                    .populate("instructor")
                                    .populate("ratingAndReviews")
                                    .exec();
                                
        // return response
        res.status(200).json({
            success:true,
            message:"Found category page details",
            coursesList:{
                currentCategory,otherCategoryCourse,topSellingCourses
            }
        })
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"not able to get category page details"
        })
    }
}