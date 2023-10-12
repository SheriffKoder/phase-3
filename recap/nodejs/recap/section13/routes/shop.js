
const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop.js");

// router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);


//7
router.post("/cart", shopController.postCart);
router.post("/changeQuantity", shopController.changeQuantity);


//7
router.get("/cart", shopController.getCart);


module.exports = router;