"use server";
import { app_config } from "./config";

export type User = {
  id: number;
  fullname: string;
  email: string;
  avatar: string;
};

 export async function getCurrentUser(token: string) {
   try {
     const res = await fetch(`${app_config.api_base_url}/auth/verify_me`, {
       method: "GET",
      credentials: 'include',
       headers: {
         Authorization: `Bearer ${token}`,
       },
       cache: "no-store",
     });

     if (!res.ok) {
       console.log(`Failed  to very user: ${res.status}`);
       return null;
     }

     return await res.json();
   } catch (err) {
     console.log("failed to fetch users", err);
     return null;
   }
 }
