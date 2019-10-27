import { BaseService, RequestHelper, BaseRequestOptions, Sudo } from '../infrastructure';

export type SupportedService =
  | 'asana'
  | 'assembla'
  | 'bamboo'
  | 'bugzilla'
  | 'buildkite'
  | 'campfire'
  | 'custom-issue-tracker'
  | 'drone-ci'
  | 'emails-on-push'
  | 'external-wiki'
  | 'flowdock'
  | 'hangouts_chat'
  | 'hipchat'
  | 'irker'
  | 'jira'
  | 'kubernetes'
  | 'slack-slash-commands'
  | 'slack'
  | 'packagist'
  | 'pipelines-email'
  | 'pivotaltracker'
  | 'prometheus'
  | 'pushover'
  | 'redmine'
  | 'microsoft-teams'
  | 'mattermost'
  | 'mattermost-slash-commands'
  | 'teamcity'
  | 'jenkins'
  | 'jenkins-deprecated'
  | 'mock-ci';

export class Services extends BaseService {
  edit(projectId: string | number, serviceName: SupportedService, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/services/${serviceName}`, options);
  }

  remove(projectId: string | number, serviceName: SupportedService, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del(this, `projects/${pId}/services/${serviceName}`, options);
  }

  show(projectId: string | number, serviceName: SupportedService, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/services/${serviceName}`, options);
  }
}
