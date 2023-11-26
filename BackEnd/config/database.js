const mongoose = require('mongoose');
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch((e) => {
        console.log("DB Connection UnsuccessFul");
        console.error(e);
        process.exit(1);
    });
};