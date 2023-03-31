import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { Either, GitlabAPIResponse, ShowExpanded } from '../infrastructure';

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

function url({
  projectId,
  groupId,
}: { projectId?: string | number; groupId?: string | number } = {}): string {
  if (projectId) return endpoint`/projects/${projectId}/packages/nuget`;
  if (groupId) return endpoint`/groups/${groupId}/-/packages/nuget`;

  throw new Error(
    'Missing required argument. Please supply a projectId or a groupId in the options parameter',
  );
}

export class NuGet<C extends boolean = false> extends BaseResource<C> {
  downloadPackageFile<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    filename: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/nuget/download/${packageName}/${packageVersion}/${filename}`,
      options,
    );
  }

  search<E extends boolean = false>(
    q: string,
    {
      projectId,
      groupId,
      ...options
    }: Either<{ projectId: string | number }, { groupId: string | number }> & {
      skip?: number;
      take?: number;
      prerelease?: boolean;
    } & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NuGetSearchResultsSchema, C, E, void>> {
    const uri = url({ projectId, groupId });
    return RequestHelper.get<NuGetSearchResultsSchema>()(this, `${uri}/query`, { q, ...options });
  }

  showMetadata<E extends boolean = false>(
    packageName: string,
    {
      projectId,
      groupId,
      ...options
    }: Either<{ projectId: string | number }, { groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NuGetServiceMetadataSchema, C, E, void>> {
    const uri = url({ projectId, groupId });

    return RequestHelper.get<NuGetServiceMetadataSchema>()(
      this,
      `${uri}/metadata/${packageName}/index`,
      options as ShowExpanded<E>,
    );
  }

  showPackageIndex<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NuGetPackageIndexSchema, C, E, void>> {
    return RequestHelper.get<NuGetPackageIndexSchema>()(
      this,
      endpoint`projects/${projectId}/packages/nuget/download/${packageName}/index`,
      options,
    );
  }

  showServiceIndex<E extends boolean = false>({
    projectId,
    groupId,
    ...options
  }: Either<{ projectId: string | number }, { groupId: string | number }> &
    ShowExpanded<E>): Promise<GitlabAPIResponse<NuGetServiceIndexSchema, C, E, void>> {
    const uri = url({ projectId, groupId });

    return RequestHelper.get<NuGetServiceIndexSchema>()(
      this,
      `${uri}/index`,
      options as ShowExpanded<E>,
    );
  }

  showVersionMetadata<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    {
      projectId,
      groupId,
      ...options
    }: Either<{ projectId: string | number }, { groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NuGetServiceMetadataVersionSchema, C, E, void>> {
    const uri = url({ projectId, groupId });

    return RequestHelper.get<NuGetServiceMetadataVersionSchema>()(
      this,
      `${uri}/metadata/${packageName}/${packageVersion}`,
      options as ShowExpanded<E>,
    );
  }

  uploadPackageFile<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    content: Blob,
    filename: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.put<void>()(this, endpoint`projects/${projectId}/packages/nuget`, {
      isForm: true,
      ...options,
      packageName,
      packageVersion,
      file: [content, filename],
    });
  }

  uploadSymbolPackage<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    content: Blob,
    filename: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.put<void>()(
      this,
      endpoint`projects/${projectId}/packages/nuget/symbolpackage`,
      {
        isForm: true,
        ...options,
        packageName,
        packageVersion,
        file: [content, filename],
      },
    );
  }
}
