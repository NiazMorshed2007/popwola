import api from "@/appwrite/appwrite";

export const uploadImage = async (file: File) => {
  return await api.createFile(file);
};
