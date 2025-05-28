'use client'
import React from "react";
import SideBar from "../components/Sidebar";
import MobileNavigation from "../components/MobileNavigation";
import Header from "../components/Header";
import { redirect, useSearchParams } from "next/navigation";
import { avatarUrl } from "@/constants";

type User = {
  id: number;
  fullname: string;
  email: string;
  avatar: string;
};
const Layout = async ({ children }: { children: React.ReactNode }) => {
  
  const params = useSearchParams();
  const id  =   params.get("id");
  const name = params.get("fullname");
  const email = params.get("email");
  const currUser: User = {
    id: Number(id) || 0,
    fullname: name || "",
    email: email || "",
    avatar: avatarUrl,
  };

  if (currUser.id === 0) {
    redirect("/sign-in");
  }
  return (
    <main className="container flex h-screen">
      <SideBar {...currUser} />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation />
        <Header />

        <div className="main-content">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
