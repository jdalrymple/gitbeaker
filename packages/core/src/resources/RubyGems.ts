import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, createFormData, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export class RubyGems<C extends boolean = false> extends BaseResource<C> {
  allDependencies<E extends boolean = false>(
    projectId: string,
    options?: {
      gems?: string;
    } & Sudo &
      ShowExpanded<E>,
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
    options?: Sudo & ShowExpanded<E>,
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
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, `projects/${projectId}/packages/rubygems/api/v1/gems`, {
      sudo,
      showExpanded,
      body: createFormData({ file: [packageFile.content, packageFile.filename] }),
    });
  }
}
