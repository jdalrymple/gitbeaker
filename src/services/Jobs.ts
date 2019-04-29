import { BaseService, RequestHelper } from '../infrastructure';
import { PipelineId } from './Pipelines';
import { RequestOptions } from '../infrastructure/RequestHelper';

export type JobId = string | number;

class Jobs extends BaseService {
  all(projectId: ProjectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/jobs`, options);
  }

  cancel(projectId: ProjectId, jobId: JobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/cancel`);
  }

  downloadSingleArtifactFile(
    projectId: ProjectId,
    jobId: JobId,
    artifactPath: string,
    options = { stream: false },
  ) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/jobs/${jId}/artifacts/${artifactPath}`,
      options as temporaryAny,
      { stream: options.stream },
    );
  }

  downloadLatestArtifactFile(
    projectId: ProjectId,
    ref: string,
    name: string,
    options = { stream: false },
  ) {
    const [pId, rId, jobName] = [projectId, ref, name].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/jobs/artifacts/${rId}/download?job=${jobName}`,
      options as temporaryAny,
      { stream: options.stream },
    );
  }

  downloadTraceFile(projectId: ProjectId, jobId: JobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/jobs/${jId}/trace`);
  }

  erase(projectId: ProjectId, jobId: JobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/erase`);
  }

  eraseArtifacts(projectId: ProjectId, jobId: JobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/jobs/${jId}/artifacts`);
  }

  keepArtifacts(projectId: ProjectId, jobId: JobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/artifacts/keep`);
  }

  play(projectId: ProjectId, jobId: JobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/play`);
  }

  retry(projectId: ProjectId, jobId: JobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/retry`);
  }

  show(projectId: ProjectId, jobId: JobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/jobs/${jId}`);
  }

  showPipelineJobs(projectId: ProjectId, pipelineId: PipelineId, options: RequestOptions) {
    const [pId, ppId] = [projectId, pipelineId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/pipelines/${ppId}/jobs`,
      options,
    );
  }
}

export default Jobs;
