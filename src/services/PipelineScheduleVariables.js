import { ResourceVariables } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceVariables)
class PipelineScheduleVariables extends ResourceVariables {
  constructor(options) {
    super('projects', 'pipelines', options);
  }
}

export default PipelineScheduleVariables;
