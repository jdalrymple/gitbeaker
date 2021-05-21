import { PipelineSchema, PipelineScheduleSchema } from '.';

export interface PipelineScheduleExtendedSchema extends PipelineScheduleSchema {
  last_pipeline: Pick<PipelineSchema, 'id' | 'sha' | 'ref' | 'status'>;
}
