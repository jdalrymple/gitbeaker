import type { GitlabAPIResponse, OneOf, ShowExpanded, Sudo } from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import {
  RequestHelper,
  createFormData,
  endpoint,
  ensureRequiredParams,
  getPrefixedUrl,
} from '../infrastructure';

export class PyPI<C extends boolean = false> extends BaseResource<C> {
  downloadPackageFile<E extends boolean = false>(
    sha: string,
    fileIdentifier: string,
    {
      projectId,
      groupId,
      ...options
    }: OneOf<{ projectId: string | number; groupId: string | number }> &
      ShowExpanded<E> &
      Sudo = {} as any,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const url = getPrefixedUrl(endpoint`/packages/pypi/files/${sha}/${fileIdentifier}`, {
      projects: projectId,
      groups: groupId,
    });

    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<Blob>()(this, url, {
      sudo,
      showExpanded,
    });
  }

  showPackageDescriptor<E extends boolean = false>(
    packageName: string,
    {
      projectId,
      groupId,
      ...options
    }: OneOf<{ projectId: string | number; groupId: string | number }> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const url = getPrefixedUrl(endpoint`/packages/pypi/simple/${packageName}`, {
      projects: projectId,
      groups: groupId,
    });

    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<string>()(this, url, {
      sudo,
      showExpanded,
    });
  }

  uploadPackageFile<E extends boolean = false>(
    projectId: string | number,
    packageFile: { content: Blob; filename: string },
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<void>()(this, endpoint`projects/${projectId}/packages/pypi`, {
      sudo,
      showExpanded,
      body: createFormData({ file: [packageFile.content, packageFile.filename] }),
    });
  }
}
