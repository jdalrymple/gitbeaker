import { BaseService, RequestHelper } from '../infrastructure';

class PipelineSchedules extends BaseService {
  all(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipeline_schedules`, options);
  }

  create(projectId: ProjectId, description, ref, cron, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipeline_schedules`, {
      description,
      ref,
      cron,
      ...options,
    });
  }

  edit(projectId: ProjectId, scheduleId, options) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/pipeline_schedules/${sId}`, options);
  }

  remove(projectId: ProjectId, scheduleId) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/pipeline_schedules/${sId}`);
  }

  show(projectId: ProjectId, scheduleId) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/pipeline_schedules/${sId}`);
  }

  takeOwnership(projectId: ProjectId, scheduleId) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/pipeline_schedules/${sId}/take_ownership`);
  }
}

export default PipelineSchedules;
