import { UserSchema } from './UserSchema';

export interface UserExtendedSchema extends UserSchema {
  bio?: string;
  location?: string;
  public_email: string;
  skype: string;
  linkedin: string;
  twitter: string;
  website_url: string;
  organization?: string;
  last_sign_in_at: string;
  confirmed_at: string;
  last_activity_on: string;
  email: string;
  theme_id: number;
  color_scheme_id: number;
  projects_limit: number;
  current_sign_in_at?: string;
  identities?: string[];
  can_create_group: boolean;
  can_create_project: boolean;
  two_factor_enabled: boolean;
  external: boolean;
  private_profile?: string;
}
