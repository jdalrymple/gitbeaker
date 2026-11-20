import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, OneOrNoneOf, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper } from '../infrastructure';
import { createFormData, getPrefixedUrl } from '../infrastructure';

export class Maven<C extends boolean = false> extends BaseResource<C> {
  downloadPackageFile<E extends boolean = false>(
    path: string,
    filename: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { projectId, groupId, sudo, showExpanded } = options || {};
    const url = getPrefixedUrl(`packages/maven/${path}/${filename}`, {
      projects: projectId,
      groups: groupId,
      '-': !!groupId,
    });

    return RequestHelper.get<Blob>()(this, url, { sudo, showExpanded });
  }

  uploadPackageFile<E extends boolean = false>(
    projectId: string | number,
    path: string,
    packageFile: { content: Blob; filename: string },
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<void>()(
      this,
      getPrefixedUrl(`packages/maven/${path}/${packageFile.filename}`, { projects: projectId }),
      {
        sudo,
        showExpanded,
        body: createFormData({
          file: [packageFile.content, packageFile.filename],
        }),
      },
    );
  }
}
