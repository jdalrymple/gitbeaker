import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export class PackageRegistry<C extends boolean = false> extends BaseResource<C> {
  publish<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    packageFile: { content: Blob; filename: string },
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<{ message: string }>()(
      this,
      endpoint`projects/${projectId}/packages/generic/${packageName}/${packageVersion}/${packageFile.filename}`,
      {
        sudo,
        showExpanded,
        body: packageFile.content,
      },
    );
  }

  download<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    filename: string,
    options?: Sudo & ShowExpanded<E>,
  ) {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<{ message: string }>()(
      this,
      endpoint`projects/${projectId}/packages/generic/${packageName}/${packageVersion}/${filename}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
