import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface WebCommitPublicKeySchema extends Record<string, unknown> {
  public_key: string;
}

export class WebCommits<C extends boolean = false> extends BaseResource<C> {
  showPublicKey<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<WebCommitPublicKeySchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<WebCommitPublicKeySchema[]>()(this, 'web_commits/public_key', {
      sudo,
      showExpanded,
    });
  }
}