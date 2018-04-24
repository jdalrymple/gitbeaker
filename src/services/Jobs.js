import { BaseService, RequestHelper } from '../infrastructure';

class Jobs extends BaseService {
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/jobs`, options);
  }

  play(projectId, jobId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/jobs/${jobId}/play`);
  }

  downloadSingleArtifactFile(projectId, jobId, artifactPath) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/jobs/${jobId}/artifacts/${artifactPath}`);
  }

  downloadSingleArtifactFileStream(projectId, jobId, artifactPath) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.streamGet(this, `projects/${pId}/jobs/${jobId}/artifacts/${artifactPath}`);
  }

  showPipelineJobs(projectId, pipelineId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${pipelineId}/jobs`, options);
  }
}

export default Jobs;
