import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { CommitSchema } from './Commits';
import { RunnerSchema } from './Runners';
import { UserSchema } from './Users';
import { PipelineSchema } from './Pipelines';

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

export interface JobSchema extends Record<string, unknown> {
  id: number;
  status: string;
  stage: string;
  name: string;
  ref: string;
  tag: boolean;
  coverage?: string;
  allow_failure: boolean;
  created_at: Date;
  started_at?: Date;
  finished_at?: Date;
  duration?: number;
  user: UserSchema;
  commit: CommitSchema;
  pipeline: PipelineSchema;
  web_url: string;
  artifacts: ArtifactSchema[];
  runner: RunnerSchema;
  artifacts_expire_at?: Date;
  tag_list?: string[];
}

export interface BridgeSchema extends Record<string, unknown> {
  commit: Pick<
    CommitSchema,
    'id' | 'short_id' | 'author_name' | 'author_email' | 'message' | 'title' | 'created_at'
  >;
  coverage?: string;
  allow_failure: boolean;
  created_at: string;
  started_at: string;
  finished_at: string;
  duration: number;
  queued_duration: number;
  id: number;
  name: string;
  pipeline: Exclude<PipelineSchema & { project_id: number }, 'user'>;
  ref: string;
  stage: string;
  status: string;
  tag: boolean;
  web_url: string;
  user: UserSchema;
  downstream_pipeline: Exclude<PipelineSchema, 'user'>;
}

export class Jobs extends BaseService {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<JobSchema[]>()(this, `projects/${pId}/jobs`, options);
  }

  cancel(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post<JobSchema>()(this, `projects/${pId}/jobs/${jId}/cancel`, options);
  }

  // TODO move
  downloadSingleArtifactFile(
    projectId: string | number,
    jobId: number,
    artifactPath: string,
    { stream = false, ...options }: { stream?: boolean } & BaseRequestOptions = {},
  ) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    if (stream) {
      return RequestHelper.stream(
        this,
        `projects/${pId}/jobs/${jId}/artifacts/${artifactPath}`,
        options,
      );
    }
    return RequestHelper.get()(
      this,
      `projects/${pId}/jobs/${jId}/artifacts/${artifactPath}`,
      options,
    );
  }

  // TODO move
  downloadSingleArtifactFileFromRef(
    projectId: string | number,
    ref: string,
    artifactPath: string,
    jobName: string,
    { stream = false, ...options }: { stream?: boolean } & BaseRequestOptions = {},
  ) {
    const [pId, rId, name] = [projectId, ref, jobName].map(encodeURIComponent);

    if (stream) {
      return RequestHelper.stream(
        this,
        `projects/${pId}/jobs/artifacts/${rId}/raw/${artifactPath}?job=${name}`,
        options,
      );
    }
    return RequestHelper.get()(
      this,
      `projects/${pId}/jobs/artifacts/${rId}/raw/${artifactPath}?job=${name}`,
      options,
    );
  }

  // TODO move
  downloadLatestArtifactFile(
    projectId: string | number,
    ref: string,
    jobName: string,
    { stream = false, ...options }: { stream?: boolean } & BaseRequestOptions = {},
  ) {
    const [pId, rId, name] = [projectId, ref, jobName].map(encodeURIComponent);

    if (stream) {
      return RequestHelper.stream(
        this,
        `projects/${pId}/jobs/artifacts/${rId}/download?job=${name}`,
        options,
      );
    }
    return RequestHelper.get()(
      this,
      `projects/${pId}/jobs/artifacts/${rId}/download?job=${name}`,
      options,
    );
  }

  downloadTraceFile(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.get()(this, `projects/${pId}/jobs/${jId}/trace`, options);
  }

  erase(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post<JobSchema>()(this, `projects/${pId}/jobs/${jId}/erase`, options);
  }

  // TODO move
  eraseArtifacts(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/jobs/${jId}/artifacts`, options);
  }

  // TODO move
  keepArtifacts(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post()(this, `projects/${pId}/jobs/${jId}/artifacts/keep`, options);
  }

  play(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post<JobSchema>()(this, `projects/${pId}/jobs/${jId}/play`, options);
  }

  retry(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post<JobSchema>()(this, `projects/${pId}/jobs/${jId}/retry`, options);
  }

  show(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.get<JobSchema>()(this, `projects/${pId}/jobs/${jId}`, options);
  }

  showPipelineJobs(
    projectId: string | number,
    pipelineId: number,
    options?: { scope?: JobScope } & Sudo,
  ) {
    const [pId, ppId] = [projectId, pipelineId].map(encodeURIComponent);

    return RequestHelper.get<JobSchema>()(this, `projects/${pId}/pipelines/${ppId}/jobs`, options);
  }

  showPipelineBridges(
    projectId: string | number,
    pipelineId: number,
    options?: { scope?: JobScope } & Sudo,
  ) {
    const [pId, ppId] = [projectId, pipelineId].map(encodeURIComponent);

    return RequestHelper.get<BridgeSchema>()(
      this,
      `projects/${pId}/pipelines/${ppId}/bridges`,
      options,
    );
  }
}
