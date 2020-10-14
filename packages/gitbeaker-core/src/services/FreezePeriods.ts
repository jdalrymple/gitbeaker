import { BaseService } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, RequestHelper } from '../infrastructure';

export interface CreateFreezePeriodOptions {
  cronTimezone?: string;
}

export interface EditFreezePeriodOptions {
  cronTimezone?: string;
  freezeStart?: string;
  freezeEnd?: string;
}

export class FreezePeriods extends BaseService {
  all(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/freeze_periods`, options);
  }

  show(projectId: string | number, freezePeriodId: number, options?: BaseRequestOptions) {
    const [pId, fId] = [projectId, freezePeriodId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/freeze_periods/${fId}`, options);
  }

  create(
    projectId: number | string,
    freezeStart: string,
    freezeEnd: string,
    options?: CreateFreezePeriodOptions & BaseRequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/freeze_periods`, {
      freezeStart,
      freezeEnd,
      ...options,
    });
  }

  edit(
    projectId: number | string,
    freezePeriodId: number,
    options?: EditFreezePeriodOptions & BaseRequestOptions,
  ) {
    const [pId, fId] = [projectId, freezePeriodId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/freeze_periods/${fId}`, options);
  }

  delete(projectId: number | string, freezePeriodId: number, options?: BaseRequestOptions) {
    const [pId, fId] = [projectId, freezePeriodId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/freeze_periods/${fId}`, options);
  }
}
