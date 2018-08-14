import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class PipelineSchedules extends BaseService {
  @api('<projectId>', { options: true, method: 'GET' })
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipeline_schedules`, options);
  }

  @api('<projectId>', '<description>', '<ref>', '<cron>', { options: true, method: 'POST' })
  create(projectId, description, ref, cron, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipeline_schedules`, {
      description,
      ref,
      cron,
      ...options,
    });
  }

  @api('<projectId>', '<scheduleId>', { options: true, method: 'PUT' })
  edit(projectId, scheduleId, options) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/pipeline_schedules/${sId}`, options);
  }

  @api('<projectId>', '<scheduleId>', { method: 'DELETE' })
  remove(projectId, scheduleId) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/pipeline_schedules/${sId}`);
  }

  @api('<projectId>', '<scheduleId>', { method: 'GET' })
  show(projectId, scheduleId) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/pipeline_schedules/${sId}`);
  }

  @api('<projectId>', '<scheduleId>', { method: 'POST' })
  takeOwnership(projectId, scheduleId) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/pipeline_schedules/${sId}/take_ownership`);
  }
}

export default PipelineSchedules;
