import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface PendingMigrationSchema extends Record<string, unknown> {
  version: number;
  name: string;
  filename: string;
  status: string;
}

export interface PendingMigrationsResponseSchema extends Record<string, unknown> {
  pending_migrations: PendingMigrationSchema[];
  database: string;
  total_pending: number;
}

export class DatabaseMigrations<C extends boolean = false> extends BaseResource<C> {
  markAsSuccessful<E extends boolean = false>(
    version: number,
    options?: {
      database?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.post<void>()(this, endpoint`admin/migrations/${version}/mark`, {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  showPending<E extends boolean = false>(
    options?: {
      database?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<PendingMigrationsResponseSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<PendingMigrationsResponseSchema>()(this, 'admin/migrations/pending', {
      sudo,
      showExpanded,
      searchParams,
    });
  }
}
