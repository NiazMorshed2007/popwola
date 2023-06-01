"use client";
import { Skeleton } from "@/components/ui/skeleton";
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
  return (
    <>
      {loading ? (
        <>
          <div className="p-4 flex gap-5">
            <Skeleton className="w-[200px] h-screen rounded-lg" />
            <div className="flex flex-col gap-5 w-10/12">
              <Skeleton className="w-full h-[50px] rounded-lg" />
              <div className="flex items-center gap-5 flex-wrap py-1">
                <Skeleton className="w-full h-[900px] rounded-lg" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default ProtectedLayout;
