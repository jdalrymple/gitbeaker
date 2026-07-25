import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface DependencyVulnerability {
  name: string;
  severity: string;
  id: number;
  url: string;
}

export interface DependencyLicense {
  name: string;
  url: string;
}

export interface DependencySchema extends Record<string, unknown> {
  name: string;
  version: string;
  package_manager: string;
  dependency_file_path: string;
  vulnerabilities: DependencyVulnerability[];
  licenses: DependencyLicense[];
}

export class Dependencies<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: {
      package_manager?: string | string[];
    } & PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<DependencySchema[], C, E, P>> {
    const { showExpanded, sudo, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<DependencySchema[]>()(
      this,
      endpoint`projects/${projectId}/dependencies`,
      {
        showExpanded,
        sudo,
        searchParams,
        maxPages,
      },
    );
  }
}
