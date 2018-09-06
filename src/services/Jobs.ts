import { BaseService, RequestHelper } from '../infrastructure';

class Jobs extends BaseService {
  all(projectId: ProjectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/jobs`, options);
  }

  cancel(projectId: ProjectId, jobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/cancel`);
  }

  downloadSingleArtifactFile(
    projectId: ProjectId,
    jobId,
    artifactPath,
    options = { stream: false },
  ) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/jobs/${jId}/artifacts/${artifactPath}`,
      options,
      { stream: options.stream },
    );
  }

  downloadLatestArtifactFile(
    projectId: ProjectId,
    ref,
    name,
    options = { stream: false },
  ) {
    const [pId, rId, jobName] = [projectId, ref, name].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/jobs/artifacts/${rId}/download?job=${jobName}`,
      options,
      { stream: options.stream },
    );
  }

  downloadTraceFile(projectId: ProjectId, jobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/jobs/${jId}/trace`);
  }

  erase(projectId: ProjectId, jobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/erase`);
  }

  keepArtifacts(projectId: ProjectId, jobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/artifacts/keep`);
  }

  play(projectId: ProjectId, jobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/play`);
  }

  retry(projectId: ProjectId, jobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/retry`);
  }

  show(projectId: ProjectId, jobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/jobs/${jId}`);
  }

  showPipelineJobs(projectId: ProjectId, pipelineId, options) {
    const [pId, ppId] = [projectId, pipelineId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/pipelines/${ppId}/jobs`,
      options,
    );
  }
}

export default Jobs;
