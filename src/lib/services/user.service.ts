"use client";

import api from "@/appwrite/appwrite";
import { UserInterface } from "@/interfaces/user.interface";
import { Permission, Role } from "appwrite";

export const createUserDocument = async (
  userData: UserInterface,
  userId: string
) => {
  return api.createDocument(
    process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
    userData,
    [Permission.read(Role.user(userId)), Permission.write(Role.user(userId))]
  );
};
