"use client";
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
        }
        console.log(session);
        setLoading(false);
      } catch (error) {
        router.push("/login");
        setLoading(false);
      }
    };

    checkSession();
  }, []);
  return <>{loading ? <>Loading...</> : <>{children}</>}</>;
};

export default ProtectedLayout;
