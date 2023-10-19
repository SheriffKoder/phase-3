
const authRouter = require("express").Router();

const authController = require("../controllers/auth");


authRouter.get("/login", authController.getLogin);

authRouter.post("/login", authController.postLogin);



module.exports = authRouter;
