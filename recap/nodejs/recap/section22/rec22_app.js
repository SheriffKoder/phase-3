"use strict";
//npm init
//npm install --save express body-parser mongodb ejs
//npm install --save mongoose
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// # npm install --save dotenv
// # npm install typescript --save-dev
// # tsc --init //create ts config
// //@types package for the validation library
// # npm install --save-dev @types/node @types/express @types/mongoose @types/body-parser
// in the TS config file
// add "moduleResolution": "node" below "module": "commonjs"
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const express = __importDefault(require("express"));
// require("dotenv").config();
// > replace values with process.env.variableName
// npm install --save express-session //9.2
// npm install --save connect-mongodb-session
// npm install --save @types/express-session    //for TS
//10
// npm install --save bcryptjs     //10 //hash passwords
// npm install --save csurf        //10 //compare ejs session token with server
// npm install --save connect-flash    //10 //send messages to ejs
// npm install --save @types/connect-flash //TS
// npm install --save @types/csurf
//10.2
// npm install --save nodemailer
//11
// npm install --save express-validator
//12
// npm install --save multer
// npm install --save @types/multer
//12.1
//# npm install --save pdfkit
//module imports
require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
// const User = require("./models/user");  //6
const user_1 = require("./models/user");
//public directory
app.use(express.static(path.join(__dirname, "public")));
//12
app.use("/images", express.static(path.join(__dirname, "images"))); //(20.0.5)
//10
const csrf = require("csurf");
const flash = require("connect-flash");
//12 -- multer start ////////////////////////////////
const multer_1 = __importDefault(require("multer"));
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        //null (store image in case of an error?), images(fs folder)
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        console.log(file);
        //null, we are fine store it please
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    //mimetype, type of file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
        //true: want to accept these files
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
//"image" as the ejs name
//multer will turn the buffer into binary data, then store it
//"storage" gives more configuration than the "dest"
app.use((0, multer_1.default)({ storage: fileStorage, fileFilter: fileFilter }).single("productImage"));
//12 -- multer end ////////////////////////////////
/////////////////////////////////////////////////
////Sessions //9
// const session = require("express-session");
const express_session_1 = __importDefault(require("express-session"));
const mongoDBStore = require("connect-mongodb-session")(express_session_1.default);
const store = new mongoDBStore({
    uri: process.env.MongoDbUri,
    collection: "sessions"
});
//10
const csrfProtection = csrf();
//flash needs to be initialized, after the session
app.use(flash());
//secret: key
//re-save: re-save on every request, false for only when something changes - for better performance
//saveUninitialized; false for no session save for no changes requests
//can configure the session cookie for maxAge, expires
//can add cookie related configuration ,cookie {..}
app.use((0, express_session_1.default)({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
}));
//10
app.use(csrfProtection);
/////////////////////////////////////////////////
//12
//set the templating engine
app.set("view engine", "ejs");
app.set("views", "views");
//Routes
const adminJSRoutes = require("./routes/admin.js");
const shopJSRoutes = require("./routes/shop");
const authJSRoutes = require("./routes/auth");
////////////////////end of TS//////////
/////////////////////////////////////////////////
//pass a user and session //9.2
app.use((req, res, next) => {
    if (!req.session.user) {
        console.log("not logged in");
        return next();
    }
    user_1.UserClassModel.findById(req.session.user._id)
        .then(user => {
        console.log("logged in");
        if (user) {
            console.log("user found");
            req.user = user;
            res.locals.user = req.user;
        }
        next();
    }).catch(err => {
        // console.log(err);
        const error = new Error(err);
        error.code = 500;
        //throw error - for sync, return next for async then/catch
        return next(error);
    });
});
//10
//after the middleware that extracts our user
//but before our routes
////for every request that will be executed
//these two fields will be set for the views that are rendered
app.use((req, res, next) => {
    //a special feature/field provided by express js
    //locals allows to set local variables that are passed 
    //into the views which are rendered
    //isLoggedIn is set to true on a successful login
    //and isAuthenticated checked in is-auth.js before each routing
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    //call next so we are able to continue
    next();
});
/////////////////////////////////////////////////
//pass a user and cookies //9.1
/*
app.use((req: Request_With_reqUser, res: Response, next: NextFunction) => {                   //6
    UserClassModel.findById("652725974ad26fc2ae8f8433")
    .then(user => {
        if (user) {
            req.user = user;

            /////////////////////////////////////////
            //using cookies sec14.1 //9
            //// res.setHeader("Set-Cookie", "isLoggedIn=True");
            let myCookies = req.get("Cookie");  //cookies in a string format separated by spaces
            // console.log(typeof myCookies);
            let myCookies2 = myCookies?.split(" "); //an array of cookies of "isLogged=value"
            // console.log(myCookies2);
            let myCookies3 = myCookies2?.filter((cookie: string) => {   //take the valid cookies out
                return ((cookie.split("=")[0] === "isLoggedIn") && (cookie.split("=")[1] === "True"));
            });

            let final_final_Cookie;
            //get the value from the cookies (all?)
            let finalCookie = myCookies3?.forEach((cookie: string) => {
                final_final_Cookie = cookie.split("=")[1];
            });

            // console.log(final_final_Cookie);
            if (final_final_Cookie) {
                req.isLoggedIn = true;
            } else {
                req.isLoggedIn = false;
            }
            /////////////////////////////////////////
            //cookie is set in the auth controller postLogin



            next();
        }
    })
    .catch(err => {
        console.log(err);
    })
})
*/
app.use(shopJSRoutes);
app.use("/admin", adminJSRoutes);
app.use(authJSRoutes);
//404 page
const errorController = require("./controllers/errorController.js");
//render this in case of get, not when any route fails
app.get("/500", errorController.get500);
app.use(errorController.get404);
mongoose.connect(process.env.MongoDbUri)
    .then(() => {
    //6
    //gives back the first user it finds
    // UserClassModel
    // .findOne()
    // .then(user => {
    //     if (!user) {
    //         //TS: HydratedDocument<IUser> represents a hydrated Mongoose document, with methods, virtuals, and other Mongoose-specific features.
    //         //to allow use populate with IUser
    //         const user: HydratedDocument<IUser> = new UserClassModel({
    //             name: "Sheriff",
    //             email: "Sheriff@email.com",
    //             seller: true,
    //             UserRating: 0,
    //             cart: {
    //                 items: []
    //             }
    //         })
    //         user.save();
    //     }
    // });
    app.listen(3000);
})
    .catch((err) => {
    console.log("mongoose connect error :: " + err);
});
//Async js requests //13
/*


//Async js requests //13 +1.5h

till now we send requests to the server only as a client
sometimes we want to send requests from the backend

example,
want to delete an item from the server,
(a js code to remove it from dom)
without reloading the page

//the idea behind async requests:
sending a request that contains just "some data"
in a special format of "JSON"

data sent to server > to a certain url or a route accepted by the server
then the server reacts and returns a response

that response is also sent behind the scenes
a response in a json format

once we are done with deleting
the server will respond with some json data or a success message
once we get that message in our browser
we can delete the item from the DOM


send to the server a request(JSON)
then async/await on the response(JSON)

the way we expose our route will be different here
it will contain login

server side script:
>> create public/js/admin.js
>> add a script link in the ejs in admin-products.ejs

listen on a click on the delete button
>>button type=button, so will also remove the form wrap

with the x-www-form-encoded-data
and gather the inputs from ejs manually (productId, csrfToken)





///////////////////////////////////////////////////////////////////
//The JSON Format

just like a js object
but with two important differences
1) all the keys have to be wrapped in ""
2) key values can be nested objects and arrays

{
    "name": "your name",
    "age": 29,
    "active": true
    courses: ["node-js", "react"],
    profile: { "joined: 2017-05-21", "courses": 2}
}



- work on the ejs
    <button onclick="deleteProduct(this)" type="button" class="white-button-admin" aria-label="control, delete product"><a>Delete</a></button>                      <!-- <button type="submit" class="white-button-admin" aria-label="control, delete product"><a>Delete</a></button> -->
    <script src="/public/js/admin-async.js"></script>
- router
    adminRouter.delete("/product/:productId", isAuthAdmin, adminController.deleteProduct);
- controller
        change req.body.prodId to req.params.prodId
        res.status(200).json({
            "message": "Success!"
        });
- add the admin-async.js
    get the prodId, csrfToken of the elements near this button node
    open a fetch method that refers to the prodId and has csrfToken in the header
    then (promise resolved), .json the result(response body) and then delete the item from dom



// create public/js/admin.js
- fist will test with a console.log onclick

>> using btn.parentNode.querySelector("[name=productId]").value
we can access the dom element's value

want to send a http request to the router from inside our public js/admin.js
we will use the fetch method supported by the browser
we will not send json as we still did not use a json parser in app.js

//btn.closest
access the button's parent




// ejs
>> add a script link in the ejs in admin-products.ejs
>>button type=button, so will also remove the form wrap


// routes admin.js
change the route verb from router.post to router.delete
change the postDeleteProduct to deleteProduct
keep the isAuth

// admin.js controller
change the postDeleteProduct controller to deleteProduct
change req.body to req.params
same logic
will change the response returned
> we will not return a response with a redirect
> will return a response with json data

//check app.js



//so what else we can use an Async request on ?
- quantity ..






*/
//Payments
/*

Payments with stripe
take input
verify input
charge card, make payment,
process order

stripe sends back a confirmation token to the node app
we send a charge object to stripe



////stripe
site > developers tab > test key API
make a name, click new business at top left

>> grow your online business with payments > read the docs
this will take us to the stripe documentation
https://strp.com/docs/payments
there you can learn about all the different ways of collecting payments



//ejs
cart order now href to /checkout
checkout.ejs

on the docs page > web tab > integrate strp js tab
however new site is
strp.com/docs/payment/quickstart
at (3) copy
    <script src="https://js.strp.com/v3/"></script>
    and the provided test api key
    const strp = strp("......");

>> in the checkout.ejs
create a div
place that script tag and a button

> and in another script tag
place the api key
on button click use strp.redirectToCheckout
which asks for sessionId in its passed object
now we want the session



//controller shop.js
add getCheckout controller
to display the the cart products and total price (like the invoice)

to prepare a strp session to send to the ejs
install strp # npm install --save strp
"import" with secret key

> in the getCheckout .then
return the "stripe".checkout.sessions.create({config})
and place the render in another then which receives the session

> do the session config
payment method, mapped items into a array of objects, urls for success/cancel

> cancel will use getOrder controller
>> create getCheckoutSuccess in shop.js controller
which is the same as postOrder




//route shop.js
add route to checkout
>> create routes for success/cancel urls



as users could directly access the success_url without paying
instead of "After the payment" page, you have to fulfill a payment

using "fulfilling purchases with webhooks"
where strp sends a request to a url of your choice
which you have to manage in your application with routing/controlling
and that then tells you that the order succeeded
because stripe sends you that request behind the scenes
a request validated by stripe not easy to fake
but it requires a website hosted on the internet


//13.1

////get the stripe secret key from the site

//// controller
populate the user's cart.items.productId
iterate over the user.cart.items to get the total price
create a stripe.session
        define success/cancel redirection
then render the checkout page with sessionId of the returned session.id

rename the postOrder controller to getCheckoutSuccess
to use it in the router on stripe success


//// routers
remove post /create-order
add /checkout, /checkout/success, /checkout/cancel

as we used /checkout will use this link in the cart checkout link
and the checkout will create the order instead


////ejs
cart link





*/ 
