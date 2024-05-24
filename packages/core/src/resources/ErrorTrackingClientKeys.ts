import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface ErrorTrackingClientKeySchema extends Record<string, unknown> {
  id: number;
  active: boolean;
  public_key: string;
  sentry_dsn: string;
}

export class ErrorTrackingClientKeys<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ErrorTrackingClientKeySchema[], C, E, P>> {
    return RequestHelper.get<ErrorTrackingClientKeySchema[]>()(
      this,
      endpoint`projects/${projectId}/error_tracking/client_keys`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ErrorTrackingClientKeySchema, C, E, void>> {
    return RequestHelper.post<ErrorTrackingClientKeySchema>()(
      this,
      endpoint`projects/${projectId}/error_tracking/client_keys`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/error_tracking/client_keys`,
      options,
    );
  }
}
