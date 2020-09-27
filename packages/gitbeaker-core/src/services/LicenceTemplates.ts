import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceTemplates } from '../templates';

export class LicenceTemplates extends ResourceTemplates {
  constructor(options: BaseServiceOptions = {}) {
    super('licences', options);
  }
}
