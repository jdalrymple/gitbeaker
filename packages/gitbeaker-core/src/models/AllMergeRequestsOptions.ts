export interface AllMergeRequestsOptions {
  state?: 'opened' | 'closed' | 'locked' | 'merged';
  orderBy?: 'created_at' | 'updated_at';
  sort?: 'asc' | 'desc';
  milestone?: 'None' | string;
  view?: string;
  labels?: string | Array<string>;
  withLabelsDetails?: boolean;
  createdAfter?: string;
  createdBefore?: string;
  updatedBefore?: string;
  updatedAfter?: string;
  scope?: 'created_by_me' | 'assigned_to_me' | 'all';
  authorId?: number;
  asigneeId?: number;
  approverIds?: Array<number>;
  approvedByIds?: Array<number>;
  myReactionEmoji?: string;
  sourceBranch?: string;
  targetBranch?: string;
  in?: string;
  wip?: string;
}
