export interface TagSchema extends Record<string, unknown> {
  name: string;
  path: string;
  location: string;
  revision: string;
  short_revision: string;
  digest: string;
  created_at: string;
  total_size: number;
}
