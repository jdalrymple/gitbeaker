import { ResourceVariables } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class PipelineScheduleVariables extends ResourceVariables {
  constructor(options: BaseModelContructorOptions) {
    super('projects', 'pipelines', options);
  }
}

export default PipelineScheduleVariables;
