import { NotesEntitySchema } from './NotesEntitySchema';

export interface DiscussionSchema extends Record<string, unknown> {
  id: string;
  individual_note: boolean;
  notes?: NotesEntitySchema[];
}
