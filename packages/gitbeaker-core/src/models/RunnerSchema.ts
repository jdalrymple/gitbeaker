export interface RunnerSchema extends Record<string, unknown> {
  id: number;
  description: string;
  ip_address: string;
  active: boolean;
  is_shared: boolean;
  name: string;
  online: boolean;
  status: 'running' | 'success' | 'failed' | 'canceled';
}
