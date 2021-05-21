import { AccessLevel } from '.';

export interface MembersSchema extends Record<string, unknown> {
  id: number;
  username: string;
  name: string;
  state: string;
  avatar_url: string;
  web_url: string;
  expires_at: string;
  access_level: AccessLevel;
  email: string;
  group_saml_identity: {
    extern_uid: string;
    provider: string;
    saml_provider_id: number;
  };
}
