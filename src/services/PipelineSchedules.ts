import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

type PipelineScheduleId = string | number;

class PipelineSchedules extends BaseService {
  all(projectId: ProjectId, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipeline_schedules`, options);
  }

  create(
    projectId: ProjectId,
    description: string,
    ref: string,
    cron: temporaryAny,
    options: RequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipeline_schedules`, {
      description,
      ref,
      cron,
      ...options,
    });
  }

  edit(projectId: ProjectId, scheduleId: PipelineScheduleId, options: RequestOptions) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/pipeline_schedules/${sId}`, options);
  }

  remove(projectId: ProjectId, scheduleId: PipelineScheduleId) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/pipeline_schedules/${sId}`);
  }

  show(projectId: ProjectId, scheduleId: PipelineScheduleId) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/pipeline_schedules/${sId}`);
  }

  takeOwnership(projectId: ProjectId, scheduleId: PipelineScheduleId) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/pipeline_schedules/${sId}/take_ownership`);
  }
}

export default PipelineSchedules;
