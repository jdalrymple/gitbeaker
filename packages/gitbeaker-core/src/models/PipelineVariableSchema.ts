export interface PipelineVariableSchema extends Record<string, unknown> {
  key: string;
  variable_type?: string;
  value: string;
}
