import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface FreezePeriodSchema extends Record<string, unknown> {
  id: number;
  freeze_start: string;
  freeze_end: string;
  cron_timezone: string;
  created_at: string;
  updated_at: string;
}

export class FreezePeriods<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<FreezePeriodSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<FreezePeriodSchema[]>()(
      this,
      endpoint`projects/${projectId}/freeze_periods`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    freezeStart: string,
    freezeEnd: string,
    options?: { cronTimezone?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<FreezePeriodSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<FreezePeriodSchema>()(
      this,
      endpoint`projects/${projectId}/freeze_periods`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          freezeStart,
          freezeEnd,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    freezePeriodId: number,
    options?: {
      freezeStart?: string;
      freezeEnd?: string;
      cronTimezone?: string;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<FreezePeriodSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<FreezePeriodSchema>()(
      this,
      endpoint`projects/${projectId}/freeze_periods/${freezePeriodId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    freezePeriodId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/freeze_periods/${freezePeriodId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    freezePeriodId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<FreezePeriodSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<FreezePeriodSchema>()(
      this,
      endpoint`projects/${projectId}/freeze_periods/${freezePeriodId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
