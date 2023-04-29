import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { EitherOrNone, GitlabAPIResponse, ShowExpanded } from '../infrastructure';

export class Maven<C extends boolean = false> extends BaseResource<C> {
  downloadPackageFile<E extends boolean = false>(
    path: string,
    filename: string,
    {
      projectId,
      groupId,
      ...options
    }: EitherOrNone<{ projectId: string | number }, { groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    let url = endpoint`packages/maven/${path}/${filename}`;

    if (projectId) url = endpoint`projects/${projectId}/${url}`;
    else if (groupId) url = endpoint`groups/${groupId}/-/${url}`;

    return RequestHelper.get<Blob>()(this, url, options as ShowExpanded<E>);
  }

  uploadPackageFile<E extends boolean = false>(
    projectId: string | number,
    path: string,
    packageFile: { content: Blob; filename: string },
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.put<void>()(
      this,
      endpoint`projects/${projectId}/packages/maven/${path}/${packageFile.filename}`,
      {
        isForm: true,
        ...options,
        file: [packageFile.content, packageFile.filename],
      },
    );
  }
}
