import { ResourceVariables } from '../templates';
import { BaseServiceOptions } from '@typings';

class PipelineScheduleVariables extends ResourceVariables {
  constructor(options: BaseServiceOptions) {
    super('projects', 'pipelines', options);
  }
}

export default PipelineScheduleVariables;
