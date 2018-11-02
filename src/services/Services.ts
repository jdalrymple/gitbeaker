import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

type ServiceName = 'asana' | 'assembla' | 'bamboo' | 'bugzilla' | 'buildkite' | 'campfire'
  | 'custom-issue-tracker' | 'drone-ci' | 'emails-on-push' | 'external-wiki' | 'flowdock'
  | 'hangouts_chat' | 'hipchat' | 'irker' | 'jira' | 'kubernetes' | 'slack-slash-commands'
  | 'slack' | 'mattermost-slash-commands' | 'packagist' | 'pipelines-email' | 'pivotaltracker'
  | 'prometheus' | 'pushover' | 'redmine' | 'microsoft-teams' | 'mattermost'
  | 'mattermost-slash-commands' | 'teamcity' | 'jenkins' | 'jenkins-deprecated' | 'mock-ci';
/**
 * @see https://docs.gitlab.com/ee/api/services.html
 */
class Services extends BaseService {
  edit(projectId: ProjectId, serviceName: ServiceName, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/services/${serviceName}`, options);
  }

  remove(projectId: ProjectId, serviceName: ServiceName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/services/${serviceName}`);
  }

  show(projectId: ProjectId, serviceName: ServiceName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/services/${serviceName}`);
  }
}

export default Services;
