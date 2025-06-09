import React, { use } from "react";
import SideBar from "../components/Sidebar";
import Header from "../components/Header";
import { redirect } from "next/navigation";
import { avatarUrl } from "@/constants";
import { cookies } from "next/headers";
import { getCurrentUser, User } from "../libs";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const access_token = (await cookies()).get("access_token")?.value;
  if (!access_token) {
    return redirect("/sign-in");
  }
  const user = await getCurrentUser(access_token as string);
  if (!user) {
    return redirect("/sign-in");
  }
  const currUser: User = {
    id: user.id,
    fullname: user.name,
    email: user.email,
    avatar: false || avatarUrl,
  };

  return (
    <main className="container flex h-screen">
      <SideBar {...currUser} />
      <section className="flex h-full flex-1 flex-col">
        {/* <MobileNavigation /> */}
        <Header access_token={access_token} />

        <div className="main-content">{children}</div>
      </section>
    </main>
  );
}
