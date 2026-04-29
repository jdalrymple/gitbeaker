import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { CondensedCommitSchema } from './Commits';
import type { PipelineSchema } from './Pipelines';
import type { SimpleProjectSchema } from './Projects';
import type { RunnerSchema } from './Runners';
import type { ExpandedUserSchema, SimpleUserSchema } from './Users';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint, getPrefixedUrl } from '../infrastructure';

export type JobScope =
  | 'created'
  | 'pending'
  | 'running'
  | 'failed'
  | 'success'
  | 'canceled'
  | 'skipped'
  | 'manual'
  | 'waiting_for_resource';

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
  failure_reason?: string;
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
  project?: {
    ci_job_token_scope_enabled?: boolean;
  };
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
  pipeline: MappedOmit<{ project_id: number } & PipelineSchema, 'user'>;
  ref: string;
  stage: string;
  status: string;
  tag: boolean;
  web_url: string;
  user: ExpandedUserSchema;
  downstream_pipeline: MappedOmit<PipelineSchema, 'user'>;
}

export interface AllowedAgentSchema extends Record<string, unknown> {
  id: number;
  config_project: MappedOmit<SimpleProjectSchema, 'web_url'>;
}

export interface JobKubernetesAgentsSchema extends Record<string, unknown> {
  allowed_agents: AllowedAgentSchema[];
  job: CondensedJobSchema;
  pipeline: PipelineSchema;
  project: MappedOmit<SimpleProjectSchema, 'web_url'>;
  user: SimpleUserSchema;
}

export interface JobVariableAttributeOption extends Record<string, unknown> {
  key: string;
  value: string;
}

/**
 * Jobs API resource for managing GitLab CI/CD jobs.
 * Provides methods to list, cancel, retry, and manage jobs and their artifacts.
 *
 * @see {@link https://docs.gitlab.com/api/jobs/}
 */
export class Jobs<C extends boolean = false> extends BaseResource<C> {
  /**
   * Get a list of jobs in a project.
   *
   * @param projectId - The ID or URL-encoded path of the project.
   * @param options - Options object for filtering and pagination.
   * @returns A promise that resolves to an array of job schemas.
   * @see {@link https://docs.gitlab.com/api/jobs/#list-project-jobs}
   */
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: {
      pipelineId?: number;
      /** Filter jobs by scope(s). Can be a single JobScope or array of JobScope values. */
      scope?: JobScope | JobScope[];
      /** Whether to include retried jobs in the results. */
      includeRetried?: boolean;
    } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<JobSchema[], C, E, P>> {
    const { pipelineId, sudo, showExpanded, maxPages, ...searchParams } = options || {};
    const url = getPrefixedUrl('jobs', { projects: projectId, pipelines: pipelineId });

    return RequestHelper.get<JobSchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  /**
   * Get a list of trigger jobs for a pipeline.
   *
   * @param projectId - The ID or URL-encoded path of the project.
   * @param pipelineId - The ID of the pipeline.
   * @param options - Options object for filtering.
   * @returns A promise that resolves to an array of bridge schemas.
   * @see {@link https://docs.gitlab.com/api/jobs/#list-pipeline-trigger-jobs}
   */
  allPipelineBridges<E extends boolean = false>(
    projectId: string | number,
    pipelineId: number,
    options?: { scope?: JobScope | JobScope[] } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BridgeSchema[], C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<BridgeSchema[]>()(
      this,
      endpoint`projects/${projectId}/pipelines/${pipelineId}/bridges`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  /**
   * Cancel a single job of a project.
   *
   * @param projectId - The ID or URL-encoded path of the project.
   * @param jobId - The ID of the job to cancel.
   * @param options - Additional request options.
   * @returns A promise that resolves to the canceled job schema.
   * @see {@link https://docs.gitlab.com/api/jobs/#cancel-a-job}
   */
  cancel<E extends boolean = false>(
    projectId: string | number,
    jobId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<JobSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<JobSchema>()(
      this,
      endpoint`projects/${projectId}/jobs/${jobId}/cancel`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  /**
   * Erase a single job of a project (remove job artifacts and a job log).
   *
   * @param projectId - The ID or URL-encoded path of the project.
   * @param jobId - The ID of the job to erase.
   * @param options - Additional request options.
   * @returns A promise that resolves to the erased job schema.
   * @see {@link https://docs.gitlab.com/api/jobs/#erase-a-job}
   */
  erase<E extends boolean = false>(
    projectId: string | number,
    jobId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<JobSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<JobSchema>()(
      this,
      endpoint`projects/${projectId}/jobs/${jobId}/erase`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  /**
   * For a job in manual status, trigger an action to start the job.
   *
   * @param projectId - The ID or URL-encoded path of the project.
   * @param jobId - The ID of the manual job to play.
   * @param options - Options object for playing the job.
   * @returns A promise that resolves to the played job schema.
   * @see {@link https://docs.gitlab.com/api/jobs/#run-a-job}
   */
  play<E extends boolean = false>(
    projectId: string | number,
    jobId: number,
    options?: { jobVariablesAttributes?: JobVariableAttributeOption[] } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<JobSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<JobSchema>()(
      this,
      endpoint`projects/${projectId}/jobs/${jobId}/play`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  /**
   * Retry a single job of a project.
   *
   * @param projectId - The ID or URL-encoded path of the project.
   * @param jobId - The ID of the job to retry.
   * @param options - Additional request options.
   * @returns A promise that resolves to the retried job schema.
   * @see {@link https://docs.gitlab.com/api/jobs/#retry-a-job}
   */
  retry<E extends boolean = false>(
    projectId: string | number,
    jobId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<JobSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<JobSchema>()(
      this,
      endpoint`projects/${projectId}/jobs/${jobId}/retry`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  /**
   * Get a single job of a project.
   *
   * @param projectId - The ID or URL-encoded path of the project.
   * @param jobId - The ID of the job.
   * @param options - Additional request options.
   * @returns A promise that resolves to the job schema.
   * @see {@link https://docs.gitlab.com/api/jobs/#get-a-single-job}
   */
  show<E extends boolean = false>(
    projectId: string | number,
    jobId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<JobSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<JobSchema>()(this, endpoint`projects/${projectId}/jobs/${jobId}`, {
      sudo,
      showExpanded,
    });
  }

  /**
   * Retrieve the job that generated a job token.
   *
   * @param options - Additional request options.
   * @returns A promise that resolves to the current job schema.
   * @throws Error if `job-token` header is missing.
   * @see {@link https://docs.gitlab.com/api/jobs/#get-job-tokens-job}
   */
  showConnectedJob<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<JobSchema, C, E, void>> {
    if (!this.headers['job-token']) throw new Error('Missing required header "job-token"');

    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<JobSchema>()(this, 'job', {
      sudo,
      showExpanded,
    });
  }

  /**
   * Retrieve the job that generated the CI_JOB_TOKEN, along with a list of allowed agents.
   *
   * @param options - Additional request options.
   * @returns A promise that resolves to the Kubernetes agents schema.
   * @throws Error if `job-token` header is missing.
   * @see {@link https://docs.gitlab.com/api/jobs/#get-gitlab-agent-for-kubernetes-by-ci_job_token}
   */
  showConnectedJobK8Agents<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<JobKubernetesAgentsSchema, C, E, void>> {
    if (!this.headers['job-token']) throw new Error('Missing required header "job-token"');

    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<JobKubernetesAgentsSchema>()(this, 'job/allowed_agents', {
      sudo,
      showExpanded,
    });
  }

  /**
   * Get a log (trace) of a specific job of a project.
   *
   * @param projectId - The ID or URL-encoded path of the project.
   * @param jobId - The ID of the job.
   * @param options - Additional request options.
   * @returns A promise that resolves to the job trace/log as a string.
   * @see {@link https://docs.gitlab.com/api/jobs/#get-a-log-file}
   */
  showLog<E extends boolean = false>(
    projectId: string | number,
    jobId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<string, void, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<string>()(this, endpoint`projects/${projectId}/jobs/${jobId}/trace`, {
      sudo,
      showExpanded,
    });
  }
}
