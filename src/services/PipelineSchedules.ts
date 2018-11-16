import { BaseService, RequestHelper } from '../infrastructure';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  ProjectId,
  PipelineScheduleId,
} from '@typings';

class PipelineSchedules extends BaseService {
  all(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipeline_schedules`, options);
  }

  create(
    projectId: ProjectId,
    description: string,
    ref: string,
    cron: string,
    options?: BaseRequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipeline_schedules`, {
      description,
      ref,
      cron,
      ...options,
    });
  }

  edit(projectId: ProjectId, scheduleId: PipelineScheduleId, options?: BaseRequestOptions) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/pipeline_schedules/${sId}`, options);
  }

  remove(projectId: ProjectId, scheduleId: PipelineScheduleId, options?: Sudo) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/pipeline_schedules/${sId}`, options);
  }

  show(projectId: ProjectId, scheduleId: PipelineScheduleId, options?: Sudo) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/pipeline_schedules/${sId}`, options);
  }

  takeOwnership(projectId: ProjectId, scheduleId: PipelineScheduleId, options?: Sudo) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/pipeline_schedules/${sId}/take_ownership`,
      options,
    );
  }
}

export default PipelineSchedules;
