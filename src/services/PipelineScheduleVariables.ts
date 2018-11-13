import { ResourceVariables } from '../templates';
import { BaseServiceOptions } from '@src/types';

class PipelineScheduleVariables extends ResourceVariables {
  constructor(options: BaseServiceOptions) {
    super('projects', 'pipelines', options);
  }
}

export default PipelineScheduleVariables;
