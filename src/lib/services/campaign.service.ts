import api from "@/appwrite/appwrite";
import { Permission, Query, Role } from "appwrite";
import { userId } from "../storage";
import { CampaignInterface } from "@/interfaces/campaign.interface";

export const getAllCampaigns = async (): Promise<{
  total: number;
  documents: CampaignInterface[];
}> => {
  return await api.getDocuments(
    process.env.NEXT_PUBLIC_CAMPAIGN_COLLECTION_ID,
    [Query.equal("user_id", userId())]
  );
};

export const createCampaignDocument = async (
  campaignData: CampaignInterface & { user_id: string }
): Promise<CampaignInterface> => {
  return await api.createDocument(
    process.env.NEXT_PUBLIC_CAMPAIGN_COLLECTION_ID,
    campaignData,
    [
      Permission.read(Role.user(userId())),
      Permission.update(Role.user(userId())),
      Permission.delete(Role.user(userId())),
    ]
  );
};

export const getCampaignDocument = async (
  campaignId: string
): Promise<CampaignInterface> => {
  return api.getDocument(
    process.env.NEXT_PUBLIC_CAMPAIGN_COLLECTION_ID,
    campaignId,
    [Query.equal("user_id", userId())]
  );
};

export const updateCampaignDocument = async (
  campaignId: string,
  campaignData: Object
): Promise<CampaignInterface> => {
  return await api.updateDocument(
    process.env.NEXT_PUBLIC_CAMPAIGN_COLLECTION_ID,
    campaignId,
    campaignData
  );
};
