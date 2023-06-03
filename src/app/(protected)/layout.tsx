"use client";

import Logo from "@/components/Logo";
import { Toaster } from "@/components/ui/toaster";
import { getSession } from "@/lib/services/auth.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();
        if (!session) {
          router.push("/login");
          localStorage.clear();
        }
        setLoading(false);
      } catch (error) {
        router.push("/login");
        setLoading(false);
      }
    };

    checkSession();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <main className="w-screen h-screen fixed flex items-center justify-center">
            <Logo className="animate-pulse" />
          </main>
        </>
      ) : (
        <>
          {children}
          <Toaster />
        </>
      )}
    </>
  );
};

export default ProtectedLayout;
