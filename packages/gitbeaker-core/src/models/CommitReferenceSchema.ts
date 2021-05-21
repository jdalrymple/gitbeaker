export interface CommitReferenceSchema extends Record<string, unknown> {
  type: 'branch' | 'tag' | 'all';
  name: string;
}
