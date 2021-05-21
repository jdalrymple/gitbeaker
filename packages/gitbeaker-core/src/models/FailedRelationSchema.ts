export interface FailedRelationSchema {
  id: number;
  created_at: string;
  exception_class: string;
  exception_message: string;
  source: string;
  relation_name: string;
}
