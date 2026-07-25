import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, OneOf, ShowExpanded, Sudo } from '../infrastructure';

import {
  RequestHelper,
  createFormData,
  endpoint,
  ensureRequiredParams,
  getPrefixedUrl,
  normalizeFormData,
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
    options?: {
      requiresPython?: string;
      sha256Digest?: string;
      name?: string;
      version?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<void>()(this, endpoint`projects/${projectId}/packages/pypi`, {
      sudo,
      showExpanded,
      body: createFormData(
        normalizeFormData({
          ...body,
          content: [packageFile.content, packageFile.filename],
        }),
      ),
    });
  }

  allPackages<E extends boolean = false>({
    projectId,
    groupId,
    ...options
  }: OneOf<{ projectId: string | number; groupId: string | number }> &
    ShowExpanded<E> &
    Sudo): Promise<GitlabAPIResponse<string, C, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const url = getPrefixedUrl('packages/pypi/simple', {
      projects: projectId,
      groups: groupId ? `${groupId}/-` : undefined,
    });

    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<string>()(this, url, {
      sudo,
      showExpanded,
    });
  }
}
