export interface DeployKey extends Record<string, unknown> {
  id: number;
  title: string;
  key: string;
  can_push?: boolean;
  created_at: string;
}
