const express = require("express");
const router = express.Router();

const {auth,isStudent, isInstructor} = require('../middlewares/auth');

const {updateProfile,deleteAccount,getAllDetails,updateDP,getEnrolledCourses,getInstructorData} = require('../controllers/Profile');

router.delete("/deleteProfile",auth,deleteAccount);
router.put("/updateProfile",auth,updateProfile);
router.get("/getAllDetails",auth,getAllDetails);
router.put("/updateDisplayPicture",auth,updateDP);
router.get("/getEnrolledCourses",auth,isStudent,getEnrolledCourses);
router.get("/instructorDashboard",auth,isInstructor,getInstructorData);

module.exports = router;