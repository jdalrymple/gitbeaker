import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestBodyRecordOptions,
  GitlabAPIResponse,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface CodeSuggestionSchema extends Record<string, unknown> {
  access_token: string;
  expires_in: number;
  created_at: number;
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
  createAccessToken<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CodeSuggestionSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<CodeSuggestionSchema>()(this, 'code_suggestions/tokens', {
      sudo,
      showExpanded,
    });
  }

  generateCompletion<E extends boolean = false>(
    options?: BaseRequestBodyRecordOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CodeCompletionSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<CodeCompletionSchema>()(this, 'code_suggestions/completions', {
      sudo,
      showExpanded,
      body,
    });
  }
}
