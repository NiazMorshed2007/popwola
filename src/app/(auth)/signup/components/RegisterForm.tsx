"use client";

import { Input } from "@/components/ui/input";
import { RegisterInterface } from "@/interfaces/auth.interface";
import { register } from "@/lib/services/auth.service";
import { FileWarning } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterForm = () => {
  const [data, setData] = useState<RegisterInterface>({
    fullName: "",
    email: "",
    password: "",
    website_url: "",
    address: "",
  });
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (data.password !== confirmedPassword)
      return setError("Password does not match");

    const user = await register(data);
    setError("");
    setConfirmedPassword("");
    setData({
      fullName: "",
      email: "",
      password: "",
      website_url: "",
      address: "",
    });
    router.push("/space");
    console.log(user);
  };

  return (
    <form
      onSubmit={handleRegister}
      className="py-10 flex flex-col gap-3 w-9/12 items-center justify-center"
    >
      {error && (
        <div className="error w-full p-4 rounded-xl my-6 bg-foreground">
          <h2 className="text-red-500 flex items-center gap-4">
            <FileWarning /> {error}
          </h2>
        </div>
      )}
      <div className="flex items-center gap-4 w-full">
        <div className="mb-4 w-1/2">
          <label className="block mb-2 text-xs text-secondary font-medium">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            required
            name="fullName"
            value={data.fullName}
            onChange={handleInputChange}
            type="text"
            placeholder="Full Name"
          />
        </div>
        <div className="mb-4 w-1/2">
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
      </div>
      <div className="mb-4 w-full">
        <label className="block mb-2 text-xs text-secondary font-medium">
          Website Url <span className="text-red-500">*</span>
        </label>
        <Input
          required
          name="website_url"
          value={data.website_url}
          onChange={handleInputChange}
          type="text"
          placeholder="https://example.com"
        />
      </div>
      <div className="mb-4 w-full">
        <label className="block mb-2 text-xs text-secondary font-medium">
          Address
        </label>
        <Input
          name="address"
          value={data.address}
          onChange={handleInputChange}
          type="text"
          placeholder="Address"
        />
      </div>
      <div className="w-full flex items-center gap-4 ">
        <div className="mb-4 w-1/2">
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
        <div className="mb-4 w-1/2">
          <label className="block mb-2 text-xs text-secondary font-medium">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <Input
            name="confirmedPassword"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            required
            type="password"
            placeholder="Re-type password"
          />
        </div>
      </div>

      <button className="w-full py-2 px-4 bg-brand hover:bg-brand/90 rounded-md text-white text-sm">
        SignUp
      </button>
      <p className="text-sm mt-3">
        Alread have an account?{" "}
        <Link className="text-brand" href={"/login"}>
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
