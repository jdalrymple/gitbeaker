import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface MarkdownSchema extends Record<string, unknown> {
  html: string;
}

export class Markdown<C extends boolean = false> extends BaseResource<C> {
  render<E extends boolean = false>(
    text: string,
    options?: { gfm?: string; project?: string | number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MarkdownSchema, C, E, void>> {
    return RequestHelper.post<MarkdownSchema>()(this, 'markdown', { text, ...options });
  }
}
