import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo } from '../infrastructure';

export interface LintSchema extends Record<string, unknown> {
  status: string;
  errors?: string[];
  warnings?: string[];
}

export class Lint extends BaseService {
  lint(content: string, options?: Sudo) {
    return RequestHelper.post<LintSchema>()(this, 'ci/lint', { content, ...options });
  }
}
