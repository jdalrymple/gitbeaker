import { ResourceVariables } from '../templates';

class PipelineScheduleVariables extends ResourceVariables {
  constructor(options) {
    super('projects', 'pipelines', options);
  }
}

export default PipelineScheduleVariables;
