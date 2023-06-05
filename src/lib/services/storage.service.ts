import api from "@/appwrite/appwrite";

export const uploadImage = async (file: File) => {
  return await api.createFile(file);
};

export const getPreviewImage = async (fileId: string) => {
  return await api.getFilePreview(fileId);
};
