import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface RepositoryImportStatusSchema extends Record<string, unknown> {
  id: number;
  name: string;
  full_path: string;
  full_name: string;
}

export interface ExpandedRepositoryImportStatusSchema extends RepositoryImportStatusSchema {
  import_source: string;
  import_status: string;
  human_import_status_name: string;
  provider_link: string;
}

export class Import<C extends boolean = false> extends BaseResource<C> {
  importGithubRepository<E extends boolean = false>(
    personalAccessToken: string,
    repositoryId: number,
    targetNamespace: string,
    options?: {
      newName?: string;
      githubHostname?: string;
      optionalStages?: Record<string, string>;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RepositoryImportStatusSchema, C, E, void>> {
    return RequestHelper.post<RepositoryImportStatusSchema>()(this, 'import/github', {
      personalAccessToken,
      repoId: repositoryId,
      targetNamespace,
      ...options,
    });
  }

  cancelGithubRepositoryImport<E extends boolean = false>(
    projectId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RepositoryImportStatusSchema, C, E, void>> {
    return RequestHelper.post<RepositoryImportStatusSchema>()(this, 'import/github/cancel', {
      projectId,
      ...options,
    });
  }

  importGithubGists<E extends boolean = false>(
    personalAccessToken: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, 'import/github/gists', {
      personalAccessToken,
      ...options,
    });
  }

  importBitbucketServerRepository<E extends boolean = false>(
    bitbucketServerUrl: string,
    bitbucketServerUsername: string,
    personalAccessToken: string,
    bitbucketServerProject: string,
    bitbucketServerRepository: string,
    options?: { newName?: string; targetNamespace?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RepositoryImportStatusSchema, C, E, void>> {
    return RequestHelper.post<RepositoryImportStatusSchema>()(this, 'import/bitbucket_server', {
      bitbucketServerUrl,
      bitbucketServerUsername,
      personalAccessToken,
      bitbucketServerProject,
      bitbucketServerRepo: bitbucketServerRepository,
      ...options,
    });
  }
}
