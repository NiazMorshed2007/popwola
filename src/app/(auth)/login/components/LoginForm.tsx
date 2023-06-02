"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastProvider } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { LoginInterface } from "@/interfaces/auth.interface";
import { login } from "@/lib/services/auth.service";
import { Toast } from "@radix-ui/react-toast";
import { FileWarning, LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [data, setData] = useState<LoginInterface>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login({ email: data.email, password: data.password });
      localStorage.setItem("user", JSON.stringify(user));
      setData({ email: "", password: "" });
      toast({
        title: "Login Successful!",
      });
      router.push("/space");
      setLoading(false);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Can't Login :(",
        description: err.message,
      });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="py-10">
      <ToastProvider>
        <Toast />
      </ToastProvider>
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
      <Button disabled={loading} className="w-full text-sm">
        {" "}
        {loading && <LoaderIcon className="animate-spin mr-3" size={20} />}{" "}
        Login
      </Button>
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
