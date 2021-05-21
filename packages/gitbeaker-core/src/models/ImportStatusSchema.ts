import { FailedRelationSchema } from './FailedRelationSchema';

export interface ImportStatusSchema extends Record<string, unknown> {
  id: number;
  description: string;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  created_at: string;
  import_status: string;
  correlation_id: string;
  failed_relations?: FailedRelationSchema[];
}
