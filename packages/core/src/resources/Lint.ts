import { BaseResource } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, RequestHelper } from '../infrastructure';

export interface LintSchema extends Record<string, unknown> {
  status: string;
  errors?: string[];
  warnings?: string[];
  merged_yaml?: string;
}

export class Lint<C extends boolean = false> extends BaseResource<C> {
  lint(content: string, options?: BaseRequestOptions) {
    return RequestHelper.post<LintSchema>()(this, 'ci/lint', { content, ...options });
  }
}
