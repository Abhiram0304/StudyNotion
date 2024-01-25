const express = require("express")
const router = express.Router()

const {createCourse,getAllCourses,getCourseDetails,getInstructorCourses,deleteCourse,changeStatus,getFullCourseDetails} = require('../controllers/Courses');
const {createCategory,showAllCategory,getCategoryPageDetails} = require('../controllers/Category');
const {createSection,updateSection,deleteSection} = require('../controllers/Section');
const {createSubSection,updatedSubSection,deleteSubSection} = require('../controllers/SubSection');
const {createRatingAndReview,getAverageRating,getAllRatingAndReview,getStudentCourseRatingAndReview} = require('../controllers/RatingAndReview');
const {updateCourseProgress} = require('../controllers/CourseProgress');

const {auth,isStudent,isInstructor,isAdmin} = require('../middlewares/auth');

// ROUTES
router.post("/createCourse",auth,isInstructor,createCourse);
router.post("/addSection",auth,isInstructor,createSection);
router.put("/updateSection",auth,isInstructor,updateSection);
router.delete("/deleteSection",auth,isInstructor,deleteSection);
router.post("/addSubSection",auth,isInstructor,createSubSection);
router.put("/updateSubSection",auth,isInstructor,updatedSubSection);
router.delete("/deleteSubSection",auth,isInstructor,deleteSubSection);
router.get("/getAllCourses",getAllCourses);
router.post("/getCourseDetails",getCourseDetails);
router.put("/changeStatus",auth,isInstructor,changeStatus);
router.post("/getFullCourseDetails",auth,isStudent,getFullCourseDetails);
// router.post("/editCourse", auth, isInstructor, editCourse);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.delete("/deleteCourse",auth,isInstructor,deleteCourse);
router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress);

router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategory",showAllCategory);
router.post("/getCategoryPageDetails",getCategoryPageDetails);
router.post("/createRatingAndReview",auth,isStudent,createRatingAndReview);
router.post("/getAverageRating",getAverageRating);
router.post("/getReviews",getAllRatingAndReview);
router.post("/getStudentCourseRatingsAndReview",auth,isStudent,getStudentCourseRatingAndReview);

module.exports = router;