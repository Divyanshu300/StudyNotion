const {contactUsEmail} = require("../mail/templates/ContactFormRes");
const mailSender = require("../utils/mailSender");

exports.contactUsController = async(req , res) => {
    const {email , firstname , lastname , message , phoneNo , countrycode} = req.body
    console.log("Contact US Controller: ",req.body);

    try {
        const emailRes = await mailSender(
            email,
            "Your Data Sent Successfully",
            contactUsEmail(email , firstname , lastname , message , phoneNo , countrycode),
        )

        console.log("Email Res: " , emailRes);
        return res.json({
            success : true,
            message : "Email Sent Successfully"
        })
    }
    catch(error) {
        console.log("Error: ",error);
        console.log("Error Message: ",error.message);
        res.json({
            success : false,
            message : "Something went wrong..."
        })
    }
}