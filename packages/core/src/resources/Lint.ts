import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface LintSchema extends Record<string, unknown> {
  valid: boolean;
  merged_yaml?: string;
  errors?: string[];
  warnings?: string[];
}

export class Lint<C extends boolean = false> extends BaseResource<C> {
  check<E extends boolean = false>(
    projectId: string | number,
    options: { ref?: string; includeJobs?: boolean; dryRun?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<LintSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options;

    return RequestHelper.get<LintSchema>()(this, endpoint`projects/${projectId}/ci/lint`, {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  lint<E extends boolean = false>(
    projectId: string | number,
    content: string,
    options?: {
      ref?: string;
      includeJobs?: boolean;
      dryRun?: boolean;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<LintSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<LintSchema>()(this, endpoint`projects/${projectId}/ci/lint`, {
      sudo,
      showExpanded,
      body: { ...body, content },
    });
  }
}
