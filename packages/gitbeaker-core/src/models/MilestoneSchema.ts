export interface MilestoneSchema extends Record<string, unknown> {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  due_date?: string;
  start_date: string;
  state: string;
  updated_at: string;
  created_at: string;
  expired: boolean;
  web_url?: string;
}
