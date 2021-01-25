import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class PipelineSchedules<C extends boolean> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<C>(this, `projects/${pId}/pipeline_schedules`, options);
  }

  create(
    projectId: string | number,
    description: string,
    ref: string,
    cron: string,
    options?: BaseRequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<C>(this, `projects/${pId}/pipeline_schedules`, {
      description,
      ref,
      cron,
      ...options,
    });
  }

  edit(projectId: string | number, scheduleId: number, options?: BaseRequestOptions) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.put<C>(this, `projects/${pId}/pipeline_schedules/${sId}`, options);
  }

  remove(projectId: string | number, scheduleId: number, options?: Sudo) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.del<C>(this, `projects/${pId}/pipeline_schedules/${sId}`, options);
  }

  show(projectId: string | number, scheduleId: number, options?: Sudo) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.get<C>(this, `projects/${pId}/pipeline_schedules/${sId}`, options);
  }

  takeOwnership(projectId: string | number, scheduleId: number, options?: Sudo) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.post<C>(
      this,
      `projects/${pId}/pipeline_schedules/${sId}/take_ownership`,
      options,
    );
  }
}
