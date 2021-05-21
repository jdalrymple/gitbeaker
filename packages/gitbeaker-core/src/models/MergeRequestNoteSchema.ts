import { NoteSchema } from '.';

export interface MergeRequestNoteSchema extends NoteSchema {
  attachment?: string;
  system: boolean;
  noteable_id: number;
  noteable_type: string;
  noteable_iid: number;
  resolvable: boolean;
}
