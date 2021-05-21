export interface NamespaceInfoSchema extends Record<string, unknown> {
  id: number;
  name: string;
  path: string;
  kind: string;
  full_path: string;
  avatar_url: string;
  web_url: string;
}
