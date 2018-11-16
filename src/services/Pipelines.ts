import { BaseService, RequestHelper } from '../infrastructure';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  ProjectId,
  PipelineId,
  JobScope,
} from '@typings';

class Pipelines extends BaseService {
  all(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines`, options);
  }

  create(projectId: ProjectId, ref: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipeline`, { ref, ...options });
  }

  show(projectId: ProjectId, pipelineId: PipelineId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${pipelineId}`, options);
  }

  retry(projectId: ProjectId, pipelineId: PipelineId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipelines/${pipelineId}/retry`, options);
  }

  cancel(projectId: ProjectId, pipelineId: PipelineId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipelines/${pipelineId}/cancel`, options);
  }

  showJobs(projectId: ProjectId, pipelineId: PipelineId, options: { scope: JobScope } & Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${pipelineId}/jobs`, options);
  }
}

export default Pipelines;
