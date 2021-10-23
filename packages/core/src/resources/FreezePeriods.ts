import { BaseResource } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, RequestHelper, Camelize, endpoint } from '../infrastructure';

export interface FreezePeriodSchema extends Record<string, unknown> {
  id: number;
  freeze_start: string;
  freeze_end: string;
  cron_timezone: string;
  created_at: string;
  updated_at: string;
}

export class FreezePeriods<C extends boolean = false> extends BaseResource<C> {
  all(projectId: string | number, options?: BaseRequestOptions) {
    return RequestHelper.get<FreezePeriodSchema[]>()(
      this,
      endpoint`projects/${projectId}/freeze_periods`,
      options,
    );
  }

  show(projectId: string | number, freezePeriodId: number, options?: BaseRequestOptions) {
    return RequestHelper.get<FreezePeriodSchema>()(
      this,
      endpoint`projects/${projectId}/freeze_periods/${freezePeriodId}`,
      options,
    );
  }

  create(
    projectId: number | string,
    freezeStart: string,
    freezeEnd: string,
    options?: Camelize<Pick<FreezePeriodSchema, 'cron_timezone'>> & BaseRequestOptions,
  ) {
    return RequestHelper.post<FreezePeriodSchema>()(
      this,
      endpoint`projects/${projectId}/freeze_periods`,
      {
        freezeStart,
        freezeEnd,
        ...options,
      },
    );
  }

  edit(
    projectId: number | string,
    freezePeriodId: number,
    options?: Camelize<Omit<FreezePeriodSchema, 'id' | 'created_at' | 'updated_at'>> &
      BaseRequestOptions,
  ) {
    return RequestHelper.put<FreezePeriodSchema>()(
      this,
      endpoint`projects/${projectId}/freeze_periods/${freezePeriodId}`,
      options,
    );
  }

  delete(projectId: number | string, freezePeriodId: number, options?: BaseRequestOptions) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/freeze_periods/${freezePeriodId}`,
      options,
    );
  }
}
