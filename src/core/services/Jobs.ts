import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export type JobScope =
  | 'created'
  | 'pending'
  | 'running'
  | 'failed'
  | 'success'
  | 'canceled'
  | 'skipped'
  | 'manual';

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
    options: { scope: JobScope } & Sudo,
  ) {
    const [pId, ppId] = [projectId, pipelineId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${ppId}/jobs`, options);
  }
}
