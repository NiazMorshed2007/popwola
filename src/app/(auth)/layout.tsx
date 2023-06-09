"use client";

import Logo from "@/components/Logo";
import { Toaster } from "@/components/ui/toaster";
import { getSession } from "@/lib/services/auth.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();
        if (session) {
          setAuth(true);
          router.replace("/space");
          setLoading(false);
        }
      } catch (error) {
        setAuth(false);
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  return (
    <>
      {loading ? (
        <main className="w-screen h-screen fixed flex items-center justify-center">
          <Logo className="animate-pulse" />
        </main>
      ) : (
        <>
          {!auth && (
            <main className="w-screen h-screen flex items-center relative">
              <div className="absolute top-5 left-5 z-20">
                <Logo />
              </div>
              {children}
              <Toaster />
            </main>
          )}
        </>
      )}
    </>
  );
};

export default AuthLayout;
