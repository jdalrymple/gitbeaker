import { BaseService } from '@gitbeaker/requester-utils';
import { UserSchema } from '../models';
import {
  BaseRequestOptions,
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
export class Triggers<C extends boolean = false> extends BaseService<C> {
  add(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<PipelineTriggerSchema>()(this, `projects/${pId}/triggers`, options);
  }

  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<PipelineTriggerSchema[]>()(this, `projects/${pId}/triggers`, options);
  }

  edit(projectId: string | number, triggerId: number, options?: BaseRequestOptions) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.put<PipelineTriggerSchema>()(
      this,
      `projects/${pId}/triggers/${tId}`,
      options,
    );
  }

  pipeline(
    projectId: string | number,
    ref: string,
    token: string,
    { variables }: { variables?: Record<string, string> } = {},
  ) {
    const pId = encodeURIComponent(projectId);
    const hapiVariables = {};

    if (variables) {
      Object.entries(variables).forEach(([k, v]) => {
        hapiVariables[`variables[${k}]`] = v;
      });
    }

    return RequestHelper.post()(this, `projects/${pId}/trigger/pipeline`, {
      isForm: true,
      ref,
      token,
      ...hapiVariables,
    });
  }

  remove(projectId: string | number, triggerId: number, options?: Sudo) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/triggers/${tId}`, options);
  }

  show(projectId: string | number, triggerId: number, options?: Sudo) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.get<PipelineTriggerSchema>()(
      this,
      `projects/${pId}/triggers/${tId}`,
      options,
    );
  }
}
