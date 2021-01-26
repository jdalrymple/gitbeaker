import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
  Camelize,
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

export interface ArtifactSchemaDefault {
  file_type: string;
  size: number;
  filename: string;
  file_format?: string;
}

export type ArtifactSchema<C> = C extends true
  ? Camelize<ArtifactSchemaDefault>
  : ArtifactSchemaDefault;

export interface JobSchemaDefault<C> {
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
  user: UserSchema<C>;
  commit: CommitSchema<C>;
  pipeline: PipelineSchema<C>;
  web_url: string;
  artifacts: ArtifactSchema<C>[];
  runner: RunnerSchema<C>;
  artifacts_expire_at?: Date;
}

export type JobSchema<C> = C extends true ? Camelize<JobSchemaDefault<C>> : JobSchemaDefault<C>;

export class Jobs<C extends boolean = false> extends BaseService<C> {
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

    if (stream) {
      return RequestHelper.stream<C>(
        this,
        `projects/${pId}/jobs/${jId}/artifacts/${artifactPath}`,
        options,
      );
    }
    return RequestHelper.get<C>(
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

    if (stream) {
      return RequestHelper.stream<C>(
        this,
        `projects/${pId}/jobs/artifacts/${rId}/raw/${artifactPath}?job=${name}`,
        options,
      );
    }
    return RequestHelper.get<C>(
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

    if (stream) {
      return RequestHelper.stream<C>(
        this,
        `projects/${pId}/jobs/artifacts/${rId}/download?job=${name}`,
        options,
      );
    }
    return RequestHelper.get<C>(
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
