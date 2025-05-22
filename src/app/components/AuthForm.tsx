"use client";
import React, { SyntheticEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount } from "@/app/libs/actions/user.action";

type FormType = "sign-in" | "sign-up";

export default function AuthForm({ type }: { type: FormType }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [accId, setAccId] = useState(null);

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);
    setIsError("");
   
    try {

      const user = await createAccount({
        name: name ? name : "",
        email,
        password,
      });

     //  setAccId(user.??accId);
    } catch (error) {
      setIsError("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <div className="center">
        <main className="auth-form">
          <form className="register" onSubmit={onSubmit}>
            <h1 className="form-title">
              {type === "sign-in" ? "Sing In" : "Sign Up"}
            </h1>
            {type === "sign-up" && (
              <div className="">
                <label htmlFor="name" className="form-label">
                  Username
                </label>
                <input
                  className="form-control"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="form-item">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                className="form-control input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-item">
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
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">
              {type === "sign-in" ? "Sign In" : "Sign Up"}

              {/* {isLoading && (
                <Image
                  src="./loading.svg"
                  alt="Loading"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )} */}
            </button>

            {isError && (
              <p className="text-danger error-message">
                An error occurred. Please try again.
              </p>
            )}
            <div className="body-2 flex justify-between">
              <p className="text-muted-100">
                {type === "sign-in"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <Link
                className="ml-l font-medium text-brand"
                href={type === "sign-in" ? "/sign-up" : "/sign-up"}
              >
                {" "}
                {type === "sign-in" ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          </form>

          {/* OPT verification   */}
        </main>
      </div>
    </>
  );
}
