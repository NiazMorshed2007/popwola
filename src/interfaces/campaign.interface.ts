export interface CampaignInterface {
  $id?: string;
  name: string;
  description: string;
  start_date?: Date;
  end_date?: Date;
  popup_id: string;
  is_recurring: boolean;
  is_active: boolean;
}
