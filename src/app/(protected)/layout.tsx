"use client";

import Logo from "@/components/Logo";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { getSession } from "@/lib/services/auth.service";
import { store } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();
        console.log(session);

        if (!session) {
          toast({
            variant: "destructive",
            title: "Session Expired",
          });
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
          <Provider store={store}>{children}</Provider>
          <Toaster />
        </>
      )}
    </>
  );
};

export default ProtectedLayout;
