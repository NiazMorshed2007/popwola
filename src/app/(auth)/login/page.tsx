import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <>
      <div className="left w-7/12 relative pt-20 h-full flex flex-col items-center justify-center">
        <div className="w-[440px]">
          <h1 className="text-3xl text-center mb-2 font-semibold">
            Welcome Back!
          </h1>
          <p className="text-sm text-secondary text-center">
            Login to your account to continue scaling with popwola.
          </p>
          <form className="py-10">
            <div className="mb-4">
              <label className="block mb-2 text-xs text-secondary font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <Input type="email" placeholder="Email" />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-xs text-secondary font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <Input type="password" placeholder="Password" />
            </div>
            <button className="w-full py-2 px-4 bg-brand hover:bg-brand/90 rounded-md text-white text-sm">
              Login
            </button>
            <p className="text-sm mt-6">
              Don't have an account?{" "}
              <Link className="text-brand" href={"/signup"}>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="right w-5/12 h-full">
        <img
          className="w-full shadow-2xl opacity-50 h-full object-cover"
          src="https://cdn.dribbble.com/userupload/4160413/file/original-7f17f8eb041c03c556033cf057a648f9.png?compress=1&resize=1024x768"
          alt=""
        />
      </div>
    </>
  );
};

export default Login;
