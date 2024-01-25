const express = require("express")
const router = express.Router()

const {capturePayment,verifySignature,sendPaymentSuccessEmail,buyCourseForFree} = require('../controllers/Payment');
const {auth,isStudent} = require('../middlewares/auth');

router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifyPayment",auth,isStudent,verifySignature);
router.post("/sendPaymentSuccessEmail",auth,isStudent,sendPaymentSuccessEmail);
router.post("/buyCoursesForFree",auth,isStudent,buyCourseForFree);

module.exports = router;