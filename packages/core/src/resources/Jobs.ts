import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { SimpleProjectSchema } from './Projects';
import type { CondensedCommitSchema } from './Commits';
import type { RunnerSchema } from './Runners';
import type { ExpandedUserSchema, UserSchema } from './Users';
import type { PipelineSchema } from './Pipelines';

export type JobScope =
  | 'created'
  | 'pending'
  | 'running'
  | 'failed'
  | 'success'
  | 'canceled'
  | 'skipped'
  | 'manual';

export interface ArtifactSchema extends Record<string, unknown> {
  file_type: string;
  size: number;
  filename: string;
  file_format?: string;
}

export interface CondensedJobSchema extends Record<string, unknown> {
  id: number;
  name: string;
  stage: string;
  project_id: string | number;
  project_name: string;
}

export interface JobSchema extends Record<string, unknown> {
  id: number;
  name: string;
  stage: string;
  status: string;
  ref: string;
  tag: boolean;
  coverage?: string;
  allow_failure: boolean;
  created_at: string;
  started_at?: string;
  finished_at?: string;
  erased_at?: string;
  duration?: number;
  user: ExpandedUserSchema;
  commit: CondensedCommitSchema;
  pipeline: PipelineSchema;
  web_url: string;
  artifacts: ArtifactSchema[];
  queued_duration: number;
  artifacts_file: {
    filename: string;
    size: number;
  };
  runner: RunnerSchema;
  artifacts_expire_at?: string;
  tag_list?: string[];
}

export interface BridgeSchema extends Record<string, unknown> {
  commit: CondensedCommitSchema;
  coverage?: string;
  allow_failure: boolean;
  created_at: string;
  started_at: string;
  finished_at: string;
  erased_at?: string;
  duration: number;
  queued_duration: number;
  id: number;
  name: string;
  pipeline: Omit<PipelineSchema & { project_id: number }, 'user'>;
  ref: string;
  stage: string;
  status: string;
  tag: boolean;
  web_url: string;
  user: ExpandedUserSchema;
  downstream_pipeline: Omit<PipelineSchema, 'user'>;
}

export interface AllowedAgentSchema extends Record<string, unknown> {
  id: number;
  config_project: Omit<SimpleProjectSchema, 'web_url'>;
}

export interface JobKubernetesAgentsSchema extends Record<string, unknown> {
  allowed_agents: AllowedAgentSchema[];
  job: CondensedJobSchema;
  pipeline: PipelineSchema;
  project: Omit<SimpleProjectSchema, 'web_url'>;
  user: UserSchema;
}

export interface JobVariableAttributeOption extends Record<string, unknown> {
  key: string;
  value: string;
}

export class Jobs<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    {
      pipelineId,
      ...options
    }: { pipelineId?: number; scope?: JobScope; includeRetried?: boolean } & Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P> = {} as {
      pipelineId?: number;
      scope?: JobScope;
      includeRetried?: boolean;
    } & Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<JobSchema[], C, E, P>> {
    const url = pipelineId
      ? endpoint`projects/${projectId}/pipelines/${pipelineId}/jobs`
      : endpoint`projects/${projectId}/jobs`;

    return RequestHelper.get<JobSchema[]>()(
      this,
      url,
      options as { scope?: JobScope; includeRetried?: boolean } & Sudo &
        ShowExpanded<E> &
        PaginationRequestOptions<P>,
    );
  }

  allPipelineBridges<E extends boolean = false>(
    projectId: string | number,
    pipelineId: number,
    options?: { scope?: JobScope } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<BridgeSchema[], C, E, void>> {
    return RequestHelper.get<BridgeSchema[]>()(
      this,
      endpoint`projects/${projectId}/pipelines/${pipelineId}/bridges`,
      options,
    );
  }

  cancel<E extends boolean = false>(
    projectId: string | number,
    jobId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<JobSchema, C, E, void>> {
    return RequestHelper.post<JobSchema>()(
      this,
      endpoint`projects/${projectId}/jobs/${jobId}/cancel`,
      options,
    );
  }

  downloadTraceFile<E extends boolean = false>(
    projectId: string | number,
    jobId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/jobs/${jobId}/trace`,
      options,
    );
  }

  erase<E extends boolean = false>(
    projectId: string | number,
    jobId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<JobSchema, C, E, void>> {
    return RequestHelper.post<JobSchema>()(
      this,
      endpoint`projects/${projectId}/jobs/${jobId}/erase`,
      options,
    );
  }

  play<E extends boolean = false>(
    projectId: string | number,
    jobId: number,
    options?: { jobVariablesAttributes: JobVariableAttributeOption[] } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<JobSchema, C, E, void>> {
    return RequestHelper.post<JobSchema>()(
      this,
      endpoint`projects/${projectId}/jobs/${jobId}/play`,
      options,
    );
  }

  retry<E extends boolean = false>(
    projectId: string | number,
    jobId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<JobSchema, C, E, void>> {
    return RequestHelper.post<JobSchema>()(
      this,
      endpoint`projects/${projectId}/jobs/${jobId}/retry`,
      options,
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    jobId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<JobSchema, C, E, void>> {
    return RequestHelper.get<JobSchema>()(
      this,
      endpoint`projects/${projectId}/jobs/${jobId}`,
      options,
    );
  }

  showConnectedJob<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<JobSchema, C, E, void>> {
    if (!this.headers['job-token']) throw new Error('Missing required header "job-token"');

    return RequestHelper.get<JobSchema>()(this, 'job', options);
  }

  showConnectedJobK8Agents<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<JobKubernetesAgentsSchema, C, E, void>> {
    if (!this.headers['job-token']) throw new Error('Missing required header "job-token"');

    return RequestHelper.get<JobKubernetesAgentsSchema>()(this, 'job/allowed_agents', options);
  }
}
