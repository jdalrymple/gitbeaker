import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Jobs extends BaseService {
  @api('<projectId>', { options: true, method: 'GET' })
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/jobs`, options);
  }

  @api('<projectId>', '<jobId>', { options: true, method: 'POST' })
  cancel(projectId, jobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/cancel`);
  }

  @api('<projectId>', '<jobId>', '<artifactPath>', { options: true, method: 'GET' })
  downloadSingleArtifactFile(
    projectId,
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

  @api('<projectId>', '<ref>', '<name>', { options: true, method: 'GET' })
  downloadLatestArtifactFile(
    projectId,
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

  @api('<projectId>', '<jobId>', { method: 'GET' })
  downloadTraceFile(projectId, jobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/jobs/${jId}/trace`);
  }

  @api('<projectId>', '<jobId>', { method: 'POST' })
  erase(projectId, jobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/erase`);
  }

  @api('<projectId>', '<jobId>', { method: 'POST' })
  keepArtifacts(projectId, jobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/artifacts/keep`);
  }

  @api('<projectId>', '<jobId>', { method: 'POST' })
  play(projectId, jobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/play`);
  }

  @api('<projectId>', '<jobId>', { method: 'POST' })
  retry(projectId, jobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jId}/retry`);
  }

  @api('<projectId>', '<jobId>', { method: 'GET' })
  show(projectId, jobId) {
    const [pId, jId] = [projectId, jobId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/jobs/${jId}`);
  }

  @api('<projectId>', '<pipelineId>', { options: true, method: 'GET' })
  showPipelineJobs(projectId, pipelineId, options) {
    const [pId, ppId] = [projectId, pipelineId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/pipelines/${ppId}/jobs`,
      options,
    );
  }
}

export default Jobs;
