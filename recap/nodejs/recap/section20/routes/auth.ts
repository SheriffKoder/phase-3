import { UserClassModel } from "../models/user";

const authRouter = require("express").Router();

const authController = require("../controllers/auth");

//11
const {check, body} = require("express-validator");


authRouter.get("/login", 
[
    // //loginEmailOrPhone can be any combination of inputs (phone or email) that will be already checked in the controller
    // body("loginEmailOrPhone")
    // .isEmail()
    // .withMessage("Please enter a valid email address")
    // .normalizeEmail(),
    body("loginPassword", "Password has to be at least 8 characters")
    .isLength({min:8})
    .isAlphanumeric()
    .trim()

],authController.getLogin);

authRouter.post("/login", authController.postLogin);

authRouter.post("/logout", authController.postLogout);

//10.2
authRouter.get('/signup', authController.getSignUp);
authRouter.post('/signup', 
[

    body("signUpFullName")
    .notEmpty()
    .trim()
    .isString() //isString allows white spaces
    .matches(/^([a-zA-Z]{3,15})\s([a-zA-Z]{3,15})\s?([a-zA-Z]{3,15})?$/)
    .withMessage("full name should consist of two or three separated names each more than 3 alphabetic characters")
    ,

    
    check("signUpEmail")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (value: string) => {
        const user = await UserClassModel.findOne({email: value})
    
        if (user) {
            console.log("this email is already associated with another account");
            return Promise.reject("this email is already associated with another account");
        }
    })
    .normalizeEmail()
    ,


    body("signUpPhoneNumber")
    .isLength({min:10})
    .isNumeric()
    .trim()
    .withMessage("the phone number should be 10 digits excluding the country code")
    ,

    body("signUpPassword")
    .isLength({min:8})
    .isAlphanumeric()
    .trim()
    

],authController.postSignUp);

//10.2
authRouter.get("/reset", authController.getReset);
authRouter.post("/reset", authController.postReset);

//10.2
authRouter.get("/reset/:token", authController.getNewPassword);
authRouter.post("/new-password/", authController.postNewPassword);





module.exports = authRouter;
