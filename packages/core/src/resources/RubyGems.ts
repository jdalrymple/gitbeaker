import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, createFormData, endpoint } from '../infrastructure';

export class RubyGems<C extends boolean = false> extends BaseResource<C> {
  allDependencies<E extends boolean = false>(
    projectId: string,
    options?: {
      gems?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<string, void, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<string>()(
      this,
      endpoint`projects/${projectId}/packages/rubygems/api/v1/dependencies`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  downloadGemFile<E extends boolean = false>(
    projectId: string,
    fileName: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/rubygems/gems/${fileName}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  uploadGemFile<E extends boolean = false>(
    projectId: string | number,
    packageFile: { content: Blob; filename: string },
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, `projects/${projectId}/packages/rubygems/api/v1/gems`, {
      sudo,
      showExpanded,
      body: createFormData({ file: [packageFile.content, packageFile.filename] }),
    });
  }
}
