import api from "@/appwrite/appwrite";
import { PopupInterface } from "@/interfaces/popup.interface";

export const createPopup = async (popup: PopupInterface) => {
  return await api.createDocument(
    process.env.NEXT_PUBLIC_POPUP_COLLECTION_ID,
    popup
  );
};

export const getPopupDocuemnt = async (popupId: string) => {
  return await api.getDocument(
    process.env.NEXT_PUBLIC_POPUP_COLLECTION_ID,
    popupId
  );
};

export const updatePopupDocument = async (popupId: string, popup: Object) => {
  return await api.updateDocument(
    process.env.NEXT_PUBLIC_POPUP_COLLECTION_ID,
    popupId,
    popup
  );
};
