const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    console.log(process.env.MONGODB_URL)
    mongoose.connect(process.env.MONGODB_URL) 
    .then(() => console.log("DB Connected Successfully"))
    .catch((err) => {
        console.log("DB connection failure");
        console.error(err);
        process.exit(1);
    })
}



