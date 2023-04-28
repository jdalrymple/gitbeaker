import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded } from '../infrastructure';

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

function url(projectId?: string | number): string {
  return projectId ? endpoint`projects/${projectId}/packages/conan/v1` : 'packages/conan/v1';
}

export class Conan<C extends boolean = false> extends BaseResource<C> {
  authenticate<E extends boolean = false>({
    projectId,
    ...options
  }: { projectId?: string | number } & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<string, C, E, void>
  > {
    return RequestHelper.get<string>()(this, `${url(projectId)}/users/authenticate`, options);
  }

  checkCredentials<E extends boolean = false>({
    projectId,
    ...options
  }: { projectId?: string | number } & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<string, C, E, void>
  > {
    const prefix = url(projectId);

    return RequestHelper.get<string>()(this, `${prefix}/users/check_credentials`, options);
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
    const prefix = url(projectId);

    return RequestHelper.get<Blob>()(
      this,
      `${prefix}/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/${recipeRevision}/package/${conanPackageReference}/${packageRevision}/${filename}`,
      options,
    );
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
    const prefix = url(projectId);

    return RequestHelper.get<Blob>()(
      this,
      `${prefix}/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/${recipeRevision}/export/${filename}`,
      options,
    );
  }

  showPackageUploadUrls<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    conanPackageReference: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<PackageSnapshotSchema, C, E, void>> {
    const prefix = url(projectId);

    return RequestHelper.get<PackageSnapshotSchema>()(
      this,
      `${prefix}/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/packages/${conanPackageReference}/upload_urls`,
      options,
    );
  }

  showPackageDownloadUrls<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    conanPackageReference: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<PackageSnapshotSchema, C, E, void>> {
    const prefix = url(projectId);

    return RequestHelper.get<PackageSnapshotSchema>()(
      this,
      `${prefix}/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/packages/${conanPackageReference}/download_urls`,
      options,
    );
  }

  showPackageManifest<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    conanPackageReference: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<PackageSnapshotSchema, C, E, void>> {
    const prefix = url(projectId);

    return RequestHelper.get<PackageSnapshotSchema>()(
      this,
      `${prefix}/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/packages/${conanPackageReference}/digest`,
      options,
    );
  }

  showPackageSnapshot<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    conanPackageReference: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<PackageSnapshotSchema, C, E, void>> {
    const prefix = url(projectId);

    return RequestHelper.get<PackageSnapshotSchema>()(
      this,
      `${prefix}/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/packages/${conanPackageReference}`,
      options,
    );
  }

  ping<E extends boolean = false>({
    projectId,
    ...options
  }: { projectId?: string | number } & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<string, C, E, void>
  > {
    return RequestHelper.post<string>()(this, `${url(projectId)}/ping`, options);
  }

  showRecipeUploadUrls<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<RecipeSnapshotSchema, C, E, void>> {
    const prefix = url(projectId);

    return RequestHelper.get<RecipeSnapshotSchema>()(
      this,
      `${prefix}/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/upload_urls`,
      options,
    );
  }

  showRecipeDownloadUrls<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<RecipeSnapshotSchema, C, E, void>> {
    const prefix = url(projectId);

    return RequestHelper.get<RecipeSnapshotSchema>()(
      this,
      `${prefix}/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/download_urls`,
      options,
    );
  }

  showRecipeManifest<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<RecipeSnapshotSchema, C, E, void>> {
    const prefix = url(projectId);

    return RequestHelper.get<RecipeSnapshotSchema>()(
      this,
      `${prefix}/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/digest`,
      options,
    );
  }

  showRecipeSnapshot<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<RecipeSnapshotSchema, C, E, void>> {
    const prefix = url(projectId);

    return RequestHelper.get<RecipeSnapshotSchema>()(
      this,
      `${prefix}/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}`,
      options,
    );
  }

  removePackageFile<E extends boolean = false>(
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    { projectId, ...options }: { projectId?: string | number } & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const prefix = url(projectId);

    return RequestHelper.get<void>()(
      this,
      `${prefix}/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}`,
      options,
    );
  }

  search<E extends boolean = false>({
    projectId,
    ...options
  }: { projectId?: string | number } & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<{ results: string[] }, C, E, void>
  > {
    const prefix = url(projectId);

    return RequestHelper.get<{ results: string[] }>()(this, `${prefix}/conans/search`, options);
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
    const prefix = url();

    return RequestHelper.get<void>()(
      this,
      `${prefix}/files/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/${recipeRevision}/package/${conanPackageReference}/${packageRevision}/${packageFile.filename}`,
      {
        isForm: true,
        ...options,
        file: [packageFile.content, packageFile.filename],
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
    const prefix = url();

    return RequestHelper.get<void>()(
      this,
      `${prefix}/files/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/${recipeRevision}/export/${packageFile.filename}`,
      {
        isForm: true,
        ...options,
        file: [packageFile.content, packageFile.filename],
      },
    );
  }
}
