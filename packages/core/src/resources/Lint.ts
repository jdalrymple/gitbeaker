import { BaseResource } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, RequestHelper } from '../infrastructure';

export interface LintSchema extends Record<string, unknown> {
  status: string;
  errors?: string[];
  warnings?: string[];
  merged_yaml?: string;
}
export interface LintWithNamespaceSchema extends Record<string, unknown> {
  valid: boolean;
  merged_yaml: string;
  errors?: string[];
  warnings?: string[];
}

export class Lint<C extends boolean = false> extends BaseResource<C> {
  lint(content: string, options?: BaseRequestOptions) {
    // Perform CI file linting without context.
    // See https://docs.gitlab.com/ee/api/lint.html#validate-the-ci-yaml-configuration
    // This API doesn't work for CI files that contain `local` includes. Use `lint_with_namespace` instead.
    return RequestHelper.post<LintSchema>()(this, 'ci/lint', { content, ...options });
  }

  lint_with_namespace(projectId: string | number, content: string, options?: BaseRequestOptions) {
    // Perform CI file linting in the context of a specific project namespace.    
    // See https://docs.gitlab.com/ee/api/lint.html#validate-a-ci-yaml-configuration-with-a-namespace
    // This API is useful when the CI file being linted has `local` includes, which requires project
    // context to be understood.
    return RequestHelper.post<LintWithNamespaceSchema>()(this, 
      `projects/${projectId}/ci/lint`,
      { content, ...options });
  }
}
