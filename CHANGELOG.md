# [3.8.0](https://github.com/jdalrymple/node-gitlab/compare/3.7.0...3.8.0) (2018-08-14)


### Bug Fixes

* **api:** Updating project members all function to include the inherited members.  [#141](https://github.com/jdalrymple/node-gitlab/issues/141) ([e081a16](https://github.com/jdalrymple/node-gitlab/commit/e081a16))
* **package:** update [@semantic-release](https://github.com/semantic-release)/npm to version 5.0.0 ([dc9748d](https://github.com/jdalrymple/node-gitlab/commit/dc9748d))
* **package:** update [@semantic-release](https://github.com/semantic-release)/npm to version 5.0.1 ([12b6ca1](https://github.com/jdalrymple/node-gitlab/commit/12b6ca1)), closes [#139](https://github.com/jdalrymple/node-gitlab/issues/139)
* **package:** Updating packages and fixing [#140](https://github.com/jdalrymple/node-gitlab/issues/140) due to a babel update ([04d1769](https://github.com/jdalrymple/node-gitlab/commit/04d1769))


### Features

* Add push rule service ([#143](https://github.com/jdalrymple/node-gitlab/issues/143)) ([395f83c](https://github.com/jdalrymple/node-gitlab/commit/395f83c))
* Add transfer a project to a new namespace ([#145](https://github.com/jdalrymple/node-gitlab/issues/145)) ([87e9f55](https://github.com/jdalrymple/node-gitlab/commit/87e9f55))

# [3.7.0](https://github.com/jdalrymple/node-gitlab/compare/3.6.0...3.7.0) (2018-08-02)


### Features

* Adding update push rules to Projects, and updating the Protected Branches service to match the updated API thanks to [jennparise](https://github.com/jennparise)([#134](https://github.com/jdalrymple/node-gitlab/issues/134))  ([9f3de02](https://github.com/jdalrymple/node-gitlab/commit/9f3de02))
* Updating Project Snippets API [#138](https://github.com/jdalrymple/node-gitlab/issues/138) ([a7858bd](https://github.com/jdalrymple/node-gitlab/commit/a7858bd))

# [3.6.0](https://github.com/jdalrymple/node-gitlab/compare/3.5.1...3.6.0) (2018-07-24)

### Bug Fixes

* **package:** update [@semantic-release](https://github.com/semantic-release)/npm to version 4.0.0 ([#122](https://github.com/jdalrymple/node-gitlab/issues/122)) ([5351dcc](https://github.com/jdalrymple/node-gitlab/commit/5351dcc))

### Features

* Add mirror pull trigger ([#130](https://github.com/jdalrymple/node-gitlab/issues/130)) ([b6ccb80](https://github.com/jdalrymple/node-gitlab/commit/b6ccb80)) thanks to [Joseph Petersen](https://github.com/casz)
* Making API version modifyable ([a2732b9](https://github.com/jdalrymple/node-gitlab/commit/a2732b9))
* Updating Jobs API ([03a2f2d](https://github.com/jdalrymple/node-gitlab/commit/03a2f2d))
* Updating participants function for issues ([f60e7ed](https://github.com/jdalrymple/node-gitlab/commit/f60e7ed)) thanks to [Fabian Aussems](https://github.com/mozinator)
* Added pipelines to MergeRequests in [#128](https://github.com/jdalrymple/node-gitlab/pull/128) thanks to [jnovick](https://github.com/jnovick)

# [3.5.1](https://github.com/jdalrymple/node-gitlab/tags/3.4.5) (2018-7-08)
- Fixed migrating-from-node-gitlab link in Table of Contents #118 thanks to [Quentin Dreyer](https://github.com/qkdreyer)
- Fix methods for editing MR approval/approver settings #119 thanks to [Norm MacLennan](https://github.com/maclennann)
- Removed codcov patch coverage until a larger portion of the codebase is covered

# [3.5.0](https://github.com/jdalrymple/node-gitlab/tags/3.4.5) (2018-7-04)
- Obey the rate limit (9b46250), closes #73 thanks to [Max Wittig](https://github.com/max-wittig)

# [3.4.6](https://github.com/jdalrymple/node-gitlab/tags/3.4.5) (2018-7-02)

- Title parameter in the Project Milestones API was not being passed in the request (f1c3e1a), closes #116

# [3.4.5](https://github.com/jdalrymple/node-gitlab/tags/3.4.5) (2018-7-02)

- Updating badges [PR #115](https://github.com/jdalrymple/node-gitlab/pull/115) thanks to [Munif Tanjim](https://github.com/MunifTanjim)
- Fixed ProjectIssueBoards url [PR #114](https://github.com/jdalrymple/node-gitlab/pull/114) thanks to [Artem](https://github.com/arthot)

# [3.4.4](https://github.com/jdalrymple/node-gitlab/tags/3.4.4) (2018-6-26)

- Updating babel configuration thanks to a prompt from [bodtx](https://github.com/bodtx) and suggestions from [Logan Smyth](loganfsmyth)

# [3.4.3](https://github.com/jdalrymple/node-gitlab/tags/3.4.3) (2018-6-25)

- Updating packages
- Adding support for the retrieval of projects by user id [#105](https://github.com/jdalrymple/node-gitlab/pull/105) thanks to [Michael Townsend](https://github.com/Continuities)

# [3.4.2](https://github.com/jdalrymple/node-gitlab/tags/3.4.2) (2018-6-06)

- Fixing previous release errors [#100](https://github.com/jdalrymple/node-gitlab/issues/100)
- Adding options to the show function of Projects, Groups and Users [#101](https://github.com/jdalrymple/node-gitlab/issues/101) thanks to [Giuseppe Angri](https://github.com/giuseppeangri)
- Adding project languages function [#102](https://github.com/jdalrymple/node-gitlab/issues/102) thanks to [Giuseppe Angri](https://github.com/giuseppeangri)

# [3.4.1](https://github.com/jdalrymple/node-gitlab/tags/3.4.1) (2018-6-01)

- Seperated out changelog
- Adding ability to view pagination information, [#94](https://github.com/jdalrymple/node-gitlab/issues/94), via the showPagination option
- Adding CommitDiscussions and MergeRequestDiscussions support

# [3.4.0](https://github.com/jdalrymple/node-gitlab/tags/3.4.0) (2018-5-24)

- Added the first stage of testing in [#71](https://github.com/jdalrymple/node-gitlab/pull/71) with [Adam Dehnel](https://github.com/arsdehnel)'s guidance
- Added jobs.show() that was missing from the Jobs service

# [3.3.6](https://github.com/jdalrymple/node-gitlab/tags/3.3.6) (2018-5-22)

- Typo fix and branch id encoding thanks to [Igor Katsuba](https://github.com/Defenderbass)
 in [#92](https://github.com/jdalrymple/node-gitlab/pull/92) and [#91](https://github.com/jdalrymple/node-gitlab/pull/91)
- Removal of non standard babel plugins in prep for move to Typescript thanks to [Pavel Birukov](https://github.com/r00ger) in [#90](https://github.com/jdalrymple/node-gitlab/pull/90)
- Docs update pointing to the wrong npm package thanks to [Joseph Petersen](https://github.com/casz) in [#88](https://github.com/jdalrymple/node-gitlab/pull/88)
- Licence update (to match the year) thanks to [Sharma-Rajat](https://github.com/Sharma-Rajat) in [#87](https://github.com/jdalrymple/node-gitlab/pull/87)

# [3.3.5](https://github.com/jdalrymple/node-gitlab/tags/3.3.5) (2018-5-15)

- Fixing missing exports thanks to [Pavel Birukov](https://github.com/r00ger) in [#86](https://github.com/jdalrymple/node-gitlab/pull/86)

# [3.3.4](https://github.com/jdalrymple/node-gitlab/tags/3.3.4) (2018-5-14)

- Fixing [#85](https://github.com/jdalrymple/node-gitlab/pull/85)

# [3.3.3](https://github.com/jdalrymple/node-gitlab/tags/3.3.3) (2018-5-13)

- Fixing [#84](https://github.com/jdalrymple/node-gitlab/pull/84)

# [3.3.2](https://github.com/jdalrymple/node-gitlab/tags/3.3.2) (2018-5-9)

- Fixing [#82](https://github.com/jdalrymple/node-gitlab/pull/82)
- Fixing [#83](https://github.com/jdalrymple/node-gitlab/pull/83)
- Updating repo name for clarity

# [3.3.0](https://github.com/jdalrymple/node-gitlab/tags/3.3.0) (2018-5-7)

- Added extended support for the Jobs and Pipelines API thanks to [Isaac Ouellet Therrien](https://github.com/yonguelink) in PR [#77](https://github.com/jdalrymple/node-gitlab/pull/77)
- Updated packages

# [3.2.2](https://github.com/jdalrymple/node-gitlab/tags/3.2.2) (2018-5-2)

- Fixed missing Version API

# [3.2.1](https://github.com/jdalrymple/node-gitlab/tags/3.2.1) (2018-4-23)

- Fixed incorrectly named bundles 

# [3.2.0](https://github.com/jdalrymple/node-gitlab/tags/3.2.0) (2018-4-21)

- Completed ProjectPipeline Support in PR [#72](https://github.com/jdalrymple/node-gitlab/pull/72) thanks to [Frédéric Boutin](https://github.com/fboutin-pmc)

# [3.1.1](https://github.com/jdalrymple/node-gitlab/tags/3.1.1) (2018-4-17)

- Fixed missing UserCustomAttributes export

# [3.1.0](https://github.com/jdalrymple/node-gitlab/tags/3.1.0) (2018-4-16)

- Added addTimeEstimate, addTimeSpent, timeStats, resetTimeSpent and resetTimeEstimate to the Issues API. Requested in Issue [#68](https://github.com/jdalrymple/node-gitlab/issues/68)
- Added XMLHttpRequest Support PR [#59](https://github.com/jdalrymple/node-gitlab/pull/59)

**Breaking Change**

- Renamed timeEstimate to addTimeEstimate, and timeSpend to addTimeSpent, in the MergeRequests API

# [3.0.4](https://github.com/jdalrymple/node-gitlab/tags/3.0.4) (2018-4-13)

- Fixed endpoint for MergeRequestNotes thanks to [Ev Haus](https://github.com/EvHaus) in PR [#63](https://github.com/jdalrymple/node-gitlab/pull/63)
- Fixed Commits.editStatus method thanks to [zhao0](https://github.com/zhao0) in PR [#65](https://github.com/jdalrymple/node-gitlab/pull/65)

# [3.0.3](https://github.com/jdalrymple/node-gitlab/tags/3.0.3) (2018-4-5)

- Fixed the problem with the validation of Event resource options

# [3.0.0](https://github.com/jdalrymple/node-gitlab/tags/3.0.0) (2018-4-2)

- Exporting all services separately ie. const { Projects } from 'gitlab'; as well as the usual default export: const Gitlab from 'gitlab'
- Exporting bundles which are groups of related API's. These include: ProjectsBundle, UsersBundle and GroupsBundle
- Added events support to the Projects, and Users
- Added full support for ProjectVariables and GroupVariables
- Added support for Events. This is also exposed in Projects and Users under the events function
- Fixed the missing options parameter for the ProjectMembers and GroupMemebers APIs in PR [#45](https://github.com/jdalrymple/node-gitlab/pull/45) thanks to [Stefan Hall](https://github.com/Marethyu1)
- Supporting both camelCase and snake_case option properties: `projects.all({perPage:5}) === projects.all({per_page: 5})`
- Fixed problem with .all() functions where only the some of the results were being returned
- Completed support for all Gitlab APIs, [#49](https://github.com/jdalrymple/node-gitlab/pull/49), [#53](https://github.com/jdalrymple/node-gitlab/pull/53)

### Breaking Changes between 2.2.6 and 3.0.0
- Instantiation of the API must use the new operator consistently. See usage above.
- All services being exported are not capitalized for clarity that they are themselves api's and not properties. ie. Gitlab.Projects vs Gitlab.projects
- All subservices (services exposed as properties of other services) have been moved out into their own service
```
ProjectRepository -> Repositories, Tags, Commits, Branches and RepositoryFiles
Users -> Users, UserKeys, UserGPGKeys, UserCustomAttributes, UserVariables

```
- Moved createTodo function from MergeRequests API to Todos API
- Many services have been renamed:
```
ProjectProtectedBranches -> ProtectedBranches
ProjectDeployKeys -> DeployKeys
ProjectEnvironments -> Environments
ProjectJobs -> Jobs
ProjectLabels -> Labels
ProjectPipelines -> Pipelines
ProjectRepository -> Repositories
ProjectServices -> Services
ProjectTriggers -> Triggers
```

- Some services were merged:
```
Issues = ProjectIssues + Issues.  ProjectId is optional for all()
MergeRequests = ProjectMergeRequests + MergeRequests + MergeRequestsChanges + MergeRequestsCommits + MergeRequestVersions. ProjectId is optional for all()
Runners = ProjectRunners + Runners. ProjectId is optional for all()

```

# [2.2.8](https://github.com/jdalrymple/node-gitlab/tags/2.2.7) (2018-4-1)

- Updating babel

# [2.2.7](https://github.com/jdalrymple/node-gitlab/tags/2.2.7) (2018-3-15)

- Fixing babel runtime

# [2.2.6](https://github.com/jdalrymple/node-gitlab/tags/2.2.6) (2018-3-15)

- Fixed more issues within the url concatenation

# [2.2.5](https://github.com/jdalrymple/node-gitlab/tags/2.2.5) (2018-3-15)

- Fixed #48 - Problem with trailing `\` in url

# [2.2.4](https://github.com/jdalrymple/node-gitlab/ce7f17693168b5dec3b36eb1d5ab796c9374613f) (2018-2-3)

- Fixed #33 - Bug within the es5 transpilling configuration
- Fixed the missing options for tags.all [#40](https://github.com/jdalrymple/node-gitlab/pull/40)
- Added delete key method to UserKeys.js [#41](https://github.com/jdalrymple/node-gitlab/pull/41) thanks to [Claude Abounegm](https://github.com/claude-abounegm)

# [2.2.3](https://github.com/jdalrymple/node-gitlab/ce7f17693168b5dec3b36eb1d5ab796c9374613f) (2018-2-3)

- Fixed #37 - Bug within the customAttributes logic

# [2.2.2](https://github.com/jdalrymple/node-gitlab/ca1906879d869bf5b9aca0b2f64e46c89f3b5f4f) (2018-1-24)

- Fixing bug with the version support

# [2.2.1](https://github.com/jdalrymple/node-gitlab/e864064c98feda59d594d77b67f7d0657db78700) (2018-1-23)

- Added support for the Version API through version.show()

# [2.2.0](https://github.com/jdalrymple/node-gitlab/96e414a75ad97e88ecaaff15a6c1409a9e27b963) (2018-1-18)

- Fixed the missing options parameter for the ProjectRepositoryCommitComment's model thanks to [Martin Benninger](https://github.com/MartinBenninger) in PR [#21](https://github.com/jdalrymple/node-gitlab/pull/21)
- Removal of the left over debug console.logs's within project issues again by [Martin Benninger](https://github.com/MartinBenninger) in PR [#21](https://github.com/jdalrymple/node-gitlab/pull/22)
- Added proper docs for ProjectRepositoryFiles, enabled default urlEncoding for the passed in file paths and also documented
how to run locally via npm linking for Development testing thanks to [Adam Dehnel](https://github.com/arsdehnel) in [PR #23](https://github.com/jdalrymple/node-gitlab/pull/23)
- Exposed the Merge Requests resource which was missing from the exports list thanks to [fewieden](https://github.com/fewieden) in [PR #26](https://github.com/jdalrymple/node-gitlab/pull/26)
- Added support for the Project Environments API and the Project Jobs API thanks to [Jeff Pelton](https://github.com/comster) in [PR #28](https://github.com/jdalrymple/node-gitlab/pull/28)
- Fixing parse function to handle encoded urls that don't include '/' such as in groups #24

### Breaking Changes between 2.1.0 and 2.2.0
- Fixed a problem with the get responses where the response contained the full request response and not just the body

# [2.1.0](https://github.com/jdalrymple/node-gitlab/0ea73235e0b465a0d4717a7e1f33251b58777b60) (2017-12-15)

- Added es5 support and clarified the default supported versions of node (>=8.0.0 for default)
- Updating project docs for consistency
- Adding project unsharing to API. It was in the docs, but missing from the API
- Updating deprecated protected branches endpoint. Previously this was `projects.branches.protect` now its `projects.protectedBranches.protect`
- Added Owned Runners and Runner Jobs API

### Breaking Changes between 1.3.3 and 2.1.0
- The `list` functions are no longer supported and have all been renamed to `all`
- The `update` functions are no longer supported and have all been renamed to  `edit`
- The `addKey` function has been renamed to `add` in UserKeys class
- The deploy_keys and merge_requests properties have been renamed to deployKeys and mergeRequests
- Removed old group member functions from the groups class as they have been moved to the GroupMembers class. This includes the addMember, listMembers, editMember, and removeMember. These functions can now be access via group.members.add, group.members.all, group.members.edit and group.members.remove respectively.
- Removed the old group project functions from the Group class. These are now located in the GroupProject class. The functions that have been removed are listProjects, addProjects. These functions can be access by group.projects.all, and group.projects.add respectively.
- Updated the structure of the ProjectRepository class such that its commits, branches, tags and files are properties and can be accessed like `repository.commits.all()` etc.
- Removed unused labels endpoint since it already exists under projects.labels


# [2.0.1-rc.1](https://github.com/jdalrymple/node-gitlab/62a4d360f0ca2cd584caf852d96ced3761992072) (2017-11-29)

- Updating pagination changes into v2.0.1
- Removed unused labels endpoint since it already exists under projects.labels
- Added a mergeRequests class for the merge_requests endpoints
- Extended the ProjectMergeRequests class for additional functionality that was missing for project merge requests such as
accepting merge requests, canceling merges when the pipeline succeeds, listing issues that will close on merge, subscribing/unsubscribing to merges, creating todos, time spent and time estimates as well as time stats.
- Fixed the notes endpoints for ProjectMergeRequests. This can now be access via projects.mergeRequests.notes.[command here]
- Added comments endpoints to the ProjectRepositoryCommits class
- Added the ability to post a status to a specific commit to the Project class


# [1.3.3](https://github.com/jdalrymple/node-gitlab/b8a3db4a4aaf9482fb3905883d92d940babfb461) (2017-11-29)

- Adding pagination to project pipelines thanks to [Tamás Török-Vistai](https://github.com/tvtamas)

# [2.0.0-rc.2](https://github.com/jdalrymple/node-gitlab/62a4d360f0ca2cd584caf852d96ced3761992072) (2017-11-28)

- Updating all recent core changes into v2.0.0

# [1.3.2](https://github.com/jdalrymple/node-gitlab/87e3d4b0a9616c19d69e3d6213c196948240d93e) (2017-11-28)

- Adding default values for the BaseModel options parameter.

# [1.3.1](https://github.com/jdalrymple/node-gitlab/ba80ac10e1e08176da7a3a9848758a989a7199dd) (2017-11-27)

- Fixed broken argument reference in the showFile and showFileRaw functions.

# [2.0.0-rc.1](https://github.com/jdalrymple/node-gitlab/7246896c7bad7b238179109d1d6a391b0c2ef302) (2017-11-25)

- Updated project docs for clarity
- Cleaned up many linting problems within the class models
- Removed mutator operations on the options arguments
- Renamed ProjectKeys to ProjectDeployKeys
- Renamed `list` functions to `all` for consistency
- Renamed `update` functions to `edit` for consistency
- Renaming addKey just to add in UserKeys class
- Renaming deploy_keys and merge_requests to deployKeys and mergeRequests for consistency
- Adding Project Access Requests
- Removing old group member functions from the groups class as they have been moved to the GroupMembers class. This includes the addMember, listMembers, editMember, and removeMember. These functions can now be access via group.members.add, group.members.all, group.members.edit and group.members.remove respectively.
- Removed the old group project functions from the Group class. These are now located in the GroupProject class. The functions that have been removed are listProjects, addProjects. These functions can be access by group.projects.all, and group.projects.add respectively.
- Methods in the ProjectDeployKeys class updated for consistency
- Methods in the ProjectHooks updated for consistency
- Updated the structure of the ProjectRepository class with commits, branches, tags and files properties.
- Added contributors, showBlob and showBlobRaw functions to the ProjectRepository class

# [1.3.0](https://github.com/jdalrymple/node-gitlab/3048a3989fabe3992044baccdab1e53257f0f379) (2017-11-25)

- Extending the Groups API, see docs for a full overview.


# [1.2.0](https://github.com/jdalrymple/node-gitlab/b08779a321fb25668df1e0f7e001394679cc47ba) (2017-11-25)

- Adding fix to the API constructor to include the [missing oauthToken](https://github.com/jdalrymple/node-gitlab/pulls?q=is%3Apr+is%3Aclosed) thanks to [Salim Benabbou](https://github.com/Salimlou).
- Updated some of the outdated Gitlab repository file endpoints outlined in [Issue #11](https://github.com/jdalrymple/node-gitlab/issues/11): [showFile](https://docs.gitlab.com/ee/api/repository_files.html#get-file-from-repository), [updateFile](https://docs.gitlab.com/ee/api/repository_files.html#update-existing-file-in-repository), and [createFile](https://docs.gitlab.com/ee/api/repository_files.html#create-new-file-in-repository). Also added [deleteFile](https://docs.gitlab.com/ee/api/repository_files.html#delete-existing-file-in-repository) and [showRawFile](https://docs.gitlab.com/ee/api/repository_files.html#get-raw-file-from-repository).
- Fixing bug where many pages where attempted to be loaded on every GET request.

# [1.1.4](https://github.com/jdalrymple/node-gitlab/328bc29fe48d1bf18c83779a214cce34e80dda09) (2017-11-17)

- Library maintenance, cleaning up spelling errors, updating dependencies, adding to contributors lists etc.

# [1.1.3](https://github.com/jdalrymple/node-gitlab/6f28ce1726ce371d4b0272d5f8305080d51e3e25) (2017-11-17)

- Fixing typos in the project sharing (group_access) thanks to [Christoph Lehmann](https://github.com/christophlehmann)
- Updated the ReadMe to be more clear based on suggestions from [Frank V](https://github.com/FrankV01)

# [1.1.2](https://github.com/jdalrymple/node-gitlab/36570c32be7cd564bda9c7c7dc07059987969bd4) (2017-10-29)

- Updated the protected branch functionality by adding an options parameter originally proposed by [Martin Bour](https://github.com/shadygrove)
- Removed old paging logic from groups
- Updating library dependencies

# [1.1.1](https://github.com/jdalrymple/node-gitlab/67df1c8772614b3856f2995eaa7d260d0f697e49) (2017-09-24)

- Patch, fixed a broken pagination property
- Adding in missing options parameter  in the groups API thanks to a pull request from [Cory Zibell](https://github.com/coryzibell)

# [1.1.0](https://github.com/jdalrymple/node-gitlab/385ef9f351981f26180e1381525ade458bcde1cd) (2017-09-24)

- Adding proper pagination support thanks to a problem noticed by [Mike Wyatt](https://github.com/mikew)

# [1.0.14](https://github.com/jdalrymple/node-gitlab/b8fb74828503f0a6432376ad156b7f9e33f6228e) (2017-08-1)

- Adding default file name for file uploads. If none is supplied, the file name is
inferred from the file path

# [1.0.13](https://github.com/jdalrymple/node-gitlab/3eb244a5b487f487859f750e46c8fa287b4455c4) (2017-07-31)

- Fixed another bug in the project file upload functionality

# [1.0.12](https://github.com/jdalrymple/node-gitlab/commit/6f77ee0a462a19ae65bd6206eb94c72e271ba673) (2017-07-30)

- Added issue links (for related issues)
- Fixed project file upload

# [1.0.11](https://github.com/jdalrymple/node-gitlab/commit/af4eb6955f583b5be4a4032d2d532d81bb2cf54d) (2017-07-20)

- Fixing the problem where Id was used instead of IId's for Project issues
- Fixing the naming convention for Project Issues
- Standardized the use of parseInt in the code base
- Removed instances of duplicate code found by code climate


# [1.0.10](https://github.com/jdalrymple/node-gitlab/commit/c4a55aba89d83fda1552b3d5688b090b0c2b60aa) (2017-07-13)

- Fixing Issues [#1](https://github.com/jdalrymple/node-gitlab/pull/1), [#2](https://github.com/jdalrymple/node-gitlab/pull/3), and [#3](https://github.com/jdalrymple/node-gitlab/pull/3)

# [1.0.9](https://github.com/jdalrymple/node-gitlab/commit/7a90dbb6354fe956fff37c56f938a833e3fc5ea1) (2017-07-06)

- Fixing broken Notes API reference
- Added Project triggers, members and hooks docs
- Moved Project Runners into its own scope and separated out general Runners API logic

# [1.0.8](https://github.com/jdalrymple/node-gitlab/commit/491a707624ba9f58818014eacfeb7182b8ecf800) (2017-06-30)

- Adding more to the Project Issue Notes API
- Updating Readme to show examples of connecting with OAuth tokens
- Begun adding documentation for projects

# [1.0.7](https://github.com/jdalrymple/node-gitlab/commit/50642ad764ecd20d2a9e279cf2a47e7b5efe8f07) (2017-06-23)

- Fixing bug within the Issues API; reference to an old function.

# [1.0.6](https://github.com/jdalrymple/node-gitlab/commit/2b02d1e354c1c267683d10b893ad055fe856a214) (2017-06-23)

- Fixing bug within the Labels API; Missing required argument.

# [1.0.5](https://github.com/jdalrymple/node-gitlab/commit/03a22b46a62d7b68937575b0b74b6fd3496f7cbf) (2017-06-23)

- Fixing bug within the delete API calls. It was missing query parameters

# [1.0.4](https://github.com/jdalrymple/node-gitlab/commit/9d9ef2615c6dd778a3fb1c6140d5ce009c421bb1) (2017-06-23)

- Adding more to the Labels API
- Cleaned up the Issues class

# [1.0.3](https://github.com/jdalrymple/node-gitlab/commit/fe5a5fbb8d01fb670b7c7b14ce2c5b7f30d71fe5) (2017-06-23)

- Updating problems within the Milestone API
- Removed the old 'list' calls for projects and issues which displayed a deprecated message. Only all is available now.

# [1.0.2](https://github.com/jdalrymple/node-gitlab/commit/a295d5a613efa13be79fec5fa2835076047cdcc5) (2017-06-22)

- Updating examples in ReadMe
- Adding dependency badges
- Removing unused test files

# [1.0.1](https://github.com/jdalrymple/node-gitlab/commit/64a8f8c7720f5df9a67d3f26cc8712fc21eb3ac0) (2017-06-21)

- Initial release
- TODO: Tests, Examples
