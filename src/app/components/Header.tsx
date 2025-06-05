'use client';
import Image from "next/image";
import Search from "./Search";
import FileUploader from "./FileUploader";
import { SyntheticEvent } from "react";
import { app_config } from "../libs/config";

export default function Header({userId} : {userId: string}) {
  const LogOut = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${app_config.api_base_url}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
           API_PROJECT_ID: app_config.api_project_id,
          API_KEY: app_config.api_key,
        },
        body: JSON.stringify({}),
      });

      if(resp.ok) {
        console.log(resp.json)
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header className="header flex items-center justify-between bg-gray-100 py-4">
      <Search />
      <div className="header-wrapper flex">
        <FileUploader ownerId = {userId}/>
        <form>
          <button onClick={LogOut}>
            <Image
              src="/images/logout.svg"
              alt="logo"
              width={24}
              height={24}
              className="w-6"
            />
          </button>
        </form>
      </div>
    </header>
  );
}
