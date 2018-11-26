import { BaseService, RequestHelper } from '../infrastructure';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';
import { RequestOptions } from '../infrastructure/RequestHelper';

class PipelineScheduleVariables extends BaseService {
  all(projectId: ProjectId, pipelineScheduleId: PipelineScheduleId) {
    const [pId, psId] = [projectId, pipelineScheduleId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/pipeline_schedules/${psId}/variables`);
  }

  create(projectId: ProjectId, pipelineScheduleId: PipelineScheduleId, options: RequestOptions) {
    const [pId, psId] = [projectId, pipelineScheduleId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/pipeline_schedules/${psId}/variables`,
      options,
    );
  }

  edit(
    projectId: ProjectId,
    pipelineScheduleId: PipelineScheduleId,
    keyId: string,
    options: RequestOptions,
  ) {
    const [pId, psId, kId] = [projectId, pipelineScheduleId, keyId].map(encodeURIComponent);

    return RequestHelper.put(
      this,
      `projects/${pId}/pipeline_schedules/${psId}/variables/${kId}`,
      options,
    );
  }

  show(projectId: ProjectId, pipelineScheduleId: PipelineScheduleId, keyId: string) {
    const [pId, psId, kId] = [projectId, pipelineScheduleId, keyId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/pipeline_schedules/${psId}/variables/${kId}`);
  }

  remove(projectId: ProjectId, pipelineScheduleId: PipelineScheduleId, keyId: string) {
    const [pId, psId, kId] = [projectId, pipelineScheduleId, keyId].map(encodeURIComponent);

    return RequestHelper.delete(
      this,
      `projects/${pId}/pipeline_schedules/${psId}/variables/${kId}`,
    );
  }
}

export default PipelineScheduleVariables;
