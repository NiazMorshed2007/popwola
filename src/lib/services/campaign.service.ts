import api from "@/appwrite/appwrite";
import { Permission, Query, Role } from "appwrite";
import { userId } from "../storage";
import { CampaignInterface } from "@/interfaces/campaign.interface";

const campaignCollectionId = process.env.NEXT_PUBLIC_CAMPAIGN_COLLECTION_ID;

export const getAllCampaigns = async (): Promise<{
  total: number;
  documents: CampaignInterface[];
}> => {
  return await api.getDocuments(campaignCollectionId, [
    Query.equal("user_id", userId()),
  ]);
};

export const createCampaignDocument = async (
  campaignData: CampaignInterface & { user_id: string }
): Promise<CampaignInterface> => {
  return await api.createDocument(campaignCollectionId, campaignData, [
    Permission.read(Role.user(userId())),
    Permission.update(Role.user(userId())),
    Permission.delete(Role.user(userId())),
  ]);
};

export const getCampaignDocument = async (
  campaignId: string
): Promise<CampaignInterface> => {
  return api.getDocument(campaignCollectionId, campaignId, [
    Query.equal("user_id", userId()),
  ]);
};

export const updateCampaignDocument = async (
  campaignId: string,
  campaignData: Object
): Promise<CampaignInterface> => {
  return await api.updateDocument(
    campaignCollectionId,
    campaignId,
    campaignData
  );
};

export const deleteCampaignDocument = async (
  campaignId: string
): Promise<void> => {
  return await api.deleteDocument(campaignCollectionId, campaignId);
};
