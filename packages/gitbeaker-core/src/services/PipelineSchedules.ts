import { BaseService } from '@gitbeaker/requester-utils';
import { UserSchema } from './Users';
import { PipelineSchema, PipelineVariableSchema } from './Pipelines';
import {
  BaseRequestOptions,
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

export class PipelineSchedules<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<PipelineScheduleSchema[]>()(
      this,
      `projects/${pId}/pipeline_schedules`,
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
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<PipelineScheduleSchema & { variables?: PipelineVariableSchema[] }>()(
      this,
      `projects/${pId}/pipeline_schedules`,
      {
        description,
        ref,
        cron,
        ...options,
      },
    );
  }

  edit(projectId: string | number, scheduleId: number, options?: BaseRequestOptions) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.put<PipelineScheduleExtendedSchema>()(
      this,
      `projects/${pId}/pipeline_schedules/${sId}`,
      options,
    );
  }

  remove(projectId: string | number, scheduleId: number, options?: Sudo) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.del<PipelineScheduleExtendedSchema>()(
      this,
      `projects/${pId}/pipeline_schedules/${sId}`,
      options,
    );
  }

  show(projectId: string | number, scheduleId: number, options?: Sudo) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.get<PipelineScheduleExtendedSchema>()(
      this,
      `projects/${pId}/pipeline_schedules/${sId}`,
      options,
    );
  }

  takeOwnership(projectId: string | number, scheduleId: number, options?: Sudo) {
    const [pId, sId] = [projectId, scheduleId].map(encodeURIComponent);

    return RequestHelper.post<PipelineScheduleExtendedSchema>()(
      this,
      `projects/${pId}/pipeline_schedules/${sId}/take_ownership`,
      options,
    );
  }
}
