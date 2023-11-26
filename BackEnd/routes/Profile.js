const express = require("express");
const router = express.Router();

const {auth,isStudent} = require('../middlewares/auth');

const {updateProfile,deleteAccount,getAllDetails,updateDP,getEnrolledCourses} = require('../controllers/Profile');

router.delete("/deleteProfile",auth,deleteAccount);
router.put("/updateProfile",auth,updateProfile);
router.get("/getAllDetails",auth,getAllDetails);
router.put("/updateDisplayPicture",auth,updateDP);
router.get("/getEnrolledCourses",auth,getEnrolledCourses);

module.exports = router;