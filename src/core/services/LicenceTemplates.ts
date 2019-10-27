import { ResourceTemplates } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class LicenceTemplates extends ResourceTemplates {
  constructor(options: BaseServiceOptions = {}) {
    super('licences', options);
  }
}
