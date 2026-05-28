import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface CodeSuggestionDirectAccessSchema extends Record<string, unknown> {
  base_url: string;
  token: string;
  expires_at: number;
  headers: {
    'X-Gitlab-Instance-Id': string;
    'X-Gitlab-Realm': string;
    'X-Gitlab-Global-User-Id': string;
    'X-Gitlab-Host-Name': string;
  };
}

export interface CodeSuggestionConnectionDetailsSchema extends Record<string, unknown> {
  instance_id: string;
  instance_version: string;
  realm: string;
  global_user_id: string;
  host_name: string;
  feature_enablement_type: string;
  saas_duo_pro_namespace_ids?: string;
}

export interface CodeSuggestionCurrentFileSchema {
  file_name: string;
  content_above_cursor: string;
  content_below_cursor?: string;
}

export interface CodeSuggestionContextSchema {
  type: 'file' | 'snippet';
  name: string;
  content: string;
}

export interface CodeCompletionSchema extends Record<string, unknown> {
  id: string;
  model: {
    engine: string;
    name: string;
  };
  object: string;
  created: number;
  choices: Array<{
    text: string;
    index: number;
    finish_reason: string;
  }>;
}

export class CodeSuggestions<C extends boolean = false> extends BaseResource<C> {
  generateCompletion<E extends boolean = false>(
    currentFile: {
      fileName: string;
      contentAboveCursor: string;
      contentBelowCursor?: string;
    },
    options?: {
      intent?: 'completion' | 'generation';
      stream?: boolean;
      projectPath?: string;
      generationType?: 'comment' | 'empty_function' | 'small_file';
      context?: CodeSuggestionContextSchema[];
      userInstruction?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<CodeCompletionSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<CodeCompletionSchema>()(this, 'code_suggestions/completions', {
      sudo,
      showExpanded,
      body: {
        ...body,
        currentFile,
      },
    });
  }

  checkEnabled<E extends boolean = false>(
    projectPath: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, 'code_suggestions/enabled', {
      sudo,
      showExpanded,
      body: {
        projectPath,
      },
    });
  }

  showDirectAccessDetails<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CodeSuggestionDirectAccessSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<CodeSuggestionDirectAccessSchema>()(
      this,
      'code_suggestions/direct_access',
      {
        sudo,
        showExpanded,
      },
    );
  }

  showConnectionDetails<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CodeSuggestionConnectionDetailsSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<CodeSuggestionConnectionDetailsSchema>()(
      this,
      'code_suggestions/connection_details',
      {
        sudo,
        showExpanded,
      },
    );
  }
}
