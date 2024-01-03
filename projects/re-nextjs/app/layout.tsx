


import "@styles/globals.css"; //import the css to the entire application

//import layout components
import Nav from "@components/Nav";
import Footer from "@components/Footer";
import MyLoading from "@components/Home/myLoading";
import Login_component from "@components/Auth/Login";
import SignUp_component from "@components/Auth/SignUp";
// import PropertyAdd_Component from "@components/PropertyEdit/PropertyAdd";
// import PropertyEdit_Component from "@components/PropertyEdit/PropertyEdit";

//02X.03
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@components/AuthProvider";

// import { Suspense } from "react";
// import Loading from "./loading";
// import AuthProvider from "@components/AuthProvider";

export const metadata = {
  title: 'RE Website',
  description: 'Search for your next home',
}

const RootLayout = ({ children }: { children: React.ReactNode}) => {
  


  return (
    <AuthProvider>

    <html className="" lang="en">
      {/* <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900"> */}
      <body className="w-full h-auto flex justify-center relative">


          {/* <div className="myMain dark:brightness-10 relative"> */}
            
            {/* background image, blur, color gradient */}
          
          {/* </div> */}



          <div className="absolute top-0 z-[3] w-full h-full max-w-full"
          id="main__main-container">


            <main className="myMain2 dark:before:bg-[#000000e3] w-full min-h-full flex flex-col justify-start 
              absolute top-0 box-shadow-1 h-auto ">


              <div className="w-full sticky top-0 z-[99]">
                <MyLoading />
              </div>
              

              <div className="w-full h-auto sticky top-0 my-0 z-[7] flex justify-center">
                <Nav />
                <div className="w-full absolute top-0 z-[8]">
                  <Login_component />
                  <SignUp_component />
                  {/* <PropertyAdd_Component />
                  <PropertyEdit_Component /> */}

                  
                </div>
              </div>




                {/* this will hold the Home component in app>page.jsx */}
                <div className="z-[5]" id="children_container">
                  {/* <Suspense fallback={<Loading />}> */}
                    {children}
                  {/* </Suspense> */}

                  {/* <Footer /> */}
                </div>

                <div className="z-[5]">
                  <Footer />
                </div>

            </main>
          </div>



      </body>
    </html>
    </AuthProvider>

  )
}


export default RootLayout;