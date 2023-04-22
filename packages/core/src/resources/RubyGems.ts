import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded } from '../infrastructure';

export class PyPI<C extends boolean = false> extends BaseResource<C> {
  allDependencies<E extends boolean = false>(
    projectId: string,
    options?: { gems?: string } & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, void, E, void>> {
    return RequestHelper.get<string>()(
      this,
      endpoint`projects/${projectId}/packages/rubygems/api/v1/dependencies`,
      options,
    );
  }

  downloadGemFile<E extends boolean = false>(
    projectId: string,
    fileName: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/rubygems/gems/${fileName}`,
      options,
    );
  }

  uploadGemFile<E extends boolean = false>(
    projectId: string | number,
    packageFile: { content: Blob; filename: string },
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, `projects/${projectId}/packages/rubygems/api/v1/gems`, {
      isForm: true,
      ...options,
      file: [packageFile.content, packageFile.filename],
    });
  }
}
