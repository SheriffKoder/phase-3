import React, { useContext } from "react"
import GradientButtonBorderRounded from "../misc/GradientButtonBorderRounded";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context";



type checksType = {
    addDate: string,    //c     //1     //2
    initialCheck: string,               //2
    nextCheck: string,  //c     //1     //2
    checkedOn: string,  //c     //1     //2
    notes: string,      //c     //1     //2
}

type checkModel = {
    name: string,
    color: string,
    history: checksType[],
    _id: string,
    
};


type carInfoType = {
    brand: string,
    model: string,
    lastCheck: string,
    nextCheck: string,
    image: string,
    _id: string,
    checks: checkModel[],

  }

type userType = {
    name: string,
    email: string,

}


const userInfo : userType = {
    name: "Sherif",
    email: "test@email.com",
}

const userCars:carInfoType = {
    brand: "Mazda",
    model: "mazda 6",
    lastCheck: "01/01/2024",
    nextCheck: "30/01/2024",
    image: "/images/car1.png",
    _id: "000",
    checks: [
        {
            name: "Maintenance",
            color: "#058885",
            _id: "1234",
            history: [
                {
                    addDate: "addDate 0",
                    initialCheck: "initialCheck 0",
                    // lastCheck: "03/03/23",
                    nextCheck: "nextCheck 0",
                    checkedOn: "checkedOn 0",
                    notes: "Make sure to check on the replacement part next time!",
                },
                {
                    addDate: "addDate 1",
                    initialCheck: "initialCheck 1",
                    // lastCheck: "03/02/23",
                    nextCheck: "nextCheck 1",
                    checkedOn: "checkedOn 1",
                    notes: "get something for the filter!",
                },
                {
                    addDate: "addDate 2",
                    initialCheck: "initialCheck 2",
                    // lastCheck: "none",
                    nextCheck: "nextCheck 2",
                    checkedOn: "checkedOn 2",
                    notes: "Make sure to bring a filter next time",
                },
                {
                    addDate: "addDate 3",
                    initialCheck: "initialCheck 3",
                    // lastCheck: "none",
                    nextCheck: "nextCheck 3",
                    checkedOn: "checkedOn 3",
                    notes: "Make sure to bring a filter next time",
                },
            ]


        },
        
        {
            name: "Oil Change",
            color: "#b7ab09",
            _id: "4567",

            history: [
                {
                    addDate: "addDate Oil 0",
                    initialCheck: "initialCheck 0",
                    nextCheck: "nextCheck Oil 0",
                    checkedOn: "",
                    notes: "Make sure to bring a filter next time",
                },

            ]


        },
    ]
}


const emptyUser = {
    userInfo, userCars
}











const Login = () => {


    const navigate = useNavigate();
    const setUser = useContext(userContext)?.updateUser;

    return (

        <div className="px-4 flex flex-col flex-1">
            
            <div className="ml-4 md2:ml-auto flex flex-row w-full max-w-[90vw] md2:max-w-[900px] text-xs text_shadow mx-auto">
                <span onClick={()=>{navigate("/")}} className="cursor-pointer">Welcome</span>
                <span className="right_caret h-full w-[1rem] text-transparent">.</span>
                <span style={{color:"#00465f"}}>Login</span>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 px-4">
            {/* // flex-1 as this is a component inside a flex-col parent */}
            <form className="bg-[#ffffff13] mx-6 rounded-[12px]
            flex flex-col justify-center pt-2 pb-3 px-4 my-auto
            text-sm max-w-[500px] w-full">
        
                    <h2 className="w-full text-center font-semibold mb-3">Login to your Account</h2>
        
                    <ul className="flex flex-col gap-4">
        
                        <li>
                            <label className="flex flex-row rounded-[5px] overflow-hidden
                            focus-within:outline outline-offset-[3px] outline-2
                            outline-[#0bb97f]">
                                <span className="w-[30%] bg-[#00000053] pt-[1px]
                                text-center">Email</span>
                                <input className="w-[70%] text-[#000000d6]
                                px-2 py-[1px] outline-none selection:bg-[#3c8bc374]
                                bg-[#e3f4ff]" type="text"/>
                            
                            </label>
                        </li>
        
                        <li>
                            <label className="flex flex-row rounded-[5px] overflow-hidden
                            focus-within:outline outline-offset-[3px] outline-2
                            outline-[#0bb97f]">
                                <span className="w-[30%] bg-[#00000053] pt-[1px]
                                text-center">Password</span>
                                <input className="w-[70%] text-[#000000d6]
                                px-2 py-[1px] outline-none selection:bg-[#3c8bc374]
                                bg-[#e3f4ff]" type="text"/>
                            
                            </label>
                        </li>
                        
        
                        <li className="w-[70%] mx-auto gradient_button z-[0] relative">
                            <button 
                            onClick={()=>{}}
                            type="submit"
                            className="w-full rounded-full px-3 py-1
                            text-xs
                            bg-gradient-to-l from-[#05b5b2]  to-[#226798]
                            ">
                                Login
                            </button>

                            {/* rounded gradient button border */}
                            <GradientButtonBorderRounded/>
                        </li>
                        
        
                    </ul>
        
            
        
        
            </form>
            <button 
                            onClick={()=>{setUser(emptyUser); navigate("/")}}
                            className="w-full rounded-full px-3 py-1
                            text-xs
                            bg-gradient-to-l from-[#05b5b2]  to-[#226798]
                            ">
                                Login
                            </button>

            </div>
        </div>
      )
}

export default Login;