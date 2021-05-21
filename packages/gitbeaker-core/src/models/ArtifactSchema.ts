export interface ArtifactSchema extends Record<string, unknown> {
  file_type: string;
  size: number;
  filename: string;
  file_format?: string;
}
