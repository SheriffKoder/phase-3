"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const product_1 = require("../models/product");
const ITEMS_PER_PAGE = 2;
const ORDERS_PER_PAGE = 2;
exports.getProducts = (req, res, next) => {
    //12.2
    let page;
    if (req.query.page) {
        page = +req.query.page;
    }
    else {
        page = 1;
    }
    let totalItems;
    //12.2
    product_1.ProductClassModel.find().countDocuments()
        .then((numProducts) => {
        totalItems = numProducts;
        //page 1 1-1 * 2 = skip 0, limit 2 -- get 0-2
        //page 2 2-1 * 2 = skip 2, limit 2 -- get 2-4
        //page 3 3-1 * 2 = skip 4, limit 2 -- get 4-6
        return product_1.ProductClassModel.find()
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
    })
        .then((products) => {
        res.render("shop/all-products.ejs", {
            prods: products,
            myTitle: "All Products Page",
            // isAuthenticated: req.isLoggedIn  //cookies //9.1
            // isAuthenticated: req.session.isLoggedIn //sessions //9.2
            //give the view-page these properties to display to user
            currentPage: page,
            totalProducts: totalItems,
            //2 * page (1) < have 4 products .. true
            hasNextPage: (ITEMS_PER_PAGE * page) < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            //ceil makes 5.5 = 6, 11/2 = 6 not 5.5
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        });
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    let starFunction = (rating) => {
        if (rating > 5 && rating < 0) {
            return "none";
        }
        else if (rating >= 0 && rating <= 5) {
            const arr = ["none", "two", "three", "four", "five"];
            const x = rating.toString().split(".")[0];
            const y = rating.toString().split(".")[1];
            //rating 4.7
            //4 will be "four"
            //7 will be "half" , 2 will be ""
            const a = arr[+x];
            const b = (+y >= 5) ? "half" : "";
            return a + "" + b;
        }
    };
    product_1.ProductClassModel.findById(prodId)
        .populate("userId", "name") //6
        .then((product) => {
        if (product) {
            res.render("shop/product-details", {
                product: product,
                myTitle: product.title,
                starFunction: starFunction,
                // isAuthenticated: req.isLoggedIn  //cookies //9.1
                isAuthenticated: req.session.isLoggedIn //sessions //9.2
            });
        }
    })
        .catch((err) => {
        console.log(err);
    });
};
//7.b
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    const requestedCount = req.body.requestedCount;
    const increaseQtyAction = true;
    const changeQtyAction = false;
    product_1.ProductClassModel.findById(prodId)
        .then(product => {
        if (product) {
            return req.user.addToCart(product, requestedCount, increaseQtyAction, changeQtyAction);
        }
    })
        .then(result => {
        console.log("product added to cart");
        console.log(requestedCount);
        // res.redirect("/");
    })
        .catch(err => {
        console.log(err);
    });
};
//7
exports.getCart = (req, res, next) => {
    req.user
        .populate("cart.items.productId") //populate the id with all the item's data from the product model
        .then((user) => {
        const products = user.cart.items;
        console.log(products);
        res.render("shop/cart", {
            products: products,
            myTitle: "Your Cart",
            // isAuthenticated: req.isLoggedIn  //cookies //9.1
            // isAuthenticated: req.session.isLoggedIn //sessions //9.2
        });
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.changeQuantity = (req, res, next) => {
    const prodId = req.body.productId;
    const requestedCount = req.body.requestedCount;
    const increaseQtyAction = false;
    const changeQtyAction = true;
    product_1.ProductClassModel.findById(prodId)
        .then(product => {
        if (product) {
            return req.user.addToCart(product, requestedCount, increaseQtyAction, changeQtyAction);
        }
    })
        .then(result => {
        console.log("product quantity updated to cart");
        // console.log(requestedCount);
        res.redirect("back");
    })
        .catch(err => {
        console.log(err);
    });
};
//7.d
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.removeFromCart(prodId)
        .then(result => {
        res.redirect("back");
    })
        .catch(err => {
        console.log(err);
    });
};
//8
const order_js_1 = require("../models/order.js");
exports.postOrder = (req, res, next) => {
    if (req.user) {
        req.user
            .populate("cart.items.productId")
            .then(user => {
            //to make the map method work
            if (Array.isArray(user.cart.items)) {
                const products = user.cart.items.map((item) => {
                    //using the spread operator and a special function 
                    //._doc to access just the data without meta data and pull out all the product data into a new object
                    return { quantity: item.quantity, product: Object.assign({}, item.productId._doc) };
                });
                //Generate required data info
                const today = new Date();
                const Year = today.getFullYear();
                let Month = today.getMonth();
                let Day = today.getDate();
                if (Day < 10)
                    Day = +('0' + Day);
                const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                //Generate required total cost info
                let totalCost1 = 0;
                if (Array.isArray(user.cart.items)) {
                    user.cart.items.forEach((item) => {
                        totalCost1 = totalCost1 + (item.productId.price * item.quantity);
                    });
                }
                const order = new order_js_1.OrderClassModel({
                    user: {
                        email: req.user.email,
                        name: req.user.name,
                        userId: req.user
                    },
                    products: products,
                    date: { Day: Day, Month: monthName[Month], Year: Year },
                    totalCost: totalCost1,
                    deliveredDate: { Day: Day, Month: monthName[Month], Year: Year },
                    deliveredMethod: "Handed off directly to a resident"
                });
                return order.save();
            }
        })
            .then(() => {
            req.user.clearCart();
        })
            .then(() => {
            res.redirect("/orders");
        })
            .catch((err) => {
            console.log(err);
        });
    }
};
exports.getOrders = (req, res, next) => {
    let page;
    if (req.query.page) {
        page = +req.query.page;
    }
    else {
        page = 1;
    }
    let totalOrders;
    //get all orders that belong to that user
    order_js_1.OrderClassModel.find({ "user.userId": req.user._id })
        .countDocuments()
        .then((numOrders) => {
        totalOrders = numOrders;
        //page 1 1-1 * 2 = skip 0, limit 2 -- get 0-2
        //page 2 2-1 * 2 = skip 2, limit 2 -- get 2-4
        //page 3 3-1 * 2 = skip 4, limit 2 -- get 4-6
        return order_js_1.OrderClassModel.find({ "user.userId": req.user._id })
            .skip((page - 1) * ORDERS_PER_PAGE)
            .limit(ORDERS_PER_PAGE);
    })
        .then(orders => {
        res.render("shop/orders", {
            orders: orders,
            myTitle: "Your Orders",
            // isAuthenticated: req.isLoggedIn  //cookies //9.1
            // isAuthenticated: req.session.isLoggedIn //sessions //9.2
            //give the view-page these properties to display to user
            currentPage: page,
            totalOrders: totalOrders,
            //2 * page (1) < have 4 products .. true
            hasNextPage: (ORDERS_PER_PAGE * page) < totalOrders,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            //ceil makes 5.5 = 6, 11/2 = 6 not 5.5
            lastPage: Math.ceil(totalOrders / ORDERS_PER_PAGE)
        });
    })
        .catch(err => {
        console.log(err);
    });
};
//12.1
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
exports.getInvoice = (req, res, next) => {
    const orderId = req.params.orderId;
    order_js_1.OrderClassModel.findById(orderId)
        .then((order) => {
        if (order) {
            if (order.user[0].userId.toString() !== req.user._id.toString()) {
                const error = new Error("Not Authorized");
                error.code = 403;
                //throw error - for sync, return next for async then/catch
                return next(error);
            }
            //create pdf and write to pc
            const invoiceName = "invoice-" + orderId + ".pdf";
            const invoicePath = path.join("data", "invoices", invoiceName);
            const pdfDoc = new PDFDocument();
            ////declare file name
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `inline; filename="+${invoiceName}+"`);
            ////declare file paths
            //path to writeStream where want to write
            //also get stored on the server files + served to client
            pdfDoc.pipe(fs.createWriteStream(invoicePath));
            //return/serve to client
            pdfDoc.pipe(res);
            //now when adding anything to the document
            //will be forwarded to this file path/name and res
            ////////////////////////////////////////////////////
            ////write the pdf
            pdfDoc.fontSize(26).text("Invoice", { underline: true });
            pdfDoc.fontSize(14).text("---------------------------");
            //write each product to file with incrementing the total price
            let totalPrice = 0;
            order.products.forEach((prod) => {
                totalPrice = totalPrice + (prod.quantity * prod.product.price);
                pdfDoc.fontSize(14).text(prod.product.title +
                    " - " +
                    prod.quantity +
                    " x " +
                    "$" +
                    prod.product.price);
            });
            //end of loop
            pdfDoc.fontSize(14).text("---------------------------");
            pdfDoc.fontSize(18).text("Total Price : $" + totalPrice);
            pdfDoc.end();
            ////////////////////////////////////////////////////
        }
        else if (!order) {
            //11
            const error = new Error("No order found");
            error.code = 404;
            //throw error - for sync, return next for async then/catch
            return next(error);
        }
    })
        .catch((err) => {
        //next an error to use the default error handling function
        next(err);
    });
};
