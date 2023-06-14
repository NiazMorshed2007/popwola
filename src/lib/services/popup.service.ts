import api from "@/appwrite/appwrite";
import { PopupInterface } from "@/interfaces/popup.interface";
import { Query } from "appwrite";

const popupCollectionId = process.env.NEXT_PUBLIC_POPUP_COLLECTION_ID;

export const createPopup = async (popup: PopupInterface) => {
  return await api.createDocument(popupCollectionId, popup);
};

export const getPopupDocuemnt = async (popupId: string) => {
  return await api.getDocument(popupCollectionId, popupId);
};

export const updatePopupDocument = async (popupId: string, popup: Object) => {
  return await api.updateDocument(popupCollectionId, popupId, popup);
};

export const deletePopupDocument = async (popupId: string) => {
  return await api.deleteDocument(popupCollectionId, popupId);
};
