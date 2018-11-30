# API Services

It can be annoying to have to import all the API's pertaining to a specific resource. For example, the Projects resource is composed of many API's, Projects, Issues, Labels, MergeRequests, etc. For convenience, there is a Bundle export for importing and instantiating all these related API's at once.

```typescript
import { ProjectsBundle } from 'gitlab';

const services = new ProjectsBundle({
  url:   'http://example.com', // Defaults to http://gitlab.com
  token: 'abcdefghij123456' // Can be created in your profile.
})

services.Projects.all()
services.MergeRequests.all()
// etc...
```

Currently there are three Bundles:

ProjectsBundle which includes:
- [Branches](projects/Branches.md)
- [Commits](projects/Commits.md)
- CommitDiscussions
- Deployments
- DeployKeys
- Environments
- Issues
- IssueNotes
- IssueDiscussions
- IssueAwardEmojis
- Jobs
- Labels
- MergeRequests
- MergeRequestAwardEmojis
- MergeRequestDiscussions
- MergeRequestNotes
- Pipelines
- PipelineSchedules
- PipelineScheduleVariables
- [Projects](projects/Projects.md)
- ProjectAccessRequests
- ProjectBadges
- ProjectCustomAttributes
- ProjectImportExport
- ProjectIssueBoards
- ProjectHooks
- ProjectMembers
- ProjectMilestones
- ProjectSnippets
- ProjectSnippetNotes
- ProjectSnippetDiscussions
- ProjectSnippetAwardEmojis
- ProtectedBranches
- ProjectVariables
- Repositories
- RepositoryFiles
- Runners
- Services
- Tags
- Todos
- Triggers

UsersBundle which includes:
- Users,
- UserCustomAttributes,
- UserEmails,
- UserImpersonationTokens,
- UserKeys,
- UserGPGKeys

GroupsBundle which includes:
- [Groups](groups/Groups.md)
- GroupAccessRequests
- GroupBadges
- GroupCustomAttributes
- GroupIssueBoards
- GroupMembers
- GroupMilestones
- GroupProjects
- GroupVariables
- Epics
- EpicIssues
- EpicNotes
- EpicDiscussions
