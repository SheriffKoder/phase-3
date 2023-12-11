// import React from 'react'
"use client";

import { bodyScroll, hideEdit } from "@utils/bodyNoScroll";
import { useEffect } from "react";
import Link from "next/link";

import { ChangeEventHandler, FormEventHandler } from "react";


//03.01
import {useState} from "react";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";

//03.01
const PropertyAdd_Component = () => {

    //03.01
    // const router = useRouter();
    const {data: session } = useSession();

    const [action, setAction] = useState ("add");
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        country: "",
        city: "",
        district: "",

        type: "",
        area: "",
        bedrooms: "",
        bathrooms: "",

        listing_type: "",
        price: "",
        description: "",

    });

    const { country, city, district, type, area, bedrooms, bathrooms, listing_type,
    price, description } = post;

    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
        const { name, value } = target;
        setPost({ ...post, [name]:value});
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        //creating first property
        try {
            const response = await fetch("/api/posts/new", {
                method: "POST",
                body: JSON.stringify({
                    ...post,
                    userId: session?.user.id,
                    date: "25 dec 2023",
                })
            })

            if (response.ok) {
                // router.push("/");
                hideEdit("Add"); bodyScroll();
            }
        } catch (error) {
            console.log(error);
        } finally {
            //happens either way
            setSubmitting(true);
        }
    }


    // useEffect (() => {
    //     // let LoginComponent = document.getElementById("signIn__container");

    //     // LoginComponent!.style.display = "flex";
            
    // },[])
        

    return (
        
            <div className=" myMain2 hidden h-[100vh] flex-col items-center justify-start
            dark:before:bg-[#000000e3] box-shadow-1 lg:mt-0 pb-10 overflow-y-scroll
            pt-24
            
            "
            id="propertyAdd__container">

            <div className="
            z-[3] w-[90%] h-auto
            flex flex-col items-center gap-1 lg:gap-4  p-3 max-w-[500px]
            rounded-[17px] bg-[#ffffffbd]  dark:bg-[#ffffff10]
            border-[rgba(255,255,255,0.02)]
            dark:text-[#ffffffde] shadow-2xl dark:shadow-inner 
            pb-4 lg:pb-7
            ">
            
                    <div className="text-center relative w-full flex flex-row justify-center">
                        <div className="absolute right-0">
                            <button 
                            onClick={()=> {hideEdit("Add"); bodyScroll();}}
                            className="
                            ml-auto bg-theme-text-brighter opacity-80 hover:opacity-100 dark:opacity-100 dark:bg-[#912642] dark:hover:bg-[#9f2545] h-5 w-5 rounded-[6px] text-white flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/> <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/> </svg>
                            </button>
                        </div>

                        <div className="mx-auto pt-0 lg:pt-6 flex flex-col lg:flex-row gap-1 flex-wrap justify-center">
                            <h3 className="mb-2 text_shadow-2 opacity-80">
                                {type === "add" ? ("Add a new property") : ("Edit property")}</h3>
                        </div>
                        
                    </div>

                    <form className="flex flex-col gap-1 lg:gap-4 items-center
                    w-[90%] md:px-[5%]"
                    onSubmit={handleSubmit}>

                        <label className="w-[100%] flex flex-row justify-center text-center
                        label_field
                        bg-[#ffffff07] rounded-[7px] border-2 border-[#ffffff02]
                        
                        ">
                            <span className="min-w-[7rem] px-2 py-1 text_shadow-2 opacity-80 dark:opacity-90">
                                Country
                            </span>

                            <input className="w-full input_field border-0 rounded-r-[6px] 
                                dark:bg-[#ffffff09] dark:focus:bg-[#ffffff02]  px-2 
                                border-[rgba(255,255,255,0.02)]" type="text" required
                                // value={post.country}
                                name="country" value={country} onChange={handleChange}
                                />
                            
                        </label>

                        <label className="w-[100%] flex flex-row justify-center text-center
                        label_field
                        bg-[#ffffff07] rounded-[7px] border-2 border-[#ffffff02]
                        
                        ">
                            <span className="min-w-[7rem] px-2 py-1 text_shadow-2 opacity-80 dark:opacity-90">
                                City
                            </span>

                            <input className="w-full input_field border-0 rounded-r-[6px] 
                                dark:bg-[#ffffff09] dark:focus:bg-[#ffffff02]  px-2 
                                border-[rgba(255,255,255,0.02)]" type="text" 
                                // value={post.city}
                                // onChange={(e) => {setPost({...post, city: e.target.value})}}
                                name="city" value={city} onChange={handleChange}

                                />
                            
                        </label>

                        <label className="w-[100%] flex flex-row justify-center text-center
                        label_field
                        bg-[#ffffff07] rounded-[7px] border-2 border-[#ffffff02]
                        
                        ">
                            <span className="min-w-[7rem] px-2 py-1 text_shadow-2 opacity-80 dark:opacity-90">
                                District
                            </span>

                            <input className="w-full input_field border-0 rounded-r-[6px] 
                                dark:bg-[#ffffff09] dark:focus:bg-[#ffffff02]  px-2 
                                border-[rgba(255,255,255,0.02)]" type="text" required
                                // value={post.district}
                                // onChange={(e) => {setPost({...post, district: e.target.value})}}
                                name="district" value={district} onChange={handleChange}

                                />
                            
                        </label>

                        <br></br>

                        <label className="w-[100%] flex flex-row justify-center text-center
                        label_field
                        bg-[#ffffff07] rounded-[7px] border-2 border-[#ffffff02]
                        
                        ">
                            <span className="min-w-[7rem] px-2 py-1 text_shadow-2 opacity-80 dark:opacity-90">
                                Type
                            </span>

                            <input className="w-full input_field border-0 rounded-r-[6px] 
                                dark:bg-[#ffffff09] dark:focus:bg-[#ffffff02]  px-2 
                                border-[rgba(255,255,255,0.02)]" type="text" required
                                placeholder="apartment, villa, office etc."
                                // value={post.type}
                                // onChange={(e) => {setPost({post, type: e.target.value})}}
                                name="type" value={type} onChange={handleChange}

                                />
                            
                        </label>

                        <label className="w-[100%] flex flex-row justify-center text-center
                        label_field
                        bg-[#ffffff07] rounded-[7px] border-2 border-[#ffffff02]
                        
                        ">
                            <span className="min-w-[7rem] px-2 py-1 text_shadow-2 opacity-80 dark:opacity-90">
                                Area
                            </span>

                            <input className="w-full input_field border-0 rounded-r-[6px] 
                                dark:bg-[#ffffff09] dark:focus:bg-[#ffffff02]  px-2 
                                border-[rgba(255,255,255,0.02)]" type="number" required
                                placeholder="in sqm" 
                                // value={post.area}
                                // onChange={(e) => {setPost({...post, area: e.target.value})}}
                                name="area" value={area} onChange={handleChange}

                                />
                            
                        </label>

                        <div className="w-full flex flex-row">
                            <label className="w-[50%] flex flex-row justify-center text-center
                            label_field
                            bg-[#ffffff07] rounded-[7px] border-2 border-[#ffffff02]
                            
                            ">
                                <span className="min-w-[7rem] px-2 py-1 text_shadow-2 opacity-80 dark:opacity-90">
                                    Bedrooms
                                </span>

                                <input className="w-full input_field border-0 rounded-r-[6px] 
                                    dark:bg-[#ffffff09] dark:focus:bg-[#ffffff02]  px-2 
                                    border-[rgba(255,255,255,0.02)]" type="number" required
                                    min={1} max={10} 
                                    // value={post.bedrooms}
                                    // onChange={(e) => {setPost({...post, bedrooms: e.target.value})}}
                                    name="bedrooms" value={bedrooms} onChange={handleChange}

                                    />
                                
                            </label>

                            <label className="w-[50%] flex flex-row justify-center text-center
                            label_field
                            bg-[#ffffff07] rounded-[7px] border-2 border-[#ffffff02]
                        
                        ">
                            <span className="min-w-[7rem] px-2 py-1 text_shadow-2 opacity-80 dark:opacity-90">
                                Bathrooms
                            </span>

                            <input className="w-full input_field border-0 rounded-r-[6px] 
                                dark:bg-[#ffffff09] dark:focus:bg-[#ffffff02]  px-2 
                                border-[rgba(255,255,255,0.02)]" type="number" required
                                min={1} max={10} 
                                // value={post.bathrooms}
                                // onChange={(e) => {setPost({...post, bathrooms: e.target.value})}}
                                name="bathrooms" value={bathrooms} onChange={handleChange}

                                />
                            
                            </label>
                        </div>

                        <br></br>

                        <label className="w-[100%] flex flex-row justify-center text-center
                        label_field
                        bg-[#ffffff07] rounded-[7px] border-2 border-[#ffffff02]
                        
                        ">
                            <span className="min-w-[7rem] px-2 py-1 text_shadow-2 opacity-80 dark:opacity-90">
                                Listing Type
                            </span>

                            <input className="w-full input_field border-0 rounded-r-[6px] 
                                dark:bg-[#ffffff09] dark:focus:bg-[#ffffff02]  px-2 
                                border-[rgba(255,255,255,0.02)]" type="text" required
                                placeholder="rent, sale, etc." 
                                // value={post.listing_type}
                                // onChange={(e) => {setPost({...post, listing_type: e.target.value})}}
                                name="listing_type" value={listing_type} onChange={handleChange}

                                />
                            
                        </label>

                        <label className="w-[100%] flex flex-row justify-center text-center
                        label_field
                        bg-[#ffffff07] rounded-[7px] border-2 border-[#ffffff02]
                        
                        ">
                            <span className="min-w-[7rem] px-2 py-1 text_shadow-2 opacity-80 dark:opacity-90">
                                Price
                            </span>

                            <input className="w-full input_field border-0 rounded-r-[6px] 
                                dark:bg-[#ffffff09] dark:focus:bg-[#ffffff02]  px-2 
                                border-[rgba(255,255,255,0.02)]" type="number" required
                                placeholder="" 
                                // value={post.price}
                                // onChange={(e) => {setPost({...post, price: e.target.value})}}
                                name="price" value={price} onChange={handleChange}

                                />
                            
                        </label>

                        <div className="flex flex-row label_field 
                        rounded-[7px] w-full border-2  bg-[#ffffff07] border-[#ffffff02]
                        items-center">
                        <span className="text-center min-w-[7rem] px-2 py-1 text_shadow-2 opacity-80 dark:opacity-90">
                                Available
                            </span>

                            <label className="flex flex-row justify-center text-center gap-2 px-2
                            
                            ">
                                Yes
                            <input className="
                                dark:bg-[#ffffff09] dark:focus:bg-[#ffffff02]
                                border-[rgba(255,255,255,0.02)]" type="radio" required
                                />
                            
                            </label>

                            <label className="flex flex-row justify-center text-center gap-2 px-2
                            ">
                                No
                            <input className="
                                dark:bg-[#ffffff09] dark:focus:bg-[#ffffff02]
                                border-[rgba(255,255,255,0.02)]" type="radio" required
                                />
                            
                            </label>
                        </div>

                        <div className="flex flex-row label_field 
                        rounded-[7px] w-full border-2  bg-[#ffffff07] border-[#ffffff02]
                        items-center">
                        <span className="text-center min-w-[7rem] px-2 py-1 text_shadow-2 opacity-80 dark:opacity-90">
                                Favorite
                            </span>

                            <label className="flex flex-row justify-center text-center gap-2 px-2
                            
                            ">
                                Yes
                            <input className="
                                dark:bg-[#ffffff09] dark:focus:bg-[#ffffff02]
                                border-[rgba(255,255,255,0.02)]" type="radio" required
                                />
                            
                            </label>

                            <label className="flex flex-row justify-center text-center gap-2 px-2
                            ">
                                No
                            <input className="
                                dark:bg-[#ffffff09] dark:focus:bg-[#ffffff02]
                                border-[rgba(255,255,255,0.02)]" type="radio" required
                                />
                            
                            </label>
                        </div>

                        <br></br>

                        <label className="w-[100%] flex flex-row justify-center text-center
                        label_field
                        bg-[#ffffff07] rounded-[7px] border-2 border-[#ffffff02]
                        
                        ">
                            <span className="min-w-[7rem] px-2 py-1 text_shadow-2 opacity-80 dark:opacity-90">
                                Add Images
                            </span>

                            <input className="w-full input_field border-0 rounded-r-[6px] 
                                dark:bg-[#ffffff09] dark:focus:bg-[#ffffff02]  px-2
                                border-[rgba(255,255,255,0.02)]" type="file"
                                placeholder=""/>
                            
                        </label>

                        <label className="w-[100%] flex flex-col gap-2
                        
                        ">
                            <span>Property Description</span>
                            <textarea className="w-[100%] label_field px-4 py-2
                            bg-[#ffffff07] rounded-[7px] border-2 border-[#ffffff02]
                            resize-none"
                            rows={6} placeholder="describe your property"
                            // value={post.description}
                            // onChange={(e) => {setPost({...post, description: e.target.value})}}
                            name="description" value={description} onChange={handleChange}
                            >

                            </textarea>
                        </label>


                        <div className="mt-4 w-[80%] flex">
                                <button type="submit" className="
                                bg-theme-text-brighter dark:bg-theme-text-dark text-white 
                                rounded-[9px] py-1 px-3 w-full
                                opacity-80 hover:opacity-90 mx-auto"
                                disabled={submitting}>
                                    {action === "add" ? ("Add to properties" ) : ("Apply changes")}
                                </button>
                        </div>

                    </form>


                </div>
    
            
            </div>
      )
}

export default PropertyAdd_Component