import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { CommitSchemaDefault, CommitSchemaCamelized } from './Commits';
import { PipelineSchemaDefault, PipelineSchemaCamelized } from './Pipelines';
import { RunnerSchemaDefault, RunnerSchemaCamelized } from './Runners';
import { UserSchemaDefault, UserSchemaCamelized } from './Users';

export type JobScope =
  | 'created'
  | 'pending'
  | 'running'
  | 'failed'
  | 'success'
  | 'canceled'
  | 'skipped'
  | 'manual';

// As of GitLab v12.6.2
export type ArtifactSchema = ArtifactSchemaDefault | ArtifactSchemaCamelized;

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
export type JobSchema = JobSchemaDefault | JobSchemaCamelized;

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
  pipeline: PipelineSchemaDefault;
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
  pipeline: PipelineSchemaCamelized;
  webUrl: string;
  artifacts: ArtifactSchemaCamelized[];
  runner: RunnerSchemaCamelized;
  artifactsExpireAt?: Date;
}

export class Jobs extends BaseService {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/jobs`, options);
  }

  cancel(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/cancel`, options);
  }

  downloadSingleArtifactFile(
    projectId: string | number,
    jobId: number,
    artifactPath: string,
    { stream = false, ...options }: { stream?: boolean } & BaseRequestOptions,
  ) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    if (stream) {
      return RequestHelper.stream(
        this,
        `projects/${pId}/jobs/${jId}/artifacts/${artifactPath}`,
        options,
      );
    }

    return RequestHelper.get(
      this,
      `projects/${pId}/jobs/${jId}/artifacts/${artifactPath}`,
      options,
    );
  }

  downloadSingleArtifactFileFromRef(
    projectId: string | number,
    ref: string,
    artifactPath: string,
    name: string,
    { stream = false, ...options }: { stream?: boolean } & BaseRequestOptions,
  ) {
    const [pId, rId, jobName] = [projectId, ref, name].map(encodeURIComponent);

    if (stream) {
      return RequestHelper.stream(
        this,
        `projects/${pId}/jobs/artifacts/${rId}/raw/${artifactPath}?job=${jobName}`,
        options,
      );
    }

    return RequestHelper.get(
      this,
      `projects/${pId}/jobs/artifacts/${rId}/raw/${artifactPath}?job=${jobName}`,
      options,
    );
  }

  downloadLatestArtifactFile(
    projectId: string | number,
    ref: string,
    name: string,
    { stream = false, ...options }: { stream?: boolean } & BaseRequestOptions,
  ) {
    const [pId, rId, jobName] = [projectId, ref, name].map(encodeURIComponent);

    if (stream) {
      return RequestHelper.stream(
        this,
        `projects/${pId}/jobs/artifacts/${rId}/download?job=${jobName}`,
        options,
      );
    }

    return RequestHelper.get(
      this,
      `projects/${pId}/jobs/artifacts/${rId}/download?job=${jobName}`,
      options,
    );
  }

  downloadTraceFile(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/jobs/${jId}/trace`, options);
  }

  erase(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/erase`, options);
  }

  eraseArtifacts(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/jobs/${jId}/artifacts`, options);
  }

  keepArtifacts(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/artifacts/keep`, options);
  }

  play(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/play`, options);
  }

  retry(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/retry`, options);
  }

  show(projectId: string | number, jobId: number, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/jobs/${jId}`, options);
  }

  showPipelineJobs(
    projectId: string | number,
    pipelineId: number,
    options?: { scope?: JobScope } & Sudo,
  ) {
    const [pId, ppId] = [projectId, pipelineId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${ppId}/jobs`, options);
  }
}
