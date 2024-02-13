import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import StarsCanvas from "@/components/Contact/StarsCanvas";
import SmoothScroll from "@/components/Scroll/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


// put in the body the header, footer and the children will be the home page.tsx or any other folder page.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <SmoothScroll>
      {/* <StarsCanvas/> */}
        {children}
        </SmoothScroll>

      </body>
    </html>
  );
}
