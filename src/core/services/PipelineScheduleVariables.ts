import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
} from '../infrastructure';

export class PipelineScheduleVariables extends BaseService {
  all(projectId: string | number, pipelineScheduleId: number, options?: PaginatedRequestOptions) {
    const [pId, psId] = [projectId, pipelineScheduleId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/pipeline_schedules/${psId}/variables`, options);
  }

  create(projectId: string | number, pipelineScheduleId: number, options?: BaseRequestOptions) {
    const [pId, psId] = [projectId, pipelineScheduleId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/pipeline_schedules/${psId}/variables`,
      options,
    );
  }

  edit(
    projectId: string | number,
    pipelineScheduleId: number,
    keyId: string,
    options?: BaseRequestOptions,
  ) {
    const [pId, psId, kId] = [projectId, pipelineScheduleId, keyId].map(encodeURIComponent);

    return RequestHelper.put(
      this,
      `projects/${pId}/pipeline_schedules/${psId}/variables/${kId}`,
      options,
    );
  }

  show(
    projectId: string | number,
    pipelineScheduleId: number,
    keyId: string,
    options?: BaseRequestOptions,
  ) {
    const [pId, psId, kId] = [projectId, pipelineScheduleId, keyId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/pipeline_schedules/${psId}/variables/${kId}`,
      options,
    );
  }

  remove(
    projectId: string | number,
    pipelineScheduleId: number,
    keyId: string,
    options?: BaseRequestOptions,
  ) {
    const [pId, psId, kId] = [projectId, pipelineScheduleId, keyId].map(encodeURIComponent);

    return RequestHelper.del(
      this,
      `projects/${pId}/pipeline_schedules/${psId}/variables/${kId}`,
      options,
    );
  }
}
