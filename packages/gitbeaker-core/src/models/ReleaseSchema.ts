import { UserSchema, CommitSchema, MilestoneSchema } from '.';
import { EvidenceSchema } from './EvidenceSchema';
import { SourceSchema } from './SourceSchema';
import { LinkSchema } from './LinkSchema';

export interface ReleaseSchema extends Record<string, unknown> {
  tag_name: string;
  description: string;
  name: string;
  description_html: string;
  created_at: string;
  released_at: string;
  user: Pick<UserSchema, 'name' | 'username' | 'id' | 'state' | 'avatar_url' | 'web_url'>;
  commit: CommitSchema;
  milestones?: MilestoneSchema[];
  commit_path: string;
  tag_path: string;
  assets: {
    count: number;
    sources?: SourceSchema[];
    links?: LinkSchema[];
    evidence_file_path: string;
  };
  evidences?: EvidenceSchema[];
}
