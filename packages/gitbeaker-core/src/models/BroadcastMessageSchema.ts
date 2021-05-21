export interface BroadcastMessageSchema extends Record<string, unknown> {
  message: string;
  starts_at: string;
  ends_at: string;
  color: string;
  font: string;
  id: number;
  active: boolean;
  target_path: string;
  broadcast_type: string;
  dismissable: boolean;
}
