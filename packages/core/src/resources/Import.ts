import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface RepositoryImportStatusSchema extends Record<string, unknown> {
  id: number;
  name: string;
  full_path: string;
  full_name: string;
  refs_url?: string;
  import_source?: string;
  import_status?: string;
  human_import_status_name?: string;
  provider_link?: string;
  relation_type?: string | null;
  import_warning?: string | null;
}

export class Import<C extends boolean = false> extends BaseResource<C> {
  importGithubRepository<E extends boolean = false>(
    personalAccessToken: string,
    repositoryId: number,
    targetNamespace: string,
    options?: {
      newName?: string;
      githubHostname?: string;
      optionalStages?: {
        attachmentsImport?: boolean;
        collaboratorsImport?: boolean;
        singleEndpointIssueEventsImport?: boolean;
        singleEndpointNotesImport?: boolean;
      };
      paginationLimit?: number;
      timeoutStrategy?: 'optimistic' | 'pessimistic';
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<RepositoryImportStatusSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<RepositoryImportStatusSchema>()(this, 'import/github', {
      sudo,
      showExpanded,
      body: {
        ...body,
        personalAccessToken,
        repoId: repositoryId,
        targetNamespace,
      },
    });
  }

  cancelGithubRepositoryImport<E extends boolean = false>(
    projectId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RepositoryImportStatusSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<RepositoryImportStatusSchema>()(this, 'import/github/cancel', {
      sudo,
      showExpanded,
      body: { ...body, projectId },
    });
  }

  importGithubGists<E extends boolean = false>(
    personalAccessToken: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<void>()(this, 'import/github/gists', {
      sudo,
      showExpanded,
      body: { ...body, personalAccessToken },
    });
  }

  importBitbucketServerRepository<E extends boolean = false>(
    bitbucketServerUrl: string,
    bitbucketServerUsername: string,
    personalAccessToken: string,
    bitbucketServerProject: string,
    bitbucketServerRepository: string,
    options?: {
      newName?: string;
      targetNamespace?: string;
      timeoutStrategy?: 'optimistic' | 'pessimistic';
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<RepositoryImportStatusSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<RepositoryImportStatusSchema>()(this, 'import/bitbucket_server', {
      sudo,
      showExpanded,
      body: {
        ...body,
        bitbucketServerUrl,
        bitbucketServerUsername,
        personalAccessToken,
        bitbucketServerProject,
        bitbucketServerRepo: bitbucketServerRepository,
      },
    });
  }

  importBitbucketCloudRepository<E extends boolean = false>(
    repoPath: string,
    targetNamespace: string,
    options?: {
      bitbucketApiToken?: string;
      bitbucketEmail?: string;
      bitbucketUsername?: string;
      bitbucketAppPassword?: string;
      newName?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<RepositoryImportStatusSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<RepositoryImportStatusSchema>()(this, 'import/bitbucket', {
      sudo,
      showExpanded,
      body: {
        ...body,
        repoPath,
        targetNamespace,
      },
    });
  }
}
