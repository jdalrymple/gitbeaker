import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

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
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<FreezePeriodSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<FreezePeriodSchema[]>()(
      this,
      endpoint`projects/${projectId}/freeze_periods`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as BaseRequestSearchParams &
          PaginationRequestSearchParams<P> &
          PaginationType<P>,
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    freezeStart: string,
    freezeEnd: string,
    options?: { cronTimezone?: string } & ShowExpanded<E> & Sudo,
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
    } & ShowExpanded<E> &
      Sudo,
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
    options?: ShowExpanded<E> & Sudo,
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
    options?: ShowExpanded<E> & Sudo,
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
