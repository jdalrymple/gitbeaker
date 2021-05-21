import { MilestoneSchema } from './MilestoneSchema';
import { IssueBoardListSchema } from './IssueBoardListSchema';

export interface IssueBoardSchema extends Record<string, unknown> {
  id: number;
  name: string;
  milestone: Pick<MilestoneSchema, 'id' | 'title'>;
  lists?: IssueBoardListSchema[];
}
