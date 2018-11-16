import { ResourceTemplates } from '../templates';
import { BaseServiceOptions } from '@typings';

class LicenceTemplates extends ResourceTemplates {
  constructor(options: BaseServiceOptions) {
    super('licences', options);
  }
}

export default LicenceTemplates;
