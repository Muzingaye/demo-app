"use client";
import FileUploader from "./FileUploader";
import Search from "./Search";
import { SyntheticEvent } from "react";
import Image from "next/image";
import { app_config } from "../libs/config";

export default function Header() {
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

      if (resp.ok) {
        console.log(resp.json);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader />
        <form>
          {
            <button onClick={LogOut}>
              <Image
                src="/images/logout.svg"
                alt="logout"
                width={24}
                height={24}
                className="w-6"
              />
            </button>
          }
        </form>
      </div>
    </header>
  );
}
