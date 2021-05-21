import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo } from '../infrastructure';

export interface LicenseSchema extends Record<string, unknown> {
  id: number;
  plan: string;
  created_at: string;
  starts_at: string;
  expires_at: string;
  historical_max: number;
  maximum_user_count: number;
  expired: boolean;
  overage: number;
  user_limit: number;
  active_users: number;
  licensee: {
    Name: string;
  };
  add_ons: {
    GitLab_FileLocks: number;
    GitLab_Auditor_User: number;
  };
}

export class License extends BaseService {
  add(license: string, options?: Sudo) {
    return RequestHelper.post<LicenseSchema>()(this, 'license', { license, ...options });
  }

  all(options?: Sudo) {
    return RequestHelper.get<LicenseSchema[]>()(this, 'licenses', options);
  }

  show(options?: Sudo) {
    return RequestHelper.get<LicenseSchema>()(this, 'license', options);
  }

  remove(licenceId: number, options?: Sudo) {
    const lId = encodeURIComponent(licenceId);

    return RequestHelper.del<LicenseSchema>()(this, `license/${lId}`, options);
  }
}
