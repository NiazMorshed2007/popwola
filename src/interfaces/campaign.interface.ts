export interface CampaignInterface {
  name: string;
  description: string;
  start_date?: Date;
  end_date?: Date;
  is_recurring: boolean;
}
