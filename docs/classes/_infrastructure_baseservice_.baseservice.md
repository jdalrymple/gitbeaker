# Class: BaseService

## Hierarchy

* **BaseService**

  ↳ [Groups](_services_groups_.groups.md)

  ↳ [ResourceAccessRequests](_templates_resourceaccessrequests_.resourceaccessrequests.md)

  ↳ [ResourceAwardsEmojis](_templates_resourceawardemojis_.resourceawardsemojis.md)

  ↳ [ResourceBadges](_templates_resourcebadges_.resourcebadges.md)

  ↳ [ResourceCustomAttributes](_templates_resourcecustomattributes_.resourcecustomattributes.md)

  ↳ [ResourceDiscussions](_templates_resourcediscussions_.resourcediscussions.md)

  ↳ [ResourceIssueBoards](_templates_resourceissueboards_.resourceissueboards.md)

  ↳ [ResourceMembers](_templates_resourcemembers_.resourcemembers.md)

  ↳ [ResourceMilestones](_templates_resourcemilestones_.resourcemilestones.md)

  ↳ [ResourceNotes](_templates_resourcenotes_.resourcenotes.md)

  ↳ [ResourceTemplates](_templates_resourcetemplates_.resourcetemplates.md)

  ↳ [ResourceVariables](_templates_resourcevariables_.resourcevariables.md)

  ↳ [GroupProjects](_services_groupprojects_.groupprojects.md)

  ↳ [Epics](_services_epics_.epics.md)

  ↳ [EpicIssues](_services_epicissues_.epicissues.md)

  ↳ [Users](_services_users_.users.md)

  ↳ [UserEmails](_services_useremails_.useremails.md)

  ↳ [UserImpersonationTokens](_services_userimpersonationtokens_.userimpersonationtokens.md)

  ↳ [UserKeys](_services_userkeys_.userkeys.md)

  ↳ [UserGPGKeys](_services_usergpgkeys_.usergpgkeys.md)

  ↳ [Branches](_services_branches_.branches.md)

  ↳ [Commits](_services_commits_.commits.md)

  ↳ [ContainerRegistry](_services_containerregistry_.containerregistry.md)

  ↳ [Deployments](_services_deployments_.deployments.md)

  ↳ [DeployKeys](_services_deploykeys_.deploykeys.md)

  ↳ [Environments](_services_environments_.environments.md)

  ↳ [Issues](_services_issues_.issues.md)

  ↳ [Jobs](_services_jobs_.jobs.md)

  ↳ [Labels](_services_labels_.labels.md)

  ↳ [MergeRequests](_services_mergerequests_.mergerequests.md)

  ↳ [Pipelines](_services_pipelines_.pipelines.md)

  ↳ [PipelineSchedules](_services_pipelineschedules_.pipelineschedules.md)

  ↳ [PipelineScheduleVariables](_services_pipelineschedulevariables_.pipelineschedulevariables.md)

  ↳ [Projects](_services_projects_.projects.md)

  ↳ [ProjectImportExport](_services_projectimportexport_.projectimportexport.md)

  ↳ [ProjectHooks](_services_projecthooks_.projecthooks.md)

  ↳ [ProjectSnippets](_services_projectsnippets_.projectsnippets.md)

  ↳ [ProtectedBranches](_services_protectedbranches_.protectedbranches.md)

  ↳ [ProtectedTags](_services_protectedtags_.protectedtags.md)

  ↳ [Releases](_services_releases_.releases.md)

  ↳ [ReleaseLinks](_services_releaselinks_.releaselinks.md)

  ↳ [Repositories](_services_repositories_.repositories.md)

  ↳ [RepositoryFiles](_services_repositoryfiles_.repositoryfiles.md)

  ↳ [Runners](_services_runners_.runners.md)

  ↳ [Services](_services_services_.services.md)

  ↳ [Tags](_services_tags_.tags.md)

  ↳ [Todos](_services_todos_.todos.md)

  ↳ [Triggers](_services_triggers_.triggers.md)

  ↳ [PushRule](_services_pushrule_.pushrule.md)

  ↳ [ApplicationSettings](_services_applicationsettings_.applicationsettings.md)

  ↳ [BroadcastMessages](_services_broadcastmessages_.broadcastmessages.md)

  ↳ [Events](_services_events_.events.md)

  ↳ [FeatureFlags](_services_featureflags_.featureflags.md)

  ↳ [GeoNodes](_services_geonodes_.geonodes.md)

  ↳ [Keys](_services_keys_.keys.md)

  ↳ [Licence](_services_licence_.licence.md)

  ↳ [Lint](_services_lint_.lint.md)

  ↳ [Namespaces](_services_namespaces_.namespaces.md)

  ↳ [NotificationSettings](_services_notificationsettings_.notificationsettings.md)

  ↳ [Markdown](_services_markdown_.markdown.md)

  ↳ [PagesDomains](_services_pagesdomains_.pagesdomains.md)

  ↳ [Search](_services_search_.search.md)

  ↳ [SidekiqMetrics](_services_sidekiqmetrics_.sidekiqmetrics.md)

  ↳ [Snippets](_services_snippets_.snippets.md)

  ↳ [SystemHooks](_services_systemhooks_.systemhooks.md)

  ↳ [Version](_services_version_.version.md)

  ↳ [Wikis](_services_wikis_.wikis.md)

## Constructors

###  constructor

\+ **new BaseService**(`__namedParameters`: object): *[BaseService](_infrastructure_baseservice_.baseservice.md)*

*Defined in [infrastructure/BaseService.ts:10](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L10)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`camelize` | boolean | false |
`host` | string | "https://gitlab.com" |
`jobToken` | undefined &#124; string | - |
`oauthToken` | undefined &#124; string | - |
`rejectUnauthorized` | boolean | true |
`requestTimeout` | number | 300000 |
`requester` | [Requester](../interfaces/_infrastructure_index_.requester.md) |  KyRequester |
`sudo` | undefined &#124; string &#124; number | - |
`token` | undefined &#124; string | - |
`url` | string | "" |
`version` | string | "v4" |

**Returns:** *[BaseService](_infrastructure_baseservice_.baseservice.md)*

## Properties

###  camelize

• **camelize**: *boolean*

*Defined in [infrastructure/BaseService.ts:9](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L9)*

___

###  headers

• **headers**: *object*

*Defined in [infrastructure/BaseService.ts:8](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L8)*

#### Type declaration:

* \[ **header**: *string*\]: string

___

###  rejectUnauthorized

• **rejectUnauthorized**: *boolean*

*Defined in [infrastructure/BaseService.ts:10](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L10)*

___

###  requestTimeout

• **requestTimeout**: *number*

*Defined in [infrastructure/BaseService.ts:7](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L7)*

___

###  requester

• **requester**: *[Requester](../interfaces/_infrastructure_index_.requester.md)*

*Defined in [infrastructure/BaseService.ts:6](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L6)*

___

###  url

• **url**: *string*

*Defined in [infrastructure/BaseService.ts:5](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L5)*
