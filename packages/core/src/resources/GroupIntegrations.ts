import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestBodyRecordOptions,
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export type SupportedGroupIntegration =
  | 'asana'
  | 'assembla'
  | 'bamboo'
  | 'bugzilla'
  | 'buildkite'
  | 'campfire'
  | 'clickup'
  | 'confluence'
  | 'custom-issue-tracker'
  | 'datadog'
  | 'diffblue-cover'
  | 'discord'
  | 'drone-ci'
  | 'emails-on-push'
  | 'ewm'
  | 'external-wiki'
  | 'git-guardian'
  | 'github'
  | 'gitlab-slack-application'
  | 'google-cloud-platform-artifact-registry'
  | 'google-cloud-platform-workload-identity-federation'
  | 'hangouts-chat'
  | 'harbor'
  | 'irker'
  | 'jenkins'
  | 'jira'
  | 'jira-cloud-app'
  | 'linear'
  | 'matrix'
  | 'mattermost'
  | 'mattermost-slash-commands'
  | 'microsoft-teams'
  | 'mock-ci'
  | 'packagist'
  | 'phorge'
  | 'pipelines-email'
  | 'pivotaltracker'
  | 'pumble'
  | 'pushover'
  | 'redmine'
  | 'slack'
  | 'slack-slash-commands'
  | 'squash-tm'
  | 'teamcity'
  | 'telegram'
  | 'unify-circuit'
  | 'webex-teams'
  | 'youtrack';

export interface GroupIntegrationSchema extends Record<string, unknown> {
  id: number;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
  active: boolean;
  commit_events?: boolean;
  push_events?: boolean;
  issues_events?: boolean;
  alert_events?: boolean;
  confidential_issues_events?: boolean;
  merge_requests_events?: boolean;
  tag_push_events?: boolean;
  deployment_events?: boolean;
  note_events?: boolean;
  confidential_note_events?: boolean;
  pipeline_events?: boolean;
  wiki_page_events?: boolean;
  job_events?: boolean;
  comment_on_event_enabled?: boolean;
  inherited: boolean;
  vulnerability_events?: boolean;
}

export class GroupIntegrations<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupIntegrationSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<GroupIntegrationSchema[]>()(
      this,
      endpoint`groups/${groupId}/integrations`,
      { sudo, showExpanded, maxPages, searchParams: searchParams as BaseRequestSearchParams &
              PaginationRequestSearchParams<P> &
              PaginationType<P>, },
    );
  }

  show<E extends boolean = false>(
    groupId: string | number,
    integrationName: SupportedGroupIntegration,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupIntegrationSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<GroupIntegrationSchema>()(
      this,
      endpoint`groups/${groupId}/integrations/${integrationName}`,
      { sudo, showExpanded },
    );
  }

  edit<E extends boolean = false>(
    groupId: string | number,
    integrationName: SupportedGroupIntegration,
    options?: BaseRequestBodyRecordOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupIntegrationSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<GroupIntegrationSchema>()(
      this,
      endpoint`groups/${groupId}/integrations/${integrationName}`,
      { sudo, showExpanded, body },
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    integrationName: SupportedGroupIntegration,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`groups/${groupId}/integrations/${integrationName}`, {
      sudo,
      showExpanded,
    });
  }
}
