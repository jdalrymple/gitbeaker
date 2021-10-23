import { BaseResource } from '@gitbeaker/requester-utils';
import { UserSchema } from './Users';
import { PipelineSchema, PipelineVariableSchema } from './Pipelines';
import {
  BaseRequestOptions,
  endpoint,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface PipelineScheduleSchema extends Record<string, unknown> {
  id: number;
  description: string;
  ref: string;
  cron: string;
  cron_timezone: string;
  next_run_at: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  owner: Pick<UserSchema, 'name' | 'username' | 'id' | 'state' | 'avatar_url' | 'web_url'>;
}

export interface PipelineScheduleExtendedSchema extends PipelineScheduleSchema {
  last_pipeline: Pick<PipelineSchema, 'id' | 'sha' | 'ref' | 'status'>;
}

export class PipelineSchedules<C extends boolean = false> extends BaseResource<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<PipelineScheduleSchema[]>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules`,
      options,
    );
  }

  create(
    projectId: string | number,
    description: string,
    ref: string,
    cron: string,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.post<PipelineScheduleSchema & { variables?: PipelineVariableSchema[] }>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules`,
      {
        description,
        ref,
        cron,
        ...options,
      },
    );
  }

  edit(projectId: string | number, scheduleId: number, options?: BaseRequestOptions) {
    return RequestHelper.put<PipelineScheduleExtendedSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${scheduleId}`,
      options,
    );
  }

  remove(projectId: string | number, scheduleId: number, options?: Sudo) {
    return RequestHelper.del<PipelineScheduleExtendedSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${scheduleId}`,
      options,
    );
  }

  show(projectId: string | number, scheduleId: number, options?: Sudo) {
    return RequestHelper.get<PipelineScheduleExtendedSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${scheduleId}`,
      options,
    );
  }

  takeOwnership(projectId: string | number, scheduleId: number, options?: Sudo) {
    return RequestHelper.post<PipelineScheduleExtendedSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${scheduleId}/take_ownership`,
      options,
    );
  }
}
