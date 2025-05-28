"use client";
import React, { SyntheticEvent, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { app_config } from "../libs/config";
import OptModal from "./OptModal";

type FormType = "sign-in" | "sign-up";

export default function AuthForm({ type }: { type: FormType }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [accId, setAccId] = useState("");
  const [showModal, setShowModal] = useState(false);

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsLoading(true);
    setIsError("");

    const apiBaseUrl = app_config.api_base_url;
    const build_url = name
      ? `${apiBaseUrl}/auth/register`
      : `${apiBaseUrl}/auth/login`;
    try {
      const res = await fetch(`${build_url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-App-Project": app_config.api_project_id,
          "X-App-Mode": name ? "admin" : accId,
          "X-App-Endpoint": app_config.api_base_url,
          "X-App-API-Key": app_config.api_key,
        },
        body: JSON.stringify({
          name: name ? name : "",
          email: email,
          // password: password,
        }),
      });

      if (res.ok) {
        const user = await res.json();
        setAccId(user?.id);
      } else {
        const errorData = await res.text();
        setIsError(errorData);
      }
    } catch (error) {
      setIsError("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <div className="bg-gray-100 flex flex-col rounded-3xl justify-center px-6 py-12 lg:px-8">
        <main className="auth-form"> { /* */}
          <form className="space-y-6" onSubmit={onSubmit}>
            <h1 className="mt-10  text-center text-2xl/9 font-bold tracking-tight text-blue-400">  { /* */}
              {type === "sign-in" ? "Sign In" : "Sign Up"}
            </h1>
            {type === "sign-up" && (
              <div className="bg-gray-200 rounded-md mt-10 sm:mx-auto sm-w-full sm: mx-w-sm">
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                  Name
                </label>
                <input
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="bg-gray-200 rounded-md mt-10 sm:mx-auto sm-w-full sm: mx-w-sm">
              <label htmlFor="Email" className="block text-sm/6 font-medium text-gray-900 ">
                Email
              </label>
              <input
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* <div className="form-item">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                className="form-control input"
                placeholder="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div> */}

            <button
            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              // className="text-brand btn btn-primary w-100 py-2 animate-pulse"
              type="submit"
            >
              {type === "sign-in" ? "Sign In" : "Sign Up"}

              {isLoading && (
                <Image
                  src="./images/loading.svg"
                  alt="Loading"
                  width={24}
                  height={24}
                  // className="animate-spin"
                />
              )}
            </button>

            {isError && <p className="text-danger error-message">{isError}</p>}
            <div className="body-2 flex justify-between">
              <p className="text-muted-100">
                {type === "sign-in"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <Link
                className="ml-l font-medium text-brand"
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              >
                {type === "sign-in" ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          </form>

          {accId && <OptModal email={email} accId={accId} />}
        </main>
      </div>
    </>
  );
}
