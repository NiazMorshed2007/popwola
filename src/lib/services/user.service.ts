import api from "@/appwrite/appwrite";
import { UserInterface } from "@/interfaces/user.interface";
import { Permission, Query, Role } from "appwrite";
import { userId } from "../storage";

export const createUserDocument = async (
  userData: UserInterface,
  userId: string
) => {
  return api.createDocument(
    process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
    {
      ...userData,
      uid: userId,
    },
    [
      Permission.read(Role.user(userId)),
      Permission.write(Role.user(userId)),
      Permission.update(Role.user(userId)),
    ]
  );
};

export const getUserDocument = async () => {
  return api.getDocuments(process.env.NEXT_PUBLIC_USERS_COLLECTION_ID, [
    Query.equal("uid", userId()),
  ]);
};

export const updateUserDocument = async (id: string, userData: Object) => {
  return api.updateDocument(
    process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
    id,
    userData
  );
};
