"use client"

// recommendations

import React, {useEffect, useState, useRef} from "react"
import Image from "next/image"
import Qoute from "@/public/icons/qoute";
import Link from "next/link";

const quotes = [
    {
        contents: "Sherif is trustworthy in carrying out his assigned tasks to the best of his ability",
        author: "Ramy El-Khouly - CEO Units Real Estate",
        avatar: "/images/rec/avatar-ramy.png",
        ref: "career_units"

    },
    {
        contents: "I consider Sherif as a gain to any team and I highly recommend working with him",
        author: "Mohammed Samy - Senior VP Coldwell Banker Egypt",
        avatar: "/images/rec/avatar-samy.png",
        ref: "career_cbe"
    },

]

   

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


const Extra2 = () => {

////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    function fadeOutAnimation (slider__container: any) {
        //[fadeOut]
       slider__container?.classList.add("fadeOut_animation");
        
    }

    function delayAnimation (slider__container: any){
        //give [delay], after fadeOut(600ms) finishes
        // setTimeout(()=> {
            handleSliderIndex(fade);

        // },100);
    }

    function handleSliderIndex (direction: number) {

        if (direction < prevFade) {
            // console.log("left");
            if (quotes !== null)
            (sliderIndex > 0) ? setSliderIndex(sliderIndex-1) : setSliderIndex(quotes.length-1);
            setPrevFade(fade);
        } else if (direction > prevFade) {
            // console.log("right");
            if (quotes !== null)
            (sliderIndex < quotes.length-1) ? setSliderIndex(sliderIndex+1) : setSliderIndex(0);
            fadeInAnimation(document.querySelector("#slider__container"));


        }

    }

    function fadeInAnimation (slider__container: any) {

        //[fadeIn] after fadeout(600ms) and delay(200ms) finish
        setTimeout(()=> {
            slider__container?.classList.remove("fadeOut_animation");
            slider__container?.classList.add("fadeIn_animation");
        },400);

        //after fadeOut,delay,fadeIn finish, remove to be re-applied
        setTimeout(()=> {
            slider__container?.classList.remove("fadeIn_animation");
        },1400);




    }

    function animationCombination (slider__container: any) {

        // //stop current timers to not overlap
        stopTimer();

        fadeOutAnimation(slider__container);
        delayAnimation(slider__container); //with handle fade change
        
        // fadeInAnimation(slider__container);

        //start the auto animation timer after first render or again after caret click
        startTimer();

    }


    function stopTimer () {
        clearInterval(tm.current);

    }

    function startTimer () {
        tm.current = window.setInterval(() => {
            // console.log("timer");
            setPrevFade(fade); setFade(fade+1);
        }, 7000);
    }

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    const [prevFade, setPrevFade] = useState(0);
    const [fade, setFade] = useState(0);
    const [sliderIndex, setSliderIndex] = useState(0);
    
    const tm = useRef(0);


    useEffect(()=> {
        
        let slider__container = document.querySelector("#slider__container"); 
        animationCombination(slider__container);    

    },[fade]);



  return (
    <div className="h-[300px] flex flex-col items-center justify-center
    gap-8">
        
        <h1 className="w-full text-center  text-2xl lg:text-3xl font-medium capitalize  ">
            Recommendations
        </h1>

        <div className="w-[80%] max-w-[700px] flex flex-col gap-2
        p-4 items-center">

            <div className="flex flex-row items-center gap-3">
                <span className="h-[4px] bg-white w-[3rem]"></span>
                <span className=""><Qoute color="#ffff" size="50px"/></span>
                <span className="h-[4px] bg-white w-[3rem]"></span>
            </div>

            <div id="slider__container" className="w-full">
                <p className="text-2xl font-thin italic text-center h-[5rem]"
                >"{quotes[sliderIndex].contents}."</p>

                <Link href={`/about?${quotes[sliderIndex].ref}`} className="w-[95%] flex flex-row items-center gap-3 ml-auto">
                    <p className="ml-auto">{quotes[sliderIndex].author}</p>
                    <Image src={quotes[sliderIndex].avatar} height={50} width={50} alt=""
                    className="rounded-full overflow-hidden bg-[#eee] h-[50px] w-[50px]"
                    style={{objectFit: "fill"}}>
                    </Image>

                </Link>
            </div>

            
        </div>

    </div>
  )
}

export default Extra2;