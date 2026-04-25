import type { GitlabAPIResponse, OneOf, ShowExpanded } from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import {
  RequestHelper,
  createFormData,
  endpoint,
  ensureRequiredParams,
  getPrefixedUrl,
} from '../infrastructure';

export interface NuGetPackageIndexSchema extends Record<string, unknown> {
  versions: string[];
}

export interface NuGetResourceSchema extends Record<string, unknown> {
  '@id': string;
  '@type': string;
  comment: string;
}

export interface NuGetServiceIndexSchema extends Record<string, unknown> {
  version: string;
  resources: NuGetResourceSchema[];
}

export interface NuGetServiceMetadataVersionSchema extends Record<string, unknown> {
  '@id': string;
  packageContent: string;
  catalogEntry: {
    '@id': string;
    authors: string;
    dependencyGroups: unknown[];
    id: string;
    version: string;
    tags: string;
    packageContent: string;
    summary: string;
  };
}

export interface NuGetServiceMetadataItemSchema extends Record<string, unknown> {
  '@id': string;
  lower: string;
  upper: string;
  count: number;
  items: NuGetServiceMetadataVersionSchema;
}

export interface NuGetServiceMetadataSchema extends Record<string, unknown> {
  count: number;
  items: NuGetServiceMetadataItemSchema[];
  resources: NuGetResourceSchema[];
}

export interface NuGetSearchResultSchema extends Record<string, unknown> {
  '@type': string;
  authors: string;
  id: string;
  title: string;
  version: string;
  verified: boolean;
  summary: string;
  totalDownloads: number;
  versions: {
    '@id': string;
    version: string;
    download: number;
  }[];
}

export interface NuGetSearchResultsSchema extends Record<string, unknown> {
  totalHits: number;
  data: NuGetSearchResultSchema[];
}

export class NuGet<C extends boolean = false> extends BaseResource<C> {
  downloadPackageFile<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    filename: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/nuget/download/${packageName}/${packageVersion}/${filename}`,
      {
        showExpanded,
      },
    );
  }

  search<E extends boolean = false>(
    q: string,
    options: {
      skip?: number;
      take?: number;
      prerelease?: boolean;
    } & OneOf<{ projectId: string | number; groupId: string | number }> &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NuGetSearchResultsSchema, C, E, void>> {
    const { projectId, groupId, showExpanded, ...searchParams } = options;

    ensureRequiredParams({ projectId, groupId });
    const uri = getPrefixedUrl('packages/nuget', { projects: projectId, 'groups/-': groupId });

    return RequestHelper.get<NuGetSearchResultsSchema>()(this, `${uri}/query`, {
      showExpanded,
      searchParams: {
        ...searchParams,
        q,
      },
    });
  }

  showMetadata<E extends boolean = false>(
    packageName: string,
    options: OneOf<{ projectId: string | number; groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NuGetServiceMetadataSchema, C, E, void>> {
    const { projectId, groupId, showExpanded } = options;

    ensureRequiredParams({ projectId, groupId });

    const uri = getPrefixedUrl('packages/nuget', { projects: projectId, 'groups/-': groupId });

    return RequestHelper.get<NuGetServiceMetadataSchema>()(
      this,
      `${uri}/metadata/${packageName}/index`,
      {
        showExpanded,
      },
    );
  }

  showPackageIndex<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NuGetPackageIndexSchema, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<NuGetPackageIndexSchema>()(
      this,
      endpoint`projects/${projectId}/packages/nuget/download/${packageName}/index`,
      {
        showExpanded,
      },
    );
  }

  showServiceIndex<E extends boolean = false>(
    options: OneOf<{ projectId: string | number; groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NuGetServiceIndexSchema, C, E, void>> {
    const { projectId, groupId, showExpanded } = options;

    ensureRequiredParams({ projectId, groupId });

    const uri = getPrefixedUrl('packages/nuget', { projects: projectId, 'groups/-': groupId });

    return RequestHelper.get<NuGetServiceIndexSchema>()(this, `${uri}/index`, {
      showExpanded,
    });
  }

  showVersionMetadata<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    options: OneOf<{ projectId: string | number; groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NuGetServiceMetadataVersionSchema, C, E, void>> {
    const { projectId, groupId, showExpanded } = options;

    ensureRequiredParams({ projectId, groupId });

    const uri = getPrefixedUrl('packages/nuget', { projects: projectId, 'groups/-': groupId });

    return RequestHelper.get<NuGetServiceMetadataVersionSchema>()(
      this,
      `${uri}/metadata/${packageName}/${packageVersion}`,
      {
        showExpanded,
      },
    );
  }

  uploadPackageFile<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    packageFile: { content: Blob; filename: string },
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { showExpanded, ...body } = options || {};

    return RequestHelper.put<void>()(this, endpoint`projects/${projectId}/packages/nuget`, {
      showExpanded,
      body: createFormData({
        ...body,
        packageName,
        packageVersion,
        file: [packageFile.content, packageFile.filename],
      }),
    });
  }

  uploadSymbolPackage<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    packageFile: { content: Blob; filename: string },
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { showExpanded, ...body } = options || {};

    return RequestHelper.put<void>()(
      this,
      endpoint`projects/${projectId}/packages/nuget/symbolpackage`,
      {
        showExpanded,
        body: createFormData({
          ...body,
          packageName,
          packageVersion,
          file: [packageFile.content, packageFile.filename],
        }),
      },
    );
  }
}
