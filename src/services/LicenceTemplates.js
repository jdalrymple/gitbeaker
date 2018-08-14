import { ResourceTemplates } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceTemplates)
class LicenceTemplates extends ResourceTemplates {
  constructor(options) {
    super('licences', options);
  }
}

export default LicenceTemplates;
