
const ProductClassModel = require("../models/product.js");
const Cart = require("../models/cart.js");
const { products } = require("../routes/admin");


/* ////////////////////////// all products ////////////////////////// */

exports.getProducts = (req, res, next) => {

    //Sequelize (2)
    ProductClassModel.findAll()
    .then((products)=>{
        res.render("shop/index.ejs", {prods: products, myTitle: "Shop page", path:"/"});
    })
    .catch((err) => {
        console.log(err);
    });

};


/* ////////////////////////// product details ////////////////////////// */

exports.getProduct = (req, res, next) => {
    
    const prodId = req.params.productId;

    //mySQL
    //use [0] because the returned value is an "array" with the product inside it
    ProductClassModel.findByPk(prodId)
    .then((product) => {
        res.render("shop/product-details", { product: product, myTitle: product.title, path: "/products"});
    })
    .catch((err) => {
        console.log(err);
    });

};



/* ////////////////////////// main page ////////////////////////// */

exports.getIndex = (req, res, next) => {

    //Sequelize (2)
    ProductClassModel.findAll()
    .then((products)=>{
        res.render("shop/index.ejs", {prods: products, myTitle: "Shop page", path:"/"});
    })
    .catch((err) => {
        console.log(err);
    });



}



/* ////////////////////////// /////////// ////////////////////////// */
/* //////////////////////////    Cart    ////////////////////////// */


exports.getCart = (req, res, next) => {

    Cart.getCart(cart => {

        ProductClassModel.fetchAll(products => {

            const cartProducts = [];

            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
            
                if (cartProductData) {
                    cartProducts.push({"productData": product, "qty": cartProductData.qty});
                }
                
            }


            res.render("shop/cart", {
                path: "/cart",
                myTitle: "Your Cart",
                products: cartProducts
            });

        });

    });

};


exports.postCart = (req, res, next) => {

    const prodId = req.body.productId;

    ProductClassModel.findMyId(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });

    res.redirect("/cart");

}


exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    ProductClassModel.findMyId(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect("/cart");
    })

}



/* //////////////////////////    Other    ////////////////////////// */


exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        path: "/checkout",
        myTitle: "Checkout"
    });
};


exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        path: "/orders",
        myTitle: "Your Orders"
    });
};

