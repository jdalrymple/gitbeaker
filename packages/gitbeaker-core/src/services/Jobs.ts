import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { CommitSchemaDefault, CommitSchemaCamelized } from './Commits';
import { RunnerSchemaDefault, RunnerSchemaCamelized } from './Runners';
import { UserSchemaDefault, UserSchemaCamelized } from './Users';
import { PipelineBase } from './Pipelines';

export type JobScope =
  | 'created'
  | 'pending'
  | 'running'
  | 'failed'
  | 'success'
  | 'canceled'
  | 'skipped'
  | 'manual';

export interface ArtifactSchemaDefault {
  file_type: string;
  size: number;
  filename: string;
  file_format?: string;
}

export interface ArtifactSchemaCamelized {
  fileType: string;
  size: number;
  filename: string;
  fileFormat?: string;
}

// As of GitLab v12.6.2
export type ArtifactSchema = ArtifactSchemaDefault | ArtifactSchemaCamelized;

export interface JobSchemaDefault {
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
  user: UserSchemaDefault;
  commit: CommitSchemaDefault;
  pipeline: PipelineBase;
  web_url: string;
  artifacts: ArtifactSchemaDefault[];
  runner: RunnerSchemaDefault;
  artifacts_expire_at?: Date;
}

export interface JobSchemaCamelized {
  id: number;
  status: string;
  stage: string;
  name: string;
  ref: string;
  tag: boolean;
  coverage?: string;
  allowFailure: boolean;
  createdAt: Date;
  startedAt?: Date;
  finishedAt?: Date;
  duration?: number;
  user: UserSchemaCamelized;
  commit: CommitSchemaCamelized;
  pipeline: PipelineBase;
  webUrl: string;
  artifacts: ArtifactSchemaCamelized[];
  runner: RunnerSchemaCamelized;
  artifactsExpireAt?: Date;
}

// As of GitLab v12.6.2
export type JobSchema = JobSchemaDefault | JobSchemaCamelized;

export class Jobs<C extends boolean> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<C>(this, `projects/${pId}/jobs`, options);
  }

  cancel(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post<C>(this, `projects/${pId}/jobs/${jId}/cancel`, options);
  }

  downloadSingleArtifactFile(
    projectId: string | number,
    jobId: number,
    artifactPath: string,
    { stream = false, ...options }: { stream?: boolean } & BaseRequestOptions = {},
  ) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);
    const method = stream ? 'stream' : 'get';

    return RequestHelper[method](
      this,
      `projects/${pId}/jobs/${jId}/artifacts/${artifactPath}`,
      options,
    );
  }

  downloadSingleArtifactFileFromRef(
    projectId: string | number,
    ref: string,
    artifactPath: string,
    jobName: string,
    { stream = false, ...options }: { stream?: boolean } & BaseRequestOptions = {},
  ) {
    const [pId, rId, name] = [projectId, ref, jobName].map(encodeURIComponent);
    const method = stream ? 'stream' : 'get';

    return RequestHelper[method](
      this,
      `projects/${pId}/jobs/artifacts/${rId}/raw/${artifactPath}?job=${name}`,
      options,
    );
  }

  downloadLatestArtifactFile(
    projectId: string | number,
    ref: string,
    jobName: string,
    { stream = false, ...options }: { stream?: boolean } & BaseRequestOptions = {},
  ) {
    const [pId, rId, name] = [projectId, ref, jobName].map(encodeURIComponent);
    const method = stream ? 'stream' : 'get';

    return RequestHelper[method](
      this,
      `projects/${pId}/jobs/artifacts/${rId}/download?job=${name}`,
      options,
    );
  }

  downloadTraceFile(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.get<C>(this, `projects/${pId}/jobs/${jId}/trace`, options);
  }

  erase(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post<C>(this, `projects/${pId}/jobs/${jId}/erase`, options);
  }

  eraseArtifacts(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.del<C>(this, `projects/${pId}/jobs/${jId}/artifacts`, options);
  }

  keepArtifacts(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post<C>(this, `projects/${pId}/jobs/${jId}/artifacts/keep`, options);
  }

  play(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post<C>(this, `projects/${pId}/jobs/${jId}/play`, options);
  }

  retry(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post<C>(this, `projects/${pId}/jobs/${jId}/retry`, options);
  }

  show(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.get<C>(this, `projects/${pId}/jobs/${jId}`, options);
  }

  showPipelineJobs(
    projectId: string | number,
    pipelineId: number,
    options?: { scope?: JobScope } & Sudo,
  ) {
    const [pId, ppId] = [projectId, pipelineId].map(encodeURIComponent);

    return RequestHelper.get<C>(this, `projects/${pId}/pipelines/${ppId}/jobs`, options);
  }
}
