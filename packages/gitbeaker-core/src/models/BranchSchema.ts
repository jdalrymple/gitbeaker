import { CommitSchema } from '.';

export interface BranchSchema extends Record<string, unknown> {
  name: string;
  merged: boolean;
  protected: boolean;
  default: boolean;
  developers_can_push: boolean;
  developers_can_merge: boolean;
  can_push: boolean;
  web_url: string;
  commit: Omit<CommitSchema, 'web_url' | 'created_at'>;
}
