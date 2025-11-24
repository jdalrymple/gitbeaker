import type { MappedOmit } from '../infrastructure';
import type { SimpleUserSchema } from './Users';

// Sub / Base Schemas
export interface WebhookRepositorySchema {
  name: string;
  url: string;
  description: string;
  homepage: string;
  git_http_url: string;
  git_ssh_url: string;
  visibility_level: number;
}

export interface WebhookLabelSchema {
  id: number;
  title: string;
  color: string;
  project_id: number;
  created_at: string;
  updated_at: string;
  template: boolean;
  description: string;
  type: string;
  group_id: number;
}

export interface WebhookProjectSchema {
  id: number;
  name: string;
  description: string;
  web_url: string;
  avatar_url: string | null;
  git_ssh_url: string;
  git_http_url: string;
  namespace: string;
  visibility_level: number;
  path_with_namespace: string;
  default_branch: string;
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
}

export interface WebhookPipelineSchema {
  project: {
    id: number;
    web_url: string;
    path_with_namespace: string;
  };
  pipeline_id: number;
  job_id: number;
}

export interface WebhookDiffSchema {
  diff: string;
  new_path: string;
  old_path: string;
  a_mode: string;
  b_mode: string;
  new_file: boolean;
  renamed_file: boolean;
  deleted_file: boolean;
}

export type ReviewerState = 'unreviewed' | 'requested_changes' | 'reviewed' | 'approved' | 'review_started' | 'unapproved';

export type WebhookUserSchema = Pick<SimpleUserSchema, 'id' | 'name' | 'username' | 'avatar_url'> & {
  email: string;
};

export interface WebhookReviewerSchema extends WebhookUserSchema {
  state: ReviewerState;
  re_requested: boolean;
}

export interface BaseWebhookEventSchema {
  object_kind: string;
  event_name: string;
  project: WebhookProjectSchema;
  user: MappedOmit<SimpleUserSchema, 'created_at'>;
}

export interface WebhookBaseNoteEventSchema extends BaseWebhookEventSchema {
  object_kind: 'note';
  event_type: 'note';
  project_id: number;
  repository: {
    name: string;
    url: string;
    description: string;
    homepage: string;
  };
  object_attributes: {
    id: number;
    note: string;
    noteable_type: string;
    discussion_id: string;
    author_id: number;
    created_at: string;
    updated_at: string;
    project_id: number;
    attachment: string | null;
    line_code: string;
    commit_id: string;
    noteable_id: string | null;
    system: boolean;
    st_diff: WebhookDiffSchema | null;
    url: string;
  };
}

export interface WebhookBasePushEventSchema extends MappedOmit<BaseWebhookEventSchema, 'user'> {
  before: string;
  after: string;
  ref: string;
  ref_protected: boolean;
  checkout_sha: string;
  user_id: number;
  user_name: string;
  user_avatar: string;
  project_id: number;
  repository: WebhookRepositorySchema;
  commits:
    | {
        id: string;
        message: string;
        title: string;
        timestamp: string;
        url: string;
        author: {
          name: string;
          email: string;
        };
        added: string[] | null;
        modified: string[] | null;
        removed: string[] | null;
      }[]
    | null;
  total_commits_count: number;
}

// Exposed EventSchemas
export interface WebhookTagEventSchema extends WebhookBasePushEventSchema {
  object_kind: 'tag_push';
  event_name: 'tag_push';
}

export interface WebhookPushEventSchema extends WebhookBasePushEventSchema {
  object_kind: 'push';
  event_name: 'push';
  user_username: string;
  user_email: string;
}

export interface WebhookIssueEventSchema extends BaseWebhookEventSchema {
  object_kind: 'issue';
  event_type: 'issue';
  object_attributes: {
    id: number;
    title: string;
    assignee_ids: number[] | null;
    assignee_id: number;
    author_id: number;
    project_id: number;
    created_at: string;
    updated_at: string;
    updated_by_id: number;
    last_edited_at: string | null;
    last_edited_by_id: number | null;
    relative_position: number;
    description: string;
    milestone_id: number | null;
    state_id: number;
    confidential: boolean;
    discussion_locked: boolean;
    due_date: string | null;
    moved_to_id: number | null;
    duplicated_to_id: number | null;
    time_estimate: number;
    total_time_spent: number;
    time_change: number;
    human_total_time_spent: string | null;
    human_time_estimate: string | null;
    human_time_change: string | null;
    weight: number | null;
    health_status: string;
    iid: number;
    url: string;
    state: string;
    action: string;
    severity: string;
    escalation_status: string;
    escalation_policy: {
      id: number;
      name: string;
    };
    labels: WebhookLabelSchema[] | null;
  };
  repository: {
    name: string;
    url: string;
    description: string;
    homepage: string;
  };
  assignees: WebhookUserSchema[] | null;
  assignee: WebhookUserSchema | null;
  labels: WebhookLabelSchema[] | null;
  changes: {
    updated_by_id: {
      previous: string | null;
      current: string;
    };
    updated_at: {
      previous: string;
      current: string;
    };
    labels: {
      previous: WebhookLabelSchema[] | null;
      current: WebhookLabelSchema[] | null;
    };
  };
}

export interface WebhookCommitNoteEventSchema extends WebhookBaseNoteEventSchema {
  commit: {
    id: string;
    message: string;
    timestamp: string;
    url: string;
    author: {
      name: string;
      email: string;
    };
  };
}

export interface WebhookMergeRequestNoteEventSchema extends WebhookBaseNoteEventSchema {
  merge_request: {
    id: number;
    target_branch: string;
    source_branch: string;
    source_project_id: number;
    author_id: number;
    assignee_id: number;
    title: string;
    created_at: string;
    updated_at: string;
    milestone_id: number;
    state: string;
    merge_status: string;
    target_project_id: number;
    iid: number;
    description: string;
    position: number;
    labels: WebhookLabelSchema[] | null;
    source: WebhookProjectSchema;
    target: WebhookProjectSchema;
    last_commit: {
      id: string;
      message: string;
      timestamp: string;
      url: string;
      author: {
        name: string;
        email: string;
      };
    };
    work_in_progress: boolean;
    draft: boolean;
    assignee: WebhookUserSchema | null;
    detailed_merge_status: string;
  };
}

export interface WebhookIssueNoteEventSchema extends WebhookBaseNoteEventSchema {
  issue: {
    id: number;
    title: string;
    assignee_ids: number[] | null;
    assignee_id: number | null;
    author_id: number;
    project_id: number;
    created_at: string;
    updated_at: string;
    position: number;
    branch_name: string | null;
    description: string;
    milestone_id: number | null;
    state: string;
    iid: number;
    labels: WebhookLabelSchema[] | null;
  };
}

export interface WebhookSnippetNoteEventSchema extends WebhookBaseNoteEventSchema {
  snippet: {
    id: number;
    title: string;
    content: string;
    author_id: number;
    project_id: number;
    created_at: string;
    updated_at: string;
    file_name: string;
    expires_at: string | null;
    type: string;
    visibility_level: number;
    url: string;
  };
}

export interface WebhookMergeRequestEventSchema extends BaseWebhookEventSchema {
  object_kind: 'merge_request';
  event_type: 'merge_request';
  repository: WebhookRepositorySchema;
  object_attributes: {
    id: number;
    iid: number;
    target_branch: string;
    source_branch: string;
    source_project_id: number;
    author_id: number;
    assignee_ids: number[] | null;
    reviewer_ids: number[] | null;
    title: string;
    created_at: string;
    updated_at: string;
    last_edited_at: string;
    last_edited_by_id: number;
    milestone_id: number | null;
    state_id: number;
    state: string;
    blocking_discussions_resolved: boolean;
    work_in_progress: boolean;
    draft: boolean;
    first_contribution: boolean;
    merge_commit_sha: string;
    target_project_id: number;
    description: string;
    total_time_spent: number;
    time_change: number;
    human_total_time_spent: string;
    human_time_change: string;
    human_time_estimate: string;
    url: string;
    source: WebhookProjectSchema;
    target: WebhookProjectSchema;
    last_commit: {
      id: string;
      message: string;
      title: string;
      timestamp: string;
      url: string;
      author: {
        name: string;
        email: string;
      };
    };
    labels: WebhookLabelSchema[] | null;
    action: string;
    detailed_merge_status: string;
  };
  labels: WebhookLabelSchema[] | null;
  changes: {
    target_branch: {
      previous: string | null;
      current: string | null;
    };
    updated_by_id: {
      previous: number | null;
      current: number | null;
    };
    draft: {
      previous: boolean | null;
      current: boolean | null;
    };
    updated_at: {
      previous: string | null;
      current: string | null;
    };
    assignees: {
      previous: WebhookUserSchema[] | null;
      current: WebhookUserSchema[] | null;
    };
    reviewers: {
      previous: WebhookReviewerSchema[] | null;
      current: WebhookReviewerSchema[] | null;
    };
    labels: {
      previous: WebhookLabelSchema[] | null;
      current: WebhookLabelSchema[] | null;
    };
    last_edited_at: {
      previous: string | null;
      current: string | null;
    };
    last_edited_by_id: {
      previous: number | null;
      current: number | null;
    };
  };
  assignees: WebhookUserSchema[] | null;
  reviewers: WebhookReviewerSchema[] | null;
}

export interface WebhookWikiEventSchema extends MappedOmit<BaseWebhookEventSchema, 'event_name'> {
  object_kind: 'wiki_page';
  wiki: {
    web_url: string;
    git_ssh_url: string;
    git_http_url: string;
    path_with_namespace: string;
    default_branch: string;
  };
  object_attributes: {
    title: string;
    content: string;
    format: string;
    message: string;
    slug: string;
    url: string;
    action: string;
    diff_url: string;
  };
}

export interface WebhookPipelineEventSchema
  extends MappedOmit<BaseWebhookEventSchema, 'event_name'> {
  object_kind: 'pipeline';
  object_attributes: {
    id: number;
    iid: number;
    name: string;
    ref: string;
    tag: boolean;
    sha: string;
    before_sha: string;
    source: string;
    status: string;
    detailed_status: string;
    stages: string[] | null;
    created_at: string;
    finished_at: string;
    duration: number;
    variables:
      | {
          key: string;
          value: string;
        }[]
      | null;
    url: string;
  };
  merge_request: null | {
    id: number;
    iid: number;
    title: string;
    source_branch: string;
    source_project_id: number;
    target_branch: string;
    target_project_id: number;
    state: string;
    merge_status: string;
    detailed_merge_status: string;
    url: string;
  };
  commit: {
    id: string;
    message: string;
    timestamp: string;
    url: string;
    author: {
      name: string;
      email: string;
    };
  };
  source_pipeline: WebhookPipelineSchema;
  builds:
    | {
        id: number;
        stage: string;
        name: string;
        status: string;
        created_at: string;
        started_at: string | null;
        finished_at: string | null;
        duration: number | null;
        queued_duration: number | null;
        failure_reason: string | null;
        when: string;
        manual: boolean;
        allow_failure: boolean;
        user: MappedOmit<SimpleUserSchema, 'created_at'>;
        runner: {
          id: number;
          description: string;
          active: boolean;
          runner_type: string;
          is_shared: boolean;
          tags: string[] | null;
        } | null;
        artifacts_file: {
          filename: string | null;
          size: string | null;
        };
        environment: {
          name: string;
          action: string;
          deployment_tier: string;
        } | null;
      }[]
    | null;
}

export interface WebhookJobEventSchema extends MappedOmit<BaseWebhookEventSchema, 'event_name'> {
  object_kind: 'build';
  ref: string;
  tag: boolean;
  before_sha: string;
  sha: string;
  build_id: number;
  build_name: string;
  build_stage: string;
  build_status: string;
  build_created_at: string;
  build_started_at: string | null;
  build_finished_at: string | null;
  build_duration: number | null;
  build_queued_duration: number;
  build_allow_failure: boolean;
  build_failure_reason: string;
  retries_count: number;
  pipeline_id: number;
  project_id: number;
  project_name: string;
  commit: {
    id: number;
    name: string;
    sha: string;
    message: string;
    author_name: string;
    author_email: string;
    status: string;
    duration: number | null;
    started_at: string | null;
    finished_at: string | null;
  };
  repository: WebhookRepositorySchema;
  runner: {
    active: boolean;
    runner_type: string;
    is_shared: boolean;
    id: number;
    description: string;
    tags: string[] | null;
  };
  environment: {
    name: string;
    action: string;
    deployment_tier: string;
  } | null;
  source_pipeline: WebhookPipelineSchema;
}

export interface WebhookDeploymentEventSchema
  extends MappedOmit<BaseWebhookEventSchema, 'event_name'> {
  object_kind: 'deployment';
  status: string;
  status_changed_at: string;
  deployment_id: number;
  deployable_id: number;
  deployable_url: string;
  environment: string;
  environment_tier: string;
  environment_slug: string;
  environment_external_url: string;
  short_sha: string;
  user_url: string;
  commit_url: string;
  commit_title: string;
}

export interface WebhookGroupMemberEventSchema {
  event_name: 'user_remove_from_group' | 'user_update_for_group';
  created_at: string;
  updated_at: string;
  group_name: string;
  group_path: string;
  group_id: number;
  user_username: string;
  user_name: string;
  user_email: string;
  user_id: number;
  group_access: string;
  group_plan: string | null;
  expires_at: string;
}

export interface WebhookSubGroupEventSchema {
  event_name: 'subgroup_create' | 'subgroup_destroy';
  created_at: string;
  updated_at: string;
  name: string;
  path: string;
  full_path: string;
  group_id: number;
  parent_group_id: number;
  parent_name: string;
  parent_path: string;
  parent_full_path: string;
}

export interface WebhookFeatureFlagEventSchema
  extends MappedOmit<BaseWebhookEventSchema, 'event_name'> {
  object_kind: 'feature_flag';
  user_url: string;
  object_attributes: {
    id: number;
    name: string;
    description: string;
    active: boolean;
  };
}

export interface WebhookReleaseEventSchema {
  object_kind: 'release';
  project: WebhookProjectSchema;
  id: number;
  created_at: string;
  description: string;
  name: string;
  released_at: string;
  tag: string;
  url: string;
  action: string;
  assets: {
    count: number;
    links:
      | {
          id: number;
          link_type: string;
          name: string;
          url: string;
        }[]
      | null;
    sources:
      | {
          format: string;
          url: string;
        }[]
      | null;
  };
  commit: {
    id: string;
    message: string;
    title: string;
    timestamp: string;
    url: string;
    author: {
      name: string;
      email: string;
    };
  };
}

export interface WebhookEmojiEventSchema extends BaseWebhookEventSchema {
  object_kind: 'emoji';
  event_type: 'award';
  merge_request?: WebhookMergeRequestEventSchema['object_attributes'];
  project_id: number;
  object_attributes: {
    user_id: number;
    created_at: string;
    id: number;
    name: string;
    awardable_type: string;
    awardable_id: number;
    updated_at: string;
    action: string;
    awarded_on_url: string;
  };
  note: {
    attachment: string | null;
    author_id: number;
    change_position: boolean | null;
    commit_id: number | null;
    created_at: string;
    discussion_id: string;
    id: number;
    line_code: string | null;
    note: string;
    noteable_id: number;
    noteable_type: string;
    original_position: number | null;
    position: number | null;
    project_id: number;
    resolved_at: string | null;
    resolved_by_id: number | null;
    resolved_by_push: boolean | null;
    st_diff: WebhookDiffSchema | null;
    system: boolean;
    type: string | null;
    updated_at: string;
    updated_by_id: number | null;
    description: string;
    url: string;
  };
  issue: {
    author_id: number;
    closed_at: string | null;
    confidential: boolean;
    created_at: string;
    description: string;
    discussion_locked: boolean | null;
    due_date: string | null;
    id: number;
    iid: number;
    last_edited_at: string | null;
    last_edited_by_id: number | null;
    milestone_id: number | null;
    moved_to_id: number | null;
    duplicated_to_id: number | null;
    project_id: number;
    relative_position: number;
    state_id: number;
    time_estimate: number;
    title: string;
    updated_at: string;
    updated_by_id: number | null;
    weight: number | null;
    health_status: string | null;
    url: string;
    total_time_spent: number;
    time_change: number;
    human_total_time_spent: string | null;
    human_time_change: string | null;
    human_time_estimate: string | null;
    assignee_ids: number[] | null;
    assignee_id: number;
    labels: WebhookLabelSchema[] | null;
    state: string;
    severity: string;
  };
}
