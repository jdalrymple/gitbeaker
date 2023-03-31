import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface SuggestionSchema extends Record<string, unknown> {
  id: number;
  from_line: number;
  to_line: number;
  appliable: boolean;
  applied: boolean;
  from_content: string;
  to_content: string;
}

export class Suggestions<C extends boolean = false> extends BaseResource<C> {
  edit<E extends boolean = false>(
    suggestionId: number,
    options?: { commitMessage?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SuggestionSchema, C, E, void>> {
    return RequestHelper.put<SuggestionSchema>()(
      this,
      `suggestions/${suggestionId}/apply`,
      options,
    );
  }
}
