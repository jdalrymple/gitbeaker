import { BaseService, RequestHelper } from '../infrastructure';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  ProjectId,
  JobId,
  PipelineId,
  JobScope,
} from '@src/types';

class Jobs extends BaseService {
  all(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/jobs`, options);
  }

  cancel(projectId: ProjectId, jobId: JobId, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/cancel`, options);
  }

  downloadSingleArtifactFile(
    projectId: ProjectId,
    jobId: JobId,
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

    return RequestHelper.get(this, `projects/${pId}/jobs/${jId}/artifacts/${artifactPath}`, options);
  }

  downloadLatestArtifactFile(
    projectId: ProjectId,
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

    return RequestHelper.get(this, `projects/${pId}/jobs/artifacts/${rId}/download?job=${jobName}`, options);
  }

  downloadTraceFile(projectId: ProjectId, jobId: JobId, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/jobs/${jId}/trace`, options);
  }

  erase(projectId: ProjectId, jobId: JobId, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/erase`, options);
  }

  keepArtifacts(projectId: ProjectId, jobId: JobId, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/artifacts/keep`, options);
  }

  play(projectId: ProjectId, jobId: JobId, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/play`, options);
  }

  retry(projectId: ProjectId, jobId: JobId, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/retry`, options);
  }

  show(projectId: ProjectId, jobId: JobId, options?: Sudo) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/jobs/${jId}`, options);
  }

  showPipelineJobs(
    projectId: ProjectId,
    pipelineId: PipelineId,
    options: { scope: JobScope } & Sudo,
  ) {
    const [pId, ppId] = [projectId, pipelineId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${ppId}/jobs`, options);
  }
}

export default Jobs;
