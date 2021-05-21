export interface AcceptMergeRequestOptions {
  mergeCommitMessage?: string;
  squashCommitMessage?: string;
  squash?: boolean;
  shouldRemoveSourceBranch?: boolean;
  mergeWhenPipelineSucceeds?: boolean;
  sha?: string;
}
