"use client";

import Logo from "@/components/Logo";
import { Toast, ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { getSession } from "@/lib/services/auth.service";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  const router: AppRouterInstance = useRouter();
  const [auth, setAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async (): Promise<void> => {
      try {
        const session: any = await getSession();
        if (session) {
          setAuth(true);
          router.replace("/space");
        } else {
          setAuth(false);
        }
      } catch (error: any) {
        console.error("Error checking session:", error);
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) {
    return (
      <main className="w-screen h-screen fixed flex items-center justify-center">
        <Logo className="animate-pulse" />
      </main>
    );
  }

  if (!auth) {
    return (
      <>
        <ToastProvider>
          <Toast />
        </ToastProvider>
        <main className="w-screen h-screen flex items-center relative">
          <div className="absolute top-5 left-5 z-20">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          {children}
          <Toaster />
        </main>
      </>
    );
  }

  return null;
};

export default AuthLayout;
