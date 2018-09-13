import { ResourceTemplates } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class LicenceTemplates extends ResourceTemplates {
  constructor(options: BaseModelContructorOptions) {
    super('licences', options);
  }
}

export default LicenceTemplates;
