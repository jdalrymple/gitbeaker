import { BaseResource } from '@gitbeaker/requester-utils';
import { UserSchema } from './Users';
import {
  BaseRequestOptions,
  endpoint,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface PipelineTriggerSchema extends Record<string, unknown> {
  id: number;
  description: string;
  created_at: string;
  last_used?: string;
  token: string;
  updated_at: string;
  owner: Pick<UserSchema, 'id' | 'name' | 'created_at'>;
}

// TODO: Rename PipelineTriggers
export class Triggers<C extends boolean = false> extends BaseResource<C> {
  add(projectId: string | number, options?: BaseRequestOptions) {
    return RequestHelper.post<PipelineTriggerSchema>()(
      this,
      endpoint`projects/${projectId}/triggers`,
      options,
    );
  }

  all(projectId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<PipelineTriggerSchema[]>()(
      this,
      endpoint`projects/${projectId}/triggers`,
      options,
    );
  }

  edit(projectId: string | number, triggerId: number, options?: BaseRequestOptions) {
    return RequestHelper.put<PipelineTriggerSchema>()(
      this,
      endpoint`projects/${projectId}/triggers/${triggerId}`,
      options,
    );
  }

  pipeline(
    projectId: string | number,
    ref: string,
    token: string,
    { variables }: { variables?: Record<string, string> } = {},
  ) {
    const hapiVariables = {};

    if (variables) {
      Object.entries(variables).forEach(([k, v]) => {
        hapiVariables[`variables[${k}]`] = v;
      });
    }

    return RequestHelper.post()(this, endpoint`projects/${projectId}/trigger/pipeline`, {
      isForm: true,
      ref,
      token,
      ...hapiVariables,
    });
  }

  remove(projectId: string | number, triggerId: number, options?: Sudo) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/triggers/${triggerId}`,
      options,
    );
  }

  show(projectId: string | number, triggerId: number, options?: Sudo) {
    return RequestHelper.get<PipelineTriggerSchema>()(
      this,
      endpoint`projects/${projectId}/triggers/${triggerId}`,
      options,
    );
  }
}
