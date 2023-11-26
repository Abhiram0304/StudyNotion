const express = require("express")
const router = express.Router()

const {capturePayment,verifySignature,sendPaymentSuccessfulEmail} = require('../controllers/Payment');
const {auth,isStudent,isInstructor,isAdmin} = require('../middlewares/auth');

router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifyPayment",auth,isStudent,verifySignature);
router.post("/sendPaymentSuccessfulEmail", auth, isStudent, sendPaymentSuccessfulEmail);

module.exports = router;