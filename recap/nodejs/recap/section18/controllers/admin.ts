// const mongodb = require("mongodb");

// const ProductClassModel = require("../models/product.js");

import { ProductClassModel } from '../models/product';
import { IUserWithMethods } from '../models/user';
import {Request, Response, NextFunction} from 'express';
import { IUser, UserClassModel } from '../models/user';


//11
const { validationResult } = require("express-validator");


//to use req.user and isLoggedIn
interface Request_With_reqUser extends Request {
    user: IUserWithMethods;
    isLoggedIn: boolean;
}

//to use isLoggedIn on req.session
declare module 'express-session' {
    interface SessionData {
        isLoggedIn: boolean;
    }
}

//11
interface Error_With_Status extends Error {
    code: number;
}



exports.getAddProduct = (req: Request_With_reqUser, res: Response, next: NextFunction) => {

    res.render("admin/edit-product",
    {
        myTitle: "Add a Product",
        path: "/admin/add-product",
        editing: false, //editing passed variable for form action=""
        // isAuthenticated: req.isLoggedIn  //cookies //9.1
        // isAuthenticated: req.session.isLoggedIn //sessions //9.2

    });

};

exports.postAddProduct = (req: Request_With_reqUser, res: Response, next: NextFunction) => {
    
    
    const title = req.body.productTitle;
    const price = req.body.productPrice;
    const imageUrl =  req.body.productImage;
    // const imageAlt = req.body.productImageAlt;
    const availability = req.body.productAvailability;

    let deliveryFees: boolean = false;
    (req.body.productFreeDelivery === "included") ? deliveryFees = false : deliveryFees = true;

    const notesIntro = req.body.productIntro;
    const notesDescription = req.body.productDescriptionText;
    const notesFeature1 = req.body.productFeature1;
    const notesFeature2 = req.body.productFeature2;
    const notesFeature3 = req.body.productFeature3;

    const age =  req.body.productAge;
    const department = req.body.productDepartment;
    //can i have two inputs with the same name of section in ejs ?
    let department_section: string = req.body.productSection_Electronics;
    (req.body.productSection_Electronics) ? department_section = req.body.productSection_Electronics : department_section = req.body.productSection_Clothing;

    const brand =  req.body.productBrand;
    const model = req.body.productModel;
    const type = req.body.productType;
    const color = req.body.productColor;
    const tech = req.body.productTechnology;
    const specialFeature = req.body.productSpecialFeature;
    const components = req.body.productComponents;
    const material = req.body.productMaterial;

    const country = req.body.productCountry;
    const modelNumber = req.body.productModelNumber;
    const weight = req.body.productWeight;
    const serial = req.body.productSerial;
    const size = { 
        length: req.body.productSizeLength,  
        height: req.body.productSizeHeight, 
        width: req.body.productSizeWidth
    };

    // const ratingScore = 0;
    // const ratingCount = 0;
    // const prevPrice = 0;
    // const Sold = 0;


    //11
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render("admin/edit-product",
        {
            myTitle: "Add a product",
            editing: false,
            hasError: true,
            product: {
                title : title,
                price : price ,
                imageUrl : imageUrl,
                // imageAlt = imageAlt;
                availability : availability,
                deliveryFees : deliveryFees,
    
                notesIntro : notesIntro,
                notesDescription : notesDescription,
                notesFeature1 : notesFeature1,
                notesFeature2 : notesFeature2,
                notesFeature3 : notesFeature3,
    
                age : age,
                department : department,
                department_section : department_section,
    
                brand : brand,
                model : model,
                type : type,
                color : color,
                tech : tech,
                specialFeature : specialFeature,
                components : components,
                material : material,
    
                country : country,
                modelNumber : modelNumber,
                weight : weight,
                serial : serial,
                size : size,
    
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }


    

    const product = new ProductClassModel(
        {
            title: title,
            price: price,
            imageUrl: imageUrl,
            // imageAlt: imageAlt,
            availability: availability,
            deliveryFees: deliveryFees,

            notesIntro: notesIntro,
            notesDescription: notesDescription,
            notesFeature1: notesFeature1,
            notesFeature2: notesFeature2,
            notesFeature3: notesFeature3,

            age: age,
            department: department,
            department_section: department_section,

            brand: brand,
            model: model,
            type: type,
            color: color,
            tech: tech,
            specialFeature: specialFeature,
            components: components,
            material: material,

            country: country,
            modelNumber: modelNumber,
            weight: weight,
            serial: serial,
            size: size,

            ratingScore: 0,
            ratingCount: 0,
            prevPrice: 0,
            sold: 0,

            userId: req.user._id,   //6


        }
    );


    product.save()
    .then((result: Object) => {
        console.log("product created");
        // console.log("result");

        UserClassModel.findById(req.user._id)
        .then(user => {
            if (user) {
                if (user.seller === false) {
                    user.seller = true;
                    return user.save();
                }
            }
        })
    })
    .then(() => {
        console.log("user is now a seller");
        res.redirect("/admin/products");
    })
    .catch((err) => {
        // console.log(err);
        //11
        const error = new Error(err) as Error_With_Status;
        error.code = 500;
        //throw error - for sync, return next for async then/catch
        return next (error);
        
    });

    
    
};




exports.getAdminProducts = (req: Request_With_reqUser, res: Response, next: NextFunction) => {
    // ProductClassModel.find()
    ProductClassModel.find({userId: req.user._id})
    .then((products) => {
        res.render("admin/admin-products.ejs", 
        {
            prods: products, 
            myTitle: "Your Items",
            // isAuthenticated: req.isLoggedIn  //cookies //9.1
            // isAuthenticated: req.session.isLoggedIn //sessions //9.2
        });

    })
    .catch((err)=> {
        // console.log(err);
        //11
        const error = new Error(err) as Error_With_Status;
        error.code = 500;
        //throw error - for sync, return next for async then/catch
        return next (error);
    })
};


exports.getEditProduct = (req: Request_With_reqUser, res: Response, next: NextFunction) => {

    const editMode = req.query.edit;

    if (!editMode || editMode === "false") {
        return res.redirect("/admin/admin-products");
    }

    const prodId = req.params.productId;



    ProductClassModel.findById(prodId)
    .then((product) => {
        if (!product) {
            console.log("product does not exist to be edited");
            return res.redirect("/admin/admin-products");
        }
        res.render("admin/edit-product", { 
            product: product, 
            myTitle: "Edit "+product.title, 
            editing: editMode,         
            // isAuthenticated: req.isLoggedIn  //cookies //9.1
            // isAuthenticated: req.session.isLoggedIn //sessions //9.2
    })
    })
    .catch((err) => {
        // console.log(err);
        //11
        const error = new Error(err) as Error_With_Status;
        error.code = 500;
        //throw error - for sync, return next for async then/catch
        return next (error);
    });


};


exports.postEditProduct = (req: Request_With_reqUser, res: Response, next: NextFunction) => {
    
    const prodId = req.body.productId;
    const title = req.body.productTitle;
    const price = req.body.productPrice;
    const imageUrl =  req.body.productImage;
    const availability = req.body.productAvailability;

    let deliveryFees: boolean = false;
    (req.body.productFreeDelivery === "included") ? deliveryFees = false : deliveryFees = true;

    const notesIntro = req.body.productIntro;
    const notesDescription = req.body.productDescriptionText;
    const notesFeature1 = req.body.productFeature1;
    const notesFeature2 = req.body.productFeature2;
    const notesFeature3 = req.body.productFeature3;

    const age =  req.body.productAge;
    const department = req.body.productDepartment;

    let department_section: string = req.body.productSection_Electronics;
    (req.body.productSection_Electronics) ? department_section = req.body.productSection_Electronics : department_section = req.body.productSection_Clothing;


    const brand =  req.body.productBrand;
    const model = req.body.productModel;
    const type = req.body.productType;
    const color = req.body.productColor;
    const tech = req.body.productTechnology;
    const specialFeature = req.body.productSpecialFeature;
    const components = req.body.productComponents;
    const material = req.body.productMaterial;

    const country = req.body.productCountry;
    const modelNumber = req.body.productModelNumber;
    const weight = req.body.productWeight;
    const serial = req.body.productSerial;
    const size = { 
        length: req.body.productSizeLength,  
        height: req.body.productSizeHeight, 
        width: req.body.productSizeWidth
    };

    // const ratingScore = 0;
    // const ratingCount = 0;
    // const prevPrice = 0;
    // const Sold = 0;
    
    //11
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render("admin/edit-product",
        {
            myTitle: "Add a product",
            editing: true,
            hasError: true,
            product: {
                title : title,
                price : price ,
                imageUrl : imageUrl,
                // imageAlt = imageAlt;
                availability : availability,
                deliveryFees : deliveryFees,
    
                notesIntro : notesIntro,
                notesDescription : notesDescription,
                notesFeature1 : notesFeature1,
                notesFeature2 : notesFeature2,
                notesFeature3 : notesFeature3,
    
                age : age,
                department : department,
                department_section : department_section,
    
                brand : brand,
                model : model,
                type : type,
                color : color,
                tech : tech,
                specialFeature : specialFeature,
                components : components,
                material : material,
    
                country : country,
                modelNumber : modelNumber,
                weight : weight,
                serial : serial,
                size : size,
    
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }

    ProductClassModel.findById(prodId)
    .then((product) => {

        if (product !== null) {


            //10
            if (product.userId.toString() !== req.user._id.toString()) {
                console.log("current user is not authorized to edit this product");
                res.redirect("/products");
            
            } else {

            product.title = title;
            product.prevPrice = product.price;  ////
            product.price = price ;
            product.imageUrl = imageUrl;
            // imageAlt = imageAlt;
            product.availability = availability;
            product.deliveryFees = deliveryFees;

            product.notesIntro = notesIntro;
            product.notesDescription = notesDescription;
            product.notesFeature1 = notesFeature1;
            product.notesFeature2 = notesFeature2;
            product.notesFeature3 = notesFeature3;

            product.age = age;
            product.department = department;
            product.department_section = department_section;

            product.brand = brand;
            product.model = model;
            product.type = type;
            product.color = color;
            product.tech = tech;
            product.specialFeature = specialFeature;
            product.components = components;
            product.material = material;

            product.country = country;
            product.modelNumber = modelNumber;
            product.weight = weight;
            product.serial = serial;
            product.size = size;
            

            // ratingScore = 0;
            //ß ratingCount = 0;
            // sold = 0;

            // product.userId = req.user;   //6

            return product.save();      //return to chain another then
        
            }
        }
    })
    .then(()=> {
        console.log("updated product");
        res.redirect("/admin/products");
    })
    .catch(err => {
        // console.log(err);
        //11
        const error = new Error(err) as Error_With_Status;
        error.code = 500;
        //throw error - for sync, return next for async then/catch
        return next (error);
    });
    
    
    
};




exports.postDeleteProduct = (req: Request_With_reqUser, res: Response, next: NextFunction) =>  {

    const prodId = req.body.productId;

    // ProductClassModel.findByIdAndRemove(prodId)
    ProductClassModel.deleteOne({_id: prodId, userId: req.user._id})
    .then((result) => {
        console.log("removed product");
        res.redirect("/admin/products");
    })
    .catch((err) => {
        // console.log(err);
        //11
        const error = new Error(err) as Error_With_Status;
        error.code = 500;
        //throw error - for sync, return next for async then/catch
        return next (error);
    });

}