import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded } from '../infrastructure';

import { RequestHelper, createFormData, endpoint } from '../infrastructure';

export interface TerraformModuleProviderSchema {
  name: string;
  version: string;
}

export interface TerraformModuleRootSchema {
  dependencies: unknown[];
  providers?: TerraformModuleProviderSchema[];
}

export interface TerraformModuleVersionSchema {
  version: string;
  submodules: unknown[];
  root: TerraformModuleRootSchema;
}

export interface TerraformModuleSchema {
  versions: TerraformModuleVersionSchema[];
  source: string;
}

export interface TerraformModuleVersionsResponseSchema extends Record<string, unknown> {
  modules: TerraformModuleSchema[];
}

export interface TerraformModuleDetailsSchema extends Record<string, unknown> {
  name: string;
  provider: string;
  providers: string[];
  root: TerraformModuleRootSchema;
  source: string;
  submodules: unknown[];
  version: string;
  versions: string[];
}

export interface TerraformModuleUploadResponseSchema extends Record<string, unknown> {
  message: string;
}

export class TerraformModules<C extends boolean = false> extends BaseResource<C> {
  allVersions<E extends boolean = false>(
    moduleNamespace: string,
    moduleName: string,
    moduleSystem: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TerraformModuleVersionsResponseSchema, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<TerraformModuleVersionsResponseSchema>()(
      this,
      endpoint`packages/terraform/modules/v1/${moduleNamespace}/${moduleName}/${moduleSystem}/versions`,
      {
        showExpanded,
      },
    );
  }

  showLatest<E extends boolean = false>(
    moduleNamespace: string,
    moduleName: string,
    moduleSystem: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TerraformModuleDetailsSchema, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<TerraformModuleDetailsSchema>()(
      this,
      endpoint`packages/terraform/modules/v1/${moduleNamespace}/${moduleName}/${moduleSystem}`,
      {
        showExpanded,
      },
    );
  }

  showVersion<E extends boolean = false>(
    moduleNamespace: string,
    moduleName: string,
    moduleSystem: string,
    moduleVersion: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TerraformModuleDetailsSchema, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<TerraformModuleDetailsSchema>()(
      this,
      endpoint`packages/terraform/modules/v1/${moduleNamespace}/${moduleName}/${moduleSystem}/${moduleVersion}`,
      {
        showExpanded,
      },
    );
  }

  showLatestDownloadUrl<E extends boolean = false>(
    moduleNamespace: string,
    moduleName: string,
    moduleSystem: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, void, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<void>()(
      this,
      endpoint`packages/terraform/modules/v1/${moduleNamespace}/${moduleName}/${moduleSystem}/download`,
      {
        showExpanded,
      },
    );
  }

  showVersionDownloadUrl<E extends boolean = false>(
    moduleNamespace: string,
    moduleName: string,
    moduleSystem: string,
    moduleVersion: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, void, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<void>()(
      this,
      endpoint`packages/terraform/modules/v1/${moduleNamespace}/${moduleName}/${moduleSystem}/${moduleVersion}/download`,
      {
        showExpanded,
      },
    );
  }

  downloadFromNamespace<E extends boolean = false>(
    moduleNamespace: string,
    moduleName: string,
    moduleSystem: string,
    moduleVersion: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.get<Blob>()(
      this,
      endpoint`packages/terraform/modules/v1/${moduleNamespace}/${moduleName}/${moduleSystem}/${moduleVersion}/file`,
      {
        showExpanded,
      },
    );
  }

  downloadFromProject<E extends boolean = false>(
    projectId: string | number,
    moduleName: string,
    moduleSystem: string,
    moduleVersion?: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { showExpanded } = options || {};
    const versionPath = moduleVersion || '';

    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/terraform/modules/${moduleName}/${moduleSystem}/${versionPath}`,
      {
        showExpanded,
      },
    );
  }

  uploadModule<E extends boolean = false>(
    projectId: string | number,
    moduleName: string,
    moduleSystem: string,
    moduleVersion: string,
    packageFile: { content: Blob; filename: string },
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TerraformModuleUploadResponseSchema, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.put<TerraformModuleUploadResponseSchema>()(
      this,
      endpoint`projects/${projectId}/packages/terraform/modules/${moduleName}/${moduleSystem}/${moduleVersion}/file`,
      {
        showExpanded,
        body: createFormData({
          file: [packageFile.content, packageFile.filename],
        }),
      },
    );
  }
}
