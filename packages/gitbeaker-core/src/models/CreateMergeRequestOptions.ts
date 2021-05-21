export interface CreateMergeRequestOptions {
  assigneeId?: number;
  description?: string;
  targetProjectId?: number;
  labels?: string | Array<string>;
  milestoneId?: number;
  removeSourceBranch?: boolean;
  allowCollaboration?: boolean;
  allowMaintainerToPush?: boolean;
  squash?: boolean;
}
