const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payment');
const courseRoutes = require('./routes/Course');
const contactRoutes = require('./routes/Contact');

const {dbConnect} = require('./config/database');
dbConnect();
const {cloudinaryConnect} = require('./config/cloudinary');
cloudinaryConnect();

const cookieParser = require('cookie-parser');
const cors = require('cors');  // backend access the requests made frondend, through cors
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"*",
        credentials:true
    })
)
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use("/auth",userRoutes);
app.use("/profile",profileRoutes);
app.use("/payment",paymentRoutes);
app.use("/course",courseRoutes);
app.use("/contact",contactRoutes);

// default route
app.get("/",(req,res) => {
    return res.status(200).json({
        success:true,
        message:"Server is Running..."
    });
});

app.listen(PORT,() => {
    console.log(`App is Running at PORT ${PORT}`);
})
