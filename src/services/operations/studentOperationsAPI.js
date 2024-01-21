import toast from 'react-hot-toast';
import {studentEndpoints} from '../APIs';
import { APIconnector } from '../APIconnector';
import logo from '../../assets/Logo/rzp_logo.png';
import {resetCart} from '../../reducer/slices/cartSlice';
import { setPaymentLoading } from '../../reducer/slices/courseSlice';

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,PAYMENT_SUCCESS_EMAIL} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export const buyCourse = async (coursesId,userDetails,navigate,dispatch,token) => {
    const toastId = toast.loading("Loading...");
    try{
        // load the script
        const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!response){
            toast.error("Cant Access RazorPay");
            return;
        }

        // // initiate the order
        const orderResponse = await APIconnector("POST",COURSE_PAYMENT_API,{coursesId},{Authorization : `Bearer ${token}`})
        if(!orderResponse){
            throw new Error(orderResponse?.data?.message);
        }

        const options = {
            key : process.env.RAZORPAY_KEY,
            currency : orderResponse?.data?.paymentResponse?.currency,
            amount : `${orderResponse?.data?.paymentResponse?.amount}`,
            order_id : orderResponse?.data?.paymentResponse?.id,
            name : "StudyNotion",
            description : "Thank You for Purchasing the course",
            image : logo,
            prefill : {
                name : `${userDetails?.firstName} ${userDetails?.lastName}`
            },
            handler : function(response){
                // send payment success email
                SendPaymentSuccessfulEmail(response,orderResponse?.data?.paymentResponse?.amount,token);
                
                // verify payment
                VerifyPayment({...response,coursesId},token,navigate,dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", (response) => {
            toast.error("OOPs... Payment Failed");
            console.log(response.error);
        })
    }catch(e){
        console.log(e);
        toast.error("Payment UnsuccessFul");
    }
    toast.dismiss(toastId);
}

const SendPaymentSuccessfulEmail = async (response,amount,token) => {
    try{
        await APIconnector("POST",PAYMENT_SUCCESS_EMAIL,{orderId:response?.razorpay_order_id,paymentId:response?.razorpay_payment_id,amount},{Authorization:`Bearer ${token}`});
    }catch(e){
        throw new Error(e);
    }
}

const VerifyPayment = async (bodyData,token,navigate,dispatch) => {
    const toastId = toast.loading("Verifying Payment...");
    await dispatch(setPaymentLoading(true));
    try{
        const response = await APIconnector("POST",COURSE_VERIFY_API,bodyData,{Authorization : `Bearer ${token}`});
        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }
        toast.success("Payment successful, You are enrolled into the course");
        navigate("/dashboard/enrolledCourse");
        await dispatch(resetCart());
    }catch(e){
        console.log(e);
    }
    toast.dismiss(toastId);
    await dispatch(setPaymentLoading(false));
}