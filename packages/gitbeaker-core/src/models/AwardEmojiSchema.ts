import { UserSchema } from '.';

export interface AwardEmojiSchema extends Record<string, unknown> {
  id: number;
  name: string;
  user: UserSchema;
  created_at: string;
  updated_at: string;
  awardable_id: number;
  awardable_type: string;
}
