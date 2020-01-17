import { BaseService, RequestHelper, Sudo } from '../infrastructure';

export class Licence extends BaseService {
  add(licence: string, options?: Sudo) {
    return RequestHelper.post(this, 'licence', { licence, ...options });
  }

  all(options?: Sudo) {
    return RequestHelper.get(this, 'licences', options);
  }

  show(options?: Sudo) {
    return RequestHelper.get(this, 'licence', options);
  }

  remove(licenceId: number, options?: Sudo) {
    const lId = encodeURIComponent(licenceId);

    return RequestHelper.del(this, `licence/${lId}`, options);
  }
}
