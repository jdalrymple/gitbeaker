import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded } from '../infrastructure';

import { RequestHelper, endpoint, getPrefixedUrl } from '../infrastructure';

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

export class NPM<C extends boolean = false> extends BaseResource<C> {
  downloadPackageFile<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    filename: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/npm/${packageName}/-/${filename}`,
      {
        showExpanded,
      },
    );
  }

  removeDistTag<E extends boolean = false>(
    packageName: string,
    tag: string,
    options?: { projectId?: string | number } & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { showExpanded, projectId } = options || {};
    const prefix = getPrefixedUrl('packages/npm', { projects: projectId });

    return RequestHelper.del()(this, `${prefix}/-/package/${packageName}/dist-tags/${tag}`, {
      showExpanded,
    });
  }

  setDistTag<E extends boolean = false>(
    packageName: string,
    tag: string,
    options?: { projectId?: string | number } & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { showExpanded, projectId } = options || {};
    const prefix = getPrefixedUrl('packages/npm', { projects: projectId });

    return RequestHelper.put<void>()(this, `${prefix}/-/package/${packageName}/dist-tags/${tag}`, {
      showExpanded,
    });
  }

  showDistTags<E extends boolean = false>(
    packageName: string,
    options?: { projectId?: string | number } & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Record<string, string>, C, E, void>> {
    const { showExpanded, projectId } = options || {};
    const prefix = getPrefixedUrl('packages/npm', { projects: projectId });

    return RequestHelper.get<Record<string, string>>()(
      this,
      `${prefix}/-/package/${packageName}/dist-tags`,
      {
        showExpanded,
      },
    );
  }

  showMetadata<E extends boolean = false>(
    packageName: string,
    options?: { projectId?: string | number } & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NPMPackageMetadataSchema, C, E, void>> {
    const { showExpanded, projectId } = options || {};
    const prefix = getPrefixedUrl('packages/npm', { projects: projectId });

    return RequestHelper.get<NPMPackageMetadataSchema>()(this, `${prefix}/${packageName}`, {
      showExpanded,
    });
  }

  uploadPackageFile<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    versions: string,
    metadata: Record<string, unknown>,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Record<string, unknown>, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.put<Record<string, unknown>>()(
      this,
      endpoint`projects/${projectId}/packages/npm/${packageName}`,
      {
        showExpanded,
        body: {
          ...metadata,
          versions,
        },
      },
    );
  }
}
