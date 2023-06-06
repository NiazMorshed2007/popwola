import api from "@/appwrite/appwrite";

export const getAllLibraryTemplates = async () => {
  return await api.getDocuments(process.env.NEXT_PUBLIC_TEMPLATE_COLLECTION_ID);
};
