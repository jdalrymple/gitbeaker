import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface ErrorTrackingClientKeySchema extends Record<string, unknown> {
  id: number;
  active: boolean;
  public_key: string;
  sentry_dsn: string;
}

export class ErrorTrackingClientKeys<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ErrorTrackingClientKeySchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ErrorTrackingClientKeySchema[]>()(
      this,
      endpoint`projects/${projectId}/error_tracking/client_keys`,
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
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ErrorTrackingClientKeySchema, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.post<ErrorTrackingClientKeySchema>()(
      this,
      endpoint`projects/${projectId}/error_tracking/client_keys`,
      {
        showExpanded,
        sudo,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/error_tracking/client_keys`, {
      showExpanded,
      sudo,
    });
  }
}
