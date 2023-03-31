import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded } from '../infrastructure';

export interface NPMVersionSchema {
  name: string;
  version: string;
  dist: {
    shasum: string;
    tarball: string;
  };
}

export interface NPMPackageMetadataSchema extends Record<string, unknown> {
  name: string;
  versions: {
    [version: string]: NPMVersionSchema;
  };
  'dist-tags': {
    [tag: string]: string;
  };
}

function url(projectId?: string | number): string {
  return projectId ? endpoint`/projects/${projectId}/packages/npm` : 'packages/npm';
}

export class NPM<C extends boolean = false> extends BaseResource<C> {
  downloadPackageFile<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    filename: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/npm/${packageName}/-/${filename}`,
      options,
    );
  }

  removeDistTag<E extends boolean = false>(
    packageName: string,
    tag: string,
    options?: { projectId?: string | number } & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const prefix = url(options?.projectId);

    return RequestHelper.del()(
      this,
      `${prefix}/-/package/${packageName}/dist-tags/${tag}`,
      options,
    );
  }

  setDistTag<E extends boolean = false>(
    packageName: string,
    tag: string,
    options?: { projectId?: string | number } & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const prefix = url(options?.projectId);

    return RequestHelper.put<void>()(
      this,
      `${prefix}/-/package/${packageName}/dist-tags/${tag}`,
      options,
    );
  }

  showDistTags<E extends boolean = false>(
    packageName: string,
    options?: { projectId?: string | number } & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Record<string, string>, C, E, void>> {
    const prefix = url(options?.projectId);

    return RequestHelper.get<Record<string, string>>()(
      this,
      `${prefix}/-/package/${packageName}/dist-tags`,
      options,
    );
  }

  showMetadata<E extends boolean = false>(
    packageName: string,
    options?: { projectId?: string | number } & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NPMPackageMetadataSchema, C, E, void>> {
    const prefix = url(options?.projectId);

    return RequestHelper.get<NPMPackageMetadataSchema>()(this, `${prefix}/${packageName}`, options);
  }

  uploadPackageFile<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    versions: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Record<string, unknown>, C, E, void>> {
    return RequestHelper.put<Record<string, unknown>>()(
      this,
      endpoint`projects/${projectId}/packages/npm/${packageName}`,
      {
        versions,
        ...options,
      },
    );
  }
}
