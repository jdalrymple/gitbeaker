import { BaseResource } from '@gitbeaker/requester-utils';
import { lookup as mimeLookup } from 'mime-types';
import { RequestHelper, Sudo } from '../infrastructure';

export class PackageRegistry<C extends boolean = false> extends BaseResource<C> {
  publish(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    filename: string,
    content: string,
    { contentType, ...options }: { contentType?: string } & { status?: 'default' | 'hidden' } = {},
  ) {
    const pId = encodeURIComponent(projectId);
    const meta = { filename, contentType };

    if (!meta.contentType) meta.contentType = mimeLookup(meta.filename);

    return RequestHelper.put<{ message: string }>()(
      this,
      `projects/${pId}/packages/generic/${packageName}/${packageVersion}/${filename}`,
      {
        isForm: true,
        file: [content, meta],
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
