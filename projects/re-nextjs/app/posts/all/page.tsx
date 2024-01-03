// import React from 'react'
"use client"

import Link from "next/link";
import Image from "next/image";
import { PostDocument } from "@models/postModel";
import { useState, useEffect, useRef } from "react";


// type postsType = postsInterface[];

// interface postsInterface {
//     id: number,
//     title: string,
//     content: string,
//     author: string,
//     date: string,
//     image: string,
// }












const page = () => {


  // let posts: postsType = [
  //   {
  //     id : 1,
  //     title: "A new release on houses",
  //     content: "This company has released many new houses, with a good price too, it sounds to good to be true but they are here telling all the new stuff and with gardens, cant be better This company has released many new houses, with a good price too, it sounds to good to be true but they are here telling all the new stuff and with gardens, cant be better, This company has released many new houses, with a good price too, it sounds to good to be true but they are here telling all the new stuff and with gardens, cant be better This company has released many new houses, with a good price too, it sounds to good to be true but they are here telling all the new stuff and with gardens, cant be better, This company has released many new houses, with a good price too, it sounds to good to be true but they are here telling all the new stuff and with gardens, cant be better This company has released many new houses, with a good price too, it sounds to good to be true but they are here telling all the new stuff and with gardens, cant be better",
  //     author: "John",
  //     date: "Thu, 19 Sept 23",
  //     image : "/images/furniture.avif",      
  //   },
  //   {
  //     id : 2,
  //     title: "A new release on houses",
  //     content: "This company has released many new houses, with a good price too, it sounds to good to be true but they are here telling all the new stuff and with gardens, cant be better This company has released many new houses, with a good price too, it sounds to good to be true but they are here telling all the new stuff and with gardens, cant be better",
  //     author: "John",
  //     date: "Thu, 19 Sept 23",
  //     image : "/images/furniture.avif",      

      
  //   },
  //   {
  //     id : 3,
  //     title: "A new release on houses",
  //     content: "This company has released many new houses, with a good price too, it sounds to good to be true but they are here telling all the new stuff and with gardens, cant be better This company has released many new houses, with a good price too, it sounds to good to be true but they are here telling all the new stuff and with gardens, cant be better",
  //     author: "John",
  //     date: "Thu, 19 Sept 23",
  //     image : "/images/furniture.avif",      
      
  //   }
  // ]
  
  const [posts, setPosts] = useState<PostDocument[] | [] >([]);

  //Part 11.03
  const [pageId, setPageId] = useState(1);
  const endPage = useRef(1);


  useEffect(()=> {

    //connect to data base
    const fetchPosts = async () => { 
        
        // let current_url = window.location.href.toString().split("/posts/")[1];

        //state needs to have a different value to take the same value again which is jsonResponse.properties
        // if (posts.length > 0) {
        //     let loadingPosts:PostDocument[] = [];
            
        //     console.log("loadingPosts");
        //     console.log(loadingPosts);
        //     setPosts(loadingPosts);
        // }
        
        const response = await fetch(`/api/posts/all/${pageId}`);
        const jsonResponse = await response.json();
        // console.log(jsonResponse);

        endPage.current = jsonResponse.pagesEnd;
        // console.log("end page: "+endPage.current);
        // console.log("current page: "+ pageId);

        // console.log("posts were");
        // console.log(posts);
    
        // console.log(jsonResponse.posts);

        setPosts(jsonResponse.posts);
        
        // console.log("posts now are");
        // console.log(posts);

    }

    fetchPosts();

  },[pageId]);


  return (
    <div className="flex flex-col pb-6 pt-28 px-8">


      <div className="mx-auto max-w-[1230px] w-full">

        <div className="dark:text-white text-black text-shadow-3 w-full text-xs flex flex-row gap-1 opacity-70">
          
          <Link className=""href="/">Home</Link>
          >
          <span className="text-theme-text-brighter">News</span>
        </div>

        <div className="bg-white rounded-[17px]
        glass-container-background-2
        border backdrop-blur-10 pt-7 pb-1 px-7 mt-8
      dark:bg-[#68585806] dark:border-[#ffffff05]
      text-[#000000b3] dark:text-[#ffffffb0] text-center text-l flex flex-col gap-1
        ">
            {/* here are the posts */}
            <h4 className="text_shadow-3">Latest market news</h4>

            {/* posts container */}
            <div className="flex flex-col gap-6 my-6">

              {/* post */}
              {posts.length > 0 ? (
                <>
                  {posts.map((post) => (

                    <div className="h-auto w-full 
                    bg-[#fffffff0] focus:bg-[#ffffff] hover:bg-[#ffffff] 
                    dark:bg-[#ffffff07] dark:hover:bg-[#ffffff0a] dark:focus:bg-[#ffffff0a]
                    flex flex-col rounded-[17px] box-shadow-1 p-2 border border-[rgba(255,255,255,0.02)]
                    text_shadow-2 lg:flex lg:flex-row max-w-[541px] lg:max-w-full
                    ">

                      <Link href={"/posts/"+post._id} key={post._id} className="lg:order-2 ">
                          <Image src={post.image} height={300} width={300} alt={post.title}
                          id={post._id}
                          className="border-0 rounded-t-[10px] w-full
                          lg:rounded-r-[10px] lg:rounded-l-none mb-4 lg:mb-0
                          lg:h-full lg:w-auto
                          ">
                          </Image>
                      </Link>
                      
                        <div className="px-2 pb-1 lg:flex-1 lg:pt-4 lg:pr-6 flex flex-col">
                          <p className="flex flex-row items-baseline font-bold uppercase">
                            <span className="inline-block shrink-0 h-3 w-3 bg-red-500 opacity-80 rounded-full mr-4"></span>
                            <Link href={"/posts/"+post._id} key={post._id} className="text-start dark:text-[#ffffffde]">
                              {post.title}
                            </Link>
                          </p>
                          
                          <span className="flex flex-row items-baseline mt-2">
                            <span className="inline-block  shrink-0 h-3 w-3 bg-green-500 opacity-80 rounded-full mr-4"></span>
                            <span className="text-start max-h-[8rem] max-w-[900px] text-sm dot-text line-clamp-6 ">
                              {post.content}
                            </span>
                          </span>

                          <span className="flex flex-row items-baseline mt-4 lg:mt-auto">
                            <span className="inline-block shrink-0 h-3 w-3 bg-[rgba(0,89,255,0.7)] rounded-full mr-4"></span>
                            <span className="w-full text-start font-light text-sm
                            lowercase flex flex-row items-center">
                              <span className="opacity-60 mr-2">{post.date_update} by {post.userId.name} </span>
                              <Link href={"/posts/"+post._id} key={post._id} 
                              className="ml-auto mr-[-0.25rem]
                              bg-theme-text-brighter dark:bg-theme-text-dark text-white 
                              opacity-70 hover:opacity-80
                              
                              px-3 py-1 w-auto min-w-[7rem] rounded-[10px] text-center font-semibold border-0 capitalize">Read more</Link>
                            </span>
                          </span>            
                        </div>


                    </div>

                  ))}
                </>
              ) : (
                <>
                  <div className="min-h-[254px] flex mx-auto">
                    <h1 className="text_shadow-3  my-auto">Loading...</h1>
                  </div>
                </>
              )
              }

            </div>

        {/* pagination buttons */}
        <div className="w-full flex flex-row justify-center items-center gap-2">



        <div className="relative">

            {/* previous buttons */}
            <div className="absolute right-7 top-0 flex flex-row gap-2">

                {/* first page button */}
                {pageId-1 > 1 ? (
                <button 
                onClick={()=> {setPageId(1)}}
                className="
                bg-theme-text-brighter opacity-80 hover:opacity-100 dark:opacity-100 
                dark:bg-[#912642] dark:hover:bg-[#9f2545] 
                h-5 w-12 rounded-[6px] text-white flex items-center justify-center
                text-xs">
                    first
                </button>
                ):(
                    <div 
                    className="
                    bg-theme-text-brighter opacity-50 dark:opacity-50 
                    dark:bg-[#912642] dark:hover:bg-[#9f2545] 
                    h-5 w-12 rounded-[6px] text-black flex items-center justify-center
                    text-xs">    
                    </div>
                
                )}


                {/* previous page button */}
                {pageId > 1 ? (
                <button 
                onClick={()=> {setPageId(pageId-1)}}
                className="
                bg-theme-text-brighter opacity-80 hover:opacity-100 dark:opacity-100 
                dark:bg-[#912642] dark:hover:bg-[#9f2545] 
                h-5 w-5 rounded-[6px] text-white flex items-center justify-center
                text-xs">
                    {pageId-1}
                </button>
                ):(
                    <div 
                    className="
                    bg-theme-text-brighter opacity-50 dark:opacity-50 
                    dark:bg-[#912642] dark:hover:bg-[#9f2545] 
                    h-5 w-5 rounded-[6px] text-black flex items-center justify-center
                    text-xs">    
                    </div>
                
                )}

            </div>

            {/* middle/current button */}
            <button 
            onClick={()=> {}}
            className="
            bg-theme-text-brighter opacity-80 hover:opacity-100 dark:opacity-100 
            dark:bg-[#912642] dark:hover:bg-[#9f2545] 
            h-5 w-5 rounded-[6px] text-white flex items-center justify-center
            text-xs outline outline-1 outline-offset-2 dark:outline-[#ffffff4f] outline-[#0000005a]">
                {pageId}
            </button>

            {/* next buttons */}
            <div className="absolute left-7 top-0 flex flex-row gap-2">
                {/* next page button */}
                {pageId < Number(endPage.current) ? (
                <button 
                onClick={()=> {setPageId(pageId+1)}}
                className="
                bg-theme-text-brighter opacity-80 hover:opacity-100 dark:opacity-100 
                dark:bg-[#912642] dark:hover:bg-[#9f2545] 
                h-5 w-5 rounded-[6px] text-white flex items-center justify-center
                text-xs">
                    {pageId+1}
                </button>
                ):(
                    <div 
                    className="
                    bg-theme-text-brighter opacity-50 dark:opacity-50 
                    dark:bg-[#912642] dark:hover:bg-[#9f2545] 
                    h-5 w-5 rounded-[6px] text-black flex items-center justify-center
                    text-xs">    
                    </div>
                )}

                {/* last page button */}
                {pageId+1 < Number(endPage.current) ? (
                <button 
                onClick={()=> {setPageId(Math.ceil(endPage.current))}}
                className="
                bg-theme-text-brighter opacity-80 hover:opacity-100 dark:opacity-100 
                dark:bg-[#912642] dark:hover:bg-[#9f2545] 
                h-5 w-12 rounded-[6px] text-white flex items-center justify-center
                text-xs">
                    last
                </button>
                ):(
                    <div 
                    className="
                    bg-theme-text-brighter opacity-50 dark:opacity-50 
                    dark:bg-[#912642] dark:hover:bg-[#9f2545] 
                    h-5 w-12 rounded-[6px] text-black flex items-center justify-center
                    text-xs">    
                    </div>
                )}

            </div>


        </div>





        </div>
            
      </div>

      </div>

    </div>
  )
}

export default page