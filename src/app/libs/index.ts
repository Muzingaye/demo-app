"use server";

import { Account, Storage, Client,Avatars, Databases } from "node-appwrite";
import { app_config } from "./config";
import { cookies } from "next/headers";
export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(app_config.api_base_url)
    .setProject(app_config.api_project_id)
    .setKey(app_config.api_key);

  const session = (await cookies()).get("appwrite_session");

  if (!session || !session) throw new Error("Session not found");

  client.setEndpoint(session.value);

  return {
    get account() {
      return new Account(client);
    },

    get databases() {
      return new Databases(client);
    },
  };
};

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(app_config.api_base_url)
    .setProject(app_config.api_project_id)
    .setKey(app_config.api_key);

  return {
    get account() {
      return new Account(client);
    },

    get storage() {
      return new Storage(client);
    },

    get avatars() {
    return new Avatars(client);
    },
  };
};
