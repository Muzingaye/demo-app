"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "../libs/utils";

interface Props {
  fullname: string;
  avatar: string;
  email: string;
}
export default function SideBar({ fullname, avatar, email }: Props) {
  const pathname = usePathname();
  return (
    <aside className="sidebar remove-scrollbar hidden h-screen w-[90px] flex-col overflow-auto px-5 py-7 sm:flex lg:w-[280px] xl:w-[325px]">
      <Link href="/">
        <Image src="/images/logo.svg" alt="logo" width={90} height={40} className="hidden h-auto lg:block"/>
        <Image src="/images/logo.svg" alt="logo" width={52} height={52} className="lg:hidden"/>  
      </Link>

      <nav className="sidebar-nav text-[16px] leading-[24px] font-semibold mt-9 flex-1 gap-1 text-brand !important">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="lg:w-full">
              <li
                className={cn(
                  "sidebar-nav-item flex text-light-100 gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center h5 lg:px-[30px] h-[52px] lg:rounded-full",
                  pathname === url && "shade-active"
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    "nav-icon",
                    pathname === url && "nav-icon-active"
                  )}
                />
                <p className="hidden lg:block"> {name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      {/* <Image
        src="/images/folder.svg"
        alt="logo"
        width={36}
        height={38}
        className="w-full"
      /> */}

      <div className="side-bar-user-info mt-4 flex items-center justify-center gap-2 rounded-full bg-brand/10 p-1 text-light-100 lg:justify-start lg:p-3">
        <Image
          src={avatar}
          alt="avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar aspect-square w-10 rounded-full object-cover !important;"
        />

        <div className="hidden:lg:block">
          <p className="subtitle-2 capitalize text-[14px] leading-[20px] font-semibold">{fullname}</p>
          <p className="caption text-[12px] leading-[16px] font-normal">{email}</p>
        </div>
      </div>
    </aside>
  );
}
