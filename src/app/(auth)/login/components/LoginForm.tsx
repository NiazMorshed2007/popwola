"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LoginInterface } from "@/interfaces/auth.interface";
import { login } from "@/lib/services/auth.service";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const LoginForm = (): JSX.Element => {
  const router: AppRouterInstance = useRouter();
  const [data, setData] = useState<LoginInterface>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
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
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Can't Login :(",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
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
      <Button disabled={loading} className="w-full text-sm">
        {loading && <Loader />}
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
