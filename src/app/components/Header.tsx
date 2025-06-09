'use client';
import Image from "next/image";
import Search from "./Search";
import { redirect } from "next/navigation";
import FileUploader from "./FileUploader";
import { SyntheticEvent } from "react";
import { app_config } from "../libs/config";

export default function Header({access_token} : {access_token: string}) {
  const LogOut = async (e: SyntheticEvent) => {
    e.preventDefault();

    console.log("access_token", access_token);
    
    try {
      const resp = await fetch(`${app_config.api_base_url}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${access_token}`,
          //  API_PROJECT_ID: app_config.api_project_id,
          // API_KEY: app_config.api_key,
        },
        body: JSON.stringify({}),
      });

      if(resp.ok) {
         return redirect("/sign-in");
        // console.log(resp.json)
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header className="flex  items-center justify-between gap-5 p-5 sm:flex lg:py-7 xl:gap-10  bg-green-100">
      <Search />
      <div className="flex items-center gap-4">
        <FileUploader ownerId = {access_token}/>
        <form>
          <button onClick={LogOut}>
            <Image
              src="/images/logout.svg"
              alt="logo"
              width={24}
              height={24}
              className="h-[52px] w-[54px] rounded-full bg-brand/10 p-0 text-brand shadow-none transition-all hover:bg-brand/20"
            />
          </button>
        </form>
      </div>
    </header>
  );
}
