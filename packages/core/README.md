<div align="center">
  <br>
  <br>
  <img alt="gitbeaker" src="https://raw.githubusercontent.com/jdalrymple/gitbeaker/main/.github/ASSETS/header.svg">
  <br>
  <br>
  <br>
</div>

<div align="center">
  <p>
		<sup>
			<a href="https://github.com/jdalrymple">My open source work is supported by the community</a>
		</sup>
	</p>
  <br>
	<sup>Special thanks to:</sup>
	<br>
	<br>

  <a href="https://wearecws.com/">
    <img src="https://wearecws.com/images/brand/cws-logo.svg" width="210">
  </a>

  <br>
  <hr>
</div>

<p align="center">
   <a href="https://gitlab.com/jdalrymple/gitbeaker/-/commits/main"><img alt="pipeline status" src="https://gitlab.com/jdalrymple/gitbeaker/badges/main/pipeline.svg?ignore_skipped=true" /></a>
   <a href="https://gitlab.com/jdalrymple/gitbeaker/-/commits/main"><img alt="coverage report" src="https://gitlab.com/jdalrymple/gitbeaker/badges/main/coverage.svg?job=test:unit:core" /></a>
  <a href="https://codeclimate.com/github/jdalrymple/gitbeaker">
    <img src="https://codeclimate.com/github/jdalrymple/gitbeaker/badges/gpa.svg" alt="Code Climate maintainability">
  </a>
  <a href="https://github.com/intuit/auto">
    <img src="https://img.shields.io/badge/release-auto.svg?colorA=888888&colorB=9B065A&label=auto" alt="Auto">
  </a>
  <a href="#contributors-">
    <img src="https://img.shields.io/badge/all_contributors-orange.svg?style=round" alt="All Contributors" />
  </a>
  <img src="https://img.shields.io/badge/code%20style-prettier-ff69b4.svg" alt="Prettier">
  <a href="LICENSE.md">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="Licence: MIT">
  </a>
  <a href="https://packagephobia.com/result?p=@gitbeaker/core">
    <img src="https://packagephobia.com/badge?p=@gitbeaker/core" alt="Install Size: Core">
  </a>
</p>

> Core SDK for the [GitLab](https://gitlab.com/gitlab-org/gitlab/) API. This is not intended for direct use, see [@gitbeaker/rest](https://www.npmjs.com/package/@gitbeaker/rest) or [gitbeaker/cli](https://www.npmjs.com/package/@gitbeaker/cli) instead.

## Table of Contents

- [Usage](#usage)
- [Supported APIs](#supported-apis)
- [Testing](../../docs/TESTING.md)
- [FAQ](../../docs/FAQ.md)
- [Contributors](#contributors)
- [Changelog](./CHANGELOG.md)

## Usage

<table>
<tbody valign=top align=left>
<tr><th>
Browsers
</th><td width=100%>
Load <code>@gitbeaker/core</code> directly from <a href="https://esm.sh">esm.sh</a>

```html
<script type="module">
  import { Gitlab } from 'https://esm.sh/@gitbeaker/core';
</script>
```

</td></tr>
<tr><th>
Deno
</th><td width=100%>
Load <code>@gitbeaker/core</code> directly from <a href="https://esm.sh">esm.sh</a>

```ts
import { Gitlab } from 'https://esm.sh/@gitbeaker/core?dts';
```

</td></tr>
<tr><th>
Node 18+
</th><td>

Install with <code>npm install @gitbeaker/core</code>, or <code>yarn add @gitbeaker/core</code>

```js
import { Gitlab } from '@gitbeaker/core';
```

</td></tr>
</tbody>
</table>

## Supported APIs

<table>
<tbody valign=top align=left>

<tr>
<th>Agents</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/cluster_agents.html">🦊</a>
</td>
<td>
<a href="./src/resources/Agents.ts">⌨️</a>
</td>
</tr>
<tr>
<th>AlertManagement</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/alert_management_alerts.html">🦊</a>
</td>
<td>
<a href="./src/resources/AlertManagement.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ApplicationAppearance</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/appearance.html">🦊</a>
</td>
<td>
<a href="./src/resources/ApplicationAppearance.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ApplicationPlanLimits</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/plan_limits.html">🦊</a>
</td>
<td>
<a href="./src/resources/ApplicationPlanLimits.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ApplicationSettings</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/settings.html">🦊</a>
</td>
<td>
<a href="./src/resources/ApplicationSettings.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ApplicationStatistics</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/statistics.html">🦊</a>
</td>
<td>
<a href="./src/resources/ApplicationStatistics.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Applications</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/applications.html">🦊</a>
</td>
<td>
<a href="./src/resources/Applications.ts">⌨️</a>
</td>
</tr>
<tr>
<th>AuditEvents</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/audit_events.html">🦊</a>
</td>
<td>
<a href="./src/resources/AuditEvents.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Avatar</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/avatar.html">🦊</a>
</td>
<td>
<a href="./src/resources/Avatar.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Branches</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/branches.html">🦊</a>
</td>
<td>
<a href="./src/resources/Branches.ts">⌨️</a>
</td>
</tr>
<tr>
<th>BroadcastMessages</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/broadcast_messages.html">🦊</a>
</td>
<td>
<a href="./src/resources/BroadcastMessages.ts">⌨️</a>
</td>
</tr>
<tr>
<th>CommitDiscussions</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/discussions.html#commits">🦊</a>
</td>
<td>
<a href="./src/resources/CommitDiscussions.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Code Suggestions</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/code_suggestions.html">🦊</a>
</td>
<td>
<a href="./src/resources/CodeSuggestions.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Commits</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/commits.html">🦊</a>
</td>
<td>
<a href="./src/resources/Commits.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Composer</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/packages/composer.html">🦊</a>
</td>
<td>
<a href="./src/resources/Composer.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Conan</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/packages/conan.html">🦊</a>
</td>
<td>
<a href="./src/resources/Conan.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ContainerRegistry</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/container_registry.html">🦊</a>
</td>
<td>
<a href="./src/resources/ContainerRegistry.ts">⌨️</a>
</td>
</tr>
<tr>
<th>DashboardAnnotations</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/metrics_dashboard_annotations.html">🦊</a>
</td>
<td>
<a href="./src/resources/DashboardAnnotations.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Debian</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/debian.html">🦊</a>
</td>
<td>
<a href="./src/resources/Debian.ts">⌨️</a>
</td>
</tr>
<tr>
<th>DependencyProxy</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/dependency_proxy.html">🦊</a>
</td>
<td>
<a href="./src/resources/DependencyProxy.ts">⌨️</a>
</td>
</tr>
<tr>
<th>DeployKeys</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/deploy_keys.html">🦊</a>
</td>
<td>
<a href="./src/resources/DeployKeys.ts">⌨️</a>
</td>
</tr>
<tr>
<th>DeployTokens</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/deploy_tokens.html">🦊</a>
</td>
<td>
<a href="./src/resources/DeployTokens.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Deployments</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/deployments.html">🦊</a>
</td>
<td>
<a href="./src/resources/Deployments.ts">⌨️</a>
</td>
</tr>
<tr>
<th>DockerfileTemplates</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/templates/dockerfiles.html">🦊</a>
</td>
<td>
<a href="./src/resources/DockerfileTemplates.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Environments</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/environments.html">🦊</a>
</td>
<td>
<a href="./src/resources/Environments.ts">⌨️</a>
</td>
</tr>
<tr>
<th>EpicAwardEmojis</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/emoji_reactions.html">🦊</a>
</td>
<td>
<a href="./src/resources/EpicAwardEmojis.ts">⌨️</a>
</td>
</tr>
<tr>
<th>EpicDiscussions</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/discussions.html#epics">🦊</a>
</td>
<td>
<a href="./src/resources/EpicDiscussions.ts">⌨️</a>
</td>
</tr>
<tr>
<th>EpicIssues</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/epic_issues.html">🦊</a>
</td>
<td>
<a href="./src/resources/EpicIssues.ts">⌨️</a>
</td>
</tr>
<tr>
<th>EpicLabelEvents</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/resource_label_events.html#epics">🦊</a>
</td>
<td>
<a href="./src/resources/EpicLabelEvents.ts">⌨️</a>
</td>
</tr>
<tr>
<th>EpicLinks</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/epic_links.html">🦊</a>
</td>
<td>
<a href="./src/resources/EpicLinks.ts">⌨️</a>
</td>
</tr>
<tr>
<th>EpicNotes</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/notes.html#epics">🦊</a>
</td>
<td>
<a href="./src/resources/EpicNotes.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Epics</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/epics.html">🦊</a>
</td>
<td>
<a href="./src/resources/Epics.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ErrorTrackingClientKeys</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/error_tracking.html#error-tracking-client-keys">🦊</a>
</td>
<td>
<a href="./src/resources/ErrorTrackingClientKeys.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ErrorTrackingSettings</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/error_tracking.html#error-tracking-project-settings">🦊</a>
</td>
<td>
<a href="./src/resources/ErrorTrackingSettings.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Events</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/events.html">🦊</a>
</td>
<td>
<a href="./src/resources/Events.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Experiments</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/experiments.html">🦊</a>
</td>
<td>
<a href="./src/resources/Experiments.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ExternalStatusChecks</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/status_checks.html">🦊</a>
</td>
<td>
<a href="./src/resources/ExternalStatusChecks.ts">⌨️</a>
</td>
</tr>
<tr>
<th>FeatureFlagUserLists</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/feature_flag_user_lists.html">🦊</a>
</td>
<td>
<a href="./src/resources/FeatureFlagUserLists.ts">⌨️</a>
</td>
</tr>
<tr>
<th>FeatureFlags</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/feature_flags.html">🦊</a>
</td>
<td>
<a href="./src/resources/FeatureFlags.ts">⌨️</a>
</td>
</tr>
<tr>
<th>FreezePeriods</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/freeze_periods.html">🦊</a>
</td>
<td>
<a href="./src/resources/FreezePeriods.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GeoNodes</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/geo_nodes.html">🦊</a>
</td>
<td>
<a href="./src/resources/GeoNodes.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GeoSites</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/geo_sites.html">🦊</a>
</td>
<td>
<a href="./src/resources/GeoSites.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GitLabCIYMLTemplates</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/gitlab_ci_ymls.html">🦊</a>
</td>
<td>
<a href="./src/resources/GitLabCIYMLTemplates.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GitignoreTemplates</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/templates/gitignores.html">🦊</a>
</td>
<td>
<a href="./src/resources/GitignoreTemplates.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GitlabPages</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/pages.html">🦊</a>
</td>
<td>
<a href="./src/resources/GitlabPages.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GoProxy</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/go_proxy.html">🦊</a>
</td>
<td>
<a href="./src/resources/GoProxy.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupAccessRequests</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/access_requests.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupAccessRequests.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupAccessTokens</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/group_access_tokens.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupAccessTokens.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupActivityAnalytics</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/group_activity_analytics.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupActivityAnalytics.ts">⌨️</a>
</td>
</tr>
<tr>
<tr>
<th>GroupEpicBoards</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/group_epic_boards.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupEpicBoards.ts">⌨️</a>
</td>
</tr>
<th>GroupBadges</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/group_badges.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupBadges.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupCustomAttributes</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/custom_attributes.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupCustomAttributes.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupDORA4Metrics</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/dora/metrics.html#get-group-level-dora-metrics">🦊</a>
</td>
<td>
<a href="./src/resources/GroupDORA4Metrics.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupHooks</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/groups.html#hooks">🦊</a>
</td>
<td>
<a href="./src/resources/GroupHooks.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupImportExports</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/group_import_export.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupImportExports.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupInvitations</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/invitations.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupInvitations.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupIssueBoards</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/group_boards.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupIssueBoards.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupIterations</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/group_iterations.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupIterations.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupLDAPLinks</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/groups.html#ldap-group-links">🦊</a>
</td>
<td>
<a href="./src/resources/GroupLDAPLinks.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupLabels</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/group_labels.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupLabels.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupMemberRoles</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/member_roles.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupMemberRoles.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupMembers</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/members.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupMembers.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupMilestones</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/group_milestones.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupMilestones.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupProtectedEnvironments</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/group_protected_environments.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupProtectedEnvironments.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupPushRules</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/groups.html#push-rules">🦊</a>
</td>
<td>
<a href="./src/resources/GroupPushRules.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupRelationExports</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/group_relations_export.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupRelationExports.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupReleases</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/group_releases.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupReleases.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupRepositoryStorageMoves</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/group_repository_storage_moves.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupRepositoryStorageMoves.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupSAMLIdentities</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/saml.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupSAMLIdentities.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupSAMLLinks</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/groups.html#saml-group-links">🦊</a>
</td>
<td>
<a href="./src/resources/GroupSAMLLinks.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupSCIMIdentities</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/scim.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupSCIMIdentities.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupServiceAccounts</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/groups.html#create-personal-access-token-for-service-account-user">🦊</a>
</td>
<td>
<a href="./src/resources/GroupServiceAccounts.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupVariables</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/group_level_variables.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupVariables.ts">⌨️</a>
</td>
</tr>
<tr>
<th>GroupWikis</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/group_wikis.html">🦊</a>
</td>
<td>
<a href="./src/resources/GroupWikis.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Groups</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/groups.html">🦊</a>
</td>
<td>
<a href="./src/resources/Groups.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Helm</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/packages/helm.html">🦊</a>
</td>
<td>
<a href="./src/resources/Helm.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Import</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/import.html">🦊</a>
</td>
<td>
<a href="./src/resources/Import.ts">⌨️</a>
</td>
</tr>
<tr>
<th>InstanceLevelCICDVariables</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/instance_level_ci_variables.html">🦊</a>
</td>
<td>
<a href="./src/resources/InstanceLevelCICDVariables.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Integrations</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/integrations.html">🦊</a>
</td>
<td>
<a href="./src/resources/Integrations.ts">⌨️</a>
</td>
</tr>
<tr>
<th>IssueAwardEmojis</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/emoji_reactions.html">🦊</a>
</td>
<td>
<a href="./src/resources/IssueAwardEmojis.ts">⌨️</a>
</td>
</tr>
<tr>
<th>IssueDiscussions</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/discussions.html#issues">🦊</a>
</td>
<td>
<a href="./src/resources/IssueDiscussions.ts">⌨️</a>
</td>
</tr>
<tr>
<th>IssueIterationEvents</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/resource_iteration_events.html#issues">🦊</a>
</td>
<td>
<a href="./src/resources/IssueIterationEvents.ts">⌨️</a>
</td>
</tr>
<tr>
<th>IssueLabelEvents</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/resource_label_events.html#issues">🦊</a>
</td>
<td>
<a href="./src/resources/IssueLabelEvents.ts">⌨️</a>
</td>
</tr>
<tr>
<th>IssueLinks</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/issue_links.html">🦊</a>
</td>
<td>
<a href="./src/resources/IssueLinks.ts">⌨️</a>
</td>
</tr>
<tr>
<th>IssueMilestoneEvents</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/resource_milestone_events.html#issues">🦊</a>
</td>
<td>
<a href="./src/resources/IssueMilestoneEvents.ts">⌨️</a>
</td>
</tr>
<tr>
<th>IssueNoteAwardEmojis</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/emoji_reactions.html">🦊</a>
</td>
<td>
<a href="./src/resources/IssueNoteAwardEmojis.ts">⌨️</a>
</td>
</tr>
<tr>
<th>IssueNotes</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/notes.html#issues">🦊</a>
</td>
<td>
<a href="./src/resources/IssueNotes.ts">⌨️</a>
</td>
</tr>
<tr>
<th>IssueStateEvents</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/resource_state_events.html#issues">🦊</a>
</td>
<td>
<a href="./src/resources/IssueStateEvents.ts">⌨️</a>
</td>
</tr>
<tr>
<th>IssueWeightEvents</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/resource_weight_events.html">🦊</a>
</td>
<td>
<a href="./src/resources/IssueWeightEvents.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Issues</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/issues.html">🦊</a>
</td>
<td>
<a href="./src/resources/Issues.ts">⌨️</a>
</td>
</tr>
<tr>
<th>IssuesStatistics</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/issues_statistics.html">🦊</a>
</td>
<td>
<a href="./src/resources/IssuesStatistics.ts">⌨️</a>
</td>
</tr>
<tr>
<th>JobArtifacts</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/job_artifacts.html">🦊</a>
</td>
<td>
<a href="./src/resources/JobArtifacts.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Jobs</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/jobs.html">🦊</a>
</td>
<td>
<a href="./src/resources/Jobs.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Keys</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/keys.html">🦊</a>
</td>
<td>
<a href="./src/resources/Keys.ts">⌨️</a>
</td>
</tr>
<tr>
<th>License</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/license.html">🦊</a>
</td>
<td>
<a href="./src/resources/License.ts">⌨️</a>
</td>
</tr>
<tr>
<th>LicenseTemplates</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/templates/licenses.html">🦊</a>
</td>
<td>
<a href="./src/resources/LicenseTemplates.ts">⌨️</a>
</td>
</tr>
<tr>
<th>LinkedEpics</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/linked_epics.html">🦊</a>
</td>
<td>
<a href="./src/resources/LinkedEpics.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Lint</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/lint.html">🦊</a>
</td>
<td>
<a href="./src/resources/Lint.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Markdown</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/markdown.html">🦊</a>
</td>
<td>
<a href="./src/resources/Markdown.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Maven</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/packages/maven.html">🦊</a>
</td>
<td>
<a href="./src/resources/Maven.ts">⌨️</a>
</td>
</tr>
<tr>
<th>MergeRequestApprovals</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/merge_request_approvals.html">🦊</a>
</td>
<td>
<a href="./src/resources/MergeRequestApprovals.ts">⌨️</a>
</td>
</tr>
<tr>
<th>MergeRequestAwardEmojis</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/emoji_reactions.html">🦊</a>
</td>
<td>
<a href="./src/resources/MergeRequestAwardEmojis.ts">⌨️</a>
</td>
</tr>
<tr>
<th>MergeRequestContextCommits</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/merge_request_context_commits.html">🦊</a>
</td>
<td>
<a href="./src/resources/MergeRequestContextCommits.ts">⌨️</a>
</td>
</tr>
<tr>
<th>MergeRequestDiscussions</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/discussions.html#merge-requests">🦊</a>
</td>
<td>
<a href="./src/resources/MergeRequestDiscussions.ts">⌨️</a>
</td>
</tr>
<tr>
<th>MergeRequestDraftNotes</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/draft_notes.html">🦊</a>
</td>
<td>
<a href="./src/resources/MergeRequestDraftNotes.ts">⌨️</a>
</td>
</tr>
<tr>
<th>MergeRequestLabelEvents</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/resource_label_events.html#merge-requests">🦊</a>
</td>
<td>
<a href="./src/resources/MergeRequestLabelEvents.ts">⌨️</a>
</td>
</tr>
<tr>
<th>MergeRequestMilestoneEvents</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/resource_milestone_events.html#merge-requests">🦊</a>
</td>
<td>
<a href="./src/resources/MergeRequestMilestoneEvents.ts">⌨️</a>
</td>
</tr>
<tr>
<th>MergeRequestNoteAwardEmojis</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/emoji_reactions.html">🦊</a>
</td>
<td>
<a href="./src/resources/MergeRequestNoteAwardEmojis.ts">⌨️</a>
</td>
</tr>
<tr>
<th>MergeRequestNotes</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/notes.html#merge-requests">🦊</a>
</td>
<td>
<a href="./src/resources/MergeRequestNotes.ts">⌨️</a>
</td>
</tr>
<tr>
<th>MergeRequests</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/merge_requests.html">🦊</a>
</td>
<td>
<a href="./src/resources/MergeRequests.ts">⌨️</a>
</td>
</tr>
<tr>
<th>MergeTrains</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/merge_trains.html">🦊</a>
</td>
<td>
<a href="./src/resources/MergeTrains.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Metadata</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/metadata.html">🦊</a>
</td>
<td>
<a href="./src/resources/Metadata.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Migrations</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/bulk_imports.html">🦊</a>
</td>
<td>
<a href="./src/resources/Migrations.ts">⌨️</a>
</td>
</tr>
<tr>
<th>NPM</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/packages/npm.html">🦊</a>
</td>
<td>
<a href="./src/resources/NPM.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Namespaces</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/namespaces.html">🦊</a>
</td>
<td>
<a href="./src/resources/Namespaces.ts">⌨️</a>
</td>
</tr>
<tr>
<th>NotificationSettings</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/notification_settings.html">🦊</a>
</td>
<td>
<a href="./src/resources/NotificationSettings.ts">⌨️</a>
</td>
</tr>
<tr>
<th>NuGet</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/packages/nuget.html">🦊</a>
</td>
<td>
<a href="./src/resources/NuGet.ts">⌨️</a>
</td>
</tr>
<tr>
<th>PackageRegistry</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/user/packages/generic_packages/">🦊</a>
</td>
<td>
<a href="./src/resources/PackageRegistry.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Packages</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/packages.html">🦊</a>
</td>
<td>
<a href="./src/resources/Packages.ts">⌨️</a>
</td>
</tr>
<tr>
<th>PagesDomains</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/pages_domains.html">🦊</a>
</td>
<td>
<a href="./src/resources/PagesDomains.ts">⌨️</a>
</td>
</tr>
<tr>
<th>PersonalAccessTokens</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/personal_access_tokens.html">🦊</a>
</td>
<td>
<a href="./src/resources/PersonalAccessTokens.ts">⌨️</a>
</td>
</tr>
<tr>
<th>PipelineScheduleVariables</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/pipeline_schedules.html#pipeline-schedule-variables">🦊</a>
</td>
<td>
<a href="./src/resources/PipelineScheduleVariables.ts">⌨️</a>
</td>
</tr>
<tr>
<th>PipelineSchedules</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/pipeline_schedules.html#get-all-pipeline-schedules>🦊</a>
</td>
<td>
<a href="./src/resources/PipelineSchedules.ts">⌨️</a>
</td>
</tr>
<tr>
<th>PipelineTriggerTokens</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/pipeline_triggers.html">🦊</a>
</td>
<td>
<a href="./src/resources/PipelineTriggerTokens.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Pipelines</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/pipelines.html">🦊</a>
</td>
<td>
<a href="./src/resources/Pipelines.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProductAnalytics</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/product_analytics.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProductAnalytics.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectAccessRequests</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/access_requests.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectAccessRequests.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectAccessTokens</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/project_access_tokens.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectAccessTokens.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectAliases</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/project_aliases.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectAliases.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectBadges</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/project_badges.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectBadges.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectCustomAttributes</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/custom_attributes.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectCustomAttributes.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectDORA4Metrics</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/metrics.html#get-project-level-dora-metrics">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectDORA4Metrics.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectHooks</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/projects.html#hooks">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectHooks.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectImportExports</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/project_import_export.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectImportExports.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectInvitations</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/invitations.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectInvitations.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectIssueBoards</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/boards.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectIssueBoards.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectIterations</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/iterations.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectIterations.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectLabels</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/labels.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectLabels.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectMembers</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/members.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectMembers.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectMilestones</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/milestones.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectMilestones.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectProtectedEnvironments</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/protected_environments.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectProtectedEnvironments.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectPushRules</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/projects.html#push-rules">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectPushRules.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectRelationsExport</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/project_relations_export.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectRelationsExport.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectReleases</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/releases/">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectReleases.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectRemoteMirrors</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/remote_mirrors.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectRemoteMirrors.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectRepositoryStorageMoves</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/project_repository_storage_moves.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectRepositoryStorageMoves.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectSnippetAwardEmojis</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/emoji_reactions.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectSnippetAwardEmojis.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectSnippetDiscussions</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/discussions.html#snippets">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectSnippetDiscussions.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectSnippetNotes</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/notes.html#snippets">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectSnippetNotes.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectSnippets</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/project_snippets.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectSnippets.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectStatistics</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/project_statistics.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectStatistics.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectTemplates</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/project_templates.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectTemplates.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectVariables</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/project_level_variables.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectVariables.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectVulnerabilities</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/project_vulnerabilities.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectVulnerabilities.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProjectWikis</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/wikis.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProjectWikis.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Projects</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/projects.html">🦊</a>
</td>
<td>
<a href="./src/resources/Projects.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProtectedBranches</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/protected_branches.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProtectedBranches.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ProtectedTags</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/protected_tags.html">🦊</a>
</td>
<td>
<a href="./src/resources/ProtectedTags.ts">⌨️</a>
</td>
</tr>
<tr>
<th>PyPI</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/packages/pypi.html">🦊</a>
</td>
<td>
<a href="./src/resources/PyPI.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ReleaseLinks</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/releases/links.html">🦊</a>
</td>
<td>
<a href="./src/resources/ReleaseLinks.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Repositories</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/">🦊</a>
</td>
<td>
<a href="./src/resources/Repositories.ts">⌨️</a>
</td>
</tr>
<tr>
<th>RepositoryFiles</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/repository_files.html">🦊</a>
</td>
<td>
<a href="./src/resources/RepositoryFiles.ts">⌨️</a>
</td>
</tr>
<tr>
<th>RepositorySubmodules</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/repository_submodules.html">🦊</a>
</td>
<td>
<a href="./src/resources/RepositorySubmodules.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ResourceGroups</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/resource_groups.html">🦊</a>
</td>
<td>
<a href="./src/resources/ResourceGroups.ts">⌨️</a>
</td>
</tr>
<tr>
<th>RubyGems</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/packages/rubygems.html">🦊</a>
</td>
<td>
<a href="./src/resources/RubyGems.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Runners</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/runners.html">🦊</a>
</td>
<td>
<a href="./src/resources/Runners.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Search</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/search.html">🦊</a>
</td>
<td>
<a href="./src/resources/Search.ts">⌨️</a>
</td>
</tr>
<tr>
<th>SearchAdmin</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/search_admin.html">🦊</a>
</td>
<td>
<a href="./src/resources/SearchAdmin.ts">⌨️</a>
</td>
</tr>
<tr>
<th>SecureFiles</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/secure_files.html">🦊</a>
</td>
<td>
<a href="./src/resources/SecureFiles.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ServiceAccounts</th>
<td>
<a href="https://docs.gitlab.com/ee/api/users.html#create-service-account-user">🦊</a>
</td>
<td>
<a href="./src/resources/ServiceAccounts.ts">⌨️</a>
</td>
</tr>
<tr>
<th>ServiceData</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/usage_data.html">🦊</a>
</td>
<td>
<a href="./src/resources/ServiceData.ts">⌨️</a>
</td>
</tr>
<tr>
<th>SidekiqMetrics</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/sidekiq_metrics.html">🦊</a>
</td>
<td>
<a href="./src/resources/SidekiqMetrics.ts">⌨️</a>
</td>
</tr>
<tr>
<th>SidekiqQueues</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/admin_sidekiq_queues.html">🦊</a>
</td>
<td>
<a href="./src/resources/SidekiqQueues.ts">⌨️</a>
</td>
</tr>
<tr>
<th>SnippetRepositoryStorageMoves</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/snippet_repository_storage_moves.html">🦊</a>
</td>
<td>
<a href="./src/resources/SnippetRepositoryStorageMoves.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Snippets</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/snippets.html">🦊</a>
</td>
<td>
<a href="./src/resources/Snippets.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Suggestions</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/suggestions.html">🦊</a>
</td>
<td>
<a href="./src/resources/Suggestions.ts">⌨️</a>
</td>
</tr>
<tr>
<th>SystemHooks</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/system_hooks.html">🦊</a>
</td>
<td>
<a href="./src/resources/SystemHooks.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Tags</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/tags.html">🦊</a>
</td>
<td>
<a href="./src/resources/Tags.ts">⌨️</a>
</td>
</tr>
<tr>
<th>TodoLists</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/todos.html">🦊</a>
</td>
<td>
<a href="./src/resources/TodoLists.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Topics</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/topics.html">🦊</a>
</td>
<td>
<a href="./src/resources/Topics.ts">⌨️</a>
</td>
</tr>
<tr>
<th>UserCustomAttributes</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/custom_attributes.html">🦊</a>
</td>
<td>
<a href="./src/resources/UserCustomAttributes.ts">⌨️</a>
</td>
</tr>
<tr>
<th>UserEmails</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/users.html#list-emails">🦊</a>
</td>
<td>
<a href="./src/resources/UserEmails.ts">⌨️</a>
</td>
</tr>
<tr>
<th>UserGPGKeys</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/users.html#list-all-gpg-keys">🦊</a>
</td>
<td>
<a href="./src/resources/UserGPGKeys.ts">⌨️</a>
</td>
</tr>
<tr>
<th>UserImpersonationTokens</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/users.html#get-an-impersonation-token-of-a-user">🦊</a>
</td>
<td>
<a href="./src/resources/UserImpersonationTokens.ts">⌨️</a>
</td>
</tr>
<tr>
<th>UserSSHKeys</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/users.html#list-ssh-keys">🦊</a>
</td>
<td>
<a href="./src/resources/UserSSHKeys.ts">⌨️</a>
</td>
</tr>
<tr>
<th>UserStarredMetricsDashboard</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/metrics_user_starred_dashboards.html">🦊</a>
</td>
<td>
<a href="./src/resources/UserStarredMetricsDashboard.ts">⌨️</a>
</td>
</tr>
<tr>
<th>Users</th>
<td>
<a href="https://docs.gitlab.com/16.4/ee/api/users.html">🦊</a>
</td>
<td>
<a href="./src/resources/Users.ts">⌨️</a>
</td>
</tr>

</tbody>
</table>

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<p>
    <tr>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/jdalrymple"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/3743662?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Justin Dalrymple"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/dylandesrosier"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/13701258?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Dylan DesRosier"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/mikew"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/4729?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Mike Wyatt"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/coryzibell"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/7986014?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Cory Zibeill"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/shadygrove"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/5209850?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Martin Bour"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/akira345"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/655764?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="akira345"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://birukov.me"><img src="https://images.weserv.nl/?url=https://avatars2.githubusercontent.com/u/1861546?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Pavel Birukov "/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://jetersen.dev"><img src="https://images.weserv.nl/?url=https://avatars2.githubusercontent.com/u/1661688?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Joseph Petersen"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Musinux"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/563373?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Louis Cherel"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://www.arsdehnel.net"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/1697162?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Adam Dehnel"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://www.haus.gg/"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/226640?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Ev Haus"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://iGLOO.be"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/900947?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Loïc Mahieu"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://www.giuseppeangri.com"><img src="https://images.weserv.nl/?url=https://avatars2.githubusercontent.com/u/9075163?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Giuseppe Angri"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/jennparise"><img src="https://images.weserv.nl/?url=https://avatars1.githubusercontent.com/u/4134086?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="jennparise"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://obartra.github.io"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/3877773?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Oscar"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://daniel-ruf.de"><img src="https://images.weserv.nl/?url=https://avatars1.githubusercontent.com/u/827205?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Daniel Ruf"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/schindld"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/1659632?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="schindld"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://alvarobg.com"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/12004383?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Alvaro"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://northhorizon.net"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/616152?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Daniel Moore"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://dylanmtaylor.com"><img src="https://images.weserv.nl/?url=https://avatars2.githubusercontent.com/u/277927?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Dylan M. Taylor"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://pixelswap.fr/"><img src="https://images.weserv.nl/?url=https://avatars1.githubusercontent.com/u/4266283?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Corentin Mors"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/xatavian"><img src="https://images.weserv.nl/?url=https://avatars1.githubusercontent.com/u/17217965?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="xatavian"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://stackoverflow.com/story/yepninja"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/11796206?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Yevgeny Petukhov"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://about.me/mickaeltr"><img src="https://images.weserv.nl/?url=https://avatars2.githubusercontent.com/u/378910?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Mickaël Tricot"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/andreasciamanna"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/181780?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Andrea"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://www.ircad.fr/"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/8638653?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Flavien Bridault"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/s-kazuki"><img src="https://images.weserv.nl/?url=https://avatars2.githubusercontent.com/u/9253374?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="s-kazuki"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/kiprasmel"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/29430509?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Kipras Melnikovas"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Gkxie"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/27680715?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="xieyu"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/st1gok"><img src="https://images.weserv.nl/?url=https://avatars1.githubusercontent.com/u/13641693?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="st1gok"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/max-wittig"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/6639323?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Max Wittig"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/nlochschmidt"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/759624?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Niklas Lochschmidt"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/illyaMs"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/26578665?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Ilya Dus"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/wamry"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/32439651?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Omar Awamry"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Sumragen"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/15640910?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Hennadii Varava"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/xiezht"><img src="https://images.weserv.nl/?url=https://avatars1.githubusercontent.com/u/18051618?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="xiezht"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://www.martin-helmich.de/en"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/2538958?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Martin Helmich"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/smcgivern"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/1120328?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Sean McGivern"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Vogel612"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/7288995?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Clemens Lieb"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://sajdl.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/5222912?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Vojtěch Sajdl"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/divido"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/4614626?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="divido"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/vboulaye"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/652767?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Vincent Boulaye"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Aliyss"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/33941859?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Aliyss Snow"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/saada"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/1087987?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Mahmoud Saada"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/F3n67u"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/12343178?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Feng Yu"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://datatra.sh/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/173822?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Roy Jacobs"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://www.paullemke.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/976010?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Paul Lemke"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://jenko.me/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/131355?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Ian Jenkins"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://www.nilennoct.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/4055220?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="nilennoct"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://michael.laffargue.fr/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/503129?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Laffargue Michael"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/MartinHowarth"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/7187425?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Martin Howarth"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/christophlehmann"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/4953689?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Christoph Lehmann"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://theopensourceu.org/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/253471?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Frank V"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Salimlou"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/357286?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Salim Benabbou"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/tvtamas"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/1945260?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Tamás Török-Vistai"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/MartinBenninger"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/20296116?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Martin Benninger"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/fewieden"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/9334168?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="fewieden"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://www.jeffpelton.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/36627?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Jeff Pelton"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/claude-abounegm"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/11809881?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Claude Abounegm"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Marethyu1"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/17978203?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Stefan Hall"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Mr-Wallet"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/799000?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Jordan Wallet"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/zhao0"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/7556666?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="zhao0"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://www.linkedin.com/in/joshuagrosso"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/4530584?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Joshua Grosso"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/yonguelink"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/9469187?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Isaac Ouellet Therrien"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://wearecws.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/24895138?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Rajat Sharma"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Casz"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/65105345?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Cesar B."/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://blog.katsuba.dev/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/10637135?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Igor Katsuba"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://www.doublespeakgames.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/4884483?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Michael Townsend"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/bodtx"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/1039550?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="bodtx"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/arthot"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/1815294?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Artem"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://muniftanjim.dev/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/8050659?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Munif Tanjim"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://www.qkdreyer.dev/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/717869?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Quentin Dreyer"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://iwritethe.codes/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/192728?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Norm MacLennan"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/jnovick"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/7881319?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="jnovick"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://www.fabianaussems.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/57530?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Fabian Aussems"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/mima0815"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/14311597?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Michael Matzka"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/CraigAllardyce"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/9052289?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="CraigAllardyce"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/brunobastosg"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/320122?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Bruno Guimarães"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://leipert.io/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/2906107?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Lukas Eipert"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://max.krauss.io/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/914671?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Maximilian Krauß"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://eng.evolution.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/15799569?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Evolution Engineering"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Neonox31"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/1135958?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="WEBER Logan"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://t.me/mister_cheater"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/5055654?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Anton Zhukov"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/beaverusiv"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/4149031?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Nicholas Loomans"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://icedream.pw/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/807772?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Carl Kittelberger"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://patrik.votocek.cz/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/112567?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Patrik Votoček"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://kyr.github.io/CV/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/426462?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Kyrylo Fedorov"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/claudio-vellage"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/28930612?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Claudio Vellage"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/seb0uil"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/5122626?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Seb0uil"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://merorafael.info/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/3404989?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Rafael Mello"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/tbazin"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/9104039?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Théis Bazin"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://spencersalisbury.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/8053224?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Spencer Salisbury"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://simonecorsi.dev/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/5617452?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Simone Corsi"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Bambii556"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/34485027?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Bambii"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/ravewill"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/128541928?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Will"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/ArnaudTA"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/33383276?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="ArnaudTA"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/kouak"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/48335?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Benjamin Beret"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/demedos"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/16702156?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Alessandro Diez"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/artlist-scottambrose"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/124692101?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="artlist-scottambrose"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/mercutiodesign"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/1114120?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Martin Dreher"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/glensc"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/199095?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Elan Ruusamäe"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Artemoire"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/18062266?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="artemoire"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/pataar"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/3403851?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Pieter Willekens"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Djcd"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/761764?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="David Claybourne"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/domharrington"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/848223?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Dom Harrington"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/kseino"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/1378066?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Kohei Seino"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://www.1stg.me/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/8336744?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="JounQin"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/elaine-mattos"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/79633988?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Elaine Mattos"/></td>
    </tr>
</p>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This started as a fork from [node-gitlab-legacy](https://github.com/rest-gitlab/rest-gitlab-legacy) but I ended up rewriting much of the code. Here are the original work's [contributors](https://github.com/rest-gitlab/rest-gitlab-legacy#contributors).
