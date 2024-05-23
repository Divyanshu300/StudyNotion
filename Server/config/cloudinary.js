const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            //!    ########   Configuring the Cloudinary to Upload MEDIA ########
            cloud_name : process.env.CLOUD_NAME,
            api_key : process.env.API_KEY,
            api_secret : process.env.API_SECRET,
        })
    }
    catch(error) {
        console.log(error);
    }
}


// MAIL_HOST = smtp.gmail.com
// MAIL_USER = divyanshu30001@gmail.com
// MAIL_PASS = wseqrxxhkvzodyti

// JWT_SECRET = "Divyanshu"
// FOLDER_NAME = "WebDev"

// RAZORPAY_KEY = rzp_test_O7Xs6kPoFjJYlI
// RAZORPAY_SECRET = aSAFt2OmXXmysp6tkcUIvyJE

// CLOUD_NAME = dxo2kr9bz
// API_KEY = 354434363464364
// API_SECRET = H6C6EfjUhDO0uj7D-QoFfikRUIY

// MONGODB_URL = "mongodb+srv://pathakdivyanshu800:Kwy3374HgBTRBfAj@cluster0.lvmtpyh.mongodb.net/StudyNotionDB"
// PORT = 4000