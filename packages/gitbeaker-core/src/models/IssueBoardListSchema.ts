import { LabelSchema } from './LabelSchema';

export interface IssueBoardListSchema extends Record<string, unknown> {
  id: number;
  label: Pick<LabelSchema, 'name' | 'color' | 'description'>;
  position: number;
  max_issue_count: number;
  max_issue_weight: number;
  limit_metric?: string;
}
