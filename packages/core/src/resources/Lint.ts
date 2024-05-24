import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface LintSchema extends Record<string, unknown> {
  valid: boolean;
  merged_yaml?: string;
  errors?: string[];
  warnings?: string[];
}

export class Lint<C extends boolean = false> extends BaseResource<C> {
  check<E extends boolean = false>(
    projectId: string | number,
    options: { ref?: string; includeJobs?: boolean; dryRun?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LintSchema, C, E, void>> {
    return RequestHelper.get<LintSchema>()(this, endpoint`projects/${projectId}/ci/lint`, options);
  }

  lint<E extends boolean = false>(
    projectId: string | number,
    content: string,
    options?: {
      ref?: string;
      includeJobs?: boolean;
      dryRun?: boolean;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LintSchema, C, E, void>> {
    return RequestHelper.post<LintSchema>()(this, endpoint`projects/${projectId}/ci/lint`, {
      ...options,
      content,
    });
  }
}
