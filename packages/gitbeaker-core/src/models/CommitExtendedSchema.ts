import { CommitSchema } from './CommitSchema';

export interface CommitExtendedSchema extends CommitSchema {
  last_pipeline: {
    id: number;
    ref: string;
    sha: string;
    status: string;
  };
  stats: {
    additions: number;
    deletions: number;
    total: number;
  };
  status: string;
}
