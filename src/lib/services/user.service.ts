import api from "@/appwrite/appwrite";
import { UserInterface } from "@/interfaces/user.interface";
import { Permission, Query, Role } from "appwrite";
import { userId } from "../storage";

const userCollectionId = process.env.NEXT_PUBLIC_USERS_COLLECTION_ID;

export const createUserDocument = async (
  userData: UserInterface,
  userId: string
) => {
  return api.createDocument(
    userCollectionId,
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
  return api.getDocuments(userCollectionId, [Query.equal("uid", userId())]);
};

export const updateUserDocument = async (id: string, userData: Object) => {
  return api.updateDocument(userCollectionId, id, userData);
};
