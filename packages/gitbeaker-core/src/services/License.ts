import { BaseService, RequestHelper, Sudo } from '../infrastructure';

export class License extends BaseService {
  add(license: string, options?: Sudo) {
    return RequestHelper.post(this, 'license', { license, ...options });
  }

  all(options?: Sudo) {
    return RequestHelper.get(this, 'licenses', options);
  }

  show(options?: Sudo) {
    return RequestHelper.get(this, 'license', options);
  }

  remove(licenceId: number, options?: Sudo) {
    const lId = encodeURIComponent(licenceId);

    return RequestHelper.del(this, `license/${lId}`, options);
  }
}
