import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded } from '../infrastructure';

import { RequestHelper, createFormData, endpoint, getPrefixedUrl } from '../infrastructure';

export interface PackageSnapshotSchema extends Record<string, unknown> {
  'conan_package.tgz': string;
  'conanfile.py': string;
  'conanmanifest.txt': string;
}

export interface RecipeSnapshotSchema extends Record<string, unknown> {
  'conan_sources.tgz': string;
  'conanfile.py': string;
  'conanmanifest.txt': string;
}

export class Conan<C extends boolean = false> extends BaseResource<C> {
  authenticate<E extends boolean = false>({
    projectId,
    ...options
  }: { projectId?: string | number } & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<string, C, E, void>
  > {
    const { showExpanded } = options || {};
    const uri = getPrefixedUrl('packages/conan/v1/users/authenticate', { projects: projectId });

    return RequestHelper.get<string>()(this, uri, {
      showExpanded,
    });
  }

  checkCredentials<E extends boolean = false>({
    projectId,
    ...options
  }: { projectId?: string | number } & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<string, C, E, void>
  > {
    const { showExpanded } = options || {};
    const uri = getPrefixedUrl('packages/conan/v1/users/check_credentials', {
      projects: projectId,
    });

    return RequestHelper.get<string>()(this, uri, {
      showExpanded,
    });
  }

  downloadPackageFile<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    conanPackageReference: string,
    recipeRevision: string,
    packageRevision: string,
    filename: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { showExpanded } = options || {};
    const suffix = endpoint`packages/conan/v1/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/${recipeRevision}/package/${conanPackageReference}/${packageRevision}/${filename}`;
    const uri = getPrefixedUrl(suffix, { projects: projectId });

    return RequestHelper.get<Blob>()(this, uri, {
      showExpanded,
    });
  }

  downloadRecipeFile<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    recipeRevision: string,
    filename: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { showExpanded } = options || {};
    const suffix = endpoint`packages/conan/v1/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/${recipeRevision}/export/${filename}`;
    const uri = getPrefixedUrl(suffix, { projects: projectId });

    return RequestHelper.get<Blob>()(this, uri, {
      showExpanded,
    });
  }

  showPackageUploadUrls<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    conanPackageReference: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<PackageSnapshotSchema, C, E, void>> {
    const { showExpanded } = options || {};
    const suffix = endpoint`packages/conan/v1/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/packages/${conanPackageReference}/upload_urls`;
    const uri = getPrefixedUrl(suffix, { projects: projectId });

    return RequestHelper.get<PackageSnapshotSchema>()(this, uri, {
      showExpanded,
    });
  }

  showPackageDownloadUrls<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    conanPackageReference: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<PackageSnapshotSchema, C, E, void>> {
    const { showExpanded } = options || {};
    const suffix = endpoint`packages/conan/v1/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/packages/${conanPackageReference}/download_urls`;
    const uri = getPrefixedUrl(suffix, { projects: projectId });

    return RequestHelper.get<PackageSnapshotSchema>()(this, uri, {
      showExpanded,
    });
  }

  showPackageManifest<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    conanPackageReference: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<PackageSnapshotSchema, C, E, void>> {
    const { showExpanded } = options || {};
    const suffix = endpoint`packages/conan/v1/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/packages/${conanPackageReference}/digest`;
    const uri = getPrefixedUrl(suffix, { projects: projectId });

    return RequestHelper.get<PackageSnapshotSchema>()(this, uri, {
      showExpanded,
    });
  }

  showPackageSnapshot<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    conanPackageReference: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<PackageSnapshotSchema, C, E, void>> {
    const { showExpanded } = options || {};
    const suffix = endpoint`packages/conan/v1/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/packages/${conanPackageReference}`;
    const uri = getPrefixedUrl(suffix, { projects: projectId });

    return RequestHelper.get<PackageSnapshotSchema>()(this, uri, {
      showExpanded,
    });
  }

  ping<E extends boolean = false>({
    projectId,
    ...options
  }: { projectId?: string | number } & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<string, C, E, void>
  > {
    const { showExpanded } = options || {};
    const uri = getPrefixedUrl('packages/conan/v1/ping', { projects: projectId });

    return RequestHelper.post<string>()(this, uri, {
      showExpanded,
    });
  }

  showRecipeUploadUrls<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<RecipeSnapshotSchema, C, E, void>> {
    const { showExpanded } = options || {};
    const suffix = endpoint`packages/conan/v1/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/upload_urls`;
    const uri = getPrefixedUrl(suffix, { projects: projectId });

    return RequestHelper.get<RecipeSnapshotSchema>()(this, uri, {
      showExpanded,
    });
  }

  showRecipeDownloadUrls<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<RecipeSnapshotSchema, C, E, void>> {
    const { showExpanded } = options || {};
    const suffix = endpoint`packages/conan/v1/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/download_urls`;
    const uri = getPrefixedUrl(suffix, { projects: projectId });

    return RequestHelper.get<RecipeSnapshotSchema>()(this, uri, {
      showExpanded,
    });
  }

  showRecipeManifest<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<RecipeSnapshotSchema, C, E, void>> {
    const { showExpanded } = options || {};
    const suffix = endpoint`packages/conan/v1/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/digest`;
    const uri = getPrefixedUrl(suffix, { projects: projectId });

    return RequestHelper.get<RecipeSnapshotSchema>()(this, uri, {
      showExpanded,
    });
  }

  showRecipeSnapshot<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<RecipeSnapshotSchema, C, E, void>> {
    const { showExpanded } = options || {};
    const suffix = endpoint`packages/conan/v1/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}`;
    const uri = getPrefixedUrl(suffix, { projects: projectId });

    return RequestHelper.get<RecipeSnapshotSchema>()(this, uri, {
      showExpanded,
    });
  }

  removePackageFile<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { showExpanded } = options || {};
    const suffix = endpoint`packages/conan/v1/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}`;
    const uri = getPrefixedUrl(suffix, { projects: projectId });

    return RequestHelper.del<void>()(this, uri, {
      showExpanded,
    });
  }

  search<E extends boolean = false>({
    projectId,
    ...options
  }: { projectId?: string | number } & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<{ results: string[] }, C, E, void>
  > {
    const { showExpanded } = options || {};
    const uri = getPrefixedUrl('packages/conan/v1/conans/search', { projects: projectId });

    return RequestHelper.get<{ results: string[] }>()(this, uri, {
      showExpanded,
    });
  }

  uploadPackageFile<E extends boolean = false>(
    packageFile: { content: Blob; filename: string },
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    conanPackageReference: string,
    recipeRevision: string,
    packageRevision: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.put<void>()(
      this,
      endpoint`packages/conan/v1/files/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/${recipeRevision}/package/${conanPackageReference}/${packageRevision}/${packageFile.filename}`,
      {
        ...options,
        body: createFormData({
          file: [packageFile.content, packageFile.filename],
        }),
      },
    );
  }

  uploadRecipeFile<E extends boolean = false>(
    packageFile: { content: Blob; filename: string },
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    recipeRevision: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.put<void>()(
      this,
      endpoint`packages/conan/v1/files/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/${recipeRevision}/export/${packageFile.filename}`,
      {
        ...options,
        body: createFormData({
          file: [packageFile.content, packageFile.filename],
        }),
      },
    );
  }
}
