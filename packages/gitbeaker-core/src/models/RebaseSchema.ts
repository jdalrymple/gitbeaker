export interface RebaseSchema extends Record<string, unknown> {
  rebase_in_progress?: boolean;
  merge_error?: string;
}
