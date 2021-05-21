export interface UpdateMergeRequestOptions {
  targetBranch?: number;
  title?: string;
  assigneeId?: number;
  milestoneId?: number;
  labels?: string | Array<string>;
  description?: string;
  stateEvent?: string;
  removeSourceBranch?: boolean;
  squash?: boolean;
  discussionLocked?: boolean;
  allowCollaboration?: boolean;
  allowMaintainerToPush?: boolean;
}
