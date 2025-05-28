"use server";

import { createAdminClient } from "@/app/libs";
import { ID } from "node-appwrite";

const getUserByEmail = async (email: string) => {
  const { account } = await createAdminClient();

  const result = await account.get();
  //   const results = await admin.listDocuments(
  //     process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,);

  return result ? result : null;
};

const handlerError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

const sendEmailOTP = async (email: string) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    handlerError(email, "Error sending email OTP");
  }
};

export const createAccount = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  console.log("Testing request");
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    // use an api to register the user
    throw new Error("User not found");
  }
  // const accId = await sendEmailOTP(email);

  // if (!accId) {
  //   throw new Error("User already exists");
  // }
};
