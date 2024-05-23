const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL) 
    .then(() => console.log("DB Connected Successfully"))
    .catch((err) => {
        console.log("DB connection failure");
        console.error(err);
        process.exit(1);
    })
}



