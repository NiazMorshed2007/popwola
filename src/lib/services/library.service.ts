import api from "@/appwrite/appwrite";
import { removeUnwantedKeys } from "../utils";

export const getAllLibraryTemplates = async () => {
  const libs = await api.getDocuments(
    process.env.NEXT_PUBLIC_TEMPLATE_COLLECTION_ID
  );
  const updatedDocuments = libs.documents.map((doc: any) => {
    return removeUnwantedKeys(doc);
  });
  return {
    ...libs,
    documents: updatedDocuments,
  };
};
