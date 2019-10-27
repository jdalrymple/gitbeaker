import { BaseService, RequestHelper, Sudo } from '../infrastructure';

export class Licence extends BaseService {
  all(options?: Sudo) {
    return RequestHelper.get(this, 'licence', options);
  }

  create(options?: Sudo) {
    return RequestHelper.post(this, 'licence', options);
  }
}
