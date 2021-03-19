import { BaseService } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, RequestHelper, Camelize } from '../infrastructure';

export interface FreezePeriodSchema extends Record<string, unknown> {
  id: number;
  freeze_start: string;
  freeze_end: string;
  cron_timezone: string;
  created_at: string;
  updated_at: string;
}

export class FreezePeriods<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<FreezePeriodSchema[]>()(
      this,
      `projects/${pId}/freeze_periods`,
      options,
    );
  }

  show(projectId: string | number, freezePeriodId: number, options?: BaseRequestOptions) {
    const [pId, fId] = [projectId, freezePeriodId].map(encodeURIComponent);

    return RequestHelper.get<FreezePeriodSchema>()(
      this,
      `projects/${pId}/freeze_periods/${fId}`,
      options,
    );
  }

  create(
    projectId: number | string,
    freezeStart: string,
    freezeEnd: string,
    options?: Camelize<Pick<FreezePeriodSchema, 'cron_timezone'>> & BaseRequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<FreezePeriodSchema>()(this, `projects/${pId}/freeze_periods`, {
      freezeStart,
      freezeEnd,
      ...options,
    });
  }

  edit(
    projectId: number | string,
    freezePeriodId: number,
    options?: Camelize<Exclude<FreezePeriodSchema, 'id' | 'created_at' | 'updated_at'>> &
      BaseRequestOptions,
  ) {
    const [pId, fId] = [projectId, freezePeriodId].map(encodeURIComponent);

    return RequestHelper.put<FreezePeriodSchema>()(
      this,
      `projects/${pId}/freeze_periods/${fId}`,
      options,
    );
  }

  delete(projectId: number | string, freezePeriodId: number, options?: BaseRequestOptions) {
    const [pId, fId] = [projectId, freezePeriodId].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/freeze_periods/${fId}`, options);
  }
}
