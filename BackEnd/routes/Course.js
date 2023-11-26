const express = require("express")
const router = express.Router()

const {createCourse,getAllCourses,getCourseDetails} = require('../controllers/Courses');
const {createCategory,showAllCategory,getCategoryPageDetails} = require('../controllers/Category');
const {createSection,updateSection,deleteSection} = require('../controllers/Section');
const {createSubSection,updatedSubSection,deleteSubSection} = require('../controllers/SubSection');
const {createRatingAndReview,getAverageRating,getAllRatingAndReview,getCourseRatingAndReview} = require('../controllers/RatingAndReview');
const {updateCourseProgress} = require('../controllers/CourseProgress');

const {auth,isStudent,isInstructor,isAdmin} = require('../middlewares/auth');

// ROUTES
router.post("/createCourse",auth,isInstructor,createCourse);
router.post("/addSection",auth,isInstructor,createSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);
router.post("/addSubSection",auth,isInstructor,createSubSection);
router.post("updateSubSection",auth,isInstructor,updatedSubSection);
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);
router.get("/getAllCourses",getAllCourses);
router.get("/getCourseDetails",getCourseDetails);
// router.get("/getFullCourseDetails",getFullCourseDetails);
// router.post("/editCourse", auth, isInstructor, editCourse);
// router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// router.delete("/deleteCourse", deleteCourse);
router.post("/updateCourseProgress",updateCourseProgress);

router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategory",showAllCategory);
router.post("/getCategoryPageDetails",getCategoryPageDetails);

router.post("/createRatingAndReview",auth,isStudent,createRatingAndReview);
router.get("/getAverageRating",getAverageRating);
router.get("/getReviews",getAllRatingAndReview);

module.exports = router;