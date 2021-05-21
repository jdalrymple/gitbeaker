export interface UserActivitySchema extends Record<string, unknown> {
  username: string;
  last_activity_on: string;
  last_activity_at: string;
}
