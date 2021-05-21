export interface AccessRequestSchema extends Record<string, unknown> {
  id: number;
  username: string;
  name: string;
  state: string;
  created_at: string;
  requested_at: string;
}
