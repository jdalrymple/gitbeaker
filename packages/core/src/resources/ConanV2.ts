import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded } from '../infrastructure';

import { RequestHelper, createFormData, endpoint } from '../infrastructure';

export interface ConanV2RevisionSchema extends Record<string, unknown> {
  revision: string;
  time: string;
}

export interface ConanV2RevisionListSchema extends Record<string, unknown> {
  reference: string;
  revisions: ConanV2RevisionSchema[];
}

export interface ConanV2PackageReferenceMetadataSchema extends Record<string, unknown> {
  settings: Record<string, unknown>;
  options: Record<string, unknown>;
  requires: Record<string, unknown>;
  recipe_hash: string;
}

export interface ConanV2FilesListSchema extends Record<string, unknown> {
  files: Record<string, Record<string, unknown>>;
}

export interface ConanV2FileUploadResponseSchema extends Record<string, unknown> {
  id: number;
  package_id: number;
  created_at: string;
  updated_at: string;
  size: number;
  file_store: number;
  file_md5: string;
  file_sha1: string;
  file_name: string;
  file: {
    url: string;
  };
  file_sha256: string | null;
  verification_retry_at: string | null;
  verified_at: string | null;
  verification_failure: string | null;
  verification_retry_count: number | null;
  verification_checksum: string | null;
  verification_state: number;
  verification_started_at: string | null;
  status: string;
  file_final_path: string | null;
  project_id: number;
  new_file_path: string | null;
}

export class ConanV2<C extends boolean = false> extends BaseResource<C> {
  authenticate<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<string>()(
      this,
      endpoint`projects/${projectId}/packages/conan/v2/users/authenticate`,
      {
        showExpanded,
      },
    );
  }

  checkCredentials<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<string>()(
      this,
      endpoint`projects/${projectId}/packages/conan/v2/users/check_credentials`,
      {
        showExpanded,
      },
    );
  }

  search<E extends boolean = false>(
    projectId: string | number,
    query: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ results: string[] }, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<{ results: string[] }>()(
      this,
      endpoint`projects/${projectId}/packages/conan/v2/conans/search`,
      {
        showExpanded,
        searchParams: { q: query },
      },
    );
  }

  showLatestRecipeRevision<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ConanV2RevisionSchema, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<ConanV2RevisionSchema>()(
      this,
      endpoint`projects/${projectId}/packages/conan/v2/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/latest`,
      {
        showExpanded,
      },
    );
  }

  allRecipeRevisions<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ConanV2RevisionListSchema, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<ConanV2RevisionListSchema>()(
      this,
      endpoint`projects/${projectId}/packages/conan/v2/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/revisions`,
      {
        showExpanded,
      },
    );
  }

  removeRecipeRevision<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    recipeRevision: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.del<void>()(
      this,
      endpoint`projects/${projectId}/packages/conan/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/revisions/${recipeRevision}`,
      {
        showExpanded,
      },
    );
  }

  allRecipeFiles<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    recipeRevision: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ConanV2FilesListSchema, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<ConanV2FilesListSchema>()(
      this,
      endpoint`projects/${projectId}/packages/conan/v2/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/revisions/${recipeRevision}/files`,
      {
        showExpanded,
      },
    );
  }

  downloadRecipeFile<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    recipeRevision: string,
    fileName: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/conan/v2/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/revisions/${recipeRevision}/files/${fileName}`,
      {
        showExpanded,
      },
    );
  }

  uploadRecipeFile<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    recipeRevision: string,
    packageFile: { content: Blob; filename: string },
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ConanV2FileUploadResponseSchema, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.put<ConanV2FileUploadResponseSchema>()(
      this,
      endpoint`projects/${projectId}/packages/conan/v2/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/revisions/${recipeRevision}/files/${packageFile.filename}`,
      {
        showExpanded,
        body: createFormData({
          file: [packageFile.content, packageFile.filename],
        }),
      },
    );
  }

  allPackageRevisions<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    recipeRevision: string,
    conanPackageReference: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ConanV2RevisionListSchema, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<ConanV2RevisionListSchema>()(
      this,
      endpoint`projects/${projectId}/packages/conan/v2/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/revisions/${recipeRevision}/packages/${conanPackageReference}/revisions`,
      {
        showExpanded,
      },
    );
  }

  showLatestPackageRevision<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    recipeRevision: string,
    conanPackageReference: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ConanV2RevisionSchema, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<ConanV2RevisionSchema>()(
      this,
      endpoint`projects/${projectId}/packages/conan/v2/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/revisions/${recipeRevision}/packages/${conanPackageReference}/latest`,
      {
        showExpanded,
      },
    );
  }

  removePackageRevision<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    recipeRevision: string,
    conanPackageReference: string,
    packageRevision: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.del<void>()(
      this,
      endpoint`projects/${projectId}/packages/conan/v2/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/revisions/${recipeRevision}/packages/${conanPackageReference}/revisions/${packageRevision}`,
      {
        showExpanded,
      },
    );
  }

  downloadPackageFile<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    recipeRevision: string,
    conanPackageReference: string,
    packageRevision: string,
    fileName: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/conan/v2/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/revisions/${recipeRevision}/packages/${conanPackageReference}/revisions/${packageRevision}/files/${fileName}`,
      {
        showExpanded,
      },
    );
  }

  uploadPackageFile<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    recipeRevision: string,
    conanPackageReference: string,
    packageRevision: string,
    packageFile: { content: Blob; filename: string },
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ConanV2FileUploadResponseSchema, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.put<ConanV2FileUploadResponseSchema>()(
      this,
      endpoint`projects/${projectId}/packages/conan/v2/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/revisions/${recipeRevision}/packages/${conanPackageReference}/revisions/${packageRevision}/files/${packageFile.filename}`,
      {
        showExpanded,
        body: createFormData({
          file: [packageFile.content, packageFile.filename],
        }),
      },
    );
  }

  showPackageReferencesMetadata<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Record<string, ConanV2PackageReferenceMetadataSchema>, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<Record<string, ConanV2PackageReferenceMetadataSchema>>()(
      this,
      endpoint`projects/${projectId}/packages/conan/v2/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/search`,
      {
        showExpanded,
      },
    );
  }

  showPackageReferencesMetadataByRevision<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    packageUsername: string,
    packageChannel: string,
    recipeRevision: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Record<string, ConanV2PackageReferenceMetadataSchema>, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<Record<string, ConanV2PackageReferenceMetadataSchema>>()(
      this,
      endpoint`projects/${projectId}/packages/conan/v2/conans/${packageName}/${packageVersion}/${packageUsername}/${packageChannel}/revisions/${recipeRevision}/search`,
      {
        showExpanded,
      },
    );
  }
}
