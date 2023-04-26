import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface LintSchema extends Record<string, unknown> {
  status: string;
  errors?: string[];
  warnings?: string[];
  merged_yaml?: string;
}

export interface ContextualLintSchema extends Omit<LintSchema, 'status'> {
  valid: boolean;
}

export class Lint<C extends boolean = false> extends BaseResource<C> {
  check<E extends boolean = false>(
    projectId: string | number,
    options: { ref?: string; includeJobs?: boolean; dryRun?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ContextualLintSchema, C, E, void>> {
    return RequestHelper.get<ContextualLintSchema>()(
      this,
      endpoint`projects/${projectId}/ci/lint`,
      options,
    );
  }

  lint<E extends boolean = false>(
    content: string,
    options?: { includeJobs?: boolean; includeMergedYaml?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LintSchema, C, E, void>>;

  lint<E extends boolean = false>(
    content: string,
    options?: {
      projectId: string | number;
      ref?: string;
      includeJobs?: boolean;
      dryRun?: boolean;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ContextualLintSchema, C, E, void>>;

  lint<E extends boolean = false>(
    content: string,
    {
      projectId,
      ...options
    }: {
      projectId?: string | number;
      ref?: string;
      includeJobs?: boolean;
      dryRun?: boolean;
    } & Sudo &
      ShowExpanded<E> = {} as any,
  ): Promise<GitlabAPIResponse<LintSchema | ContextualLintSchema, C, E, void>> {
    const prefix = projectId ? endpoint`projects/${projectId}/` : '';

    return RequestHelper.post<LintSchema | ContextualLintSchema>()(this, `${prefix}ci/lint`, {
      content,
      ...options,
    });
  }
}
