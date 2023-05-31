"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

const Signup = () => {
  const handleRegister = async (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="left w-7/12 h-full p-6 flex flex-col items-center justify-center">
        <ScrollArea
          style={{
            width: "100%",
            height: "calc(100vh)",
          }}
        >
          <div className="pt-32 flex flex-col items-center">
            <h1 className="text-3xl text-center font-semibold">
              Create your popwola account!
            </h1>
            <p className="text-secondary text-center">
              Start boosting your business with popwola.
            </p>

            <form
              onSubmit={handleRegister}
              className="py-10 flex flex-col gap-3 w-9/12 items-center justify-center"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="mb-4 w-1/2">
                  <label className="block mb-2 text-xs text-secondary font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input required type="text" placeholder="Full Name" />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block mb-2 text-xs text-secondary font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input required type="email" placeholder="Email" />
                </div>
              </div>
              <div className="mb-4 w-full">
                <label className="block mb-2 text-xs text-secondary font-medium">
                  Website Url <span className="text-red-500">*</span>
                </label>
                <Input type="text" placeholder="https://example.com" />
              </div>
              <div className="mb-4 w-full">
                <label className="block mb-2 text-xs text-secondary font-medium">
                  Address <span className="text-red-500">*</span>
                </label>
                <Input type="text" placeholder="Address" />
              </div>
              <div className="w-full flex items-center gap-4 ">
                <div className="mb-4 w-1/2">
                  <label className="block mb-2 text-xs text-secondary font-medium">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <Input type="password" placeholder="Password" />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block mb-2 text-xs text-secondary font-medium">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <Input type="text" placeholder="Address" />
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
          </div>
        </ScrollArea>
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

export default Signup;
