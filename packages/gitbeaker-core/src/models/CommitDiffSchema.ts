export interface CommitDiffSchema extends Record<string, unknown> {
  diff: string;
  new_path: string;
  old_path: string;
  a_mode?: string;
  b_mode: string;
  new_file: boolean;
  renamed_file: boolean;
  deleted_file: boolean;
}
