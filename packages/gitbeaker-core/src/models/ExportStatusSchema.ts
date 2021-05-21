export interface ExportStatusSchema extends Record<string, unknown> {
  id: number;
  description: string;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  created_at: string;
  export_status: string;
  _links: {
    api_url: string;
    web_url: string;
  };
}
