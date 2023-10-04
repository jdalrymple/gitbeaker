import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { BaseRequestOptions, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

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
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CodeSuggestionSchema, C, E, void>> {
    return RequestHelper.post<CodeSuggestionSchema>()(this, 'code_suggestions/tokens', options);
  }

  generateCompletion<E extends boolean = false>(
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<CodeCompletionSchema, C, E, void>> {
    return RequestHelper.post<CodeCompletionSchema>()(
      this,
      'code_suggestions/completions',
      options,
    );
  }
}
