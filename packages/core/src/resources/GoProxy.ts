import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface GoProxyModuleVersionSchema extends Record<string, unknown> {
  Version: string;
  Time: string;
}

export class GoProxy<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    projectId: string | number,
    moduleName: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<string>()(
      this,
      endpoint`projects/${projectId}/packages/go/${moduleName}/@v/list`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showVersionMetadata<E extends boolean = false>(
    projectId: string | number,
    moduleName: string,
    moduleVersion: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GoProxyModuleVersionSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<GoProxyModuleVersionSchema>()(
      this,
      endpoint`projects/${projectId}/packages/go/${moduleName}/@v/${moduleVersion}.info`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  downloadModuleFile<E extends boolean = false>(
    projectId: string | number,
    moduleName: string,
    moduleVersion: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/go/${moduleName}/@v/${moduleVersion}.mod`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  downloadModuleSource<E extends boolean = false>(
    projectId: string | number,
    moduleName: string,
    moduleVersion: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/go/${moduleName}/@v/${moduleVersion}.zip`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
