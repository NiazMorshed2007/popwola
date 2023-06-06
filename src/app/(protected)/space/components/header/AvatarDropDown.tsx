"use client";
import api from "@/appwrite/appwrite";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

const AvatarDropDown = () => {
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    localStorage.getItem("user") &&
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="w-[33px] h-[33px] rounded-full bg-primary/10 flex items-center justify-center">
          {user?.name[0]}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-[150px]"}>
        <DropdownMenuItem
          onClick={() => {
            router.push("/space/profile");
          }}
        >
          <User size={13} className="mr-2" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            toast({
              title: "Logging out...",
            });
            router.replace("/login");
            api.deleteCurrentSession();
            localStorage.clear();
            toast({
              title: "Logged out successfully",
            });
          }}
        >
          <LogOut size={13} className="mr-2" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropDown;
