export interface GPGSignatureSchema extends Record<string, unknown> {
  signature_type: 'PGP';
  verification_status: 'verified' | 'unverified';
  gpg_key_id: number;
  gpg_key_primary_keyid: string;
  gpg_key_user_name: string;
  gpg_key_user_email: string;
  gpg_key_subkey_id?: number;
  commit_source: string;
}
