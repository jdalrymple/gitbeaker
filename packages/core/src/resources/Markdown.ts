import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface MarkdownSchema extends Record<string, unknown> {
  html: string;
}

export class Markdown<C extends boolean = false> extends BaseResource<C> {
  render<E extends boolean = false>(
    text: string,
    options?: { gfm?: string; project?: string | number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MarkdownSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<MarkdownSchema>()(this, 'markdown', {
      sudo,
      showExpanded,
      body: { ...body, text },
    });
  }
}
