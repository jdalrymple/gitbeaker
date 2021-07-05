import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo } from '../infrastructure';

export class PackageRegistry<C extends boolean = false> extends BaseResource<C> {
  publish(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    filename: string,
    content: string,
    options?: { status?: 'default' | 'hidden' },
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put<{ message: string }>()(
      this,
      `projects/${pId}/packages/generic/${packageName}/${packageVersion}/${filename}`,
      {
        isForm: true,
        file: [content, { filename }],
        ...options,
      },
    );
  }

  download(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    filename: string,
    options?: Sudo,
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<{ message: string }>()(
      this,
      `projects/${pId}/packages/generic/${packageName}/${packageVersion}/${filename}`,
      options,
    );
  }
}
