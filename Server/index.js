//Import Express
const express = require("express");
const app = express();

//Import Database to connect
const database = require("./config/database");
database.connect()

//Import Cloudinary to connect
const {cloudinaryConnect} = require("./config/cloudinary");

//Import all Routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoutes = require("./routes/Contact");

//Import Dotenv for accessing env file
const dotenv = require("dotenv");
dotenv.config();
    const PORT = process.env.PORT || 4000;

//Import Cookie-Parser
const cookieParser = require("cookie-parser");

//Hmm chahte hai ki hmaara backend jo hai woh frontend ki request ko entertain kreee uske liye we need cors
const cors = require("cors");

//Hme images upload krni h ya videos upload krni hai uske liye we need file upload
const fileUpload = require("express-fileupload");

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin : "http://localhost:3000", //frontend se jitni bhi request aa rhi h unko entertain krna hai issliye we write this
        credentials : true, 
    })
)
app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : "/tmp",
        createParentPath: true,
    })
)
//fileUpload set krne ke baad hi cloudinary connect hoga
cloudinaryConnect();

//Routes ko mount kroo
app.use("/api/v1/auth" , userRoutes);
app.use("/api/v1/profile" , profileRoutes);
app.use("/api/v1/course" , courseRoutes);
app.use("/api/v1/payment" , paymentRoutes);
app.use("/api/v1/reach" , contactUsRoutes);

//Default Route
app.get("/" , (req , res) => {
    return res.json({
        success : true,
        message : "Your Server is Up and Running...."
    });
});


//Activate your server
app.listen(PORT , () => {
    console.log(`App is running at ${PORT}`)
});