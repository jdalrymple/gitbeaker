
export type GroupDetailSchema = {
  id: number;
  name: string;
  path: string;
  full_name: string;
  full_path: string;
  parent_id: number;
  visibility: string;
  avatar_url: string;
  web_url: string;
  description: string;
  request_access_enabled: boolean;
  file_template_project_id: number;
  runners_token: string;
  shared_with_groups: {
    group_id: number;
    group_name: string;
    group_full_path: string;
    group_access_level: number;
    expires_at: string;
  }[];
  created_at: string;
};
