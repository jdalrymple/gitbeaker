import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo } from '../infrastructure';

export class License<C extends boolean> extends BaseService<C> {
  add(license: string, options?: Sudo) {
    return RequestHelper.post<C>(this, 'license', { license, ...options });
  }

  all(options?: Sudo) {
    return RequestHelper.get<C>(this, 'licenses', options);
  }

  show(options?: Sudo) {
    return RequestHelper.get<C>(this, 'license', options);
  }

  remove(licenceId: number, options?: Sudo) {
    const lId = encodeURIComponent(licenceId);

    return RequestHelper.del<C>(this, `license/${lId}`, options);
  }
}
