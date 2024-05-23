const express = require("express");

const router = express.Router();

//Import the Controller
const {contactUsController} = require("../controllers/ContactUs");


//Create a Route on hitting which the controller is called
router.post("/contact" , contactUsController);

//Export the router
module.exports = router;
