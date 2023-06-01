"use client";

import api from "@/appwrite/appwrite";
import { UserInterface } from "@/interfaces/user.interface";
import { Permission, Role } from "appwrite";

export const createUserDocument = async (
  userData: UserInterface,
  userId: string
) => {
  return api.createDocument("6477ede15014f7b0cb69", userData, [
    Permission.read(Role.user(userId)),
    Permission.write(Role.user(userId)),
  ]);
};
