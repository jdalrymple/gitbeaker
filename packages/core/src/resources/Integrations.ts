import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestBodyRecordOptions,
  GitlabAPIResponse,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export type SupportedIntegration =
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
  | 'mock-ci'
  | 'youtrack';

export interface IntegrationSchema extends Record<string, unknown> {
  id: number;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
  active: boolean;
  commit_events: boolean;
  push_events: boolean;
  issues_events: boolean;
  confidential_issues_events: boolean;
  merge_requests_events: boolean;
  tag_push_events: boolean;
  note_events: boolean;
  confidential_note_events: boolean;
  pipeline_events: boolean;
  wiki_page_events: boolean;
  job_events: boolean;
  comment_on_event_enabled: boolean;
}

export class Integrations<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IntegrationSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<IntegrationSchema[]>()(
      this,
      endpoint`projects/${projectId}/integrations`,
      { sudo, showExpanded },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    integrationName: SupportedIntegration,
    options?: BaseRequestBodyRecordOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IntegrationSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<IntegrationSchema>()(
      this,
      endpoint`projects/${projectId}/integrations/${integrationName}`,
      { sudo, showExpanded, body },
    );
  }

  disable<E extends boolean = false>(
    projectId: string | number,
    integrationName: SupportedIntegration,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/integrations/${integrationName}`,
      { sudo, showExpanded },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    integrationName: SupportedIntegration,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IntegrationSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<IntegrationSchema>()(
      this,
      endpoint`projects/${projectId}/integrations/${integrationName}`,
      { sudo, showExpanded },
    );
  }
}
