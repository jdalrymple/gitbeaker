import { BaseService, RequestHelper } from '../infrastructure';

class Jobs extends BaseService {
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/jobs`, options);
  }

  play(projectId, jobId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/jobs/${jobId}/play`);
  }

  downloadSingleArtifactFile(projectId, jobId, artifactPath, { stream }) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/jobs/${jobId}/artifacts/${artifactPath}`, {}, { stream });
  }

  show(projectId, jobId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/jobs/${jobId}`);
  }

  showPipelineJobs(projectId, pipelineId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${pipelineId}/jobs`, options);
  }
}

export default Jobs;
