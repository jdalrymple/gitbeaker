import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { Either, GitlabAPIResponse, ShowExpanded } from '../infrastructure';

export class PyPI<C extends boolean = false> extends BaseResource<C> {
  downloadPackageFile<E extends boolean = false>(
    sha: string,
    fileIdentifier: string,
    {
      projectId,
      groupId,
      ...options
    }: Either<{ projectId: string | number }, { groupId: string | number }> &
      ShowExpanded<E> = {} as any,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    let url: string;

    if (projectId) {
      url = endpoint`projects/${projectId}/packages/pypi/files/${sha}/${fileIdentifier}`;
    } else if (groupId) {
      url = endpoint`groups/${groupId}/packages/pypi/files/${sha}/${fileIdentifier}`;
    } else {
      throw new Error(
        'Missing required argument. Please supply a projectId or a groupId in the options parameter',
      );
    }

    return RequestHelper.get<Blob>()(this, url, options);
  }

  showPackageDescriptor<E extends boolean = false>(
    packageName: string,
    {
      projectId,
      groupId,
      ...options
    }: Either<{ projectId: string | number }, { groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    let url: string;

    if (projectId) {
      url = endpoint`projects/${projectId}/packages/pypi/simple/${packageName}`;
    } else if (groupId) {
      url = endpoint`groups/${groupId}/packages/pypi/simple/${packageName}`;
    } else {
      throw new Error(
        'Missing required argument. Please supply a projectId or a groupId in the options parameter',
      );
    }

    return RequestHelper.get<string>()(this, url, options);
  }

  uploadPackageFile<E extends boolean = false>(
    projectId: string | number,
    packageFile: { content: Blob; filename: string },
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.put<void>()(this, endpoint`projects/${projectId}/packages/pypi`, {
      ...options,
      isForm: true,
      file: [packageFile.content, packageFile.filename],
    });
  }
}
