
import "@styles/globals.css"; //import the css to the entire application

//import layout components
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Footer from "@components/Footer";

export const metadata = {
  title: 'RE Website',
  description: 'Search for your next home',
}

const RootLayout = ({ children }: { children: React.ReactNode}) => {
  

  return (
    <html className="light" lang="en">
      {/* <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900"> */}
      <body className="w-full flex justify-center">

        

        <div className="myMain dark:brightness-10 relative">
          
          {/* background image, blur, color gradient */}
         
        </div>



        <div className="absolute top-0 z-[3] w-full h-full max-w-7xl">
          <div className="w-full h-auto sticky top-8 my-8 z-[4] flex justify-center">
            <Nav />
          </div>

          <main className="w-full min-h-full flex flex-col justify-start 
            absolute top-0">
              {/* this will hold the Home component in app>page.jsx */}
              {children}
              {/* <Footer /> */}
            </main>
        </div>




      </body>
    </html>
  )
}


export default RootLayout;