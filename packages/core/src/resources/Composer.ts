import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded } from '../infrastructure';

export interface ComposerV1BaseRepositorySchema extends Record<string, unknown> {
  packages?: string[];
  'metadata-url': string;
  'provider-includes': Record<string, Record<string, string>>;
  'providers-url': string;
}

export interface ComposerV2BaseRepositorySchema extends Record<string, unknown> {
  packages?: string[];
  'metadata-url': string;
}

export interface ComposerV1PackagesSchema extends Record<string, unknown> {
  providers: {
    [name: string]: {
      sha256: string;
    };
  };
}

export interface PackageMetadata {
  name: string;
  type: string;
  license: string;
  version: string;
  dist: {
    type: string;
    url: string;
    reference: string;
    shasum: string;
  };
  source: {
    type: string;
    url: string;
    reference: string;
  };
  uid: number;
}

export interface ComposerPackageMetadataSchema extends Record<string, unknown> {
  packages: {
    [name: string]: {
      [version: string]: PackageMetadata;
    };
  };
}

export class Composer<C extends boolean = false> extends BaseResource<C> {
  create<E extends boolean = false>(
    projectId: string | number,
    options?: { tag?: string; branch?: string } & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    return RequestHelper.post<{ message: string }>()(
      this,
      endpoint`projects/${projectId}/packages/composer`,
      options,
    );
  }

  download<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    sha: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/composer/archives/${packageName}`,
      {
        searchParams: { sha },
        ...options,
      },
    );
  }

  showMetadata<E extends boolean = false>(
    groupId: string | number,
    packageName: string,
    options?: { sha?: string } & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ComposerPackageMetadataSchema, C, E, void>> {
    let url: string;

    if (options && options.sha) {
      url = endpoint`groups/${groupId}/-/packages/composer/${packageName}$${options.sha}`;
    } else {
      url = endpoint`groups/${groupId}/-/packages/composer/p2/${packageName}`;
    }

    return RequestHelper.get<ComposerPackageMetadataSchema>()(this, url, options);
  }

  showPackages<E extends boolean = false>(
    groupId: string | number,
    sha: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ComposerV1PackagesSchema, C, E, void>> {
    return RequestHelper.get<ComposerV1PackagesSchema>()(
      this,
      endpoint`groups/${groupId}/-/packages/composer/p/${sha}`,
      options,
    );
  }

  showBaseRepository<E extends boolean = false>(
    groupId: string | number,
    options?: { composerVersion: '1' } & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ComposerV1BaseRepositorySchema, C, E, void>>;

  showBaseRepository<E extends boolean = false>(
    groupId: string | number,
    options?: { composerVersion: '2' } & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ComposerV2BaseRepositorySchema, C, E, void>>;

  showBaseRepository<E extends boolean = false>(
    groupId: string | number,
    options?: { composerVersion?: '1' | '2' } & ShowExpanded<E>,
  ): Promise<
    GitlabAPIResponse<ComposerV1BaseRepositorySchema | ComposerV2BaseRepositorySchema, C, E, void>
  > {
    const clonedService = { ...this };

    if (options && options.composerVersion === '2') {
      clonedService.headers['User-Agent'] = 'Composer/2';
    }

    return RequestHelper.get<ComposerV1BaseRepositorySchema | ComposerV2BaseRepositorySchema>()(
      clonedService,
      endpoint`groups/${groupId}/-/packages/composer/packages`,
      options,
    );
  }
}
