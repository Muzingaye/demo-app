import React from "react";
import Image from "next/image";
import { app_config } from "../libs/config";

const Layout =  async ({ children }: { children: React.ReactNode }) => {

  let isError = false;
  try{
    const res = await fetch(app_config.api_base_url, {method: "HEAD"});

    if(!res.ok){
       isError = true;
    }

   
  } catch(error) {

  }
  return (
    <div className="flex min-h-screen">
      <section className="bg-green-300 p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-3/5">
        { isError && (
        <h1>{isError ? ' API Status: Checking...' : isError ? '' : '❌ Down'}</h1> )}
        
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={224}
            height={82}
             className="transition-all hover:rotate-2 hover:scale-105"
          />

          <div className=" text-white">
            <h1 className="h1">Manage your profile.</h1>
            <p className="body-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              fringilla, nunc in facilisis efficitur, nisi enim bibendum ligula,
              nec tincidunt nunc nisi euismod nunc.
            </p>
          </div>
          {/* <Image
            src="/market.png"
            alt="market"
            width={324}
            height={324}
            className="transition-all hover:rotate-2 hover:scale-105"
          /> */}
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center justify-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[150px] lg:w-[200px]"
          />
        </div>
        {children}
      </section>
    </div>
  );
};

export default Layout;
