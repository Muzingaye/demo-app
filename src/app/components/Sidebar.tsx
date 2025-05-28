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
    <aside className="sidebar">
      <Link href="/">
        {/* <Image src="./image/logo.svg" alt="logo" width={160} height={50} className="hidden h-auto lg:block"/>
        <Image src="./image/logo.svg" alt="logo" width={52} height={52} className="lg:hidden"/>  */}
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="lg:w-full">
              <li
                className={cn(
                  "sidebar-nav-item",
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

      <Image
        src="/images/folder.svg"
        alt="logo"
        width={36}
        height={38}
        className=""
      />

      <div className="side-bar-user-info">
        <Image
          src={avatar}
          alt="avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />

        <div className="sidebar-user-info-text hidden:lg:block">
          <p className="subtitle-2 capitalize">{fullname}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  );
}
