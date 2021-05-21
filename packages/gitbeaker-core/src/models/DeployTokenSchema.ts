export interface DeployTokenSchema extends Record<string, unknown> {
  id: number;
  name: string;
  username: string;
  expires_at: string;
  scopes?: string[];
}
