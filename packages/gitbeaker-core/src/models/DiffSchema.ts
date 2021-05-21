import { CommitSchema, CommitDiffSchema } from '.';

export interface DiffSchema extends Record<string, unknown> {
  id: number;
  head_commit_sha: string;
  base_commit_sha: string;
  start_commit_sha: string;
  created_at: string;
  merge_request_id: number;
  state: string;
  real_size: string;
  commits?: CommitSchema[];
  diffs?: CommitDiffSchema[];
}
