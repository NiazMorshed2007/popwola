"use client";

import { Input } from "@/components/ui/input";
import { LoginInterface } from "@/interfaces/auth.interface";
import { login } from "@/lib/services/auth.service";
import Link from "next/link";
import React, { useState } from "react";

const LoginForm = () => {
  const [data, setData] = useState<LoginInterface>({ email: "", password: "" });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const user = await login({ email: data.email, password: data.password });
    console.log(user);
  };

  return (
    <form onSubmit={handleLogin} className="py-10">
      <div className="mb-4">
        <label className="block mb-2 text-xs text-secondary font-medium">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          required
          name="email"
          value={data.email}
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-xs text-secondary font-medium">
          Password <span className="text-red-500">*</span>
        </label>
        <Input
          name="password"
          value={data.password}
          onChange={handleInputChange}
          required
          type="password"
          placeholder="Password"
        />
      </div>
      <button className="w-full py-2 px-4 bg-brand hover:bg-brand/90 rounded-md text-white text-sm">
        Login
      </button>
      <p className="text-sm mt-6">
        Don&apos;t have an account?{" "}
        <Link className="text-brand" href={"/signup"}>
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
