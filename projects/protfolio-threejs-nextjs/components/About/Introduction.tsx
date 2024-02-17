import React from "react"
import Image from "next/image"
const Introduction = () => {
  return (
    <div className="w-full border border-[#151515] px-[7rem] max-w-[1600px] mx-auto
    ">

            <h1 className="text-2xl uppercase">
                About me
            </h1>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">

                    <h1 className="gradientBoldHeader uppercase">
                        Introduction
                    </h1>

                    <p className="mt-4 text-xl">
                        My name is <gr>Sherif Khodeir</gr>, I have graduated from a reputable university in Egypt
                        with a Bachelor degree in <gr>Electrical Engineering and Electronics</gr>,
                        i have always been interested in <gr>technology, computers and arts</gr> .
                        this is why i am passionate about <gr>Web Development</gr> as it combines all of these points
                        <br/>
                        <br/>
                        before i started <gr>Web development</gr>, i worked in the <gr>Real-Estate</gr> field for many years, 
                        it was an exciting journey because i learnt many new skills and everyday there were <gr>new challenges to face and solve, new people to talk to and meet.</gr>
                        <br/>
                        <br/>
                        but during 2020, as i had more time to reflect. even though it was going well with me in the <gr>Real-Estate</gr> career, 
                        i decided that i should start
                        working in a field that is <u>more relevant</u> to my <gr>talents and personal interests,</gr>
                        <i> to work on something that it's challenges do actually take me a step further in the development of the skills i would like to master.
                        </i>
                        <br/>
                        <br/>
                        At this time i did not know anything about <gr>Web Development</gr>, so i started with a <u>vision in my mind</u> and from <u>level 0</u>. 
                        knowing that with <u>consistency and perseverance</u> i can reach higher levels 
                        so i kept learning as often as i can and gradually over time <u>increasing the time dedicated</u> to <gr>Web Development</gr> over <gr>Real-Estate</gr>.
                        until <gr>Web-development</gr> became the <b>full-time</b> job and <gr>Real-estate</gr> became the <b>part-time</b>.
                        <br/>
                        <br/>
                        <span className="text-sm font-light">
                        You can find more details about my Education, Previous Career and my Web Development's learning path below
                        </span>

                    </p>
                </div>

                <div className="my-auto mx-auto">
                    <Image src="/images/avatar.png" height={300} width={300} alt="hi"
                        className="rounded-full border-4 opacity-90">

                    </Image>
                </div>
                
        </div>

    </div>
  )
}

export default Introduction