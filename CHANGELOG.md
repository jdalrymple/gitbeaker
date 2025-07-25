# 43.3.0 (Sat Jul 19 2025)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - fix: Parsing param names from functions with destructured params was not working correctly [#3746](https://github.com/jdalrymple/gitbeaker/pull/3746) ([@jdalrymple](https://github.com/jdalrymple))

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - types: Adding upcoming_release to Project Release type [#3745](https://github.com/jdalrymple/gitbeaker/pull/3745) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `main`

- Housekeeping ([@jdalrymple](https://github.com/jdalrymple))

#### 🚨 Tests

- `@gitbeaker/rest`
  - tests: Recent resources added were missing from e2e tests [#3747](https://github.com/jdalrymple/gitbeaker/pull/3747) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 43.2.0 (Sat Jul 19 2025)

#### 🐛 Bug Fix

- `@gitbeaker/cli`
  - fix: Incorrect camelization when passing properties to the CLI [#3744](https://github.com/jdalrymple/gitbeaker/pull/3744) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 43.1.0 (Sat Jul 19 2025)

#### 🐛 Bug Fix

- `@gitbeaker/cli`, `@gitbeaker/core`
  - fix: Mapping export is incorrectly generating argument lists [#3743](https://github.com/jdalrymple/gitbeaker/pull/3743) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 43.0.0 (Sun Jul 13 2025)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: kang ([@kang8](https://github.com/kang8))

:heart: Aidin Abedi ([@aidinabedi](https://github.com/aidinabedi))

:heart: Jiahao Guo ([@frantic1048](https://github.com/frantic1048))

:heart: Damien Lajarretie ([@dlajarretie](https://github.com/dlajarretie))

:heart: Kay W. ([@kayw-geek](https://github.com/kayw-geek))

#### 💥 Breaking Change

- `@gitbeaker/rest`
  - Enhance error messaging in GitbeakerRequestError to clearly display only the description context [#3731](https://github.com/jdalrymple/gitbeaker/pull/3731) ([@kang8](https://github.com/kang8))

#### ✨ Feature

- `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Add support for Markdown Uploads [#3737](https://github.com/jdalrymple/gitbeaker/pull/3737) ([@aidinabedi](https://github.com/aidinabedi) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`
  - Formatting [#3717](https://github.com/jdalrymple/gitbeaker/pull/3717) ([@jdalrymple](https://github.com/jdalrymple))
  - Adding support for getting the latest pipeline [#3717](https://github.com/jdalrymple/gitbeaker/pull/3717) ([@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- Dont transform chalk for jest [#3718](https://github.com/jdalrymple/gitbeaker/pull/3718) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/cli`
  - Linting [#3718](https://github.com/jdalrymple/gitbeaker/pull/3718) ([@jdalrymple](https://github.com/jdalrymple))
  - Updating chalk [#3718](https://github.com/jdalrymple/gitbeaker/pull/3718) ([@jdalrymple](https://github.com/jdalrymple))
  - Update deps [#3718](https://github.com/jdalrymple/gitbeaker/pull/3718) ([@jdalrymple](https://github.com/jdalrymple))
  - Dont handle the errors, have them bubble up [#3718](https://github.com/jdalrymple/gitbeaker/pull/3718) ([@jdalrymple](https://github.com/jdalrymple))
  - Update typing [#3718](https://github.com/jdalrymple/gitbeaker/pull/3718) ([@jdalrymple](https://github.com/jdalrymple))
  - Fix styling [#3718](https://github.com/jdalrymple/gitbeaker/pull/3718) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`, `@gitbeaker/rest`
  - Updating variable names, and adding tests [#3715](https://github.com/jdalrymple/gitbeaker/pull/3715) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔨 Technical Debt

- Branch from gitlabs perspective [#3720](https://github.com/jdalrymple/gitbeaker/pull/3720) ([@jdalrymple](https://github.com/jdalrymple))
- Tweaks [#3720](https://github.com/jdalrymple/gitbeaker/pull/3720) ([@jdalrymple](https://github.com/jdalrymple))
- Tinkering [#3720](https://github.com/jdalrymple/gitbeaker/pull/3720) ([@jdalrymple](https://github.com/jdalrymple))
- Default doesnt support rules [#3720](https://github.com/jdalrymple/gitbeaker/pull/3720) ([@jdalrymple](https://github.com/jdalrymple))
- Using default [#3720](https://github.com/jdalrymple/gitbeaker/pull/3720) ([@jdalrymple](https://github.com/jdalrymple))
- For now, limit pipeline usage to MRs [#3720](https://github.com/jdalrymple/gitbeaker/pull/3720) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Merge branch 'chore/assets' ([@jdalrymple](https://github.com/jdalrymple))

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Fix includeDivergedCommitsCount Type Definition [#3732](https://github.com/jdalrymple/gitbeaker/pull/3732) ([@liby](https://github.com/liby))
  - Set merge request `description` type to nullable [#3733](https://github.com/jdalrymple/gitbeaker/pull/3733) ([@frantic1048](https://github.com/frantic1048))
  - Move maxPages under BasePaginationRequestOptions [#3736](https://github.com/jdalrymple/gitbeaker/pull/3736) ([@dlajarretie](https://github.com/dlajarretie))
  - Update AcceptMergeRequestOptions type definition [#3734](https://github.com/jdalrymple/gitbeaker/pull/3734) ([@liby](https://github.com/liby) [@jdalrymple](https://github.com/jdalrymple))
  - Updating test typing [#3739](https://github.com/jdalrymple/gitbeaker/pull/3739) ([@jdalrymple](https://github.com/jdalrymple))
  - feat: Support pagination on runner jobs [#3739](https://github.com/jdalrymple/gitbeaker/pull/3739) ([@sandercox](https://github.com/sandercox))
  - Add missing `detailed_status` field to WebhookPipelineEventSchema [#3729](https://github.com/jdalrymple/gitbeaker/pull/3729) ([@kayw-geek](https://github.com/kayw-geek))
  - Update `WebhookEmojiEventSchema` to include `merge_request` attribute [#3725](https://github.com/jdalrymple/gitbeaker/pull/3725) ([@liby](https://github.com/liby))
  - Adding expires_at to the rotate method of the AccessToken resources [#3714](https://github.com/jdalrymple/gitbeaker/pull/3714) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `main`

- Playwright ubuntu version update ([@jdalrymple](https://github.com/jdalrymple))
- Updating playwright version ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Major dep update ([@jdalrymple](https://github.com/jdalrymple))
  - Removing CWS from the README ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 8

- Aidin Abedi ([@aidinabedi](https://github.com/aidinabedi))
- Bryan Lee ([@liby](https://github.com/liby))
- Damien Lajarretie ([@dlajarretie](https://github.com/dlajarretie))
- Jiahao Guo ([@frantic1048](https://github.com/frantic1048))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- kang ([@kang8](https://github.com/kang8))
- Kay W. ([@kayw-geek](https://github.com/kayw-geek))
- Sander Cox ([@sandercox](https://github.com/sandercox))

---

# 42.5.0 (Sat Apr 26 2025)

#### ✨ Feature

- `@gitbeaker/rest`
  - More test updates [#3711](https://github.com/jdalrymple/gitbeaker/pull/3711) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`
  - Updating Gitlab export [#3711](https://github.com/jdalrymple/gitbeaker/pull/3711) ([@jdalrymple](https://github.com/jdalrymple))
  - Linting [#3711](https://github.com/jdalrymple/gitbeaker/pull/3711) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`, `@gitbeaker/rest`
  - Add Terraform State API [#3711](https://github.com/jdalrymple/gitbeaker/pull/3711) ([@zk-kb4](https://github.com/zk-kb4))

#### Authors: 2

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Zack ([@zk-kb4](https://github.com/zk-kb4))

---

# 42.4.1 (Thu Apr 24 2025)

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Update EnvironmentSchema with additional fields [#3713](https://github.com/jdalrymple/gitbeaker/pull/3713) ([@liby](https://github.com/liby))

#### Authors: 1

- Bryan Lee ([@liby](https://github.com/liby))

---

# 42.4.0 (Mon Apr 21 2025)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Add comprehensive unit tests for endpoint utility [#3708](https://github.com/jdalrymple/gitbeaker/pull/3708) ([@liby](https://github.com/liby))
  - Add RawPathSegment class to preserve slashes in API paths [#3708](https://github.com/jdalrymple/gitbeaker/pull/3708) ([@liby](https://github.com/liby))

#### Authors: 1

- Bryan Lee ([@liby](https://github.com/liby))

---

# 42.3.0 (Mon Apr 21 2025)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Zack ([@zk-kb4](https://github.com/zk-kb4))

:heart: Bryan Lee ([@liby](https://github.com/liby))

#### ✨ Feature

- revert yarn.lock [#3710](https://github.com/jdalrymple/gitbeaker/pull/3710) ([@zk-kb4](https://github.com/zk-kb4))
- update yarn lock [#3710](https://github.com/jdalrymple/gitbeaker/pull/3710) ([@zk-kb4](https://github.com/zk-kb4))
- `@gitbeaker/core`
  - Update packages/core/test/unit/resources/Projects.ts [#3710](https://github.com/jdalrymple/gitbeaker/pull/3710) ([@jdalrymple](https://github.com/jdalrymple))
  - Update packages/core/src/resources/Projects.ts [#3710](https://github.com/jdalrymple/gitbeaker/pull/3710) ([@jdalrymple](https://github.com/jdalrymple))
  - fix linter errors [#3710](https://github.com/jdalrymple/gitbeaker/pull/3710) ([@zk-kb4](https://github.com/zk-kb4))
  - remove wrong attribute [#3710](https://github.com/jdalrymple/gitbeaker/pull/3710) ([@zk-kb4](https://github.com/zk-kb4))
  - fix test call [#3710](https://github.com/jdalrymple/gitbeaker/pull/3710) ([@zk-kb4](https://github.com/zk-kb4))
  - fix invalid get call [#3710](https://github.com/jdalrymple/gitbeaker/pull/3710) ([@zk-kb4](https://github.com/zk-kb4))
- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/rest`
  - revert version numbers back [#3710](https://github.com/jdalrymple/gitbeaker/pull/3710) ([@zk-kb4](https://github.com/zk-kb4))
  - Add invited_groups API request for projects [#3710](https://github.com/jdalrymple/gitbeaker/pull/3710) ([@zk-kb4](https://github.com/zk-kb4))

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Adding `assignees` to changes of the `MergeRequestWebhookEvent.changes` [#3706](https://github.com/jdalrymple/gitbeaker/pull/3706) ([@liby](https://github.com/liby))

#### Authors: 3

- Bryan Lee ([@liby](https://github.com/liby))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Zack ([@zk-kb4](https://github.com/zk-kb4))

---

# 42.2.0 (Mon Mar 24 2025)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Lucas ([@cz-lucas](https://github.com/cz-lucas))

:heart: Endrik Einberg ([@enduity](https://github.com/enduity))

#### 🐛 Bug Fix

- `@gitbeaker/rest`
  - fix: Typing of Error description can be incorrect depending on the respose payload [#3703](https://github.com/jdalrymple/gitbeaker/pull/3703) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`
  - Allow using falsey values in isForm requests [#3702](https://github.com/jdalrymple/gitbeaker/pull/3702) ([@Scrumplex](https://github.com/Scrumplex) [@jdalrymple](https://github.com/jdalrymple))

#### 🔨 Technical Debt

- `@gitbeaker/rest`
  - Export error classes in rest package [#3690](https://github.com/jdalrymple/gitbeaker/pull/3690) ([@enduity](https://github.com/enduity))

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Added masked_and_hidden option to the ProjectVariables [#3701](https://github.com/jdalrymple/gitbeaker/pull/3701) ([@cz-lucas](https://github.com/cz-lucas))
  - Make offset pagination for listing all CI Pipelines explicit [#3694](https://github.com/jdalrymple/gitbeaker/pull/3694) ([@jdalrymple](https://github.com/jdalrymple))
  - Remove filtering options from the Commit.mergeRequests function [#3698](https://github.com/jdalrymple/gitbeaker/pull/3698) ([@jdalrymple](https://github.com/jdalrymple))
  - Support ci_pipeline_variables_minimum_override_role in the Projects API [#3696](https://github.com/jdalrymple/gitbeaker/pull/3696) ([@jdalrymple](https://github.com/jdalrymple))
  - Fixing typo in CreateAndEditPushRuleOptions [#3697](https://github.com/jdalrymple/gitbeaker/pull/3697) ([@jdalrymple](https://github.com/jdalrymple))
  - Make an Issues milestone property optional [#3695](https://github.com/jdalrymple/gitbeaker/pull/3695) ([@jdalrymple](https://github.com/jdalrymple))
  - Adding missing Id attribute to the WebhookUserSchema [#3693](https://github.com/jdalrymple/gitbeaker/pull/3693) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `main`

- `@gitbeaker/rest`
  - Adding missing test keys [skip-ci] ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 4

- Endrik Einberg ([@enduity](https://github.com/enduity))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Lucas ([@cz-lucas](https://github.com/cz-lucas))
- Sefa Eyeoglu ([@Scrumplex](https://github.com/Scrumplex))

---

# 42.1.0 (Mon Jan 20 2025)

:tada: This release contains work from a new contributor! :tada:

Thank you, Marco ([@Sephyr0s](https://github.com/Sephyr0s)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fixing ProjectProtectedEnvironments using correct api [#3678](https://github.com/jdalrymple/gitbeaker/pull/3678) (marco.vermeulen@leaseplan.com [@Sephyr0s](https://github.com/Sephyr0s))

#### Authors: 2

- Marco ([@Sephyr0s](https://github.com/Sephyr0s))
- Marco Vermeulen (External) (marco.vermeulen@leaseplan.com)

---

# 42.0.2 (Thu Jan 02 2025)

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Remove unsupported `MergeRequest.create` option `reviewerId` [#3673](https://github.com/jdalrymple/gitbeaker/pull/3673) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 42.0.1 (Tue Dec 31 2024)

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Updating `DeployTokens.create` to return the `token` [#3672](https://github.com/jdalrymple/gitbeaker/pull/3672) ([@jdalrymple](https://github.com/jdalrymple))
  - Adding `reviewers` to changes of the MergeRequestWebhookEvent [#3671](https://github.com/jdalrymple/gitbeaker/pull/3671) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 42.0.0 (Tue Dec 31 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, Talysson de Oliveira Cassiano ([@talyssonoc](https://github.com/talyssonoc)), for all your work!

#### 💥 Breaking Change

- `@gitbeaker/core`
  - Accept username in ProjectMembers#add [#3666](https://github.com/jdalrymple/gitbeaker/pull/3666) ([@talyssonoc](https://github.com/talyssonoc) [@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Updating endpoint for Job Token Scopes support [#3669](https://github.com/jdalrymple/gitbeaker/pull/3669) ([@jdalrymple](https://github.com/jdalrymple))

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Add the `internal` option to `MergeRequestNotes.create` [#3670](https://github.com/jdalrymple/gitbeaker/pull/3670) ([@jdalrymple](https://github.com/jdalrymple))
  - Updating orderBy options for the Tags API [#3668](https://github.com/jdalrymple/gitbeaker/pull/3668) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Talysson de Oliveira Cassiano ([@talyssonoc](https://github.com/talyssonoc))

---

# 41.3.0 (Sun Nov 24 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, Giannis Kepas ([@Retr0-01](https://github.com/Retr0-01)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Use correct HTTP method on AccessRequest approve [#3660](https://github.com/jdalrymple/gitbeaker/pull/3660) ([@Retr0-01](https://github.com/Retr0-01))

#### ↕️ Dependencies

- Bump cross-spawn from 7.0.3 to 7.0.6 [#3658](https://github.com/jdalrymple/gitbeaker/pull/3658) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Giannis Kepas ([@Retr0-01](https://github.com/Retr0-01))

---

# 41.2.0 (Sun Nov 10 2024)

#### 🐛 Bug Fix

- `@gitbeaker/core`, `@gitbeaker/rest`
  - Fix ProjectJobTokenScopes to use the correct endpoints [#3650](https://github.com/jdalrymple/gitbeaker/pull/3650) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 41.1.2 (Sat Nov 09 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, Miguel ([@mpsanchis](https://github.com/mpsanchis)), for all your work!

#### 🔨 Technical Debt

- `@gitbeaker/core`
  - Add options `username` and `expires_at` to DeployTokens.create [#3652](https://github.com/jdalrymple/gitbeaker/pull/3652) ([@mpsanchis](https://github.com/mpsanchis))

#### Authors: 1

- Miguel ([@mpsanchis](https://github.com/mpsanchis))

---

# 41.1.1 (Sat Nov 02 2024)

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Add support for topic filtering in `AllGroupProjectsOptions` type [#3651](https://github.com/jdalrymple/gitbeaker/pull/3651) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 41.1.0 (Sun Oct 20 2024)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Update `Users.edit` to use FormData when submitting `avatar` updates [#3644](https://github.com/jdalrymple/gitbeaker/pull/3644) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 41.0.0 (Sat Oct 19 2024)

#### 💥 Breaking Change

- `@gitbeaker/core`, `@gitbeaker/rest`
  - Adding support for `GroupJobTokenScopes` and moved `JobTokenScopes` to `ProjectJobTokenScopes`(#3643) [#3643](https://github.com/jdalrymple/gitbeaker/pull/3643) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 40.6.0 (Sat Oct 19 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, Ryan Smith ([@Incisive](https://github.com/Incisive)), for all your work!

#### ✨ Feature

- `@gitbeaker/core`
  - Implement MergeRequests.allIssuesRelated() [#3642](https://github.com/jdalrymple/gitbeaker/pull/3642) ([@kouak](https://github.com/kouak))

#### 🔨 Technical Debt

- `@gitbeaker/rest`
  - Request Retry Error Message Adjustment [#3626](https://github.com/jdalrymple/gitbeaker/pull/3626) ([@Incisive](https://github.com/Incisive) [@jdalrymple](https://github.com/jdalrymple))

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Updating missing expanded types for `Issues.all` [#3640](https://github.com/jdalrymple/gitbeaker/pull/3640) ([@jdalrymple](https://github.com/jdalrymple))
  - Updating `allowedToCreate` type to an array [#3641](https://github.com/jdalrymple/gitbeaker/pull/3641) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 3

- Benjamin Beret ([@kouak](https://github.com/kouak))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Ryan Smith ([@Incisive](https://github.com/Incisive))

---

# 40.5.1 (Sun Oct 13 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, Youssef ([@yousinix](https://github.com/yousinix)), for all your work!

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Add missing `topLevelOnly` typing to `Namespaces.all` [#3637](https://github.com/jdalrymple/gitbeaker/pull/3637) ([@yousinix](https://github.com/yousinix))

#### Authors: 1

- Youssef ([@yousinix](https://github.com/yousinix))

---

# 40.5.0 (Thu Oct 10 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, null[@roberta-pavel](https://github.com/roberta-pavel), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Update method for removing invitations [#3639](https://github.com/jdalrymple/gitbeaker/pull/3639) ([@roberta-pavel](https://github.com/roberta-pavel))

#### Authors: 1

- [@roberta-pavel](https://github.com/roberta-pavel)

---

# 40.4.0 (Wed Oct 02 2024)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fix Namespace `exists` method typing [#3635](https://github.com/jdalrymple/gitbeaker/pull/3635) ([@Scrumplex](https://github.com/Scrumplex))

#### Authors: 1

- Sefa Eyeoglu ([@Scrumplex](https://github.com/Scrumplex))

---

# 40.3.0 (Thu Sep 26 2024)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Akhil Babu Vazheparambil ([@akhilbv](https://github.com/akhilbv))

:heart: Andy ([@andys8](https://github.com/andys8))

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fix `upcoming jobs by resource group` endpoint [#3632](https://github.com/jdalrymple/gitbeaker/pull/3632) ([@akhilbv](https://github.com/akhilbv))

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Include additional job scope "waiting_for_resource" [#3631](https://github.com/jdalrymple/gitbeaker/pull/3631) ([@andys8](https://github.com/andys8))

#### Authors: 2

- Akhil Babu Vazheparambil ([@akhilbv](https://github.com/akhilbv))
- Andy ([@andys8](https://github.com/andys8))

---

# 40.2.3 (Tue Sep 24 2024)

#### ↕️ Dependencies

- Bump rollup from 4.9.6 to 4.22.4 [#3628](https://github.com/jdalrymple/gitbeaker/pull/3628) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# 40.2.2 (Sat Sep 21 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, Baylee Schmeisser ([@mxbaylee](https://github.com/mxbaylee)), for all your work!

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - 🐛 Update Deployment.tag to be a boolean. [#3627](https://github.com/jdalrymple/gitbeaker/pull/3627) ([@mxbaylee](https://github.com/mxbaylee))

#### Authors: 1

- Baylee Schmeisser ([@mxbaylee](https://github.com/mxbaylee))

---

# 40.2.1 (Sat Sep 14 2024)

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Declare Groups API `allProjects` function default type first (#3624) [#3624](https://github.com/jdalrymple/gitbeaker/pull/3624) ([@ArnaudTA](https://github.com/ArnaudTA))

#### Authors: 1

- Nonot ([@ArnaudTA](https://github.com/ArnaudTA))

---

# 40.2.0 (Sat Sep 07 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, Arnold Hendriks ([@unilynx](https://github.com/unilynx)), for all your work!

#### ✨ Feature

- `@gitbeaker/core`
  - Add sync to ProjectRemoteMirrors (#3616) [#3623](https://github.com/jdalrymple/gitbeaker/pull/3623) (arnold@webhare.nl)

#### 📚 Documentation

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Adding directory information to the package.json file to fix npm relative path resolution [#3622](https://github.com/jdalrymple/gitbeaker/pull/3622) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Arnold Hendriks ([@unilynx](https://github.com/unilynx))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 40.1.4 (Thu Sep 05 2024)

#### ↕️ Dependencies

- Bump micromatch from 4.0.5 to 4.0.8 [#3620](https://github.com/jdalrymple/gitbeaker/pull/3620) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### 📚 Documentation

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Updating sponsors and broken logo links [#3621](https://github.com/jdalrymple/gitbeaker/pull/3621) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 40.1.3 (Wed Aug 21 2024)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Shunta KARASAWA ([@kashz](https://github.com/kashz))

:heart: Peace ([@julian-piehl](https://github.com/julian-piehl))

:heart: Carmi Raz ([@crazfb](https://github.com/crazfb))

#### 🔨 Technical Debt

- `@gitbeaker/cli`
  - Remove --treeshake option to work with node 22 [#3613](https://github.com/jdalrymple/gitbeaker/pull/3613) ([@kashz](https://github.com/kashz))

#### ↕️ Dependencies

- Bump axios from 1.6.5 to 1.7.4 [#3618](https://github.com/jdalrymple/gitbeaker/pull/3618) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Add changes.target_branch to WebhookMergeRequestEventSchema [#3617](https://github.com/jdalrymple/gitbeaker/pull/3617) ([@julian-piehl](https://github.com/julian-piehl) [@jdalrymple](https://github.com/jdalrymple))
  - Fix/webhook project schema add [#3612](https://github.com/jdalrymple/gitbeaker/pull/3612) ([@crazfb](https://github.com/crazfb))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Carmi Raz ([@crazfb](https://github.com/crazfb))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Peace ([@julian-piehl](https://github.com/julian-piehl))
- Shunta KARASAWA ([@kashz](https://github.com/kashz))

---

# 40.1.2 (Thu Jul 11 2024)

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Adding filtering support for `marked for deletion on` [#3609](https://github.com/jdalrymple/gitbeaker/pull/3609) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 40.1.1 (Mon Jul 08 2024)

#### ↕️ Dependencies

- Bump tar from 6.2.0 to 6.2.1 [#3608](https://github.com/jdalrymple/gitbeaker/pull/3608) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# 40.1.0 (Mon Jul 08 2024)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: null[@YupaTT](https://github.com/YupaTT)

:heart: null[@nhollander-alert](https://github.com/nhollander-alert)

:heart: Ali Souidan ([@ali-souidan](https://github.com/ali-souidan))

:heart: null[@omer-rivlin-platinum](https://github.com/omer-rivlin-platinum)

:heart: null[@michael-smt](https://github.com/michael-smt)

:heart: Sefa Eyeoglu ([@Scrumplex](https://github.com/Scrumplex))

#### ✨ Feature

- `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Remove token requirement to support access without authentication [#3588](https://github.com/jdalrymple/gitbeaker/pull/3588) ([@michael-smt](https://github.com/michael-smt))
- `@gitbeaker/core`, `@gitbeaker/rest`
  - Add support for the JobTokenScopes API [#3571](https://github.com/jdalrymple/gitbeaker/pull/3571) ([@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Epic label events super used singular 'epic', not 'epics' [#3594](https://github.com/jdalrymple/gitbeaker/pull/3594) ([@arsdehnel](https://github.com/arsdehnel))

#### 🚑 Hot Fix

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Updating minimum node version and JSON assert keyword [#3592](https://github.com/jdalrymple/gitbeaker/pull/3592) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔨 Technical Debt

- `@gitbeaker/core`
  - Added created_at attribute [#3605](https://github.com/jdalrymple/gitbeaker/pull/3605) ([@nhollander-alert](https://github.com/nhollander-alert))
  - Adding merge_commit_sha to WebhookMergeRequestEventSchema [#3600](https://github.com/jdalrymple/gitbeaker/pull/3600) ([@ali-souidan](https://github.com/ali-souidan))
  - Extend support for the reformat function & add tests for verification [#3576](https://github.com/jdalrymple/gitbeaker/pull/3576) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Bump braces from 3.0.2 to 3.0.3 [#3601](https://github.com/jdalrymple/gitbeaker/pull/3601) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ejs from 3.1.9 to 3.1.10 [#3581](https://github.com/jdalrymple/gitbeaker/pull/3581) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - feat: Add 'branches' field to ForkProjectOptions type [#3606](https://github.com/jdalrymple/gitbeaker/pull/3606) ([@YupaTT](https://github.com/YupaTT))
  - Fixing missing types reference for shared_with_groups (Groups Schema) [#3589](https://github.com/jdalrymple/gitbeaker/pull/3589) ([@jdalrymple](https://github.com/jdalrymple))
  - Add `rebase_in_progress` to `ExpandedMergeRequestSchema` [#3585](https://github.com/jdalrymple/gitbeaker/pull/3585) ([@omer-rivlin-platinum](https://github.com/omer-rivlin-platinum))
  - Handling Admin endpoints for the Users API [#3584](https://github.com/jdalrymple/gitbeaker/pull/3584) ([@jdalrymple](https://github.com/jdalrymple))
  - Updating ProjectSchema to include `marked_for_deletion_on` and adding includeHidden and includePendingDelete to AllProjectOptions [#3583](https://github.com/jdalrymple/gitbeaker/pull/3583) ([@jdalrymple](https://github.com/jdalrymple))
  - Update visibility typing for Groups and Projects APIs [#3582](https://github.com/jdalrymple/gitbeaker/pull/3582) ([@jdalrymple](https://github.com/jdalrymple))
  - Add ServiceAccount creation options [#3560](https://github.com/jdalrymple/gitbeaker/pull/3560) ([@Scrumplex](https://github.com/Scrumplex) [@jdalrymple](https://github.com/jdalrymple))
  - Use extended type as primary return type of the Users.all function [#3577](https://github.com/jdalrymple/gitbeaker/pull/3577) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `main`

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Minor dependency changes ([@jdalrymple](https://github.com/jdalrymple))

#### 🚨 Tests

- Updating GL version [#3596](https://github.com/jdalrymple/gitbeaker/pull/3596) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/cli`, `@gitbeaker/rest`
  - Upgrade CI test instance specs [#3598](https://github.com/jdalrymple/gitbeaker/pull/3598) ([@jdalrymple](https://github.com/jdalrymple))

#### 📚 Documentation

- `@gitbeaker/cli`
  - Removing misleading docs from the CLI package README.md [#3590](https://github.com/jdalrymple/gitbeaker/pull/3590) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 9

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@michael-smt](https://github.com/michael-smt)
- [@nhollander-alert](https://github.com/nhollander-alert)
- [@omer-rivlin-platinum](https://github.com/omer-rivlin-platinum)
- [@YupaTT](https://github.com/YupaTT)
- Adam Dehnel ([@arsdehnel](https://github.com/arsdehnel))
- Ali Souidan ([@ali-souidan](https://github.com/ali-souidan))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Sefa Eyeoglu ([@Scrumplex](https://github.com/Scrumplex))

---

# 40.0.3 (Fri Apr 12 2024)

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`, `@gitbeaker/rest`
  - Updating groups schema to use email_enabled updated min version of Gitlab supported [#3569](https://github.com/jdalrymple/gitbeaker/pull/3569) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`
  - Fixing Keyset Pagination sort option from 'dec' to 'desc' [#3570](https://github.com/jdalrymple/gitbeaker/pull/3570) ([@jdalrymple](https://github.com/jdalrymple))
  - Adding missing field for DiscussionNotePositionTextSchema [#3572](https://github.com/jdalrymple/gitbeaker/pull/3572) ([@jdalrymple](https://github.com/jdalrymple))
  - Fixing search commit types [#3573](https://github.com/jdalrymple/gitbeaker/pull/3573) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 40.0.2 (Tue Mar 26 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, Koen Brouwer ([@KoenBrouwer](https://github.com/KoenBrouwer)), for all your work!

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Allow "Any" and "None" for AllMergeRequestsOptions["assigneeId"] [#3563](https://github.com/jdalrymple/gitbeaker/pull/3563) ([@KoenBrouwer](https://github.com/KoenBrouwer))

#### Authors: 1

- Koen Brouwer ([@KoenBrouwer](https://github.com/KoenBrouwer))

---

# 40.0.1 (Mon Mar 18 2024)

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Fixing incorrect Pick typing within the Webhooks API [#3558](https://github.com/jdalrymple/gitbeaker/pull/3558) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 40.0.0 (Mon Mar 18 2024)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: null[@nhollander-alert](https://github.com/nhollander-alert)

:heart: DK ([@vitamindck](https://github.com/vitamindck))

#### 💥 Breaking Change

- `@gitbeaker/core`
  - Updating Access Token API wrapper [#3554](https://github.com/jdalrymple/gitbeaker/pull/3554) ([@jdalrymple](https://github.com/jdalrymple))

#### ✨ Feature

- `@gitbeaker/core`
  - Implement GitlabPages.showSettings() [#3546](https://github.com/jdalrymple/gitbeaker/pull/3546) ([@kouak](https://github.com/kouak))
  - Allow 'self' for personal access token rotation [#3547](https://github.com/jdalrymple/gitbeaker/pull/3547) ([@nhollander-alert](https://github.com/nhollander-alert))

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fix endpoint for the removal of remote mirrors [#3550](https://github.com/jdalrymple/gitbeaker/pull/3550) ([@vitamindck](https://github.com/vitamindck))

#### ↕️ Dependencies

- Bump follow-redirects from 1.15.5 to 1.15.6 [#3557](https://github.com/jdalrymple/gitbeaker/pull/3557) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ip from 2.0.0 to 2.0.1 [#3543](https://github.com/jdalrymple/gitbeaker/pull/3543) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Adding skipci type for rebase [#3552](https://github.com/jdalrymple/gitbeaker/pull/3552) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@nhollander-alert](https://github.com/nhollander-alert)
- Benjamin Beret ([@kouak](https://github.com/kouak))
- DK ([@vitamindck](https://github.com/vitamindck))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.34.3 (Tue Feb 20 2024)

#### 🔨 Technical Debt

- `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Removing native support for rejectUnauthorized - Suggest nodejs env NODE_TLS_REJECT_UNAUTHORIZED=0 instead [#3540](https://github.com/jdalrymple/gitbeaker/pull/3540) ([@jdalrymple](https://github.com/jdalrymple))

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Fixing types to include description, raw for edit and create for the CI/CD Variables API [#3542](https://github.com/jdalrymple/gitbeaker/pull/3542) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.34.2 (Fri Feb 02 2024)

#### ↕️ Dependencies

- Bump @types/node from 20.11.14 to 20.11.16 [#3538](https://github.com/jdalrymple/gitbeaker/pull/3538) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @playwright/test from 1.41.1 to 1.41.2 [#3537](https://github.com/jdalrymple/gitbeaker/pull/3537) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @swc/jest from 0.2.31 to 0.2.34 [#3536](https://github.com/jdalrymple/gitbeaker/pull/3536) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/jest from 29.5.11 to 29.5.12 [#3535](https://github.com/jdalrymple/gitbeaker/pull/3535) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump husky from 9.0.7 to 9.0.10 [#3534](https://github.com/jdalrymple/gitbeaker/pull/3534) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump nx from 17.3.0 to 17.3.1 [#3533](https://github.com/jdalrymple/gitbeaker/pull/3533) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 20.11.13 to 20.11.14 [#3532](https://github.com/jdalrymple/gitbeaker/pull/3532) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump lint-staged from 15.2.0 to 15.2.1 [#3531](https://github.com/jdalrymple/gitbeaker/pull/3531) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### ⚠️ Pushed to `main`

- Removing auto merge to avoid blowing up the e2e tests ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.34.1 (Wed Jan 31 2024)

#### 🔨 Technical Debt

- Set timeout on e2e test setup job to avoid long CI builds [#3529](https://github.com/jdalrymple/gitbeaker/pull/3529) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Bump @types/node from 20.11.10 to 20.11.13 [#3530](https://github.com/jdalrymple/gitbeaker/pull/3530) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 6.19.1 to 6.20.0 [#3524](https://github.com/jdalrymple/gitbeaker/pull/3524) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump nx from 17.2.8 to 17.3.0 [#3526](https://github.com/jdalrymple/gitbeaker/pull/3526) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump husky from 9.0.6 to 9.0.7 [#3525](https://github.com/jdalrymple/gitbeaker/pull/3525) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 6.19.1 to 6.20.0 [#3523](https://github.com/jdalrymple/gitbeaker/pull/3523) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Changing project create types for path and name [#3528](https://github.com/jdalrymple/gitbeaker/pull/3528) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.34.0 (Mon Jan 29 2024)

#### 🚑 Hot Fix

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/rest`
  - Missing build files [#3522](https://github.com/jdalrymple/gitbeaker/pull/3522) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.33.2 (Mon Jan 29 2024)

#### ↕️ Dependencies

- Bump rate-limiter-flexible from 4.0.0 to 4.0.1 [#3519](https://github.com/jdalrymple/gitbeaker/pull/3519) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 20.11.6 to 20.11.10 [#3520](https://github.com/jdalrymple/gitbeaker/pull/3520) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @swc/core from 1.3.105 to 1.3.107 [#3518](https://github.com/jdalrymple/gitbeaker/pull/3518) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# 39.33.1 (Mon Jan 29 2024)

#### 🔨 Technical Debt

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - CI/CD Re-organization and Optimization [#3515](https://github.com/jdalrymple/gitbeaker/pull/3515) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Bump husky from 8.0.3 to 9.0.6 [#3517](https://github.com/jdalrymple/gitbeaker/pull/3517) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.33.0 (Tue Jan 23 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, Elaine Mattos ([@elaine-mattos](https://github.com/elaine-mattos)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fix - export Webhook Interfaces [#3514](https://github.com/jdalrymple/gitbeaker/pull/3514) (elaine.mattos@gmail.com= [@elaine-mattos](https://github.com/elaine-mattos))

#### Authors: 2

- Elaine Mattos ([@elaine-mattos](https://github.com/elaine-mattos))
- elaine-mattos= (elaine.mattos@gmail.com=)

---

# 39.32.0 (Tue Jan 23 2024)

#### 🐛 Bug Fix

- `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Updating Gitbeaker Error typings [#3513](https://github.com/jdalrymple/gitbeaker/pull/3513) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.31.1 (Tue Jan 23 2024)

#### 🗃️ Typescript Definitions

- `@gitbeaker/core`
  - Add typing exports for Webhook Events [#3511](https://github.com/jdalrymple/gitbeaker/pull/3511) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.31.0 (Mon Jan 22 2024)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Add missing premium/ultimate Project attributes [#3512](https://github.com/jdalrymple/gitbeaker/pull/3512) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.30.0 (Wed Jan 17 2024)

#### 🐛 Bug Fix

- `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Update rate limit feature to be more browser freindly [#3428](https://github.com/jdalrymple/gitbeaker/pull/3428) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.29.0 (Sun Jan 14 2024)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fix bad externUid type in Users API [#3508](https://github.com/jdalrymple/gitbeaker/pull/3508) ([@ArnaudTA](https://github.com/ArnaudTA))

#### Authors: 1

- [@ArnaudTA](https://github.com/ArnaudTA)

---

# 39.28.0 (Sun Dec 31 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fixing Users.edit HTTP Method [#3503](https://github.com/jdalrymple/gitbeaker/pull/3503) ([@jdalrymple](https://github.com/jdalrymple))
  - Add back isForm when setting position within the create Discussions API [#3497](https://github.com/jdalrymple/gitbeaker/pull/3497) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔨 Technical Debt

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/rest`
  - Restructuring the AccessLevel enum [#3501](https://github.com/jdalrymple/gitbeaker/pull/3501) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`
  - Types - Add more options to MR create [#3498](https://github.com/jdalrymple/gitbeaker/pull/3498) ([@pataar](https://github.com/pataar))

#### ↕️ Dependencies

- Bump nx from 17.2.7 to 17.2.8 [#3499](https://github.com/jdalrymple/gitbeaker/pull/3499) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### 📚 Documentation

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Updating sponsors header [#3504](https://github.com/jdalrymple/gitbeaker/pull/3504) ([@jdalrymple](https://github.com/jdalrymple))
  - Updating badges [#3502](https://github.com/jdalrymple/gitbeaker/pull/3502) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Pieter Willekens ([@pataar](https://github.com/pataar))

---

# 39.27.1 (Tue Dec 26 2023)

#### 🔨 Technical Debt

- `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Add explicit error types for easier debugging [#3496](https://github.com/jdalrymple/gitbeaker/pull/3496) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.27.0 (Mon Dec 25 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, JounQin ([@JounQin](https://github.com/JounQin)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - fix: incorrect `noteable_type` type for `MergeRequest` [#3491](https://github.com/jdalrymple/gitbeaker/pull/3491) ([@JounQin](https://github.com/JounQin) [@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Bump nx from 17.2.5 to 17.2.7 [#3495](https://github.com/jdalrymple/gitbeaker/pull/3495) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- JounQin ([@JounQin](https://github.com/JounQin))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.26.2 (Mon Dec 18 2023)

#### ↕️ Dependencies

- Bump nx from 17.1.2 to 17.2.5 [#3489](https://github.com/jdalrymple/gitbeaker/pull/3489) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# 39.26.1 (Wed Dec 13 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, Kohei Seino ([@kseino](https://github.com/kseino)), for all your work!

#### 🔨 Technical Debt

- `@gitbeaker/core`
  - add detailed_merge_status to MergeRequestSchema [#3488](https://github.com/jdalrymple/gitbeaker/pull/3488) ([@kseino](https://github.com/kseino))

#### Authors: 1

- Kohei Seino ([@kseino](https://github.com/kseino))

---

# 39.26.0 (Sat Dec 09 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, Dom Harrington ([@domharrington](https://github.com/domharrington)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Updating MergeRequestDiscussion's endpoints [#3479](https://github.com/jdalrymple/gitbeaker/pull/3479) ([@jdalrymple](https://github.com/jdalrymple))
  - Fix a couple of types in Users and PersonalAccessTokens resources [#3482](https://github.com/jdalrymple/gitbeaker/pull/3482) ([@domharrington](https://github.com/domharrington))

#### Authors: 2

- Dom Harrington ([@domharrington](https://github.com/domharrington))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.25.1 (Sat Dec 09 2023)

#### ↕️ Dependencies

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Updating all package deps [#3483](https://github.com/jdalrymple/gitbeaker/pull/3483) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.25.0 (Wed Nov 22 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fixing position argument naming [#3473](https://github.com/jdalrymple/gitbeaker/pull/3473) ([@jdalrymple](https://github.com/jdalrymple))
  - Fixing Group SAML Links API for the show and remove methods [#3474](https://github.com/jdalrymple/gitbeaker/pull/3474) ([@jdalrymple](https://github.com/jdalrymple))

#### 📚 Documentation

- `@gitbeaker/core`
  - Update commitId to be of type string [#3475](https://github.com/jdalrymple/gitbeaker/pull/3475) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.24.0 (Fri Nov 17 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, David Claybourne ([@Djcd](https://github.com/Djcd)), for all your work!

#### ✨ Feature

- `@gitbeaker/core`, `@gitbeaker/rest`
  - Add creation for service accounts on selfhosted instances [#3458](https://github.com/jdalrymple/gitbeaker/pull/3458) ([@Djcd](https://github.com/Djcd))
- `@gitbeaker/core`
  - Add rotate to PersonalAccessTokens resource [#3459](https://github.com/jdalrymple/gitbeaker/pull/3459) ([@Djcd](https://github.com/Djcd))

#### ↕️ Dependencies

- Bump nx from 17.0.2 to 17.1.2 [#3451](https://github.com/jdalrymple/gitbeaker/pull/3451) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Dependencies [#3457](https://github.com/jdalrymple/gitbeaker/pull/3457) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `main`

- `@gitbeaker/cli`
  - Updating image url ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Merge branch 'docs/updating-readme' into main ([@jdalrymple](https://github.com/jdalrymple))
  - Updating contributors settings and the readme image url ([@jdalrymple](https://github.com/jdalrymple))

#### 🚨 Tests

- `@gitbeaker/rest`
  - Add service account API test updates [#3460](https://github.com/jdalrymple/gitbeaker/pull/3460) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- David Claybourne ([@Djcd](https://github.com/Djcd))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.23.0 (Thu Nov 16 2023)

#### 🐛 Bug Fix

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Fix typing on Project.show methods [#3456](https://github.com/jdalrymple/gitbeaker/pull/3456) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.22.0 (Wed Nov 15 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Add addLabels and removeLabels properties to EditMergeRequestOptions [#3454](https://github.com/jdalrymple/gitbeaker/pull/3454) ([@pataar](https://github.com/pataar))

#### Authors: 1

- Pieter Willekens ([@pataar](https://github.com/pataar))

---

# 39.21.2 (Thu Oct 26 2023)

#### ↕️ Dependencies

- Bump nx from 17.0.1 to 17.0.2 [#3444](https://github.com/jdalrymple/gitbeaker/pull/3444) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# 39.21.1 (Sat Oct 21 2023)

#### ↕️ Dependencies

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Updating all dependencies to their latest supported versions [#3441](https://github.com/jdalrymple/gitbeaker/pull/3441) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.21.0 (Sat Oct 21 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, artemoire ([@Artemoire](https://github.com/Artemoire)), for all your work!

#### ✨ Feature

- `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Add support for Service Accounts API [#3438](https://github.com/jdalrymple/gitbeaker/pull/3438) ([@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- `@gitbeaker/core`, `@gitbeaker/requester-utils`
  - Add approvals property to Deployments Schema [#3439](https://github.com/jdalrymple/gitbeaker/pull/3439) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`
  - Add Missing PaginationRequestOptions in allDiffs and allCommits [#3431](https://github.com/jdalrymple/gitbeaker/pull/3431) ([@Artemoire](https://github.com/Artemoire))

#### ↕️ Dependencies

- `@gitbeaker/rest`
  - Bump lint-staged from 14.0.0 to 15.0.2 [#3435](https://github.com/jdalrymple/gitbeaker/pull/3435) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- artemoire ([@Artemoire](https://github.com/Artemoire))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.20.0 (Sat Oct 14 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fix incorrect HTTP method used in IssueLinks API create method [#3430](https://github.com/jdalrymple/gitbeaker/pull/3430) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.19.0 (Sat Oct 07 2023)

#### ✨ Feature

- `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Support for endpoint rate limits [#3426](https://github.com/jdalrymple/gitbeaker/pull/3426) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.18.0 (Wed Oct 04 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, Elan Ruusamäe ([@glensc](https://github.com/glensc)), for all your work!

#### ✨ Feature

- `@gitbeaker/core`, `@gitbeaker/rest`
  - Add support for the SearchAdmin, GroupEpicBoards, GeoSites and CodeSuggestion APIs [#3424](https://github.com/jdalrymple/gitbeaker/pull/3424) ([@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Improve docs to highlight supported APIs [#3423](https://github.com/jdalrymple/gitbeaker/pull/3423) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`
  - Adding missed push rule attributes [#3425](https://github.com/jdalrymple/gitbeaker/pull/3425) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `main`

- `@gitbeaker/rest`
  - Adjust e2e tests for latest API additions ([@jdalrymple](https://github.com/jdalrymple))

#### 📚 Documentation

- docs/FAQ.md: Add js code fence syntax [#3422](https://github.com/jdalrymple/gitbeaker/pull/3422) ([@glensc](https://github.com/glensc))

#### Authors: 2

- Elan Ruusamäe ([@glensc](https://github.com/glensc))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.17.0 (Mon Oct 02 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, Martin Dreher ([@mercutiodesign](https://github.com/mercutiodesign)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Add Blob to RepositoryFiles.showRaw response type [#3418](https://github.com/jdalrymple/gitbeaker/pull/3418) ([@mercutiodesign](https://github.com/mercutiodesign))

#### Authors: 1

- Martin Dreher ([@mercutiodesign](https://github.com/mercutiodesign))

---

# 39.16.0 (Tue Sep 26 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, null[@artlist-scottambrose](https://github.com/artlist-scottambrose), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fixed issue 3414: Add merge request to merge train using the wrong HT… [#3415](https://github.com/jdalrymple/gitbeaker/pull/3415) ([@artlist-scottambrose](https://github.com/artlist-scottambrose))

#### Authors: 1

- [@artlist-scottambrose](https://github.com/artlist-scottambrose)

---

# 39.15.0 (Tue Sep 12 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Property should be `archived` not `archive` [#3409](https://github.com/jdalrymple/gitbeaker/pull/3409) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.14.0 (Mon Sep 11 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Add archive type to the allProjects function under the Groups API [#3407](https://github.com/jdalrymple/gitbeaker/pull/3407) ([@jdalrymple](https://github.com/jdalrymple))
  - Updating NoteSchema [#3408](https://github.com/jdalrymple/gitbeaker/pull/3408) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.13.0 (Fri Sep 01 2023)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: null[@davidclaybourne](https://github.com/davidclaybourne)

:heart: David Claybourne ([@Djcd](https://github.com/Djcd))

:heart: Alessandro Diez ([@demedos](https://github.com/demedos))

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fixing `straight` option type for Repositories.compare [#3401](https://github.com/jdalrymple/gitbeaker/pull/3401) ([@jdalrymple](https://github.com/jdalrymple))
  - Adding more argument options to the MergeRequestDraftNotes create and edit methods [#3400](https://github.com/jdalrymple/gitbeaker/pull/3400) ([@jdalrymple](https://github.com/jdalrymple))
  - Update DiscussionNoteSchema to include proper type values [#3397](https://github.com/jdalrymple/gitbeaker/pull/3397) ([@jdalrymple](https://github.com/jdalrymple))
  - Add missing Access Token scopes and token attribute to Schema [#3395](https://github.com/jdalrymple/gitbeaker/pull/3395) ([@davidclaybourne](https://github.com/davidclaybourne) [@Djcd](https://github.com/Djcd))
  - Adding the prepared_at attribute to the MergeRequest schema [#3393](https://github.com/jdalrymple/gitbeaker/pull/3393) ([@demedos](https://github.com/demedos))

#### 📚 Documentation

- `@gitbeaker/rest`
  - Fix typo in the rest package readme [#3394](https://github.com/jdalrymple/gitbeaker/pull/3394) ([@demedos](https://github.com/demedos))

#### Authors: 4

- [@davidclaybourne](https://github.com/davidclaybourne)
- Alessandro Diez ([@demedos](https://github.com/demedos))
- David Claybourne ([@Djcd](https://github.com/Djcd))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.12.0 (Mon Aug 21 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Expanding typing for dynamic payload response functions [#3386](https://github.com/jdalrymple/gitbeaker/pull/3386) ([@jdalrymple](https://github.com/jdalrymple))
  - Fixing pagination for allDiffs and allCommits methods [#3388](https://github.com/jdalrymple/gitbeaker/pull/3388) ([@jdalrymple](https://github.com/jdalrymple))
  - Fixing statistics parameter on groups [#3387](https://github.com/jdalrymple/gitbeaker/pull/3387) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.11.0 (Thu Aug 17 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, Benjamin Beret ([@kouak](https://github.com/kouak)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fix MergeRequestSchema.closed_at property type [#3381](https://github.com/jdalrymple/gitbeaker/pull/3381) ([@kouak](https://github.com/kouak))
  - Fix missing ProjectReleaseSchema._links property [#3382](https://github.com/jdalrymple/gitbeaker/pull/3382) ([@kouak](https://github.com/kouak))
  - Additional tweaks to protected branch types [#3375](https://github.com/jdalrymple/gitbeaker/pull/3375) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Bump lint-staged from 13.2.3 to 14.0.0 [#3377](https://github.com/jdalrymple/gitbeaker/pull/3377) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Benjamin Beret ([@kouak](https://github.com/kouak))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.10.3 (Tue Aug 08 2023)

#### 🔨 Technical Debt

- `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Embedding the request options normalization [#3374](https://github.com/jdalrymple/gitbeaker/pull/3374) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Bump eslint-config-prettier from 8.8.0 to 9.0.0 [#3372](https://github.com/jdalrymple/gitbeaker/pull/3372) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.10.2 (Sun Jul 30 2023)

#### 🔨 Technical Debt

- `@gitbeaker/core`
  - Expand the typing for the project endpoints on users [#3370](https://github.com/jdalrymple/gitbeaker/pull/3370) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.10.1 (Sun Jul 30 2023)

#### ↕️ Dependencies

- Bump @auto-it/core from 10.46.0 to 11.0.0 [#3368](https://github.com/jdalrymple/gitbeaker/pull/3368) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/omit-commits from 10.46.0 to 11.0.0 [#3365](https://github.com/jdalrymple/gitbeaker/pull/3365) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/released from 10.46.0 to 11.0.0 [#3367](https://github.com/jdalrymple/gitbeaker/pull/3367) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/first-time-contributor from 10.46.0 to 11.0.0 [#3364](https://github.com/jdalrymple/gitbeaker/pull/3364) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### ⚠️ Pushed to `main`

- Refreshing yarn.lock ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.10.0 (Sun Jul 30 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Updating protected branched types [#3360](https://github.com/jdalrymple/gitbeaker/pull/3360) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Bump @auto-it/all-contributors from 10.46.0 to 11.0.0 [#3366](https://github.com/jdalrymple/gitbeaker/pull/3366) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/omit-release-notes from 10.46.0 to 11.0.0 [#3363](https://github.com/jdalrymple/gitbeaker/pull/3363) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.46.0 to 11.0.0 [#3369](https://github.com/jdalrymple/gitbeaker/pull/3369) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.9.0 (Fri Jul 28 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Make camelize type recursive [#3361](https://github.com/jdalrymple/gitbeaker/pull/3361) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔨 Technical Debt

- `@gitbeaker/core`
  - Replace Either and EitherOrNone varients with oneOf and oneOrNoneOf [#3362](https://github.com/jdalrymple/gitbeaker/pull/3362) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Bump nx from 16.5.2 to 16.5.5 [#3357](https://github.com/jdalrymple/gitbeaker/pull/3357) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.8.0 (Mon Jul 17 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fixing projectsLimit type in the CreateUsersOptions type [#3354](https://github.com/jdalrymple/gitbeaker/pull/3354) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.7.0 (Fri Jul 14 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Update Release schema to allow for null properties [#3351](https://github.com/jdalrymple/gitbeaker/pull/3351) ([@jdalrymple](https://github.com/jdalrymple))
  - Adding groups property to the Runners schema [#3352](https://github.com/jdalrymple/gitbeaker/pull/3352) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Bump nx from 16.5.1 to 16.5.2 [#3349](https://github.com/jdalrymple/gitbeaker/pull/3349) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.6.0 (Wed Jul 12 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fix search params in JobArtifact.downloadArchive endpoints [#3346](https://github.com/jdalrymple/gitbeaker/pull/3346) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Updating lerna from 7.1.1 to 7.1.3 [#3348](https://github.com/jdalrymple/gitbeaker/pull/3348) ([@jdalrymple](https://github.com/jdalrymple))
- Bump nx from 16.5.0 to 16.5.1 [#3342](https://github.com/jdalrymple/gitbeaker/pull/3342) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 5.61.0 to 6.0.0 [#3344](https://github.com/jdalrymple/gitbeaker/pull/3344) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/nx-16.5.0' into main [#3339](https://github.com/jdalrymple/gitbeaker/pull/3339) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/prettier-3.0.0' into main [#3338](https://github.com/jdalrymple/gitbeaker/pull/3338) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'gitlab/dependabot/npm_and_yarn/nx-16.4.3' into main [#3337](https://github.com/jdalrymple/gitbeaker/pull/3337) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`
  - Bump @typescript-eslint/eslint-plugin from 5.61.0 to 6.0.0 [#3343](https://github.com/jdalrymple/gitbeaker/pull/3343) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Dependency updates [#3341](https://github.com/jdalrymple/gitbeaker/pull/3341) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `main`

- Merge branch 'dep/lerna' into main ([@jdalrymple](https://github.com/jdalrymple))
- Increase ignore file specificity ([@jdalrymple](https://github.com/jdalrymple))
- Add additional information to ignore file ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.5.1 (Mon Jul 03 2023)

#### ↕️ Dependencies

- Bump nx from 16.4.1 to 16.4.2 [#3336](https://github.com/jdalrymple/gitbeaker/pull/3336) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# 39.5.0 (Mon Jul 03 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Ensure the combined nested object options are handled correctly [#3331](https://github.com/jdalrymple/gitbeaker/pull/3331) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Bump nx from 16.4.0 to 16.4.1 [#3332](https://github.com/jdalrymple/gitbeaker/pull/3332) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.4.0 (Tue Jun 27 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Adding unit tests and fixing the trigger and remove methods for PipelineTriggerTokens [#3328](https://github.com/jdalrymple/gitbeaker/pull/3328) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.3.0 (Mon Jun 26 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, null[@ArnaudTA](https://github.com/ArnaudTA), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Add missing administrator-only Users.all search params [#3327](https://github.com/jdalrymple/gitbeaker/pull/3327) ([@ArnaudTA](https://github.com/ArnaudTA) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@ArnaudTA](https://github.com/ArnaudTA)
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.2.0 (Mon Jun 26 2023)

#### ✨ Feature

- `@gitbeaker/core`
  - Adding streaming support to project and group import/exports [#3326](https://github.com/jdalrymple/gitbeaker/pull/3326) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Support defered token retrieval [#3317](https://github.com/jdalrymple/gitbeaker/pull/3317) ([@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Add missing types to PipelineTriggerTokenSchema [#3318](https://github.com/jdalrymple/gitbeaker/pull/3318) ([@jdalrymple](https://github.com/jdalrymple))
  - Add search specific query params to the AllUsersOptions type [#3319](https://github.com/jdalrymple/gitbeaker/pull/3319) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Batch dependency update [#3325](https://github.com/jdalrymple/gitbeaker/pull/3325) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.1.1 (Mon Jun 26 2023)

#### 🔨 Technical Debt

- `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Include request in error cause [#3309](https://github.com/jdalrymple/gitbeaker/pull/3309) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.1.0 (Sun Jun 11 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fixing typo in the `edit` function of Resource/Group/Project Milestones [#3308](https://github.com/jdalrymple/gitbeaker/pull/3308) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Bump lerna from 6.6.1 to 7.0.0 [#3306](https://github.com/jdalrymple/gitbeaker/pull/3306) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 39.0.0 (Thu Jun 08 2023)

#### 💥 Breaking Change

- `@gitbeaker/core`
  - Renaming downloadTraceFile to showLog and updating return type [#3301](https://github.com/jdalrymple/gitbeaker/pull/3301) ([@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fix the pipeline trigger endpoint [#3305](https://github.com/jdalrymple/gitbeaker/pull/3305) ([@jdalrymple](https://github.com/jdalrymple))
  - Adding missing property `is_admin` to `ExpandedUserSchema` type [#3304](https://github.com/jdalrymple/gitbeaker/pull/3304) ([@jdalrymple](https://github.com/jdalrymple))
  - Fix `CreateProtectedBranchOptions` type to properly reflect access levels [#3302](https://github.com/jdalrymple/gitbeaker/pull/3302) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 38.12.1 (Wed Jun 07 2023)

#### 🔨 Technical Debt

- `@gitbeaker/core`
  - Updating typing for `MergeRequests.all()` to properly support not passing `groupId` or `projectId` [#3298](https://github.com/jdalrymple/gitbeaker/pull/3298) (rafael.mello@ifood.com.br)

#### Authors: 1

- Rafael Mello ([@merorafael](https://github.com/merorafael))

---

# 38.12.0 (Tue Jun 06 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Switching to a more strict "Omit" type to support better mapped typing [#3297](https://github.com/jdalrymple/gitbeaker/pull/3297) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 38.11.0 (Tue Jun 06 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, Rafael Mello ([@merorafael](https://github.com/merorafael)), for all your work!

#### ✨ Feature

- `@gitbeaker/core`
  - Adding Mergerequest "changes" endpoint for backwards compatibility until full deprecation [#3293](https://github.com/jdalrymple/gitbeaker/pull/3293) (rafael.mello@ifood.com.br [@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Bump nx from 16.3.1 to 16.3.2 [#3294](https://github.com/jdalrymple/gitbeaker/pull/3294) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jest-extended from 3.2.4 to 4.0.0 [#3295](https://github.com/jdalrymple/gitbeaker/pull/3295) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Rafael Mello ([@merorafael](https://github.com/merorafael))

---

# 38.10.0 (Fri Jun 02 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, Will ([@ravewill](https://github.com/ravewill)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`, `@gitbeaker/rest`
  - Change ProjectImportExport to ProjectImportExports [#3292](https://github.com/jdalrymple/gitbeaker/pull/3292) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`
  - Fix return types for a few MR methods [#3290](https://github.com/jdalrymple/gitbeaker/pull/3290) ([@jdalrymple](https://github.com/jdalrymple))
  - Add missing pagination type exports [#3281](https://github.com/jdalrymple/gitbeaker/pull/3281) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔨 Technical Debt

- `@gitbeaker/core`
  - Improving pagination types for easier usage [#3280](https://github.com/jdalrymple/gitbeaker/pull/3280) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Bump nx from 16.3.0 to 16.3.1 [#3289](https://github.com/jdalrymple/gitbeaker/pull/3289) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump nx from 16.2.2 to 16.3.0 [#3288](https://github.com/jdalrymple/gitbeaker/pull/3288) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### 📚 Documentation

- `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Updating FAQ broken link [#3291](https://github.com/jdalrymple/gitbeaker/pull/3291) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`
  - Mark some MR nullable types as nullable [#3286](https://github.com/jdalrymple/gitbeaker/pull/3286) ([@ravewill](https://github.com/ravewill))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Will ([@ravewill](https://github.com/ravewill))

---

# 38.9.0 (Sun May 28 2023)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Roman Khristoforov ([@ksilligan](https://github.com/ksilligan))

:heart: Bambii ([@Bambii556](https://github.com/Bambii556))

#### 🐛 Bug Fix

- `@gitbeaker/core`, `@gitbeaker/rest`
  - Updating CI Lint API Support to match Gitlab API v16 [#3278](https://github.com/jdalrymple/gitbeaker/pull/3278) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`
  - Fix ExternalStatusChecks arguments [#3276](https://github.com/jdalrymple/gitbeaker/pull/3276) ([@ksilligan](https://github.com/ksilligan) [@jdalrymple](https://github.com/jdalrymple))
  - Added fix for Group Access tokens requests [#3275](https://github.com/jdalrymple/gitbeaker/pull/3275) (shaunbrown@capitecbank.co.za [@Bambii556](https://github.com/Bambii556))

#### ↕️ Dependencies

- Bump nx from 16.2.1 to 16.2.2 [#3273](https://github.com/jdalrymple/gitbeaker/pull/3273) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### 📚 Documentation

- Add info about Node v16 support to FAQ [#3277](https://github.com/jdalrymple/gitbeaker/pull/3277) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Bambii ([@Bambii556](https://github.com/Bambii556))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Roman Khristoforov ([@ksilligan](https://github.com/ksilligan))
- Shaun Brown (shaunbrown@capitecbank.co.za)

---

# 38.8.0 (Mon May 22 2023)

#### ✨ Feature

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Add support for a query timeout [#3271](https://github.com/jdalrymple/gitbeaker/pull/3271) ([@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fix typing for Projects, Users and Groups [#3272](https://github.com/jdalrymple/gitbeaker/pull/3272) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 38.7.0 (Sat May 20 2023)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Marvin Altemeier ([@iMarv](https://github.com/iMarv))

:heart: Simone Corsi ([@simonecorsi](https://github.com/simonecorsi))

#### ✨ Feature

- `@gitbeaker/core`, `@gitbeaker/rest`
  - Add MergeRequestNoteAwardEmojis class [#3265](https://github.com/jdalrymple/gitbeaker/pull/3265) ([@iMarv](https://github.com/iMarv))

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Handle casing edge cases [#3268](https://github.com/jdalrymple/gitbeaker/pull/3268) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Bump nx from 16.1.4 to 16.2.1 [#3267](https://github.com/jdalrymple/gitbeaker/pull/3267) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### 📚 Documentation

- `@gitbeaker/rest`
  - docs(package/rest/README.md): fixes invalid orderBy example [#3264](https://github.com/jdalrymple/gitbeaker/pull/3264) ([@simonecorsi](https://github.com/simonecorsi))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Marvin Altemeier ([@iMarv](https://github.com/iMarv))
- Simone Corsi ([@simonecorsi](https://github.com/simonecorsi))

---

# 38.6.0 (Mon May 15 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, Spencer Salisbury ([@smsalisbury](https://github.com/smsalisbury)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Add missing fields to EditMergeRequestOptions [#3262](https://github.com/jdalrymple/gitbeaker/pull/3262) ([@smsalisbury](https://github.com/smsalisbury))

#### Authors: 1

- Spencer Salisbury ([@smsalisbury](https://github.com/smsalisbury))

---

# 38.5.0 (Sat May 13 2023)

#### 🐛 Bug Fix

- Update missing script variable [#3260](https://github.com/jdalrymple/gitbeaker/pull/3260) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 38.4.0 (Sat May 13 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, Théis Bazin ([@tbazin](https://github.com/tbazin)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - bug: fix contenxt -> content typo [#3257](https://github.com/jdalrymple/gitbeaker/pull/3257) ([@tbazin](https://github.com/tbazin))
  - Export additional template types [#3252](https://github.com/jdalrymple/gitbeaker/pull/3252) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`, `@gitbeaker/rest`
  - Update fetch mode to exclude cors and add repository unit and integration tests [#3249](https://github.com/jdalrymple/gitbeaker/pull/3249) ([@jdalrymple](https://github.com/jdalrymple))

#### 🚑 Hot Fix

- `@gitbeaker/core`, `@gitbeaker/rest`
  - Settings cors to same-origin conditionally for protected api route [#3258](https://github.com/jdalrymple/gitbeaker/pull/3258) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔨 Technical Debt

- Adding coverage uploads [#3253](https://github.com/jdalrymple/gitbeaker/pull/3253) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/rest`
  - Switching buffer response to blob for type consistency in the API [#3259](https://github.com/jdalrymple/gitbeaker/pull/3259) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Bump nx from 16.1.3 to 16.1.4 [#3250](https://github.com/jdalrymple/gitbeaker/pull/3250) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump nx from 16.1.1 to 16.1.3 [#3247](https://github.com/jdalrymple/gitbeaker/pull/3247) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Théis Bazin ([@tbazin](https://github.com/tbazin))

---

# 38.3.0 (Sat May 06 2023)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fixing support for nested position arguments [#3246](https://github.com/jdalrymple/gitbeaker/pull/3246) ([@jdalrymple](https://github.com/jdalrymple))
  - Fixing support for nested position arguments [#3244](https://github.com/jdalrymple/gitbeaker/pull/3244) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- `@gitbeaker/core`
  - Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/nx-16.1.1' into main [#3245](https://github.com/jdalrymple/gitbeaker/pull/3245) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Bump @types/node from 18.16.2 to 20.0.0 [#3242](https://github.com/jdalrymple/gitbeaker/pull/3242) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 38.2.0 (Fri May 05 2023)

#### 🐛 Bug Fix

- `@gitbeaker/rest`
  - Switch from same-origin to cors fetch mode [#3240](https://github.com/jdalrymple/gitbeaker/pull/3240) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Bump nx from 16.0.3 to 16.1.0 [#3239](https://github.com/jdalrymple/gitbeaker/pull/3239) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### 📚 Documentation

- `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Remove usage of skypack for esm.sh [#3241](https://github.com/jdalrymple/gitbeaker/pull/3241) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 38.1.1 (Wed May 03 2023)

#### ↕️ Dependencies

- Bump nx from 16.0.1 to 16.0.3 [#3233](https://github.com/jdalrymple/gitbeaker/pull/3233) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### 📚 Documentation

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Update sponsors list [#3235](https://github.com/jdalrymple/gitbeaker/pull/3235) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 38.1.0 (Sat Apr 29 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, Rafael Mello ([@merorafael](https://github.com/merorafael)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/cli`, `@gitbeaker/core`
  - Latest release housekeeping v3 [#3229](https://github.com/jdalrymple/gitbeaker/pull/3229) ([@jdalrymple](https://github.com/jdalrymple) [@merorafael](https://github.com/merorafael))

#### Authors: 2

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Rafael Mello ([@merorafael](https://github.com/merorafael))

---

# 38.0.1 (Sat Apr 29 2023)

#### ↕️ Dependencies

- Additional Minor Updates [#3228](https://github.com/jdalrymple/gitbeaker/pull/3228) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 38.0.0 (Sat Apr 29 2023)

#### 💥 Breaking Change

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - v37 Release Housekeeping - Part 2 [#3226](https://github.com/jdalrymple/gitbeaker/pull/3226) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 37.1.0 (Thu Apr 27 2023)

#### 🚑 Hot Fix

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - v37 Release Housekeeping [#3222](https://github.com/jdalrymple/gitbeaker/pull/3222) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 36.0.0 (Wed Apr 26 2023)

#### 💥 Breaking Change

- `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/requester-utils`, `@gitbeaker/rest`
  - Major Release v36.0.0 - Improved Typing, and API support (16.0) [#2258](https://github.com/jdalrymple/gitbeaker/pull/2258) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 35.8.0 (Wed Nov 16 2022)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Sander Cox ([@sandercox](https://github.com/sandercox))

:heart: Ivan Katliarchuk ([@ivankatliarchuk](https://github.com/ivankatliarchuk))

:heart: null[@phillipB-nmprofile](https://github.com/phillipB-nmprofile)

:heart: Robert Donnelly ([@robdonn](https://github.com/robdonn))

:heart: Felix Herold ([@DerHerrGammler](https://github.com/DerHerrGammler))

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Allow MR discussions to be resolved [#2463](https://github.com/jdalrymple/gitbeaker/pull/2463) ([@sandercox](https://github.com/sandercox) [@jdalrymple](https://github.com/jdalrymple))
  - fix: Update Users current method return type to UserExtendedSchema [#2737](https://github.com/jdalrymple/gitbeaker/pull/2737) ([@ivankatliarchuk](https://github.com/ivankatliarchuk) [@jdalrymple](https://github.com/jdalrymple))
  - Expand Groups.search's options parameter type to PaginatedRequestOptions [#2813](https://github.com/jdalrymple/gitbeaker/pull/2813) ([@phillipB-nmprofile](https://github.com/phillipB-nmprofile) [@jdalrymple](https://github.com/jdalrymple))
  - fix: allow string discussionId for MergeRequestDiscussions [#2818](https://github.com/jdalrymple/gitbeaker/pull/2818) ([@robdonn](https://github.com/robdonn) [@jdalrymple](https://github.com/jdalrymple))
  - fix: missing resolved key in DiscussionNote interface [#2821](https://github.com/jdalrymple/gitbeaker/pull/2821) ([@DerHerrGammler](https://github.com/DerHerrGammler))

#### 🔩 Dependency Updates

- Bump node-fetch from 3.2.7 to 3.2.8 [#2594](https://github.com/jdalrymple/gitbeaker/pull/2594) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint-plugin-prettier from 4.0.0 to 4.2.1 [#2587](https://github.com/jdalrymple/gitbeaker/pull/2587) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.67.0 to 2.76.0 [#2593](https://github.com/jdalrymple/gitbeaker/pull/2593) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.17.1 to 1.23.2 [#2585](https://github.com/jdalrymple/gitbeaker/pull/2585) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint-import-resolver-typescript from 2.5.0 to 3.2.5 [#2584](https://github.com/jdalrymple/gitbeaker/pull/2584) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump lint-staged from 12.3.3 to 13.0.3 [#2588](https://github.com/jdalrymple/gitbeaker/pull/2588) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jpeg-js from 0.4.3 to 0.4.4 [#2547](https://github.com/jdalrymple/gitbeaker/pull/2547) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump openpgp from 5.0.1 to 5.3.1 [#2591](https://github.com/jdalrymple/gitbeaker/pull/2591) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump follow-redirects from 1.14.7 to 1.14.8 [#2370](https://github.com/jdalrymple/gitbeaker/pull/2370) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump node-fetch from 3.1.1 to 3.2.7 [#2589](https://github.com/jdalrymple/gitbeaker/pull/2589) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump lerna from 4.0.0 to 5.1.8 [#2592](https://github.com/jdalrymple/gitbeaker/pull/2592) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/core`
  - Bump @types/mime from 2.0.3 to 3.0.1 in /packages/core [#2636](https://github.com/jdalrymple/gitbeaker/pull/2636) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Bump @types/node from 17.0.15 to 18.0.3 [#2586](https://github.com/jdalrymple/gitbeaker/pull/2586) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Bump jest-extended from 1.2.0 to 3.0.0 [#2590](https://github.com/jdalrymple/gitbeaker/pull/2590) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 7

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@phillipB-nmprofile](https://github.com/phillipB-nmprofile)
- Felix Herold ([@DerHerrGammler](https://github.com/DerHerrGammler))
- Ivan Katliarchuk ([@ivankatliarchuk](https://github.com/ivankatliarchuk))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Robert Donnelly ([@robdonn](https://github.com/robdonn))
- Sander Cox ([@sandercox](https://github.com/sandercox))

---

# 35.7.0 (Mon Jul 11 2022)

:tada: This release contains work from a new contributor! :tada:

Thank you, Sullivan SENECHAL ([@soullivaneuh](https://github.com/soullivaneuh)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - fix(resources): missing project default branch possible undefined value [#2515](https://github.com/jdalrymple/gitbeaker/pull/2515) ([@soullivaneuh](https://github.com/soullivaneuh))

#### Authors: 1

- Sullivan SENECHAL ([@soullivaneuh](https://github.com/soullivaneuh))

---

# 35.6.1 (Mon Jul 11 2022)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Karl Haworth ([@karlhaworth](https://github.com/karlhaworth))

:heart: Jeff Bacon ([@thesuavehog](https://github.com/thesuavehog))

#### 🐛 Bug Fix

- `@gitbeaker/requester-utils`
  - fixes #2545 - compile error in RequesterUtils [#2546](https://github.com/jdalrymple/gitbeaker/pull/2546) ([@thesuavehog](https://github.com/thesuavehog))
- `@gitbeaker/cli`
  - Fix typo in unit/index.ts [#2438](https://github.com/jdalrymple/gitbeaker/pull/2438) ([@eltociear](https://github.com/eltociear))

#### 👷🏼‍♀️ Technical Debt

- `@gitbeaker/node`
  - fix: unpin got dependency [#2572](https://github.com/jdalrymple/gitbeaker/pull/2572) ([@karlhaworth](https://github.com/karlhaworth))

#### Authors: 3

- Ikko Ashimine ([@eltociear](https://github.com/eltociear))
- Jeff Bacon ([@thesuavehog](https://github.com/thesuavehog))
- Karl Haworth ([@karlhaworth](https://github.com/karlhaworth))

---

# 35.6.0 (Wed Mar 23 2022)

:tada: This release contains work from a new contributor! :tada:

Thank you, youngje ([@siosio34](https://github.com/siosio34)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Support camelized keys on discussions [#2433](https://github.com/jdalrymple/gitbeaker/pull/2433) ([@jdalrymple](https://github.com/jdalrymple))
  - Typo in MergeRequest type [#2431](https://github.com/jdalrymple/gitbeaker/pull/2431) ([@siosio34](https://github.com/siosio34))
  - Update del requests to accept body parameters [#2424](https://github.com/jdalrymple/gitbeaker/pull/2424) ([@jdalrymple](https://github.com/jdalrymple))
  - Handle position arguments correctly [#2423](https://github.com/jdalrymple/gitbeaker/pull/2423) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- youngje ([@siosio34](https://github.com/siosio34))

---

# 35.5.0 (Wed Mar 16 2022)

:tada: This release contains work from a new contributor! :tada:

Thank you, Bilal Aslam ([@BilalAslam1](https://github.com/BilalAslam1)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Remove double encoding [#2401](https://github.com/jdalrymple/gitbeaker/pull/2401) ([@jdalrymple](https://github.com/jdalrymple))
  - Updating return type for repository files raw method [#2383](https://github.com/jdalrymple/gitbeaker/pull/2383) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `master`

- `@gitbeaker/core`
  - Updating tests to reflect recent bug fix ([@jdalrymple](https://github.com/jdalrymple))

#### 📝 Documentation

- `@gitbeaker/core`
  - Add reviewerId as a static type option for editing mergerequest approvals [#2368](https://github.com/jdalrymple/gitbeaker/pull/2368) (bilalaslam@carfax.com)

#### Authors: 2

- Bilal Aslam ([@BilalAslam1](https://github.com/BilalAslam1))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 35.4.0 (Mon Feb 07 2022)

:tada: This release contains work from a new contributor! :tada:

Thank you, Ikko Ashimine ([@eltociear](https://github.com/eltociear)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fix the parsing of pagination link querystrings [#2366](https://github.com/jdalrymple/gitbeaker/pull/2366) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/cli`
  - Fix typo in src/cli.ts [#2355](https://github.com/jdalrymple/gitbeaker/pull/2355) ([@eltociear](https://github.com/eltociear))

#### Authors: 2

- Ikko Ashimine ([@eltociear](https://github.com/eltociear))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 35.3.0 (Sat Feb 05 2022)

#### 🐛 Bug Fix

- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Set the minimum supported node version [#2353](https://github.com/jdalrymple/gitbeaker/pull/2353) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump @rollup/plugin-node-resolve from 13.1.1 to 13.1.3 [#2317](https://github.com/jdalrymple/gitbeaker/pull/2317) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump jest from 27.4.5 to 27.4.7 [#2316](https://github.com/jdalrymple/gitbeaker/pull/2316) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-replace from 3.0.0 to 3.0.1 [#2303](https://github.com/jdalrymple/gitbeaker/pull/2303) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump eslint-plugin-import from 2.25.3 to 2.25.4 [#2309](https://github.com/jdalrymple/gitbeaker/pull/2309) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump eslint-plugin-jest from 25.3.0 to 26.0.0 [#2338](https://github.com/jdalrymple/gitbeaker/pull/2338) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump lint-staged from 12.1.2 to 12.3.3 [#2350](https://github.com/jdalrymple/gitbeaker/pull/2350) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump @types/jest from 27.0.3 to 27.4.0 [#2306](https://github.com/jdalrymple/gitbeaker/pull/2306) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump node-fetch from 3.1.0 to 3.2.0 [#2337](https://github.com/jdalrymple/gitbeaker/pull/2337) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump @types/node from 17.0.0 to 17.0.15 [#2354](https://github.com/jdalrymple/gitbeaker/pull/2354) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump rollup from 2.61.1 to 2.67.0 [#2352](https://github.com/jdalrymple/gitbeaker/pull/2352) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump query-string from 7.0.1 to 7.1.0 [#2318](https://github.com/jdalrymple/gitbeaker/pull/2318) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 35.2.0 (Sat Feb 05 2022)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Carsten Moberg Hammer ([@moberghammer](https://github.com/moberghammer))

:heart: null[@pataar](https://github.com/pataar)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Return type of showPipelineBridge [#2311](https://github.com/jdalrymple/gitbeaker/pull/2311) ([@moberghammer](https://github.com/moberghammer) [@jdalrymple](https://github.com/jdalrymple))
  - Fix typing for the particpants and relatedMergeRequests functions within the Issues API [#2262](https://github.com/jdalrymple/gitbeaker/pull/2262) ([@pataar](https://github.com/pataar))

#### ⚠️ Pushed to `master`

- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/playwright-1.17.1' ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/typescript-4.5.4' ([@jdalrymple](https://github.com/jdalrymple))
- Bump typescript from 4.5.2 to 4.5.4 ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.17.0 to 1.17.1 ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/rollup-2.61.1' ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/qs-6.10.2' ([@jdalrymple](https://github.com/jdalrymple))
- Bump rollup from 2.60.2 to 2.61.1 ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump qs from 6.10.1 to 6.10.2 ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/node`
  - Downgrade got until ESM ready ([@jdalrymple](https://github.com/jdalrymple))
  - Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/got-12.0.0' ([@jdalrymple](https://github.com/jdalrymple))
  - Bump got from 11.8.3 to 12.0.0 ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/packages/node/types/node-17.0.0' ([@jdalrymple](https://github.com/jdalrymple))
  - Bump @types/node from 16.11.14 to 17.0.0 in /packages/node ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/requester-utils`
  - Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/packages/requester-utils/types/node-17.0.0' ([@jdalrymple](https://github.com/jdalrymple))
  - Bump @types/node from 16.11.14 to 17.0.0 in /packages/requester-utils ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### 🔩 Dependency Updates

- Bump follow-redirects from 1.14.5 to 1.14.7 [#2323](https://github.com/jdalrymple/gitbeaker/pull/2323) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/packages/node/got-12.0.0' [#2275](https://github.com/jdalrymple/gitbeaker/pull/2275) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/rollup/plugin-node-resolve-13.1.1' [#2285](https://github.com/jdalrymple/gitbeaker/pull/2285) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/jest-27.4.5' [#2287](https://github.com/jdalrymple/gitbeaker/pull/2287) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/auto-it/first-time-contributor-10.32.5' [#2286](https://github.com/jdalrymple/gitbeaker/pull/2286) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/auto-10.32.5' [#2288](https://github.com/jdalrymple/gitbeaker/pull/2288) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/prettier-2.5.1' [#2261](https://github.com/jdalrymple/gitbeaker/pull/2261) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/auto-it/released-10.32.5' [#2273](https://github.com/jdalrymple/gitbeaker/pull/2273) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/auto-it/all-contributors-10.32.5' [#2271](https://github.com/jdalrymple/gitbeaker/pull/2271) ([@jdalrymple](https://github.com/jdalrymple))
- Bump ts-jest from 27.0.7 to 27.1.2 [#2284](https://github.com/jdalrymple/gitbeaker/pull/2284) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jest from 27.4.2 to 27.4.3 [#2257](https://github.com/jdalrymple/gitbeaker/pull/2257) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/core`
  - Bump @types/node from 16.11.14 to 17.0.0 in /packages/core [#2282](https://github.com/jdalrymple/gitbeaker/pull/2282) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/browser`
  - Bump @types/node from 16.11.14 to 17.0.0 in /packages/browser [#2283](https://github.com/jdalrymple/gitbeaker/pull/2283) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### 📝 Documentation

- Add sponser information to the README [#2290](https://github.com/jdalrymple/gitbeaker/pull/2290) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@pataar](https://github.com/pataar)
- Carsten Moberg Hammer ([@moberghammer](https://github.com/moberghammer))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 35.1.0 (Wed Dec 01 2021)

#### 🐛 Bug Fix

- Merge branch 'bug/circleci-workspace' [#2256](https://github.com/jdalrymple/gitbeaker/pull/2256) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 35.0.0 (Wed Dec 01 2021)

#### 💥 Breaking Change

- `@gitbeaker/core`
  - Merge branch '2246-tags-signature' [#2255](https://github.com/jdalrymple/gitbeaker/pull/2255) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump playwright from 1.16.3 to 1.17.0 [#2249](https://github.com/jdalrymple/gitbeaker/pull/2249) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.60.1 to 2.60.2 [#2250](https://github.com/jdalrymple/gitbeaker/pull/2250) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump jest from 27.4.0 to 27.4.2 [#2251](https://github.com/jdalrymple/gitbeaker/pull/2251) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 34.7.0 (Tue Nov 30 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Martin Howarth ([@MartinHowarth](https://github.com/MartinHowarth)), for all your work!

#### 💥 Feature

- `@gitbeaker/core`, `@gitbeaker/node`
  - Add support for CI lint with namespace context [#2222](https://github.com/jdalrymple/gitbeaker/pull/2222) ([@MartinHowarth](https://github.com/MartinHowarth) [@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- `@gitbeaker/core`, `@gitbeaker/node`
  - Fix lintWithNamespace integration test [#2247](https://github.com/jdalrymple/gitbeaker/pull/2247) ([@MartinHowarth](https://github.com/MartinHowarth))

#### ⚠️ Pushed to `master`

- `@gitbeaker/core`
  - Minor linting fix ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/cli`
  - Downgrading Chalk ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/auto-it/all-contributors-10.32.3' [#2240](https://github.com/jdalrymple/gitbeaker/pull/2240) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/eslint-config-airbnb-base-15.0.0' [#2202](https://github.com/jdalrymple/gitbeaker/pull/2202) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/eslint-plugin-jest-25.3.0' [#2238](https://github.com/jdalrymple/gitbeaker/pull/2238) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/jest-27.4.0' [#2244](https://github.com/jdalrymple/gitbeaker/pull/2244) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/jest-extended-1.2.0' [#2245](https://github.com/jdalrymple/gitbeaker/pull/2245) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/lint-staged-12.1.2' [#2226](https://github.com/jdalrymple/gitbeaker/pull/2226) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/openpgp-5.0.1' [#2217](https://github.com/jdalrymple/gitbeaker/pull/2217) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/rollup-2.60.1' [#2239](https://github.com/jdalrymple/gitbeaker/pull/2239) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/types/node-16.11.11' [#2243](https://github.com/jdalrymple/gitbeaker/pull/2243) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/types/jest-27.0.3' [#2220](https://github.com/jdalrymple/gitbeaker/pull/2220) ([@jdalrymple](https://github.com/jdalrymple))
- Bump prettier from 2.4.1 to 2.5.0 [#2241](https://github.com/jdalrymple/gitbeaker/pull/2241) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/first-time-contributor from 10.32.2 to 10.32.3 [#2235](https://github.com/jdalrymple/gitbeaker/pull/2235) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.32.2 to 10.32.3 [#2236](https://github.com/jdalrymple/gitbeaker/pull/2236) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump got from 11.8.2 to 11.8.3 [#2221](https://github.com/jdalrymple/gitbeaker/pull/2221) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump typescript from 4.4.4 to 4.5.2 [#2216](https://github.com/jdalrymple/gitbeaker/pull/2216) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint-plugin-import from 2.25.2 to 2.25.3 [#2204](https://github.com/jdalrymple/gitbeaker/pull/2204) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.59.0 to 2.60.0 [#2207](https://github.com/jdalrymple/gitbeaker/pull/2207) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/cli`
  - Bump chalk from 4.1.2 to 5.0.0 in /packages/cli [#2242](https://github.com/jdalrymple/gitbeaker/pull/2242) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Bump rollup-plugin-typescript2 from 0.30.0 to 0.31.1 [#2229](https://github.com/jdalrymple/gitbeaker/pull/2229) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Martin Howarth ([@MartinHowarth](https://github.com/MartinHowarth))

---

# 34.6.0 (Mon Nov 15 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Laffargue Michael ([@mlaffargue](https://github.com/mlaffargue)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Renamed parameter [#2205](https://github.com/jdalrymple/gitbeaker/pull/2205) ([@mlaffargue](https://github.com/mlaffargue))

#### 👷🏼‍♀️ Technical Debt

- `@gitbeaker/core`
  - Swap mime-types with mime for a smaller pkg size [#2195](https://github.com/jdalrymple/gitbeaker/pull/2195) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- `@gitbeaker/browser`
  - Bump ky from 0.28.6 to 0.28.7 [#2199](https://github.com/jdalrymple/gitbeaker/pull/2199) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Laffargue Michael ([@mlaffargue](https://github.com/mlaffargue))

---

# 34.5.0 (Fri Nov 05 2021)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Martin Howarth ([@MartinHowarth](https://github.com/MartinHowarth))

:heart: Petr Plenkov ([@ThePlenkov](https://github.com/ThePlenkov))

:heart: nilennoct ([@nilennoct](https://github.com/nilennoct))

#### 💥 Feature

- `@gitbeaker/core`, `@gitbeaker/node`
  - Add ability to request merged_yaml from the Gitlab Lint API [#2185](https://github.com/jdalrymple/gitbeaker/pull/2185) ([@MartinHowarth](https://github.com/MartinHowarth) [@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Commit merge requests should be an array instead of a record [#2192](https://github.com/jdalrymple/gitbeaker/pull/2192) ([@ThePlenkov](https://github.com/ThePlenkov))

#### 👷🏼‍♀️ Technical Debt

- `@gitbeaker/core`
  - Refactor endpoint generation, using tagged template to encode parameters [#2173](https://github.com/jdalrymple/gitbeaker/pull/2173) ([@nilennoct](https://github.com/nilennoct) [@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump eslint-plugin-jest from 25.2.2 to 25.2.3 [#2193](https://github.com/jdalrymple/gitbeaker/pull/2193) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.16.2 to 1.16.3 [#2190](https://github.com/jdalrymple/gitbeaker/pull/2190) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump husky from 7.0.2 to 7.0.4 [#2167](https://github.com/jdalrymple/gitbeaker/pull/2167) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ts-node from 10.3.0 to 10.4.0 [#2176](https://github.com/jdalrymple/gitbeaker/pull/2176) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.11.1 to 16.11.6 [#2179](https://github.com/jdalrymple/gitbeaker/pull/2179) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump lint-staged from 11.2.3 to 11.2.6 [#2180](https://github.com/jdalrymple/gitbeaker/pull/2180) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.32.1 to 10.32.2 [#2188](https://github.com/jdalrymple/gitbeaker/pull/2188) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.58.0 to 2.59.0 [#2189](https://github.com/jdalrymple/gitbeaker/pull/2189) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/first-time-contributor from 10.32.1 to 10.32.2 [#2187](https://github.com/jdalrymple/gitbeaker/pull/2187) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.15.2 to 1.16.2 [#2184](https://github.com/jdalrymple/gitbeaker/pull/2184) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/all-contributors from 10.32.1 to 10.32.2 [#2182](https://github.com/jdalrymple/gitbeaker/pull/2182) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-node-resolve from 13.0.5 to 13.0.6 [#2166](https://github.com/jdalrymple/gitbeaker/pull/2166) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-commonjs from 21.0.0 to 21.0.1 [#2165](https://github.com/jdalrymple/gitbeaker/pull/2165) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jest from 27.3.0 to 27.3.1 [#2164](https://github.com/jdalrymple/gitbeaker/pull/2164) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jest-extended from 1.0.0 to 1.1.0 [#2163](https://github.com/jdalrymple/gitbeaker/pull/2163) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Martin Howarth ([@MartinHowarth](https://github.com/MartinHowarth))
- nilennoct ([@nilennoct](https://github.com/nilennoct))
- Petr Plenkov ([@ThePlenkov](https://github.com/ThePlenkov))

---

# 34.4.1 (Mon Oct 18 2021)

#### 👷🏼‍♀️ Technical Debt

- Use yarnlock as checksum for build cache [#2162](https://github.com/jdalrymple/gitbeaker/pull/2162) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump jest from 27.2.5 to 27.3.0 [#2158](https://github.com/jdalrymple/gitbeaker/pull/2158) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump jest-extended from 0.11.5 to 1.0.0 [#2159](https://github.com/jdalrymple/gitbeaker/pull/2159) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 34.3.0 (Sun Oct 17 2021)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: null[@GMZwinge](https://github.com/GMZwinge)

:heart: nilennoct ([@nilennoct](https://github.com/nilennoct))

:heart: Ian Jenkins ([@jenkoian](https://github.com/jenkoian))

#### 💥 Feature

- `@gitbeaker/core`
  - Add support for username lookup. [#2147](https://github.com/jdalrymple/gitbeaker/pull/2147) ([@jenkoian](https://github.com/jenkoian) [@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fixing protect request format [#2155](https://github.com/jdalrymple/gitbeaker/pull/2155) ([@jdalrymple](https://github.com/jdalrymple))
  - Correct approvalRules returned type [#2133](https://github.com/jdalrymple/gitbeaker/pull/2133) (gmzwingelstein@rockwellautomation.com [@jdalrymple](https://github.com/jdalrymple) [@GMZwinge](https://github.com/GMZwinge))
- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Fix the typing for the supported links functions [#2154](https://github.com/jdalrymple/gitbeaker/pull/2154) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`
  - Exclude agent from browser release [#2153](https://github.com/jdalrymple/gitbeaker/pull/2153) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/requester-utils`
  - Fix a query formatting issue [#2142](https://github.com/jdalrymple/gitbeaker/pull/2142) ([@nilennoct](https://github.com/nilennoct) [@jdalrymple](https://github.com/jdalrymple))
- Add release and canary ci steps [#2151](https://github.com/jdalrymple/gitbeaker/pull/2151) ([@jdalrymple](https://github.com/jdalrymple))
- Dont automatically run integration tests for now [#2150](https://github.com/jdalrymple/gitbeaker/pull/2150) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Circleci editor/circleci project setup [#2124](https://github.com/jdalrymple/gitbeaker/pull/2124) ([@jdalrymple](https://github.com/jdalrymple))

#### 👷🏼‍♀️ Technical Debt

- Include ssh client in release CI stages [#2157](https://github.com/jdalrymple/gitbeaker/pull/2157) ([@jdalrymple](https://github.com/jdalrymple))
- Install git in deploy stages [#2156](https://github.com/jdalrymple/gitbeaker/pull/2156) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `master`

- Create codeql-analysis.yml ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump @rollup/plugin-commonjs from 20.0.0 to 21.0.0 [#2120](https://github.com/jdalrymple/gitbeaker/pull/2120) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump @types/node from 16.10.2 to 16.11.1 [#2152](https://github.com/jdalrymple/gitbeaker/pull/2152) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump playwright from 1.15.1 to 1.15.2 [#2131](https://github.com/jdalrymple/gitbeaker/pull/2131) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump lint-staged from 11.1.2 to 11.2.3 [#2135](https://github.com/jdalrymple/gitbeaker/pull/2135) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump eslint-plugin-jest from 24.5.0 to 25.2.1 [#2149](https://github.com/jdalrymple/gitbeaker/pull/2149) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump playwright from 1.15.0 to 1.15.1 [#2112](https://github.com/jdalrymple/gitbeaker/pull/2112) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/all-contributors from 10.32.0 to 10.32.1 [#2113](https://github.com/jdalrymple/gitbeaker/pull/2113) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/first-time-contributor from 10.32.0 to 10.32.1 [#2115](https://github.com/jdalrymple/gitbeaker/pull/2115) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.32.0 to 10.32.1 [#2111](https://github.com/jdalrymple/gitbeaker/pull/2111) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint-plugin-jest from 24.4.3 to 24.5.0 [#2110](https://github.com/jdalrymple/gitbeaker/pull/2110) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jest from 27.2.3 to 27.2.4 [#2109](https://github.com/jdalrymple/gitbeaker/pull/2109) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.10.1 to 16.10.2 [#2108](https://github.com/jdalrymple/gitbeaker/pull/2108) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint-plugin-jest from 24.4.2 to 24.4.3 [#2106](https://github.com/jdalrymple/gitbeaker/pull/2106) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jest from 27.2.2 to 27.2.3 [#2107](https://github.com/jdalrymple/gitbeaker/pull/2107) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.31.2 to 4.32.0 [#2104](https://github.com/jdalrymple/gitbeaker/pull/2104) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.31.2 to 4.32.0 [#2103](https://github.com/jdalrymple/gitbeaker/pull/2103) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.9.6 to 16.10.1 [#2102](https://github.com/jdalrymple/gitbeaker/pull/2102) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jest from 27.2.1 to 27.2.2 [#2101](https://github.com/jdalrymple/gitbeaker/pull/2101) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.56.3 to 2.57.0 [#2098](https://github.com/jdalrymple/gitbeaker/pull/2098) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.9.4 to 16.9.6 [#2096](https://github.com/jdalrymple/gitbeaker/pull/2096) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.14.1 to 1.15.0 [#2097](https://github.com/jdalrymple/gitbeaker/pull/2097) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-node-resolve from 13.0.4 to 13.0.5 [#2095](https://github.com/jdalrymple/gitbeaker/pull/2095) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.31.1 to 4.31.2 [#2092](https://github.com/jdalrymple/gitbeaker/pull/2092) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.31.1 to 4.31.2 [#2091](https://github.com/jdalrymple/gitbeaker/pull/2091) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/jest from 27.0.1 to 27.0.2 [#2093](https://github.com/jdalrymple/gitbeaker/pull/2093) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tmpl from 1.0.4 to 1.0.5 [#2094](https://github.com/jdalrymple/gitbeaker/pull/2094) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jest from 27.2.0 to 27.2.1 [#2090](https://github.com/jdalrymple/gitbeaker/pull/2090) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.9.2 to 16.9.4 [#2089](https://github.com/jdalrymple/gitbeaker/pull/2089) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ora from 6.0.0 to 6.0.1 [#2088](https://github.com/jdalrymple/gitbeaker/pull/2088) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-replace from 2.4.2 to 3.0.0 in /packages/browser [#1949](https://github.com/jdalrymple/gitbeaker/pull/1949) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump eslint-plugin-jest from 24.4.0 to 24.4.2 [#2087](https://github.com/jdalrymple/gitbeaker/pull/2087) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ora from 5.4.1 to 6.0.0 [#2030](https://github.com/jdalrymple/gitbeaker/pull/2030) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`
  - Bump @rollup/plugin-commonjs from 20.0.0 to 21.0.0 in /packages/browser [#2123](https://github.com/jdalrymple/gitbeaker/pull/2123) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
  - Bump jest-extended from 0.11.5 to 1.0.0 in /packages/browser [#2140](https://github.com/jdalrymple/gitbeaker/pull/2140) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
  - Bump ky from 0.28.5 to 0.28.6 in /packages/browser [#2146](https://github.com/jdalrymple/gitbeaker/pull/2146) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/requester-utils`
  - Bump jest-extended from 0.11.5 to 1.0.0 in /packages/requester-utils [#2138](https://github.com/jdalrymple/gitbeaker/pull/2138) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/node`
  - Bump jest-extended from 0.11.5 to 1.0.0 in /packages/node [#2139](https://github.com/jdalrymple/gitbeaker/pull/2139) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`
  - Bump jest-extended from 0.11.5 to 1.0.0 in /packages/core [#2141](https://github.com/jdalrymple/gitbeaker/pull/2141) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
  - Bump @rollup/plugin-replace from 2.4.2 to 3.0.0 in /packages/core [#1948](https://github.com/jdalrymple/gitbeaker/pull/1948) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 6

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@GMZwinge](https://github.com/GMZwinge)
- Georges M. Zwingelstein (gmzwingelstein@rockwellautomation.com)
- Ian Jenkins ([@jenkoian](https://github.com/jenkoian))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- nilennoct ([@nilennoct](https://github.com/nilennoct))

---

# 34.2.0 (Sat Sep 18 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Roy Jacobs ([@sagacity](https://github.com/sagacity)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Users.search should return an array [#2070](https://github.com/jdalrymple/gitbeaker/pull/2070) ([@sagacity](https://github.com/sagacity))

#### 🔩 Dependency Updates

- Bump @types/node from 16.9.1 to 16.9.2 [#2086](https://github.com/jdalrymple/gitbeaker/pull/2086) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump prettier from 2.4.0 to 2.4.1 [#2085](https://github.com/jdalrymple/gitbeaker/pull/2085) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.31.0 to 10.32.0 [#2082](https://github.com/jdalrymple/gitbeaker/pull/2082) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/first-time-contributor from 10.31.0 to 10.32.0 [#2079](https://github.com/jdalrymple/gitbeaker/pull/2079) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/all-contributors from 10.31.0 to 10.32.0 [#2081](https://github.com/jdalrymple/gitbeaker/pull/2081) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/released from 10.31.0 to 10.32.0 [#2078](https://github.com/jdalrymple/gitbeaker/pull/2078) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.31.0 to 4.31.1 [#2075](https://github.com/jdalrymple/gitbeaker/pull/2075) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.31.0 to 4.31.1 [#2076](https://github.com/jdalrymple/gitbeaker/pull/2076) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint-import-resolver-typescript from 2.4.0 to 2.5.0 [#2074](https://github.com/jdalrymple/gitbeaker/pull/2074) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jest from 27.1.1 to 27.2.0 [#2073](https://github.com/jdalrymple/gitbeaker/pull/2073) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump strip-ansi from 7.0.0 to 7.0.1 [#2071](https://github.com/jdalrymple/gitbeaker/pull/2071) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.9.0 to 16.9.1 [#2068](https://github.com/jdalrymple/gitbeaker/pull/2068) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump prettier from 2.3.2 to 2.4.0 [#2067](https://github.com/jdalrymple/gitbeaker/pull/2067) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.7.13 to 16.9.0 [#2064](https://github.com/jdalrymple/gitbeaker/pull/2064) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump axios from 0.21.1 to 0.21.4 [#2065](https://github.com/jdalrymple/gitbeaker/pull/2065) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jest from 27.1.0 to 27.1.1 [#2063](https://github.com/jdalrymple/gitbeaker/pull/2063) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.7.12 to 16.7.13 [#2061](https://github.com/jdalrymple/gitbeaker/pull/2061) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.7.10 to 16.7.12 [#2060](https://github.com/jdalrymple/gitbeaker/pull/2060) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.30.0 to 4.31.0 [#2059](https://github.com/jdalrymple/gitbeaker/pull/2059) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.30.0 to 4.31.0 [#2058](https://github.com/jdalrymple/gitbeaker/pull/2058) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/jest from 26.0.24 to 27.0.1 [#2010](https://github.com/jdalrymple/gitbeaker/pull/2010) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/browser`, `@gitbeaker/core`
  - Bump @rollup/plugin-replace from 2.4.2 to 3.0.0 [#1947](https://github.com/jdalrymple/gitbeaker/pull/1947) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/cli`
  - Bump ora from 5.4.1 to 6.0.0 in /packages/cli [#2031](https://github.com/jdalrymple/gitbeaker/pull/2031) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/node`
  - Bump openpgp from 4.10.10 to 5.0.0 [#2053](https://github.com/jdalrymple/gitbeaker/pull/2053) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Roy Jacobs ([@sagacity](https://github.com/sagacity))

---

# 34.1.0 (Sat Sep 04 2021)

#### 🐛 Bug Fix

- `@gitbeaker/core`, `@gitbeaker/requester-utils`
  - Fixing stringify of hash arguments [#2057](https://github.com/jdalrymple/gitbeaker/pull/2057) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- `@gitbeaker/browser`
  - Bump node-fetch from 2.6.1 to 3.0.0 [#2049](https://github.com/jdalrymple/gitbeaker/pull/2049) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/core`
  - Bump eslint-plugin-prettier from 3.4.1 to 4.0.0 [#2043](https://github.com/jdalrymple/gitbeaker/pull/2043) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 34.0.1 (Sat Sep 04 2021)



---

# 34.0.0 (Sat Sep 04 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Paul Lemke ([@lemkepf](https://github.com/lemkepf)), for all your work!

#### 💥 Breaking Change

- `@gitbeaker/core`
  - Update Jobs showPipelineJobs to have correct array return type [#2056](https://github.com/jdalrymple/gitbeaker/pull/2056) (plemke@acculynx.com)

#### 🐛 Bug Fix

- `@gitbeaker/browser`
  - Using arrayBuffer for unknown content types [#2040](https://github.com/jdalrymple/gitbeaker/pull/2040) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Paul Lemke ([@lemkepf](https://github.com/lemkepf))

---

# 33.0.1 (Thu Sep 02 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Roy Jacobs ([@sagacity](https://github.com/sagacity)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/browser`
  - Add a CJS build to the browser package [#2047](https://github.com/jdalrymple/gitbeaker/pull/2047) ([@sagacity](https://github.com/sagacity))

#### 🔩 Dependency Updates

- Bump @types/node from 16.7.8 to 16.7.10 [#2050](https://github.com/jdalrymple/gitbeaker/pull/2050) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tar from 4.4.15 to 4.4.19 [#2048](https://github.com/jdalrymple/gitbeaker/pull/2048) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.29.3 to 4.30.0 [#2045](https://github.com/jdalrymple/gitbeaker/pull/2045) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.29.3 to 4.30.0 [#2046](https://github.com/jdalrymple/gitbeaker/pull/2046) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.7.6 to 16.7.8 [#2044](https://github.com/jdalrymple/gitbeaker/pull/2044) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.7.2 to 16.7.6 [#2042](https://github.com/jdalrymple/gitbeaker/pull/2042) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jest from 27.0.6 to 27.1.0 [#2041](https://github.com/jdalrymple/gitbeaker/pull/2041) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Roy Jacobs ([@sagacity](https://github.com/sagacity))

---

# 33.0.0 (Fri Aug 27 2021)

#### 💥 Breaking Change

- `@gitbeaker/core`
  - Update MergeRequestApprovals API to match latest Gitlab API Release [#2035](https://github.com/jdalrymple/gitbeaker/pull/2035) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 32.3.0 (Fri Aug 27 2021)

#### 🐛 Bug Fix

- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`
  - Adding a core integration test, and fixing the resource imports [#2039](https://github.com/jdalrymple/gitbeaker/pull/2039) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump @types/node from 16.7.1 to 16.7.2 [#2036](https://github.com/jdalrymple/gitbeaker/pull/2036) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint-plugin-import from 2.24.1 to 2.24.2 [#2033](https://github.com/jdalrymple/gitbeaker/pull/2033) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.14.0 to 1.14.1 [#2034](https://github.com/jdalrymple/gitbeaker/pull/2034) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump husky from 7.0.1 to 7.0.2 [#2032](https://github.com/jdalrymple/gitbeaker/pull/2032) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.29.2 to 4.29.3 [#2028](https://github.com/jdalrymple/gitbeaker/pull/2028) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.56.2 to 2.56.3 [#2029](https://github.com/jdalrymple/gitbeaker/pull/2029) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.29.2 to 4.29.3 [#2027](https://github.com/jdalrymple/gitbeaker/pull/2027) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 32.2.0 (Mon Aug 23 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Feng Yu ([@F3n67u](https://github.com/F3n67u)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - fix(core): change Commits.diff response type to CommitDiffSchema[] [#2025](https://github.com/jdalrymple/gitbeaker/pull/2025) ([@F3n67u](https://github.com/F3n67u))

#### 🔩 Dependency Updates

- Bump @types/node from 16.6.2 to 16.7.1 [#2023](https://github.com/jdalrymple/gitbeaker/pull/2023) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint-plugin-prettier from 3.4.0 to 3.4.1 [#2022](https://github.com/jdalrymple/gitbeaker/pull/2022) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint-plugin-import from 2.24.0 to 2.24.1 [#2021](https://github.com/jdalrymple/gitbeaker/pull/2021) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.6.1 to 16.6.2 [#2018](https://github.com/jdalrymple/gitbeaker/pull/2018) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ts-node from 10.2.0 to 10.2.1 [#2017](https://github.com/jdalrymple/gitbeaker/pull/2017) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ts-jest from 27.0.4 to 27.0.5 [#2016](https://github.com/jdalrymple/gitbeaker/pull/2016) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.29.1 to 4.29.2 [#2013](https://github.com/jdalrymple/gitbeaker/pull/2013) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.29.1 to 4.29.2 [#2012](https://github.com/jdalrymple/gitbeaker/pull/2012) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.13.1 to 1.14.0 [#2011](https://github.com/jdalrymple/gitbeaker/pull/2011) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.30.0 to 10.31.0 [#2006](https://github.com/jdalrymple/gitbeaker/pull/2006) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/first-time-contributor from 10.30.0 to 10.31.0 [#2007](https://github.com/jdalrymple/gitbeaker/pull/2007) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.6.0 to 16.6.1 [#2009](https://github.com/jdalrymple/gitbeaker/pull/2009) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/all-contributors from 10.30.0 to 10.31.0 [#2005](https://github.com/jdalrymple/gitbeaker/pull/2005) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/browser`
  - Bump @rollup/plugin-commonjs from 19.0.2 to 20.0.0 [#1983](https://github.com/jdalrymple/gitbeaker/pull/1983) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Feng Yu ([@F3n67u](https://github.com/F3n67u))

---

# 32.1.2 (Thu Aug 12 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Mahmoud Saada ([@saada](https://github.com/saada)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fix showArchive return type [#2001](https://github.com/jdalrymple/gitbeaker/pull/2001) ([@saada](https://github.com/saada) [@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump tslib from 2.3.0 to 2.3.1 [#2002](https://github.com/jdalrymple/gitbeaker/pull/2002) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.4.13 to 16.6.0 [#2003](https://github.com/jdalrymple/gitbeaker/pull/2003) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.56.1 to 2.56.2 [#2000](https://github.com/jdalrymple/gitbeaker/pull/2000) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.29.0 to 4.29.1 [#1997](https://github.com/jdalrymple/gitbeaker/pull/1997) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.29.0 to 4.29.1 [#1998](https://github.com/jdalrymple/gitbeaker/pull/1998) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint-plugin-import from 2.23.4 to 2.24.0 [#1994](https://github.com/jdalrymple/gitbeaker/pull/1994) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump lint-staged from 11.1.1 to 11.1.2 [#1996](https://github.com/jdalrymple/gitbeaker/pull/1996) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ts-node from 10.1.0 to 10.2.0 [#1995](https://github.com/jdalrymple/gitbeaker/pull/1995) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Mahmoud Saada ([@saada](https://github.com/saada))

---

# 32.1.1 (Mon Aug 09 2021)

#### 👷🏼‍♀️ Technical Debt

- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/node`
  - Improved mime handling [#1979](https://github.com/jdalrymple/gitbeaker/pull/1979) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump rollup from 2.56.0 to 2.56.1 [#1993](https://github.com/jdalrymple/gitbeaker/pull/1993) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.55.1 to 2.56.0 [#1992](https://github.com/jdalrymple/gitbeaker/pull/1992) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.4.12 to 16.4.13 [#1991](https://github.com/jdalrymple/gitbeaker/pull/1991) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.4.10 to 16.4.12 [#1989](https://github.com/jdalrymple/gitbeaker/pull/1989) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tar from 4.4.13 to 4.4.15 [#1988](https://github.com/jdalrymple/gitbeaker/pull/1988) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.28.5 to 4.29.0 [#1987](https://github.com/jdalrymple/gitbeaker/pull/1987) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.28.5 to 4.29.0 [#1986](https://github.com/jdalrymple/gitbeaker/pull/1986) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 32.1.0 (Tue Aug 03 2021)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Revert pagination changes. Information is available, just not through gitlab.com [#1985](https://github.com/jdalrymple/gitbeaker/pull/1985) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump chalk from 4.1.1 to 4.1.2 [#1981](https://github.com/jdalrymple/gitbeaker/pull/1981) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.4.7 to 16.4.10 [#1982](https://github.com/jdalrymple/gitbeaker/pull/1982) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint from 7.31.0 to 7.32.0 [#1980](https://github.com/jdalrymple/gitbeaker/pull/1980) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.55.0 to 2.55.1 [#1978](https://github.com/jdalrymple/gitbeaker/pull/1978) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.13.0 to 1.13.1 [#1977](https://github.com/jdalrymple/gitbeaker/pull/1977) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.4.6 to 16.4.7 [#1976](https://github.com/jdalrymple/gitbeaker/pull/1976) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.4.4 to 16.4.6 [#1975](https://github.com/jdalrymple/gitbeaker/pull/1975) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.54.0 to 2.55.0 [#1974](https://github.com/jdalrymple/gitbeaker/pull/1974) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.4.3 to 16.4.4 [#1973](https://github.com/jdalrymple/gitbeaker/pull/1973) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 32.0.0 (Tue Jul 27 2021)

#### 💥 Breaking Change

- `@gitbeaker/core`
  - Added Topics to ProjectSchema & Updated Commit.ts [#1932](https://github.com/jdalrymple/gitbeaker/pull/1932) ([@Aliyss](https://github.com/Aliyss) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Aliyss Snow ([@Aliyss](https://github.com/Aliyss))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 31.1.0 (Tue Jul 27 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Aliyss Snow ([@Aliyss](https://github.com/Aliyss)), for all your work!

#### 💥 Feature

- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/node`
  - Added RepositorySubmodules.ts [#1931](https://github.com/jdalrymple/gitbeaker/pull/1931) ([@Aliyss](https://github.com/Aliyss) [@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump @typescript-eslint/eslint-plugin from 4.28.4 to 4.28.5 [#1971](https://github.com/jdalrymple/gitbeaker/pull/1971) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-commonjs from 19.0.1 to 19.0.2 [#1972](https://github.com/jdalrymple/gitbeaker/pull/1972) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.28.4 to 4.28.5 [#1970](https://github.com/jdalrymple/gitbeaker/pull/1970) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-node-resolve from 13.0.2 to 13.0.4 [#1967](https://github.com/jdalrymple/gitbeaker/pull/1967) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump lint-staged from 11.1.0 to 11.1.1 [#1969](https://github.com/jdalrymple/gitbeaker/pull/1969) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.4.1 to 16.4.3 [#1968](https://github.com/jdalrymple/gitbeaker/pull/1968) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.53.3 to 2.54.0 [#1966](https://github.com/jdalrymple/gitbeaker/pull/1966) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/all-contributors from 10.29.3 to 10.30.0 [#1961](https://github.com/jdalrymple/gitbeaker/pull/1961) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump lint-staged from 11.0.1 to 11.1.0 [#1965](https://github.com/jdalrymple/gitbeaker/pull/1965) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.4.0 to 16.4.1 [#1960](https://github.com/jdalrymple/gitbeaker/pull/1960) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/first-time-contributor from 10.29.3 to 10.30.0 [#1962](https://github.com/jdalrymple/gitbeaker/pull/1962) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.29.3 to 10.30.0 [#1959](https://github.com/jdalrymple/gitbeaker/pull/1959) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.53.2 to 2.53.3 [#1958](https://github.com/jdalrymple/gitbeaker/pull/1958) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint-plugin-jest from 24.3.7 to 24.4.0 [#1956](https://github.com/jdalrymple/gitbeaker/pull/1956) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.12.3 to 1.13.0 [#1957](https://github.com/jdalrymple/gitbeaker/pull/1957) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ts-jest from 27.0.3 to 27.0.4 [#1955](https://github.com/jdalrymple/gitbeaker/pull/1955) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint-plugin-jest from 24.3.6 to 24.3.7 [#1954](https://github.com/jdalrymple/gitbeaker/pull/1954) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.3.3 to 16.4.0 [#1953](https://github.com/jdalrymple/gitbeaker/pull/1953) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.28.3 to 4.28.4 [#1951](https://github.com/jdalrymple/gitbeaker/pull/1951) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump codecov from 3.8.2 to 3.8.3 [#1952](https://github.com/jdalrymple/gitbeaker/pull/1952) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.28.3 to 4.28.4 [#1950](https://github.com/jdalrymple/gitbeaker/pull/1950) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint from 7.30.0 to 7.31.0 [#1946](https://github.com/jdalrymple/gitbeaker/pull/1946) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.3.2 to 16.3.3 [#1945](https://github.com/jdalrymple/gitbeaker/pull/1945) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-commonjs from 19.0.0 to 19.0.1 [#1943](https://github.com/jdalrymple/gitbeaker/pull/1943) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-node-resolve from 13.0.0 to 13.0.2 [#1944](https://github.com/jdalrymple/gitbeaker/pull/1944) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.53.1 to 2.53.2 [#1942](https://github.com/jdalrymple/gitbeaker/pull/1942) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.3.1 to 16.3.2 [#1941](https://github.com/jdalrymple/gitbeaker/pull/1941) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump lint-staged from 11.0.0 to 11.0.1 [#1940](https://github.com/jdalrymple/gitbeaker/pull/1940) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.28.2 to 4.28.3 [#1939](https://github.com/jdalrymple/gitbeaker/pull/1939) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.28.2 to 4.28.3 [#1938](https://github.com/jdalrymple/gitbeaker/pull/1938) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.3.0 to 16.3.1 [#1935](https://github.com/jdalrymple/gitbeaker/pull/1935) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ts-node from 10.0.0 to 10.1.0 [#1934](https://github.com/jdalrymple/gitbeaker/pull/1934) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.52.8 to 2.53.1 [#1933](https://github.com/jdalrymple/gitbeaker/pull/1933) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.0.1 to 16.3.0 [#1928](https://github.com/jdalrymple/gitbeaker/pull/1928) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.0.0 to 16.0.1 [#1927](https://github.com/jdalrymple/gitbeaker/pull/1927) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.52.7 to 2.52.8 [#1926](https://github.com/jdalrymple/gitbeaker/pull/1926) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/jest from 26.0.23 to 26.0.24 [#1925](https://github.com/jdalrymple/gitbeaker/pull/1925) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump husky from 7.0.0 to 7.0.1 [#1924](https://github.com/jdalrymple/gitbeaker/pull/1924) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.28.1 to 4.28.2 [#1923](https://github.com/jdalrymple/gitbeaker/pull/1923) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.28.1 to 4.28.2 [#1922](https://github.com/jdalrymple/gitbeaker/pull/1922) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump prettier from 2.3.0 to 2.3.2 [#1901](https://github.com/jdalrymple/gitbeaker/pull/1901) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Bump @types/node from 15.14.0 to 16.0.0 [#1914](https://github.com/jdalrymple/gitbeaker/pull/1914) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### 📝 Documentation

- Update README.md [#1913](https://github.com/jdalrymple/gitbeaker/pull/1913) ([@Aliyss](https://github.com/Aliyss) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Aliyss Snow ([@Aliyss](https://github.com/Aliyss))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 31.0.0 (Mon Jul 05 2021)

#### 💥 Breaking Change

- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Expose typing to consumer and remove export complexity [#1818](https://github.com/jdalrymple/gitbeaker/pull/1818) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump jest-playwright-preset from 1.6.1 to 1.7.0 [#1916](https://github.com/jdalrymple/gitbeaker/pull/1916) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint from 7.29.0 to 7.30.0 [#1915](https://github.com/jdalrymple/gitbeaker/pull/1915) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump husky from 6.0.0 to 7.0.0 [#1909](https://github.com/jdalrymple/gitbeaker/pull/1909) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 15.12.5 to 15.14.0 [#1911](https://github.com/jdalrymple/gitbeaker/pull/1911) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.52.4 to 2.52.7 [#1910](https://github.com/jdalrymple/gitbeaker/pull/1910) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump typescript from 4.3.4 to 4.3.5 [#1908](https://github.com/jdalrymple/gitbeaker/pull/1908) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.52.3 to 2.52.4 [#1907](https://github.com/jdalrymple/gitbeaker/pull/1907) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.28.0 to 4.28.1 [#1904](https://github.com/jdalrymple/gitbeaker/pull/1904) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.28.0 to 4.28.1 [#1905](https://github.com/jdalrymple/gitbeaker/pull/1905) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jest from 27.0.5 to 27.0.6 [#1903](https://github.com/jdalrymple/gitbeaker/pull/1903) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.52.2 to 2.52.3 [#1902](https://github.com/jdalrymple/gitbeaker/pull/1902) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.12.2 to 1.12.3 [#1900](https://github.com/jdalrymple/gitbeaker/pull/1900) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 15.12.4 to 15.12.5 [#1899](https://github.com/jdalrymple/gitbeaker/pull/1899) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 30.5.0 (Thu Jun 24 2021)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Updating paginationInfo property to match latest API [#1898](https://github.com/jdalrymple/gitbeaker/pull/1898) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump jest from 27.0.4 to 27.0.5 [#1896](https://github.com/jdalrymple/gitbeaker/pull/1896) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 30.4.0 (Tue Jun 22 2021)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Remove log artifact [#1895](https://github.com/jdalrymple/gitbeaker/pull/1895) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump @typescript-eslint/eslint-plugin from 4.27.0 to 4.28.0 [#1892](https://github.com/jdalrymple/gitbeaker/pull/1892) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump query-string from 7.0.0 to 7.0.1 [#1893](https://github.com/jdalrymple/gitbeaker/pull/1893) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.26.1 to 4.28.0 [#1891](https://github.com/jdalrymple/gitbeaker/pull/1891) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint from 7.28.0 to 7.29.0 [#1888](https://github.com/jdalrymple/gitbeaker/pull/1888) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump typescript from 4.3.2 to 4.3.4 [#1886](https://github.com/jdalrymple/gitbeaker/pull/1886) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 15.12.2 to 15.12.4 [#1887](https://github.com/jdalrymple/gitbeaker/pull/1887) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.51.2 to 2.52.2 [#1890](https://github.com/jdalrymple/gitbeaker/pull/1890) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 30.3.0 (Tue Jun 22 2021)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Improve pagination logic by parsing query parameters explicitly on response [#1889](https://github.com/jdalrymple/gitbeaker/pull/1889) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump @typescript-eslint/eslint-plugin from 4.26.1 to 4.27.0 [#1881](https://github.com/jdalrymple/gitbeaker/pull/1881) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tslib from 2.2.0 to 2.3.0 [#1878](https://github.com/jdalrymple/gitbeaker/pull/1878) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.12.1 to 1.12.2 [#1879](https://github.com/jdalrymple/gitbeaker/pull/1879) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.51.1 to 2.51.2 [#1877](https://github.com/jdalrymple/gitbeaker/pull/1877) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.12.0 to 1.12.1 [#1876](https://github.com/jdalrymple/gitbeaker/pull/1876) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jest-playwright-preset from 1.6.0 to 1.6.1 [#1875](https://github.com/jdalrymple/gitbeaker/pull/1875) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.51.0 to 2.51.1 [#1870](https://github.com/jdalrymple/gitbeaker/pull/1870) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/all-contributors from 10.29.2 to 10.29.3 [#1867](https://github.com/jdalrymple/gitbeaker/pull/1867) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/first-time-contributor from 10.29.2 to 10.29.3 [#1868](https://github.com/jdalrymple/gitbeaker/pull/1868) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ora from 5.4.0 to 5.4.1 [#1873](https://github.com/jdalrymple/gitbeaker/pull/1873) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.11.1 to 1.12.0 [#1872](https://github.com/jdalrymple/gitbeaker/pull/1872) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.29.2 to 10.29.3 [#1866](https://github.com/jdalrymple/gitbeaker/pull/1866) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 15.12.1 to 15.12.2 [#1864](https://github.com/jdalrymple/gitbeaker/pull/1864) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 30.2.0 (Mon Jun 07 2021)

#### 🐛 Bug Fix

- Artifacts caching [#1863](https://github.com/jdalrymple/gitbeaker/pull/1863) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 30.1.0 (Mon Jun 07 2021)

#### 🐛 Bug Fix

- Release stage happening before build was ready [#1862](https://github.com/jdalrymple/gitbeaker/pull/1862) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Try running with babel on JS [#1858](https://github.com/jdalrymple/gitbeaker/pull/1858) ([@jdalrymple](https://github.com/jdalrymple))
- Updating jest [#1858](https://github.com/jdalrymple/gitbeaker/pull/1858) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`
  - Tests back up and running [#1858](https://github.com/jdalrymple/gitbeaker/pull/1858) ([@jdalrymple](https://github.com/jdalrymple))
  - Bump ky from 0.25.0 to 0.28.5 in /packages/browser [#1858](https://github.com/jdalrymple/gitbeaker/pull/1858) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 30.0.0 (Mon Jun 07 2021)

#### 💥 Breaking Change

- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/node`
  - Package Registry Support [#1822](https://github.com/jdalrymple/gitbeaker/pull/1822) ([@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- `@gitbeaker/cli`
  - Fix CLI release compilation [#1838](https://github.com/jdalrymple/gitbeaker/pull/1838) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump @typescript-eslint/parser from 4.26.0 to 4.26.1 [#1859](https://github.com/jdalrymple/gitbeaker/pull/1859) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.26.0 to 4.26.1 [#1860](https://github.com/jdalrymple/gitbeaker/pull/1860) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 29.3.0 (Mon Jun 07 2021)

#### 🐛 Bug Fix

- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Revert build system changes [#1851](https://github.com/jdalrymple/gitbeaker/pull/1851) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump esbuild from 0.12.5 to 0.12.6 [#1855](https://github.com/jdalrymple/gitbeaker/pull/1855) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint from 7.27.0 to 7.28.0 [#1856](https://github.com/jdalrymple/gitbeaker/pull/1856) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 15.12.0 to 15.12.1 [#1857](https://github.com/jdalrymple/gitbeaker/pull/1857) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.50.6 to 2.51.0 [#1854](https://github.com/jdalrymple/gitbeaker/pull/1854) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 15.9.0 to 15.12.0 [#1850](https://github.com/jdalrymple/gitbeaker/pull/1850) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.50.5 to 2.50.6 [#1849](https://github.com/jdalrymple/gitbeaker/pull/1849) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup-plugin-esbuild from 4.2.3 to 4.3.1 [#1847](https://github.com/jdalrymple/gitbeaker/pull/1847) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 15.6.1 to 15.9.0 [#1846](https://github.com/jdalrymple/gitbeaker/pull/1846) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.25.0 to 4.26.0 [#1840](https://github.com/jdalrymple/gitbeaker/pull/1840) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.25.0 to 4.26.0 [#1839](https://github.com/jdalrymple/gitbeaker/pull/1839) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ts-node from 9.1.1 to 10.0.0 [#1833](https://github.com/jdalrymple/gitbeaker/pull/1833) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump jest-playwright-preset from 1.5.2 to 1.6.0 [#1837](https://github.com/jdalrymple/gitbeaker/pull/1837) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.50.4 to 2.50.5 [#1836](https://github.com/jdalrymple/gitbeaker/pull/1836) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ts-node from 9.1.1 to 10.0.0 in /packages/gitbeaker-core [#1824](https://github.com/jdalrymple/gitbeaker/pull/1824) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup-plugin-esbuild from 3.0.2 to 4.2.3 [#1835](https://github.com/jdalrymple/gitbeaker/pull/1835) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump esbuild from 0.11.6 to 0.12.5 [#1831](https://github.com/jdalrymple/gitbeaker/pull/1831) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump esbuild from 0.11.23 to 0.12.5 in /packages/gitbeaker-cli [#1827](https://github.com/jdalrymple/gitbeaker/pull/1827) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup-plugin-dts from 3.0.1 to 3.0.2 [#1834](https://github.com/jdalrymple/gitbeaker/pull/1834) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 29.2.4 (Sun May 30 2021)

#### 🐛 Bug Fix

- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Updating browser build and testing [#1780](https://github.com/jdalrymple/gitbeaker/pull/1780) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump @types/node from 15.3.1 to 15.6.1 [#1802](https://github.com/jdalrymple/gitbeaker/pull/1802) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump @auto-it/all-contributors from 10.28.0 to 10.29.2 [#1804](https://github.com/jdalrymple/gitbeaker/pull/1804) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump rollup from 2.50.2 to 2.50.3 [#1821](https://github.com/jdalrymple/gitbeaker/pull/1821) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 29.2.3 (Sat May 29 2021)

#### 🔩 Dependency Updates

- Bump eslint from 7.26.0 to 7.27.0 [#1803](https://github.com/jdalrymple/gitbeaker/pull/1803) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ws from 7.4.5 to 7.4.6 [#1819](https://github.com/jdalrymple/gitbeaker/pull/1819) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 29.2.2 (Sat May 29 2021)

#### ⚠️ Pushed to `master`

- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Merge remote-tracking branch 'origin/master' ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 29.2.1 (Sat May 29 2021)

#### ⚠️ Pushed to `master`

- Updating config ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump @auto-it/first-time-contributor from 10.28.0 to 10.29.2 [#1806](https://github.com/jdalrymple/gitbeaker/pull/1806) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.24.0 to 4.25.0 [#1810](https://github.com/jdalrymple/gitbeaker/pull/1810) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint-plugin-import from 2.23.2 to 2.23.3 [#1801](https://github.com/jdalrymple/gitbeaker/pull/1801) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jest-puppeteer from 5.0.3 to 5.0.4 [#1814](https://github.com/jdalrymple/gitbeaker/pull/1814) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.50.1 to 2.50.2 [#1816](https://github.com/jdalrymple/gitbeaker/pull/1816) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.24.0 to 4.25.0 [#1815](https://github.com/jdalrymple/gitbeaker/pull/1815) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump typescript from 4.2.4 to 4.3.2 [#1811](https://github.com/jdalrymple/gitbeaker/pull/1811) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.49.0 to 2.50.1 [#1812](https://github.com/jdalrymple/gitbeaker/pull/1812) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.28.0 to 10.29.2 [#1809](https://github.com/jdalrymple/gitbeaker/pull/1809) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.48.0 to 2.49.0 [#1794](https://github.com/jdalrymple/gitbeaker/pull/1794) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/first-time-contributor from 10.27.1 to 10.28.0 [#1784](https://github.com/jdalrymple/gitbeaker/pull/1784) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 15.3.0 to 15.3.1 [#1786](https://github.com/jdalrymple/gitbeaker/pull/1786) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/all-contributors from 10.27.1 to 10.28.0 [#1785](https://github.com/jdalrymple/gitbeaker/pull/1785) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.27.1 to 10.28.0 [#1787](https://github.com/jdalrymple/gitbeaker/pull/1787) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Bump ts-node from 9.1.1 to 10.0.0 [#1798](https://github.com/jdalrymple/gitbeaker/pull/1798) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 29.2.0 (Tue May 18 2021)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fixing weird request format for discussions [#1781](https://github.com/jdalrymple/gitbeaker/pull/1781) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump @typescript-eslint/parser from 4.23.0 to 4.24.0 [#1783](https://github.com/jdalrymple/gitbeaker/pull/1783) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.23.0 to 4.24.0 [#1782](https://github.com/jdalrymple/gitbeaker/pull/1782) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint-plugin-import from 2.23.0 to 2.23.2 [#1776](https://github.com/jdalrymple/gitbeaker/pull/1776) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump rollup from 2.47.0 to 2.48.0 [#1778](https://github.com/jdalrymple/gitbeaker/pull/1778) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Updating all dependencies [#1775](https://github.com/jdalrymple/gitbeaker/pull/1775) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 29.1.0 (Fri May 14 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Vincent Boulaye ([@vboulaye](https://github.com/vboulaye)), for all your work!

#### 💥 Feature

- `@gitbeaker/core`
  - add Jobs.showPipelineBridges [#1766](https://github.com/jdalrymple/gitbeaker/pull/1766) ([@vboulaye](https://github.com/vboulaye) [@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump @auto-it/all-contributors from 10.26.1 to 10.27.1 [#1772](https://github.com/jdalrymple/gitbeaker/pull/1772) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump @auto-it/first-time-contributor from 10.26.1 to 10.27.1 [#1773](https://github.com/jdalrymple/gitbeaker/pull/1773) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump @types/node from 15.0.2 to 15.0.3 [#1774](https://github.com/jdalrymple/gitbeaker/pull/1774) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.22.1 to 4.23.0 [#1764](https://github.com/jdalrymple/gitbeaker/pull/1764) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.22.1 to 4.23.0 [#1765](https://github.com/jdalrymple/gitbeaker/pull/1765) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.27.0 to 10.27.1 [#1771](https://github.com/jdalrymple/gitbeaker/pull/1771) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Vincent Boulaye ([@vboulaye](https://github.com/vboulaye))

---

# 29.0.0 (Fri May 14 2021)

#### 💥 Breaking Change

- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Update service typing and peripheral endpoints [#1768](https://github.com/jdalrymple/gitbeaker/pull/1768) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump lint-staged from 10.5.4 to 11.0.0 [#1761](https://github.com/jdalrymple/gitbeaker/pull/1761) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.26.1 to 10.27.0 [#1757](https://github.com/jdalrymple/gitbeaker/pull/1757) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump eslint from 7.25.0 to 7.26.0 [#1756](https://github.com/jdalrymple/gitbeaker/pull/1756) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/eslint-plugin from 4.22.0 to 4.22.1 [#1752](https://github.com/jdalrymple/gitbeaker/pull/1752) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 15.0.1 to 15.0.2 [#1746](https://github.com/jdalrymple/gitbeaker/pull/1746) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ts-jest from 26.5.3 to 26.5.6 [#1751](https://github.com/jdalrymple/gitbeaker/pull/1751) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @typescript-eslint/parser from 4.22.0 to 4.22.1 [#1748](https://github.com/jdalrymple/gitbeaker/pull/1748) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @auto-it/first-time-contributor from 10.26.0 to 10.26.1 [#1744](https://github.com/jdalrymple/gitbeaker/pull/1744) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- chore(deps-dev): bump ts-jest from 26.4.2 to 26.4.3 [#1276](https://github.com/jdalrymple/gitbeaker/pull/1276) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump codecov from 3.8.1 to 3.8.2 [#1736](https://github.com/jdalrymple/gitbeaker/pull/1736) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-commonjs from 18.0.0 to 18.1.0 [#1749](https://github.com/jdalrymple/gitbeaker/pull/1749) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.46.0 to 2.47.0 [#1747](https://github.com/jdalrymple/gitbeaker/pull/1747) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump auto from 10.26.0 to 10.26.1 [#1739](https://github.com/jdalrymple/gitbeaker/pull/1739) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump @auto-it/all-contributors from 10.26.0 to 10.26.1 [#1742](https://github.com/jdalrymple/gitbeaker/pull/1742) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/browser`
  - Bump @rollup/plugin-node-resolve from 11.2.1 to 13.0.0 [#1753](https://github.com/jdalrymple/gitbeaker/pull/1753) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Bump @rollup/plugin-commonjs from 18.1.0 to 19.0.0 [#1754](https://github.com/jdalrymple/gitbeaker/pull/1754) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Bump puppeteer from 9.0.0 to 9.1.1 [#1750](https://github.com/jdalrymple/gitbeaker/pull/1750) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@gitbeaker/core`
  - Bump fs-extra from 9.1.0 to 10.0.0 [#1738](https://github.com/jdalrymple/gitbeaker/pull/1738) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### 📝 Documentation

- Updating Issue Templates [#1767](https://github.com/jdalrymple/gitbeaker/pull/1767) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 28.4.1 (Tue May 04 2021)

---

# 28.4.0 (Tue May 04 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, null[@divido](https://github.com/divido), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Change Issues.unsubscribe to a POST operation instead of DELETE [#1726](https://github.com/jdalrymple/gitbeaker/pull/1726) ([@divido](https://github.com/divido) [@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Upgrade to GitHub-native Dependabot [#1733](https://github.com/jdalrymple/gitbeaker/pull/1733) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump rollup from 2.45.2 to 2.46.0 [#1734](https://github.com/jdalrymple/gitbeaker/pull/1734) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.25.1 to 10.26.0 [#1732](https://github.com/jdalrymple/gitbeaker/pull/1732) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump jest-puppeteer from 5.0.2 to 5.0.3 [#1731](https://github.com/jdalrymple/gitbeaker/pull/1731) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1730](https://github.com/jdalrymple/gitbeaker/pull/1730) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 10.25.1 to 10.26.0 [#1729](https://github.com/jdalrymple/gitbeaker/pull/1729) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.25.1 to 10.26.0 [#1727](https://github.com/jdalrymple/gitbeaker/pull/1727) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/jest from 26.0.22 to 26.0.23 [#1717](https://github.com/jdalrymple/gitbeaker/pull/1717) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-config-prettier from 8.2.0 to 8.3.0 [#1716](https://github.com/jdalrymple/gitbeaker/pull/1716) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1711](https://github.com/jdalrymple/gitbeaker/pull/1711) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.25.0 to 10.25.1 [#1712](https://github.com/jdalrymple/gitbeaker/pull/1712) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-plugin-jest from 24.3.5 to 24.3.6 [#1715](https://github.com/jdalrymple/gitbeaker/pull/1715) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint from 7.24.0 to 7.25.0 [#1714](https://github.com/jdalrymple/gitbeaker/pull/1714) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.25.0 to 10.25.1 [#1704](https://github.com/jdalrymple/gitbeaker/pull/1704) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump chalk from 4.1.0 to 4.1.1 [#1708](https://github.com/jdalrymple/gitbeaker/pull/1708) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 10.25.0 to 10.25.1 [#1706](https://github.com/jdalrymple/gitbeaker/pull/1706) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.39 to 14.14.41 [#1703](https://github.com/jdalrymple/gitbeaker/pull/1703) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-plugin-prettier from 3.3.1 to 3.4.0 [#1701](https://github.com/jdalrymple/gitbeaker/pull/1701) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.37 to 14.14.39 [#1700](https://github.com/jdalrymple/gitbeaker/pull/1700) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1697](https://github.com/jdalrymple/gitbeaker/pull/1697) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-config-prettier from 8.1.0 to 8.2.0 [#1695](https://github.com/jdalrymple/gitbeaker/pull/1695) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.24.3 to 10.25.0 [#1698](https://github.com/jdalrymple/gitbeaker/pull/1698) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.24.3 to 10.25.0 [#1699](https://github.com/jdalrymple/gitbeaker/pull/1699) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 10.24.3 to 10.25.0 [#1694](https://github.com/jdalrymple/gitbeaker/pull/1694) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.21.0 to 4.22.0 [#1693](https://github.com/jdalrymple/gitbeaker/pull/1693) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.45.1 to 2.45.2 [#1692](https://github.com/jdalrymple/gitbeaker/pull/1692) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1691](https://github.com/jdalrymple/gitbeaker/pull/1691) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-plugin-jest from 24.3.4 to 24.3.5 [#1690](https://github.com/jdalrymple/gitbeaker/pull/1690) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.45.0 to 2.45.1 [#1689](https://github.com/jdalrymple/gitbeaker/pull/1689) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint from 7.23.0 to 7.24.0 [#1688](https://github.com/jdalrymple/gitbeaker/pull/1688) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.24.1 to 10.24.3 [#1687](https://github.com/jdalrymple/gitbeaker/pull/1687) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 10.24.1 to 10.24.3 [#1683](https://github.com/jdalrymple/gitbeaker/pull/1683) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.44.0 to 2.45.0 [#1685](https://github.com/jdalrymple/gitbeaker/pull/1685) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1686](https://github.com/jdalrymple/gitbeaker/pull/1686) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.24.1 to 10.24.3 [#1682](https://github.com/jdalrymple/gitbeaker/pull/1682) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump typescript from 4.2.3 to 4.2.4 [#1681](https://github.com/jdalrymple/gitbeaker/pull/1681) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1680](https://github.com/jdalrymple/gitbeaker/pull/1680) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.20.0 to 4.21.0 [#1679](https://github.com/jdalrymple/gitbeaker/pull/1679) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-plugin-jest from 24.3.2 to 24.3.4 [#1678](https://github.com/jdalrymple/gitbeaker/pull/1678) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - chore(deps-dev): bump @types/node from 14.14.41 to 15.0.1 [#1719](https://github.com/jdalrymple/gitbeaker/pull/1719) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/cli`
  - chore(deps-dev): bump strip-ansi from 6.0.0 to 7.0.0 [#1710](https://github.com/jdalrymple/gitbeaker/pull/1710) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/browser`
  - chore(deps-dev): bump puppeteer from 8.0.0 to 9.0.0 [#1705](https://github.com/jdalrymple/gitbeaker/pull/1705) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - chore(deps-dev): bump jest-puppeteer from 4.4.0 to 5.0.2 [#1709](https://github.com/jdalrymple/gitbeaker/pull/1709) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- [@divido](https://github.com/divido)
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 28.3.0 (Sun Apr 04 2021)

#### 🐛 Bug Fix

- `@gitbeaker/cli`
  - Fixing import errors within the CLI release [#1677](https://github.com/jdalrymple/gitbeaker/pull/1677) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @auto-it/first-time-contributor [#1675](https://github.com/jdalrymple/gitbeaker/pull/1675) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.42.4 to 2.44.0 [#1674](https://github.com/jdalrymple/gitbeaker/pull/1674) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1671](https://github.com/jdalrymple/gitbeaker/pull/1671) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.19.0 to 4.20.0 [#1669](https://github.com/jdalrymple/gitbeaker/pull/1669) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.23.0 to 10.24.1 [#1673](https://github.com/jdalrymple/gitbeaker/pull/1673) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.23.0 to 10.24.1 [#1667](https://github.com/jdalrymple/gitbeaker/pull/1667) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump husky from 5.2.0 to 6.0.0 [#1670](https://github.com/jdalrymple/gitbeaker/pull/1670) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/core from 10.23.0 to 10.24.1 [#1666](https://github.com/jdalrymple/gitbeaker/pull/1666) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1663](https://github.com/jdalrymple/gitbeaker/pull/1663) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @rollup/plugin-node-resolve from 11.2.0 to 11.2.1 [#1660](https://github.com/jdalrymple/gitbeaker/pull/1660) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @rollup/plugin-replace from 2.4.1 to 2.4.2 [#1664](https://github.com/jdalrymple/gitbeaker/pull/1664) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.22.1 to 10.23.0 [#1665](https://github.com/jdalrymple/gitbeaker/pull/1665) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.36 to 14.14.37 [#1661](https://github.com/jdalrymple/gitbeaker/pull/1661) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.22.1 to 10.23.0 [#1662](https://github.com/jdalrymple/gitbeaker/pull/1662) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint from 7.22.0 to 7.23.0 [#1658](https://github.com/jdalrymple/gitbeaker/pull/1658) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/jest from 26.0.21 to 26.0.22 [#1657](https://github.com/jdalrymple/gitbeaker/pull/1657) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.35 to 14.14.36 [#1656](https://github.com/jdalrymple/gitbeaker/pull/1656) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.42.3 to 2.42.4 [#1655](https://github.com/jdalrymple/gitbeaker/pull/1655) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.22.0 to 10.22.1 [#1653](https://github.com/jdalrymple/gitbeaker/pull/1653) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1651](https://github.com/jdalrymple/gitbeaker/pull/1651) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.22.0 to 10.22.1 [#1650](https://github.com/jdalrymple/gitbeaker/pull/1650) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.42.2 to 2.42.3 [#1644](https://github.com/jdalrymple/gitbeaker/pull/1644) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1648](https://github.com/jdalrymple/gitbeaker/pull/1648) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.18.0 to 4.19.0 [#1647](https://github.com/jdalrymple/gitbeaker/pull/1647) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.21.0 to 10.22.0 [#1643](https://github.com/jdalrymple/gitbeaker/pull/1643) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.21.0 to 10.22.0 [#1645](https://github.com/jdalrymple/gitbeaker/pull/1645) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/core from 10.21.0 to 10.22.0 [#1646](https://github.com/jdalrymple/gitbeaker/pull/1646) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1642](https://github.com/jdalrymple/gitbeaker/pull/1642) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1638](https://github.com/jdalrymple/gitbeaker/pull/1638) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump husky from 5.1.3 to 5.2.0 [#1639](https://github.com/jdalrymple/gitbeaker/pull/1639) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.41.5 to 2.42.2 [#1641](https://github.com/jdalrymple/gitbeaker/pull/1641) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.20.6 to 10.21.0 [#1636](https://github.com/jdalrymple/gitbeaker/pull/1636) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 10.20.6 to 10.21.0 [#1637](https://github.com/jdalrymple/gitbeaker/pull/1637) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.20.6 to 10.21.0 [#1634](https://github.com/jdalrymple/gitbeaker/pull/1634) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/browser`
  - chore(deps-dev): bump @rollup/plugin-commonjs from 17.1.0 to 18.0.0 [#1668](https://github.com/jdalrymple/gitbeaker/pull/1668) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 28.2.0 (Sat Mar 20 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Vojtěch Sajdl ([@Pryx](https://github.com/Pryx)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/browser`, `@gitbeaker/node`
  - Fix #1624 - Fixed mime type handling [#1633](https://github.com/jdalrymple/gitbeaker/pull/1633) ([@Pryx](https://github.com/Pryx))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @auto-it/first-time-contributor [#1632](https://github.com/jdalrymple/gitbeaker/pull/1632) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.20.4 to 10.20.6 [#1630](https://github.com/jdalrymple/gitbeaker/pull/1630) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.41.4 to 2.41.5 [#1626](https://github.com/jdalrymple/gitbeaker/pull/1626) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.20.4 to 10.20.6 [#1629](https://github.com/jdalrymple/gitbeaker/pull/1629) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump ora from 5.3.0 to 5.4.0 [#1622](https://github.com/jdalrymple/gitbeaker/pull/1622) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/jest from 26.0.20 to 26.0.21 [#1621](https://github.com/jdalrymple/gitbeaker/pull/1621) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-plugin-jest from 24.3.1 to 24.3.2 [#1619](https://github.com/jdalrymple/gitbeaker/pull/1619) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.41.2 to 2.41.4 [#1618](https://github.com/jdalrymple/gitbeaker/pull/1618) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.34 to 14.14.35 [#1611](https://github.com/jdalrymple/gitbeaker/pull/1611) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1612](https://github.com/jdalrymple/gitbeaker/pull/1612) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.20.1 to 10.20.4 [#1616](https://github.com/jdalrymple/gitbeaker/pull/1616) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 10.20.1 to 10.20.4 [#1617](https://github.com/jdalrymple/gitbeaker/pull/1617) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.17.0 to 4.18.0 [#1613](https://github.com/jdalrymple/gitbeaker/pull/1613) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.20.1 to 10.20.4 [#1615](https://github.com/jdalrymple/gitbeaker/pull/1615) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1610](https://github.com/jdalrymple/gitbeaker/pull/1610) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.20.0 to 10.20.1 [#1609](https://github.com/jdalrymple/gitbeaker/pull/1609) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1606](https://github.com/jdalrymple/gitbeaker/pull/1606) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.20.0 to 10.20.1 [#1605](https://github.com/jdalrymple/gitbeaker/pull/1605) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/requester-utils`
  - chore(deps): bump query-string from 6.14.1 to 7.0.0 [#1628](https://github.com/jdalrymple/gitbeaker/pull/1628) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Vojtěch Sajdl ([@Pryx](https://github.com/Pryx))

---

# 28.1.1 (Sun Mar 14 2021)

#### 🐛 Bug Fix

- chore: add `root: true` to eslint [#1531](https://github.com/jdalrymple/gitbeaker/pull/1531) ([@kiprasmel](https://github.com/kiprasmel) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Kipras Melnikovas ([@kiprasmel](https://github.com/kiprasmel))

---

# 28.1.0 (Sun Mar 14 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Clemens Lieb ([@Vogel612](https://github.com/Vogel612)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/node`
  - Rewrite HTTP method for `stream` requests in GotRequester [#1602](https://github.com/jdalrymple/gitbeaker/pull/1602) ([@Vogel612](https://github.com/Vogel612))
- chore(deps-dev): bump auto from 10.16.5 to 10.18.4 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 10.16.5 to 10.18.4 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/core from 10.16.5 to 10.18.4 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/core from 10.16.5 to 10.18.3 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.16.5 to 10.18.3 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### ⚠️ Pushed to `master`

- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/auto-10.18.4' ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/auto-it/released-10.18.4' ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/auto-it/core-10.18.4' ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/auto-it/core-10.18.3' ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/auto-10.18.3' ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/auto-it/released-10.18.7' [#1601](https://github.com/jdalrymple/gitbeaker/pull/1601) ([@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @rollup/plugin-node-resolve from 11.1.1 to 11.2.0 [#1551](https://github.com/jdalrymple/gitbeaker/pull/1551) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint from 7.19.0 to 7.20.0 [#1557](https://github.com/jdalrymple/gitbeaker/pull/1557) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.26 to 14.14.28 [#1554](https://github.com/jdalrymple/gitbeaker/pull/1554) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.38.5 to 2.39.0 [#1552](https://github.com/jdalrymple/gitbeaker/pull/1552) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump all-contributors-cli from 6.19.0 to 6.20.0 [#1553](https://github.com/jdalrymple/gitbeaker/pull/1553) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.16.4 to 10.16.5 [#1550](https://github.com/jdalrymple/gitbeaker/pull/1550) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.16.0 to 10.16.5 [#1548](https://github.com/jdalrymple/gitbeaker/pull/1548) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1549](https://github.com/jdalrymple/gitbeaker/pull/1549) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.25 to 14.14.26 [#1545](https://github.com/jdalrymple/gitbeaker/pull/1545) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.16.0 to 10.16.4 [#1546](https://github.com/jdalrymple/gitbeaker/pull/1546) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 10.16.0 to 10.16.4 [#1542](https://github.com/jdalrymple/gitbeaker/pull/1542) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump typescript from 4.1.4 to 4.1.5 [#1541](https://github.com/jdalrymple/gitbeaker/pull/1541) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump query-string from 6.13.8 to 6.14.0 [#1540](https://github.com/jdalrymple/gitbeaker/pull/1540) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump typescript from 4.1.3 to 4.1.4 [#1539](https://github.com/jdalrymple/gitbeaker/pull/1539) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.14.2 to 4.15.0 [#1537](https://github.com/jdalrymple/gitbeaker/pull/1537) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump husky from 4.3.8 to 5.0.9 [#1536](https://github.com/jdalrymple/gitbeaker/pull/1536) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1535](https://github.com/jdalrymple/gitbeaker/pull/1535) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.38.4 to 2.38.5 [#1533](https://github.com/jdalrymple/gitbeaker/pull/1533) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump lint-staged from 10.5.3 to 10.5.4 [#1534](https://github.com/jdalrymple/gitbeaker/pull/1534) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.15.0 to 10.16.0 [#1527](https://github.com/jdalrymple/gitbeaker/pull/1527) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.15.0 to 10.16.0 [#1530](https://github.com/jdalrymple/gitbeaker/pull/1530) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 10.15.0 to 10.16.0 [#1525](https://github.com/jdalrymple/gitbeaker/pull/1525) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1528](https://github.com/jdalrymple/gitbeaker/pull/1528) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/core from 10.15.0 to 10.16.0 [#1526](https://github.com/jdalrymple/gitbeaker/pull/1526) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.24 to 14.14.25 [#1524](https://github.com/jdalrymple/gitbeaker/pull/1524) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.22 to 14.14.24 [#1523](https://github.com/jdalrymple/gitbeaker/pull/1523) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1517](https://github.com/jdalrymple/gitbeaker/pull/1517) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/puppeteer from 5.4.2 to 5.4.3 [#1518](https://github.com/jdalrymple/gitbeaker/pull/1518) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.13.4 to 10.15.0 [#1519](https://github.com/jdalrymple/gitbeaker/pull/1519) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.13.4 to 10.15.0 [#1516](https://github.com/jdalrymple/gitbeaker/pull/1516) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.38.3 to 2.38.4 [#1514](https://github.com/jdalrymple/gitbeaker/pull/1514) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1509](https://github.com/jdalrymple/gitbeaker/pull/1509) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1512](https://github.com/jdalrymple/gitbeaker/pull/1512) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.13.3 to 10.13.4 [#1506](https://github.com/jdalrymple/gitbeaker/pull/1506) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 10.13.3 to 10.13.4 [#1510](https://github.com/jdalrymple/gitbeaker/pull/1510) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.13.3 to 10.13.4 [#1508](https://github.com/jdalrymple/gitbeaker/pull/1508) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/core from 10.13.3 to 10.13.4 [#1507](https://github.com/jdalrymple/gitbeaker/pull/1507) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.14.1 to 4.14.2 [#1511](https://github.com/jdalrymple/gitbeaker/pull/1511) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.38.2 to 2.38.3 [#1505](https://github.com/jdalrymple/gitbeaker/pull/1505) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @rollup/plugin-commonjs from 17.0.0 to 17.1.0 [#1502](https://github.com/jdalrymple/gitbeaker/pull/1502) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint from 7.18.0 to 7.19.0 [#1501](https://github.com/jdalrymple/gitbeaker/pull/1501) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.38.1 to 2.38.2 [#1503](https://github.com/jdalrymple/gitbeaker/pull/1503) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @rollup/plugin-node-resolve from 11.1.0 to 11.1.1 [#1504](https://github.com/jdalrymple/gitbeaker/pull/1504) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.38.0 to 2.38.1 [#1499](https://github.com/jdalrymple/gitbeaker/pull/1499) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.13.2 to 10.13.3 [#1498](https://github.com/jdalrymple/gitbeaker/pull/1498) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.13.2 to 10.13.3 [#1497](https://github.com/jdalrymple/gitbeaker/pull/1497) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1496](https://github.com/jdalrymple/gitbeaker/pull/1496) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/core from 10.13.2 to 10.13.3 [#1494](https://github.com/jdalrymple/gitbeaker/pull/1494) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1490](https://github.com/jdalrymple/gitbeaker/pull/1490) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1487](https://github.com/jdalrymple/gitbeaker/pull/1487) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.14.0 to 4.14.1 [#1491](https://github.com/jdalrymple/gitbeaker/pull/1491) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.12.2 to 10.13.2 [#1488](https://github.com/jdalrymple/gitbeaker/pull/1488) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 10.12.2 to 10.13.2 [#1486](https://github.com/jdalrymple/gitbeaker/pull/1486) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.12.2 to 10.13.2 [#1489](https://github.com/jdalrymple/gitbeaker/pull/1489) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.11.0 to 10.12.2 [#1485](https://github.com/jdalrymple/gitbeaker/pull/1485) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump openpgp from 4.10.9 to 4.10.10 [#1484](https://github.com/jdalrymple/gitbeaker/pull/1484) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.21 to 14.14.22 [#1473](https://github.com/jdalrymple/gitbeaker/pull/1473) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.37.0 to 2.38.0 [#1483](https://github.com/jdalrymple/gitbeaker/pull/1483) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.10.0 to 10.12.2 [#1481](https://github.com/jdalrymple/gitbeaker/pull/1481) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump ora from 5.2.0 to 5.3.0 [#1475](https://github.com/jdalrymple/gitbeaker/pull/1475) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump fs-extra from 9.0.1 to 9.1.0 [#1472](https://github.com/jdalrymple/gitbeaker/pull/1472) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/core`, `@gitbeaker/requester-utils`
  - chore(deps): bump form-data from 3.0.0 to 4.0.0 [#1558](https://github.com/jdalrymple/gitbeaker/pull/1558) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/browser`
  - chore(deps-dev): bump puppeteer from 7.0.0 to 7.1.0 [#1556](https://github.com/jdalrymple/gitbeaker/pull/1556) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - chore(deps-dev): bump puppeteer from 6.0.0 to 7.0.0 [#1522](https://github.com/jdalrymple/gitbeaker/pull/1522) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - chore(deps-dev): bump puppeteer from 5.5.0 to 6.0.0 [#1513](https://github.com/jdalrymple/gitbeaker/pull/1513) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Clemens Lieb ([@Vogel612](https://github.com/Vogel612))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 28.0.4 (Mon Jan 25 2021)

#### ⚠️ Pushed to `master`

- Remove module test ([@jdalrymple](https://github.com/jdalrymple))
- Move into pkg script ([@jdalrymple](https://github.com/jdalrymple))
- Updating image being used ([@jdalrymple](https://github.com/jdalrymple))
- Adding artifact logs for failures ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/node`
  - Merge branch 'extend-probe-check' ([@jdalrymple](https://github.com/jdalrymple))
  - Add unique test id and add retry to integration builds ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @auto-it/first-time-contributor [#1479](https://github.com/jdalrymple/gitbeaker/pull/1479) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 28.0.3 (Sun Jan 24 2021)

#### 🐛 Bug Fix

- `@gitbeaker/browser`, `@gitbeaker/node`
  - Remove possibility of char type information polluting check of content-type [#1467](https://github.com/jdalrymple/gitbeaker/pull/1467) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @auto-it/released from 10.11.0 to 10.12.2 [#1478](https://github.com/jdalrymple/gitbeaker/pull/1478) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1466](https://github.com/jdalrymple/gitbeaker/pull/1466) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-config-prettier from 7.1.0 to 7.2.0 [#1474](https://github.com/jdalrymple/gitbeaker/pull/1474) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.10.0 to 10.11.0 [#1469](https://github.com/jdalrymple/gitbeaker/pull/1469) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.36.2 to 2.37.0 [#1471](https://github.com/jdalrymple/gitbeaker/pull/1471) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @rollup/plugin-node-resolve from 11.0.1 to 11.1.0 [#1457](https://github.com/jdalrymple/gitbeaker/pull/1457) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1461](https://github.com/jdalrymple/gitbeaker/pull/1461) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.6.1 to 10.10.0 [#1460](https://github.com/jdalrymple/gitbeaker/pull/1460) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.9.1 to 10.10.0 [#1463](https://github.com/jdalrymple/gitbeaker/pull/1463) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.13.0 to 4.14.0 [#1464](https://github.com/jdalrymple/gitbeaker/pull/1464) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump husky from 4.3.7 to 4.3.8 [#1458](https://github.com/jdalrymple/gitbeaker/pull/1458) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint from 7.17.0 to 7.18.0 [#1456](https://github.com/jdalrymple/gitbeaker/pull/1456) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.36.1 to 2.36.2 [#1462](https://github.com/jdalrymple/gitbeaker/pull/1462) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1453](https://github.com/jdalrymple/gitbeaker/pull/1453) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.20 to 14.14.21 [#1455](https://github.com/jdalrymple/gitbeaker/pull/1455) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.6.0 to 10.9.1 [#1454](https://github.com/jdalrymple/gitbeaker/pull/1454) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 10.6.1 to 10.9.1 [#1450](https://github.com/jdalrymple/gitbeaker/pull/1450) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1445](https://github.com/jdalrymple/gitbeaker/pull/1445) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1440](https://github.com/jdalrymple/gitbeaker/pull/1440) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 10.6.0 to 10.6.1 [#1448](https://github.com/jdalrymple/gitbeaker/pull/1448) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.6.0 to 10.6.1 [#1447](https://github.com/jdalrymple/gitbeaker/pull/1447) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.12.0 to 4.13.0 [#1441](https://github.com/jdalrymple/gitbeaker/pull/1441) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.5.1 to 10.6.0 [#1438](https://github.com/jdalrymple/gitbeaker/pull/1438) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.5.1 to 10.6.0 [#1442](https://github.com/jdalrymple/gitbeaker/pull/1442) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1443](https://github.com/jdalrymple/gitbeaker/pull/1443) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump husky from 4.3.6 to 4.3.7 [#1428](https://github.com/jdalrymple/gitbeaker/pull/1428) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 10.5.1 to 10.6.0 [#1439](https://github.com/jdalrymple/gitbeaker/pull/1439) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.36.0 to 2.36.1 [#1429](https://github.com/jdalrymple/gitbeaker/pull/1429) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1433](https://github.com/jdalrymple/gitbeaker/pull/1433) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.5.0 to 10.5.1 [#1432](https://github.com/jdalrymple/gitbeaker/pull/1432) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.5.0 to 10.5.1 [#1431](https://github.com/jdalrymple/gitbeaker/pull/1431) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/jest from 26.0.19 to 26.0.20 [#1430](https://github.com/jdalrymple/gitbeaker/pull/1430) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.35.1 to 2.36.0 [#1427](https://github.com/jdalrymple/gitbeaker/pull/1427) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-plugin-prettier from 3.3.0 to 3.3.1 [#1426](https://github.com/jdalrymple/gitbeaker/pull/1426) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.11.1 to 4.12.0 [#1425](https://github.com/jdalrymple/gitbeaker/pull/1425) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint from 7.16.0 to 7.17.0 [#1421](https://github.com/jdalrymple/gitbeaker/pull/1421) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.17 to 14.14.20 [#1424](https://github.com/jdalrymple/gitbeaker/pull/1424) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1423](https://github.com/jdalrymple/gitbeaker/pull/1423) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump query-string from 6.13.7 to 6.13.8 [#1419](https://github.com/jdalrymple/gitbeaker/pull/1419) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump ora from 5.1.0 to 5.2.0 [#1417](https://github.com/jdalrymple/gitbeaker/pull/1417) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# (Sun Jan 03 2021)

#### ⚠️ Pushed to `master`

- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Merge remote-tracking branch 'origin/master' ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @types/node from 14.14.16 to 14.14.17 [#1420](https://github.com/jdalrymple/gitbeaker/pull/1420) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1414](https://github.com/jdalrymple/gitbeaker/pull/1414) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.11.0 to 4.11.1 [#1415](https://github.com/jdalrymple/gitbeaker/pull/1415) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 28.0.1 (Thu Dec 31 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Sean McGivern ([@smcgivern](https://github.com/smcgivern)), for all your work!

#### 🐛 Bug Fix

- fix: markdown for options table in README [#1416](https://github.com/jdalrymple/gitbeaker/pull/1416) ([@smcgivern](https://github.com/smcgivern))

#### ⚠️ Pushed to `master`

- ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @types/node from 14.14.14 to 14.14.16 [#1410](https://github.com/jdalrymple/gitbeaker/pull/1410) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Sean McGivern ([@smcgivern](https://github.com/smcgivern))

---

# 28.0.0 (Mon Dec 28 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Martin Helmich ([@martin-helmich](https://github.com/martin-helmich)), for all your work!

#### 💥 Breaking Change

- `@gitbeaker/core`, `@gitbeaker/requester-utils`
  - Replacing BaseService 'url' constructor argument with 'prefixUrl' for clarity [#1412](https://github.com/jdalrymple/gitbeaker/pull/1412) ([@jdalrymple](https://github.com/jdalrymple))

#### 💥 Feature

- `@gitbeaker/core`
  - Implement "Commits.signature" method [#1386](https://github.com/jdalrymple/gitbeaker/pull/1386) ([@martin-helmich](https://github.com/martin-helmich) [@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- `@gitbeaker/core`, `@gitbeaker/requester-utils`
  - Fixing incorrect scoping of the createRequesterFn function [#1413](https://github.com/jdalrymple/gitbeaker/pull/1413) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1405](https://github.com/jdalrymple/gitbeaker/pull/1405) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.4.2 to 10.5.0 [#1408](https://github.com/jdalrymple/gitbeaker/pull/1408) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1407](https://github.com/jdalrymple/gitbeaker/pull/1407) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.4.2 to 10.5.0 [#1406](https://github.com/jdalrymple/gitbeaker/pull/1406) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/core from 10.4.2 to 10.5.0 [#1409](https://github.com/jdalrymple/gitbeaker/pull/1409) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.10.0 to 4.11.0 [#1403](https://github.com/jdalrymple/gitbeaker/pull/1403) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint from 7.15.0 to 7.16.0 [#1400](https://github.com/jdalrymple/gitbeaker/pull/1400) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Martin Helmich ([@martin-helmich](https://github.com/martin-helmich))

---

# 27.0.1 (Mon Dec 21 2020)

#### 🏿‍♀️ Security

- chore(deps): [security] bump node-notifier from 8.0.0 to 8.0.1 [#1402](https://github.com/jdalrymple/gitbeaker/pull/1402) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### 🔩 Dependency Updates

- chore(deps-dev): bump eslint-config-prettier from 7.0.0 to 7.1.0 [#1401](https://github.com/jdalrymple/gitbeaker/pull/1401) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# 27.0.0 (Fri Dec 18 2020)

#### 💥 Breaking Change

- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Removed circular references [#1387](https://github.com/jdalrymple/gitbeaker/pull/1387) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1396](https://github.com/jdalrymple/gitbeaker/pull/1396) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @rollup/plugin-node-resolve from 11.0.0 to 11.0.1 [#1393](https://github.com/jdalrymple/gitbeaker/pull/1393) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.34.2 to 2.35.1 [#1394](https://github.com/jdalrymple/gitbeaker/pull/1394) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.13 to 14.14.14 [#1397](https://github.com/jdalrymple/gitbeaker/pull/1397) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.9.1 to 4.10.0 [#1395](https://github.com/jdalrymple/gitbeaker/pull/1395) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump husky from 4.3.5 to 4.3.6 [#1390](https://github.com/jdalrymple/gitbeaker/pull/1390) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.12 to 14.14.13 [#1391](https://github.com/jdalrymple/gitbeaker/pull/1391) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-plugin-prettier from 3.2.0 to 3.3.0 [#1389](https://github.com/jdalrymple/gitbeaker/pull/1389) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump typescript from 4.1.2 to 4.1.3 [#1388](https://github.com/jdalrymple/gitbeaker/pull/1388) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/jest from 26.0.18 to 26.0.19 [#1385](https://github.com/jdalrymple/gitbeaker/pull/1385) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump got from 11.8.0 to 11.8.1 [#1384](https://github.com/jdalrymple/gitbeaker/pull/1384) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump ts-node from 9.1.0 to 9.1.1 [#1375](https://github.com/jdalrymple/gitbeaker/pull/1375) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 26.0.1 (Mon Dec 14 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, null[@xiezht](https://github.com/xiezht), for all your work!

#### 🏿‍♀️ Security

- chore(deps): [security] bump ini from 1.3.5 to 1.3.7 [#1382](https://github.com/jdalrymple/gitbeaker/pull/1382) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @types/node from 14.14.10 to 14.14.12 [#1383](https://github.com/jdalrymple/gitbeaker/pull/1383) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/jest-environment-puppeteer [#1369](https://github.com/jdalrymple/gitbeaker/pull/1369) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump ky from 0.25.0 to 0.25.1 [#1379](https://github.com/jdalrymple/gitbeaker/pull/1379) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/puppeteer from 5.4.1 to 5.4.2 [#1378](https://github.com/jdalrymple/gitbeaker/pull/1378) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/jest from 26.0.17 to 26.0.18 [#1377](https://github.com/jdalrymple/gitbeaker/pull/1377) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/jest from 26.0.16 to 26.0.17 [#1370](https://github.com/jdalrymple/gitbeaker/pull/1370) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.9.0 to 4.9.1 [#1374](https://github.com/jdalrymple/gitbeaker/pull/1374) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump husky from 4.3.4 to 4.3.5 [#1371](https://github.com/jdalrymple/gitbeaker/pull/1371) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-config-prettier from 6.15.0 to 7.0.0 [#1368](https://github.com/jdalrymple/gitbeaker/pull/1368) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump openpgp from 4.10.8 to 4.10.9 [#1372](https://github.com/jdalrymple/gitbeaker/pull/1372) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1373](https://github.com/jdalrymple/gitbeaker/pull/1373) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### 📝 Documentation

- Fix table markdown format in README [#1376](https://github.com/jdalrymple/gitbeaker/pull/1376) ([@xiezht](https://github.com/xiezht) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- [@xiezht](https://github.com/xiezht)
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 26.0.0 (Sun Dec 06 2020)

#### 💥 Breaking Change

- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Export the APIMap through a compile-time replacement [#1352](https://github.com/jdalrymple/gitbeaker/pull/1352) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump ts-node from 9.0.0 to 9.1.0 [#1363](https://github.com/jdalrymple/gitbeaker/pull/1363) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.34.0 to 2.34.1 [#1366](https://github.com/jdalrymple/gitbeaker/pull/1366) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-plugin-prettier from 3.1.4 to 3.2.0 [#1365](https://github.com/jdalrymple/gitbeaker/pull/1365) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/jest from 26.0.15 to 26.0.16 [#1362](https://github.com/jdalrymple/gitbeaker/pull/1362) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/puppeteer from 5.4.0 to 5.4.1 [#1364](https://github.com/jdalrymple/gitbeaker/pull/1364) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.8.2 to 4.9.0 [#1360](https://github.com/jdalrymple/gitbeaker/pull/1360) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1359](https://github.com/jdalrymple/gitbeaker/pull/1359) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/browser`
  - chore(deps-dev): bump @rollup/plugin-node-resolve from 10.0.0 to 11.0.0 [#1361](https://github.com/jdalrymple/gitbeaker/pull/1361) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - chore(deps-dev): bump @rollup/plugin-commonjs from 16.0.0 to 17.0.0 [#1358](https://github.com/jdalrymple/gitbeaker/pull/1358) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 25.6.0 (Mon Nov 30 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Hennadii Varava ([@Sumragen](https://github.com/Sumragen)), for all your work!

#### 💥 Feature

- `@gitbeaker/core`
  - Revert project to commit [#1353](https://github.com/jdalrymple/gitbeaker/pull/1353) ([@Sumragen](https://github.com/Sumragen) [@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump rollup from 2.33.3 to 2.34.0 [#1357](https://github.com/jdalrymple/gitbeaker/pull/1357) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 10.3.0 to 10.4.2 [#1344](https://github.com/jdalrymple/gitbeaker/pull/1344) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.9 to 14.14.10 [#1351](https://github.com/jdalrymple/gitbeaker/pull/1351) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Hennadii Varava ([@Sumragen](https://github.com/Sumragen))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 25.5.0 (Sun Nov 29 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Omar Awamry ([@wamry](https://github.com/wamry)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - fix: change labels type in all MergeRequestPptions types [#1355](https://github.com/jdalrymple/gitbeaker/pull/1355) (omar.awamry@vodafone.com)

#### 🔩 Dependency Updates

- chore(deps-dev): bump eslint from 7.13.0 to 7.14.0 [#1350](https://github.com/jdalrymple/gitbeaker/pull/1350) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 10.3.0 to 10.4.2 [#1349](https://github.com/jdalrymple/gitbeaker/pull/1349) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1346](https://github.com/jdalrymple/gitbeaker/pull/1346) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump lint-staged from 10.5.1 to 10.5.2 [#1347](https://github.com/jdalrymple/gitbeaker/pull/1347) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump typescript from 4.0.5 to 4.1.2 [#1345](https://github.com/jdalrymple/gitbeaker/pull/1345) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.33.1 to 2.33.3 [#1339](https://github.com/jdalrymple/gitbeaker/pull/1339) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1343](https://github.com/jdalrymple/gitbeaker/pull/1343) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.7.0 to 4.8.2 [#1342](https://github.com/jdalrymple/gitbeaker/pull/1342) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.7 to 14.14.9 [#1340](https://github.com/jdalrymple/gitbeaker/pull/1340) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-plugin-jest from 24.1.0 to 24.1.3 [#1329](https://github.com/jdalrymple/gitbeaker/pull/1329) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 10.3.0 to 10.4.2 [#1341](https://github.com/jdalrymple/gitbeaker/pull/1341) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - chore(deps-dev): bump rollup-plugin-typescript2 from 0.28.0 to 0.29.0 [#1324](https://github.com/jdalrymple/gitbeaker/pull/1324) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/browser`
  - chore(deps): bump ky from 0.24.0 to 0.25.0 [#1330](https://github.com/jdalrymple/gitbeaker/pull/1330) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - chore(deps-dev): bump puppeteer from 5.4.1 to 5.5.0 [#1334](https://github.com/jdalrymple/gitbeaker/pull/1334) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Omar Awamry ([@wamry](https://github.com/wamry))

---

# 25.4.0 (Tue Nov 24 2020)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Supress Bundler typescript warnings [#1328](https://github.com/jdalrymple/gitbeaker/pull/1328) ([@kiprasmel](https://github.com/kiprasmel))

#### ⚠️ Pushed to `master`

- `@gitbeaker/core`
  - Temporary omission of ts error ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @auto-it/all-contributors from 9.61.0 to 10.3.0 [#1323](https://github.com/jdalrymple/gitbeaker/pull/1323) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump jest from 26.6.1 to 26.6.3 [#1325](https://github.com/jdalrymple/gitbeaker/pull/1325) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.6 to 14.14.7 [#1322](https://github.com/jdalrymple/gitbeaker/pull/1322) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1326](https://github.com/jdalrymple/gitbeaker/pull/1326) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-config-airbnb-base from 14.2.0 to 14.2.1 [#1321](https://github.com/jdalrymple/gitbeaker/pull/1321) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.6.1 to 4.7.0 [#1320](https://github.com/jdalrymple/gitbeaker/pull/1320) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.32.1 to 2.33.1 [#1312](https://github.com/jdalrymple/gitbeaker/pull/1312) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump query-string from 6.13.6 to 6.13.7 [#1318](https://github.com/jdalrymple/gitbeaker/pull/1318) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump codecov from 3.8.0 to 3.8.1 [#1311](https://github.com/jdalrymple/gitbeaker/pull/1311) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 9.61.0 to 10.3.0 [#1317](https://github.com/jdalrymple/gitbeaker/pull/1317) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.6.0 to 4.6.1 [#1313](https://github.com/jdalrymple/gitbeaker/pull/1313) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint from 7.12.1 to 7.13.0 [#1315](https://github.com/jdalrymple/gitbeaker/pull/1315) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @rollup/plugin-replace from 2.3.3 to 2.3.4 [#1284](https://github.com/jdalrymple/gitbeaker/pull/1284) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-config-prettier from 6.14.0 to 6.15.0 [#1283](https://github.com/jdalrymple/gitbeaker/pull/1283) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1308](https://github.com/jdalrymple/gitbeaker/pull/1308) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump lint-staged from 10.4.2 to 10.5.1 [#1296](https://github.com/jdalrymple/gitbeaker/pull/1296) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1299](https://github.com/jdalrymple/gitbeaker/pull/1299) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.5 to 14.14.6 [#1286](https://github.com/jdalrymple/gitbeaker/pull/1286) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 9.61.0 to 10.3.0 [#1310](https://github.com/jdalrymple/gitbeaker/pull/1310) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/expect-puppeteer from 4.4.4 to 4.4.5 [#1291](https://github.com/jdalrymple/gitbeaker/pull/1291) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/core from 9.61.0 to 10.3.0 [#1309](https://github.com/jdalrymple/gitbeaker/pull/1309) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/browser`
  - chore(deps-dev): bump @rollup/plugin-node-resolve from 9.0.0 to 10.0.0 [#1319](https://github.com/jdalrymple/gitbeaker/pull/1319) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - chore(deps-dev): bump @rollup/plugin-commonjs from 15.1.0 to 16.0.0 [#1314](https://github.com/jdalrymple/gitbeaker/pull/1314) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - chore(deps-dev): bump @types/puppeteer from 3.0.2 to 5.4.0 [#1316](https://github.com/jdalrymple/gitbeaker/pull/1316) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Kipras Melnikovas ([@kiprasmel](https://github.com/kiprasmel))

---

# 25.3.0 (Fri Nov 06 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Ilya Dus ([@illyaMs](https://github.com/illyaMs)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - refactor: export CommitAction interface [#1307](https://github.com/jdalrymple/gitbeaker/pull/1307) ([@illyaMs](https://github.com/illyaMs))

#### 🔩 Dependency Updates

- chore(deps-dev): bump rollup from 2.32.0 to 2.32.1 [#1258](https://github.com/jdalrymple/gitbeaker/pull/1258) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Ilya Dus ([@illyaMs](https://github.com/illyaMs))

---

# 25.2.0 (Fri Oct 30 2020)

#### 🐛 Bug Fix

- `@gitbeaker/browser`
  - Fixing header conversion from Header to plain object [#1290](https://github.com/jdalrymple/gitbeaker/pull/1290) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump typescript from 4.0.3 to 4.0.5 [#1281](https://github.com/jdalrymple/gitbeaker/pull/1281) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.5.0 to 4.6.0 [#1287](https://github.com/jdalrymple/gitbeaker/pull/1287) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 9.60.1 to 9.61.0 [#1275](https://github.com/jdalrymple/gitbeaker/pull/1275) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 9.60.1 to 9.61.0 [#1277](https://github.com/jdalrymple/gitbeaker/pull/1277) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.2 to 14.14.5 [#1282](https://github.com/jdalrymple/gitbeaker/pull/1282) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint from 7.12.0 to 7.12.1 [#1278](https://github.com/jdalrymple/gitbeaker/pull/1278) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint from 7.11.0 to 7.12.0 [#1269](https://github.com/jdalrymple/gitbeaker/pull/1269) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1271](https://github.com/jdalrymple/gitbeaker/pull/1271) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 9.60.0 to 9.60.1 [#1272](https://github.com/jdalrymple/gitbeaker/pull/1272) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump ts-jest from 26.4.1 to 26.4.2 [#1268](https://github.com/jdalrymple/gitbeaker/pull/1268) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 9.59.1 to 9.60.1 [#1266](https://github.com/jdalrymple/gitbeaker/pull/1266) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump jest from 26.6.0 to 26.6.1 [#1265](https://github.com/jdalrymple/gitbeaker/pull/1265) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1262](https://github.com/jdalrymple/gitbeaker/pull/1262) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.14.0 to 14.14.2 [#1263](https://github.com/jdalrymple/gitbeaker/pull/1263) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 9.59.1 to 9.60.0 [#1260](https://github.com/jdalrymple/gitbeaker/pull/1260) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-config-prettier from 6.13.0 to 6.14.0 [#1261](https://github.com/jdalrymple/gitbeaker/pull/1261) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump got from 11.7.0 to 11.8.0 [#1256](https://github.com/jdalrymple/gitbeaker/pull/1256) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.11.10 to 14.14.0 [#1254](https://github.com/jdalrymple/gitbeaker/pull/1254) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/expect-puppeteer from 4.4.3 to 4.4.4 [#1255](https://github.com/jdalrymple/gitbeaker/pull/1255) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- Root dependency updates [#1253](https://github.com/jdalrymple/gitbeaker/pull/1253) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`
  - chore(deps-dev): bump puppeteer from 5.4.0 to 5.4.1 [#1274](https://github.com/jdalrymple/gitbeaker/pull/1274) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - chore(deps-dev): bump puppeteer from 5.3.1 to 5.4.0 [#1267](https://github.com/jdalrymple/gitbeaker/pull/1267) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 25.1.0 (Tue Oct 20 2020)

#### 🐛 Bug Fix

- `@gitbeaker/browser`, `@gitbeaker/node`
  - RejectUnauthorized being set incorrectly for the NodeJS release [#1252](https://github.com/jdalrymple/gitbeaker/pull/1252) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `master`

- chore(deps-dev): bump lint-staged from 10.4.0 to 10.4.2 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### 🔩 Dependency Updates

- chore(deps-dev): bump eslint-config-prettier from 6.12.0 to 6.13.0 [#1249](https://github.com/jdalrymple/gitbeaker/pull/1249) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.30.0 to 2.32.0 [#1244](https://github.com/jdalrymple/gitbeaker/pull/1244) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.11.8 to 14.11.10 [#1246](https://github.com/jdalrymple/gitbeaker/pull/1246) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump query-string from 6.13.5 to 6.13.6 [#1245](https://github.com/jdalrymple/gitbeaker/pull/1245) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 9.54.5 to 9.59.1 [#1242](https://github.com/jdalrymple/gitbeaker/pull/1242) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 9.58.0 to 9.59.1 [#1239](https://github.com/jdalrymple/gitbeaker/pull/1239) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1238](https://github.com/jdalrymple/gitbeaker/pull/1238) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - chore(deps-dev): bump rollup-plugin-typescript2 from 0.27.3 to 0.28.0 [#1248](https://github.com/jdalrymple/gitbeaker/pull/1248) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 25.0.0 (Thu Oct 15 2020)

#### 💥 Breaking Change

- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/node`
  - Add approval rule management [#1233](https://github.com/jdalrymple/gitbeaker/pull/1233) ([@nlochschmidt](https://github.com/nlochschmidt))

#### Authors: 1

- Niklas Lochschmidt ([@nlochschmidt](https://github.com/nlochschmidt))

---

# 24.3.0 (Thu Oct 15 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Niklas Lochschmidt ([@nlochschmidt](https://github.com/nlochschmidt)), for all your work!

#### 💥 Feature

- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/node`
  - Add support for Freeze Periods [#1231](https://github.com/jdalrymple/gitbeaker/pull/1231) ([@nlochschmidt](https://github.com/nlochschmidt) [@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @auto-it/all-contributors from 9.54.0 to 9.54.5 [#1204](https://github.com/jdalrymple/gitbeaker/pull/1204) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1237](https://github.com/jdalrymple/gitbeaker/pull/1237) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 9.57.0 to 9.58.0 [#1236](https://github.com/jdalrymple/gitbeaker/pull/1236) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/core from 9.57.0 to 9.58.0 [#1234](https://github.com/jdalrymple/gitbeaker/pull/1234) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.29.0 to 2.30.0 [#1229](https://github.com/jdalrymple/gitbeaker/pull/1229) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.4.0 to 4.4.1 [#1228](https://github.com/jdalrymple/gitbeaker/pull/1228) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1230](https://github.com/jdalrymple/gitbeaker/pull/1230) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Niklas Lochschmidt ([@nlochschmidt](https://github.com/nlochschmidt))

---

# 24.2.0 (Tue Oct 13 2020)

#### 🐛 Bug Fix

- `@gitbeaker/requester-utils`
  - Handling nesting of not query parameter [#1223](https://github.com/jdalrymple/gitbeaker/pull/1223) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 24.1.0 (Mon Oct 12 2020)

#### 💥 Feature

- `@gitbeaker/core`
  - Adding MR rebase endpoint [#1225](https://github.com/jdalrymple/gitbeaker/pull/1225) ([@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- `@gitbeaker/node`
  - Agent-Type error for GotRequester [#1224](https://github.com/jdalrymple/gitbeaker/pull/1224) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump rollup from 2.23.1 to 2.29.0 [#1206](https://github.com/jdalrymple/gitbeaker/pull/1206) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 24.0.3 (Mon Oct 12 2020)

#### ⚠️ Pushed to `master`

- `@gitbeaker/browser`, `@gitbeaker/node`
  - perform retries on a wider range of error codes ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`, `@gitbeaker/node`
  - Wrapping error messages to avoid JSON.parse non json responses ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump all-contributors-cli from 6.18.0 to 6.19.0 [#1219](https://github.com/jdalrymple/gitbeaker/pull/1219) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor [#1216](https://github.com/jdalrymple/gitbeaker/pull/1216) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# (Sun Oct 11 2020)

#### ⚠️ Pushed to `master`

- `@gitbeaker/node`
  - Merge branch '1222-integration-stability' ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/node`
  - Embedding project creation prior to upload ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @types/node from 14.11.5 to 14.11.8 [#1215](https://github.com/jdalrymple/gitbeaker/pull/1215) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint from 7.10.0 to 7.11.0 [#1220](https://github.com/jdalrymple/gitbeaker/pull/1220) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 9.54.0 to 9.57.0 [#1213](https://github.com/jdalrymple/gitbeaker/pull/1213) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 9.54.4 to 9.57.0 [#1212](https://github.com/jdalrymple/gitbeaker/pull/1212) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-plugin-jest from 24.0.2 to 24.1.0 [#1190](https://github.com/jdalrymple/gitbeaker/pull/1190) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 24.0.1 (Sun Oct 11 2020)

#### 🐛 Bug Fix

- `@gitbeaker/node`
  - Adding pagination tests [#1186](https://github.com/jdalrymple/gitbeaker/pull/1186) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `master`

- `@gitbeaker/node`
  - Merge branch '1222-integration-stability' ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/node`
  - Skip pagination tests until stability is sorted ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @auto-it/first-time-contributor [#1207](https://github.com/jdalrymple/gitbeaker/pull/1207) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin [#1211](https://github.com/jdalrymple/gitbeaker/pull/1211) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump jest from 26.4.2 to 26.5.2 [#1192](https://github.com/jdalrymple/gitbeaker/pull/1192) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.11.2 to 14.11.5 [#1188](https://github.com/jdalrymple/gitbeaker/pull/1188) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump codecov from 3.7.2 to 3.8.0 [#1193](https://github.com/jdalrymple/gitbeaker/pull/1193) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 9.54.0 to 9.54.4 [#1199](https://github.com/jdalrymple/gitbeaker/pull/1199) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 4.3.0 to 4.4.0 [#1189](https://github.com/jdalrymple/gitbeaker/pull/1189) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### 📝 Documentation

- `@gitbeaker/core`
  - Updating incorrect showExtended->showExpanded property documentation [#1205](https://github.com/jdalrymple/gitbeaker/pull/1205) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 24.0.0 (Mon Oct 05 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Sander Cox ([@sandercox](https://github.com/sandercox)), for all your work!

#### 💥 Breaking Change

- `@gitbeaker/core`
  - Feature: Support keyset pagination [#1184](https://github.com/jdalrymple/gitbeaker/pull/1184) ([@max-wittig](https://github.com/max-wittig) [@jdalrymple](https://github.com/jdalrymple))

#### 💥 Feature

- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/node`
  - feat: Get runners for a group [#1182](https://github.com/jdalrymple/gitbeaker/pull/1182) ([@sandercox](https://github.com/sandercox) [@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump all-contributors-cli from 6.17.4 to 6.18.0 [#1185](https://github.com/jdalrymple/gitbeaker/pull/1185) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 9.53.1 to 9.54.0 [#1178](https://github.com/jdalrymple/gitbeaker/pull/1178) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump query-string from 6.13.4 to 6.13.5 [#1183](https://github.com/jdalrymple/gitbeaker/pull/1183) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor from 9.53.1 to 9.54.0 [#1180](https://github.com/jdalrymple/gitbeaker/pull/1180) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump auto from 9.53.1 to 9.54.0 [#1181](https://github.com/jdalrymple/gitbeaker/pull/1181) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin from 4.2.0 to 4.3.0 [#1170](https://github.com/jdalrymple/gitbeaker/pull/1170) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @types/jest-environment-puppeteer from 4.3.2 to 4.4.0 [#1169](https://github.com/jdalrymple/gitbeaker/pull/1169) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @typescript-eslint/parser from 4.2.0 to 4.3.0 [#1174](https://github.com/jdalrymple/gitbeaker/pull/1174) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump rollup-plugin-typescript2 from 0.27.2 to 0.27.3 [#1175](https://github.com/jdalrymple/gitbeaker/pull/1175) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump query-string from 6.13.3 to 6.13.4 [#1172](https://github.com/jdalrymple/gitbeaker/pull/1172) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump ts-jest from 26.4.0 to 26.4.1 [#1173](https://github.com/jdalrymple/gitbeaker/pull/1173) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/browser`
  - chore(deps): bump ky from 0.23.0 to 0.24.0 [#1171](https://github.com/jdalrymple/gitbeaker/pull/1171) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 4

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Max Wittig ([@max-wittig](https://github.com/max-wittig))
- Sander Cox ([@sandercox](https://github.com/sandercox))

---

# 23.7.0 (Tue Sep 29 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, null[@st1gok](https://github.com/st1gok), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Update CommitDiscussions.ts [#1168](https://github.com/jdalrymple/gitbeaker/pull/1168) ([@st1gok](https://github.com/st1gok) [@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump eslint-plugin-import from 2.22.0 to 2.22.1 [#1165](https://github.com/jdalrymple/gitbeaker/pull/1165) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`
  - chore(deps-dev): bump @rollup/plugin-commonjs from 14.0.0 to 15.1.0 [#1166](https://github.com/jdalrymple/gitbeaker/pull/1166) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`
  - chore(deps-dev): bump @rollup/plugin-node-resolve from 8.4.0 to 9.0.0 [#1164](https://github.com/jdalrymple/gitbeaker/pull/1164) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- [@st1gok](https://github.com/st1gok)
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 23.6.0 (Mon Sep 28 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, xieyu ([@Gkxie](https://github.com/Gkxie)), for all your work!

#### 🚀 Enhancement

- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Restructuring the requester utils and update the related typings [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Updating terser usage to be only on the browser release [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`
  - Externalize formdata [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))

#### 💥 Feature

- `@gitbeaker/browser`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Apply exponential backoff for 429 errors ([@max-wittig](https://github.com/max-wittig))

#### 🐛 Bug Fix

- `@gitbeaker/node`
  - fix(node): Error response body needs parsing first when it's type is json [#1057](https://github.com/jdalrymple/gitbeaker/pull/1057) ([@Gkxie](https://github.com/Gkxie) [@jdalrymple](https://github.com/jdalrymple))

#### 🏿‍♀️ Security

- chore(deps): [security] bump dot-prop from 4.2.0 to 4.2.1 [#1089](https://github.com/jdalrymple/gitbeaker/pull/1089) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Update ts-node [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/node`
  - Updating node deps [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`
  - Updating browser deps [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/cli`
  - Updating cli deps [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`
  - Updating core deps [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/requester-utils`
  - Updating requester-utils deps [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - chore(deps-dev): bump typescript from 3.9.7 to 4.0.3 [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- Updating linting deps [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- Dependency Updates [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- Further package updates [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): [security] bump node-fetch from 2.6.0 to 2.6.1 [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump prettier from 2.0.5 to 2.1.2 [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/jest from 26.0.10 to 26.0.14 [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump lint-staged from 10.2.11 to 10.4.0 [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump got from 11.5.2 to 11.7.0 [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 14.0.27 to 14.11.2 [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- Updating auto deps [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/node`
  - Updating openpgp [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/requester-utils`
  - update rollup for requester utils [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @types/jest from 26.0.9 to 26.0.10 [#1087](https://github.com/jdalrymple/gitbeaker/pull/1087) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - chore(deps-dev): bump rollup-plugin-terser from 6.1.0 to 7.0.0 [#1058](https://github.com/jdalrymple/gitbeaker/pull/1058) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/cli`
  - chore(deps): bump ora from 4.1.1 to 5.0.0 [#1059](https://github.com/jdalrymple/gitbeaker/pull/1059) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### 📝 Documentation

- fix(docs): Change `npm` to `yarn` for development [#1107](https://github.com/jdalrymple/gitbeaker/pull/1107) ([@kiprasmel](https://github.com/kiprasmel) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 5

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Kipras Melnikovas ([@kiprasmel](https://github.com/kiprasmel))
- Max Wittig ([@max-wittig](https://github.com/max-wittig))
- xieyu ([@Gkxie](https://github.com/Gkxie))

---

# 23.5.0 (Sun Aug 09 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Kipras Melnikovas ([@kiprasmel](https://github.com/kiprasmel)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/browser`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Fixing check for FormData [#1056](https://github.com/jdalrymple/gitbeaker/pull/1056) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`
  - fix(browser): return early if response headers empty [#1034](https://github.com/jdalrymple/gitbeaker/pull/1034) ([@kiprasmel](https://github.com/kiprasmel))

#### 🔩 Dependency Updates

- chore(deps-dev): bump auto from 9.48.1 to 9.49.5 [#1052](https://github.com/jdalrymple/gitbeaker/pull/1052) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 9.48.1 to 9.50.0 [#1053](https://github.com/jdalrymple/gitbeaker/pull/1053) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @types/jest from 26.0.4 to 26.0.9 [#1047](https://github.com/jdalrymple/gitbeaker/pull/1047) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @types/node from 14.0.20 to 14.0.27 [#1024](https://github.com/jdalrymple/gitbeaker/pull/1024) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump eslint-plugin-jest from 23.18.0 to 23.20.0 [#1033](https://github.com/jdalrymple/gitbeaker/pull/1033) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump openpgp from 4.10.6 to 4.10.7 [#1005](https://github.com/jdalrymple/gitbeaker/pull/1005) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @auto-it/first-time-contributor from 9.47.1 to 9.49.5 [#1051](https://github.com/jdalrymple/gitbeaker/pull/1051) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump all-contributors-cli from 6.16.1 to 6.17.0 [#1019](https://github.com/jdalrymple/gitbeaker/pull/1019) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps): bump ora from 4.0.4 to 4.0.5 [#1008](https://github.com/jdalrymple/gitbeaker/pull/1008) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump rollup from 2.21.0 to 2.23.0 [#1012](https://github.com/jdalrymple/gitbeaker/pull/1012) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump auto from 9.47.0 to 9.48.1 [#1014](https://github.com/jdalrymple/gitbeaker/pull/1014) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor from 9.43.1 to 9.47.1 [#997](https://github.com/jdalrymple/gitbeaker/pull/997) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @rollup/plugin-node-resolve from 8.1.0 to 8.4.0 [#965](https://github.com/jdalrymple/gitbeaker/pull/965) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump codecov from 3.7.1 to 3.7.2 [#999](https://github.com/jdalrymple/gitbeaker/pull/999) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @auto-it/all-contributors from 9.43.1 to 9.47.1 [#996](https://github.com/jdalrymple/gitbeaker/pull/996) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @auto-it/released from 9.47.0 to 9.47.1 [#994](https://github.com/jdalrymple/gitbeaker/pull/994) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`
  - chore(deps-dev): bump puppeteer from 5.0.0 to 5.2.1 [#1000](https://github.com/jdalrymple/gitbeaker/pull/1000) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`
  - chore(deps-dev): bump @rollup/plugin-commonjs from 13.0.0 to 14.0.0 [#973](https://github.com/jdalrymple/gitbeaker/pull/973) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`
  - chore(deps): bump ky from 0.21.0 to 0.23.0 [#1001](https://github.com/jdalrymple/gitbeaker/pull/1001) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Kipras Melnikovas ([@kiprasmel](https://github.com/kiprasmel))

---

# 23.4.2 (Wed Jul 22 2020)

---

# 23.4.1 (Wed Jul 22 2020)

#### 🏿‍♀️ Security

- [security] chore(deps-dev): bump codecov from 3.7.0 to 3.7.1 [#991](https://github.com/jdalrymple/gitbeaker/pull/991) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump typescript from 3.9.6 to 3.9.7 [#992](https://github.com/jdalrymple/gitbeaker/pull/992) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @auto-it/core from 9.47.0 to 9.47.1 [#995](https://github.com/jdalrymple/gitbeaker/pull/995) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 9.46.0 to 9.47.0 [#988](https://github.com/jdalrymple/gitbeaker/pull/988) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump openpgp from 4.10.4 to 4.10.6 [#989](https://github.com/jdalrymple/gitbeaker/pull/989) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps): bump got from 11.5.0 to 11.5.1 [#990](https://github.com/jdalrymple/gitbeaker/pull/990) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 9.43.1 to 9.46.0 [#981](https://github.com/jdalrymple/gitbeaker/pull/981) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/browser`
  - chore(deps): bump ky from 0.20.0 to 0.21.0 [#961](https://github.com/jdalrymple/gitbeaker/pull/961) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 23.4.0 (Sun Jul 12 2020)

#### 🐛 Bug Fix

- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Updating min node version supported [#957](https://github.com/jdalrymple/gitbeaker/pull/957) ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`, `@gitbeaker/node`
  - Fixing encoding for requests of archive data [#954](https://github.com/jdalrymple/gitbeaker/pull/954) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 23.3.0 (Sat Jul 11 2020)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fixing type definitions for optional arguments [#956](https://github.com/jdalrymple/gitbeaker/pull/956) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 23.2.0 (Wed Jul 08 2020)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fixing closes_issues endpoint [#953](https://github.com/jdalrymple/gitbeaker/pull/953) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 23.1.0 (Wed Jul 08 2020)

#### 🐛 Bug Fix

- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/requester-utils`
  - Fixing up the Type exports for all the distributed libraries [#795](https://github.com/jdalrymple/gitbeaker/pull/795) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `master`

- Removing exec plugin for auto in favour of local plugin ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @auto-it/exec from 9.41.1 to 9.43.0 [#948](https://github.com/jdalrymple/gitbeaker/pull/948) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump auto from 9.41.1 to 9.43.0 [#942](https://github.com/jdalrymple/gitbeaker/pull/942) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/jest from 26.0.0 to 26.0.4 [#937](https://github.com/jdalrymple/gitbeaker/pull/937) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @types/jest-environment-puppeteer from 4.3.1 to 4.3.2 [#910](https://github.com/jdalrymple/gitbeaker/pull/910) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @types/puppeteer from 3.0.0 to 3.0.1 [#926](https://github.com/jdalrymple/gitbeaker/pull/926) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @types/node from 14.0.13 to 14.0.18 [#936](https://github.com/jdalrymple/gitbeaker/pull/936) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-plugin-jest from 23.16.0 to 23.18.0 [#933](https://github.com/jdalrymple/gitbeaker/pull/933) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @auto-it/first-time-contributor from 9.39.0 to 9.41.1 [#935](https://github.com/jdalrymple/gitbeaker/pull/935) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @rollup/plugin-node-resolve from 8.0.1 to 8.1.0 [#909](https://github.com/jdalrymple/gitbeaker/pull/909) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump auto from 9.39.0 to 9.41.1 [#934](https://github.com/jdalrymple/gitbeaker/pull/934) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/exec from 9.39.0 to 9.41.1 [#938](https://github.com/jdalrymple/gitbeaker/pull/938) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/browser`
  - chore(deps-dev): bump puppeteer from 4.0.0 to 5.0.0 [#928](https://github.com/jdalrymple/gitbeaker/pull/928) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 23.0.0 (Tue Jul 07 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, s-kazuki ([@s-kazuki](https://github.com/s-kazuki)), for all your work!

#### 💥 Breaking Change

- `@gitbeaker/core`
  - :up: create todos for issues [#925](https://github.com/jdalrymple/gitbeaker/pull/925) ([@s-kazuki](https://github.com/s-kazuki))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @auto-it/released from 9.39.0 to 9.40.5 [#922](https://github.com/jdalrymple/gitbeaker/pull/922) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- s-kazuki ([@s-kazuki](https://github.com/s-kazuki))

---

# 22.0.1 (Thu Jun 25 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Flavien Bridault ([@fbridault](https://github.com/fbridault)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Add `related merge requests` and `closed by` in Issues service [#903](https://github.com/jdalrymple/gitbeaker/pull/903) ([@fbridault](https://github.com/fbridault) [@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump lint-staged from 10.2.10 to 10.2.11 [#899](https://github.com/jdalrymple/gitbeaker/pull/899) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.16.1 to 2.18.0 [#905](https://github.com/jdalrymple/gitbeaker/pull/905) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-plugin-jest from 23.13.2 to 23.16.0 [#906](https://github.com/jdalrymple/gitbeaker/pull/906) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Flavien Bridault ([@fbridault](https://github.com/fbridault))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 22.0.0 (Sat Jun 20 2020)

#### 💥 Breaking Change

- `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Reach > 90% coverage and add Integration Testing [#709](https://github.com/jdalrymple/gitbeaker/pull/709) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump rollup from 2.16.0 to 2.16.1 [#889](https://github.com/jdalrymple/gitbeaker/pull/889) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump eslint-plugin-prettier from 3.1.3 to 3.1.4 [#891](https://github.com/jdalrymple/gitbeaker/pull/891) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @types/jest from 25.2.3 to 26.0.0 [#892](https://github.com/jdalrymple/gitbeaker/pull/892) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/browser`
  - chore(deps-dev): bump puppeteer from 3.1.0 to 4.0.0 [#895](https://github.com/jdalrymple/gitbeaker/pull/895) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 21.7.0 (Tue Jun 16 2020)

#### 🐛 Bug Fix

- `@gitbeaker/requester-utils`
  - Fixing extendClass function to properly handle custom configuration passed to constructor [#896](https://github.com/jdalrymple/gitbeaker/pull/896) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 21.6.0 (Tue Jun 16 2020)

#### 🐛 Bug Fix

- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Removal of esinterlop to prefer namespace imports over default exports [#893](https://github.com/jdalrymple/gitbeaker/pull/893) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 21.5.0 (Sun Jun 14 2020)

#### 🐛 Bug Fix

- `@gitbeaker/cli`
  - Update docs for positional args and switch to parseAndExit [#888](https://github.com/jdalrymple/gitbeaker/pull/888) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 21.4.0 (Sun Jun 14 2020)

#### 🐛 Bug Fix

- `@gitbeaker/requester-utils`
  - Adding more tests and adjusting Form Data import [#887](https://github.com/jdalrymple/gitbeaker/pull/887) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 21.3.0 (Sun Jun 14 2020)

#### ⚠️ Pushed to `master`

- Updating auto config to include test PRs ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 21.1.0 (Sun Jun 14 2020)

#### 🐛 Bug Fix

- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`
  - Fixing missing CLI tests and modifyServices function [#886](https://github.com/jdalrymple/gitbeaker/pull/886) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `master`

- Adding back auto config ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 21.0.1 (Fri Jun 12 2020)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Yevgeny Petukhov ([@yepninja](https://github.com/yepninja))

:heart: Mickaël Tricot ([@mickaeltr](https://github.com/mickaeltr))

:heart: Andrea ([@andreasciamanna](https://github.com/andreasciamanna))

#### 💥 Breaking Change

- `@gitbeaker/core`
  - Adjust casing to be properly handled by the conversion to snake case in the CLI [#857](https://github.com/jdalrymple/gitbeaker/pull/857) ([@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- Documentation update for 19.x [#879](https://github.com/jdalrymple/gitbeaker/pull/879) ([@mickaeltr](https://github.com/mickaeltr) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`
  - Issue links (get, delete) [#868](https://github.com/jdalrymple/gitbeaker/pull/868) ([@yepninja](https://github.com/yepninja) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`
  - Add YouTrack to the supported services [#853](https://github.com/jdalrymple/gitbeaker/pull/853) ([@andreasciamanna](https://github.com/andreasciamanna))

#### 👷🏼‍♀️ Technical Debt

- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Remove Gitlab Instance dependency for CLI tests [#883](https://github.com/jdalrymple/gitbeaker/pull/883) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `master`

- Create SECURITY.md ([@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/core`
  - Additional linting ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump auto from 9.37.0 to 9.39.0 [#884](https://github.com/jdalrymple/gitbeaker/pull/884) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor from 9.36.4 to 9.39.0 [#877](https://github.com/jdalrymple/gitbeaker/pull/877) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @rollup/plugin-node-resolve from 7.1.3 to 8.0.1 [#874](https://github.com/jdalrymple/gitbeaker/pull/874) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @auto-it/exec from 9.36.4 to 9.39.0 [#875](https://github.com/jdalrymple/gitbeaker/pull/875) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump rollup from 2.10.2 to 2.15.0 [#878](https://github.com/jdalrymple/gitbeaker/pull/878) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump lerna from 3.21.0 to 3.22.1 [#880](https://github.com/jdalrymple/gitbeaker/pull/880) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump lint-staged from 10.2.2 to 10.2.7 [#848](https://github.com/jdalrymple/gitbeaker/pull/848) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @types/jest from 25.2.2 to 25.2.3 [#824](https://github.com/jdalrymple/gitbeaker/pull/824) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump codecov from 3.6.5 to 3.7.0 [#820](https://github.com/jdalrymple/gitbeaker/pull/820) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 9.32.3 to 9.37.0 [#855](https://github.com/jdalrymple/gitbeaker/pull/855) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin from 2.33.0 to 2.34.0 [#818](https://github.com/jdalrymple/gitbeaker/pull/818) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/exec from 9.32.3 to 9.36.4 [#851](https://github.com/jdalrymple/gitbeaker/pull/851) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump puppeteer from 3.0.4 to 3.2.0 [#856](https://github.com/jdalrymple/gitbeaker/pull/856) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @auto-it/first-time-contributor from 9.32.3 to 9.36.4 [#852](https://github.com/jdalrymple/gitbeaker/pull/852) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @typescript-eslint/parser from 2.33.0 to 2.34.0 [#821](https://github.com/jdalrymple/gitbeaker/pull/821) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @auto-it/all-contributors from 9.32.0 to 9.33.2 [#814](https://github.com/jdalrymple/gitbeaker/pull/814) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.9.1 to 2.10.2 [#802](https://github.com/jdalrymple/gitbeaker/pull/802) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump lerna from 3.20.2 to 3.21.0 [#803](https://github.com/jdalrymple/gitbeaker/pull/803) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-plugin-jest from 23.10.0 to 23.13.1 [#805](https://github.com/jdalrymple/gitbeaker/pull/805) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/exec from 9.32.0 to 9.32.3 [#806](https://github.com/jdalrymple/gitbeaker/pull/806) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump typescript from 3.8.3 to 3.9.2 [#809](https://github.com/jdalrymple/gitbeaker/pull/809) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump got from 11.1.3 to 11.1.4 [#808](https://github.com/jdalrymple/gitbeaker/pull/808) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 9.32.0 to 9.32.3 [#811](https://github.com/jdalrymple/gitbeaker/pull/811) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/jest from 25.2.1 to 25.2.2 [#812](https://github.com/jdalrymple/gitbeaker/pull/812) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor from 9.32.0 to 9.32.3 [#810](https://github.com/jdalrymple/gitbeaker/pull/810) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/browser`
  - chore(deps-dev): bump @rollup/plugin-commonjs from 11.1.0 to 13.0.0 [#876](https://github.com/jdalrymple/gitbeaker/pull/876) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))
- `@gitbeaker/browser`
  - chore(deps): bump ky from 0.19.1 to 0.20.0 [#804](https://github.com/jdalrymple/gitbeaker/pull/804) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 5

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Andrea ([@andreasciamanna](https://github.com/andreasciamanna))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Mickaël Tricot ([@mickaeltr](https://github.com/mickaeltr))
- Yevgeny Petukhov ([@yepninja](https://github.com/yepninja))

---

# 19.7.0 (Sun May 17 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, null[@xatavian](https://github.com/xatavian), for all your work!

#### 🚀 Enhancement

- `@gitbeaker/core`
  - Feature: Arbitrary parameters for Projects.search [#801](https://github.com/jdalrymple/gitbeaker/pull/801) (avi.szychter@trialog.com [@xatavian](https://github.com/xatavian))

#### Authors: 2

- [@xatavian](https://github.com/xatavian)
- Avi SZYCHTER (avi.szychter@trialog.com)

---

# 19.6.0 (Sat May 16 2020)

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Project upload is not formatting form-data correctly [#797](https://github.com/jdalrymple/gitbeaker/pull/797) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependencies

- chore(deps-dev): bump auto from 9.31.1 to 9.32.0 [#787](https://github.com/jdalrymple/gitbeaker/pull/787) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup-plugin-typescript2 from 0.27.0 to 0.27.1 [#789](https://github.com/jdalrymple/gitbeaker/pull/789) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/puppeteer from 2.0.1 to 2.1.0 [#783](https://github.com/jdalrymple/gitbeaker/pull/783) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/all-contributors from 9.31.1 to 9.32.0 [#786](https://github.com/jdalrymple/gitbeaker/pull/786) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 9.31.1 to 9.32.0 [#788](https://github.com/jdalrymple/gitbeaker/pull/788) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor from 9.31.1 to 9.32.0 [#784](https://github.com/jdalrymple/gitbeaker/pull/784) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/exec from 9.31.1 to 9.32.0 [#782](https://github.com/jdalrymple/gitbeaker/pull/782) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 2.31.0 to 2.33.0 [#791](https://github.com/jdalrymple/gitbeaker/pull/791) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin from 2.31.0 to 2.33.0 [#792](https://github.com/jdalrymple/gitbeaker/pull/792) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - chore(deps-dev): bump @types/node from 13.13.5 to 14.0.1 [#790](https://github.com/jdalrymple/gitbeaker/pull/790) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### 📝 Documentation

- `@gitbeaker/core`
  - Update typing to specify that the path or name property must be passed [#796](https://github.com/jdalrymple/gitbeaker/pull/796) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 19.5.1 (Mon May 11 2020)

---

# 19.5.0 (Mon May 11 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Corentin Mors ([@Mikescops](https://github.com/Mikescops)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/core`
  - Fix: Update DELETE method to POST in todos.done() [#780](https://github.com/jdalrymple/gitbeaker/pull/780) ([@Mikescops](https://github.com/Mikescops))

#### 🔩 Dependencies

- chore(deps-dev): bump ts-jest from 25.5.0 to 25.5.1 [#775](https://github.com/jdalrymple/gitbeaker/pull/775) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.8.2 to 2.9.1 [#776](https://github.com/jdalrymple/gitbeaker/pull/776) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-plugin-jest from 23.9.0 to 23.10.0 [#777](https://github.com/jdalrymple/gitbeaker/pull/777) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump got from 11.1.1 to 11.1.3 [#778](https://github.com/jdalrymple/gitbeaker/pull/778) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump got from 11.1.0 to 11.1.1 [#769](https://github.com/jdalrymple/gitbeaker/pull/769) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump ts-jest from 25.4.0 to 25.5.0 [#771](https://github.com/jdalrymple/gitbeaker/pull/771) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump puppeteer from 3.0.2 to 3.0.4 [#773](https://github.com/jdalrymple/gitbeaker/pull/773) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.8.0 to 2.8.2 [#774](https://github.com/jdalrymple/gitbeaker/pull/774) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Corentin Mors ([@Mikescops](https://github.com/Mikescops))

---

# 19.4.0 (Wed May 06 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Dylan M. Taylor ([@dylanmtaylor](https://github.com/dylanmtaylor)), for all your work!

#### 💥 Feature

- `@gitbeaker/core`
  - Add Deploy tokens API [#762](https://github.com/jdalrymple/gitbeaker/pull/762) ([@jdalrymple](https://github.com/jdalrymple) [@dylanmtaylor](https://github.com/dylanmtaylor))

#### ⚠️ Pushed to `master`

- `@gitbeaker/core`
  - Merge branch 'deploy-fix' ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependencies

- chore(deps-dev): bump rollup from 2.7.6 to 2.8.0 [#765](https://github.com/jdalrymple/gitbeaker/pull/765) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin from 2.30.0 to 2.31.0 [#767](https://github.com/jdalrymple/gitbeaker/pull/767) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 13.13.4 to 13.13.5 [#766](https://github.com/jdalrymple/gitbeaker/pull/766) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Dylan M. Taylor ([@dylanmtaylor](https://github.com/dylanmtaylor))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 19.3.1 (Tue May 05 2020)

#### 👷🏼‍♀️ Technical Debt

- Add Prettierignore file [#761](https://github.com/jdalrymple/gitbeaker/pull/761) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `master`

- Fixing a merge conflict ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependencies

- chore(deps-dev): bump @auto-it/all-contributors from 9.30.3 to 9.31.1 [#752](https://github.com/jdalrymple/gitbeaker/pull/752) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/first-time-contributor from 9.30.3 to 9.31.1 [#755](https://github.com/jdalrymple/gitbeaker/pull/755) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 2.30.0 to 2.31.0 [#756](https://github.com/jdalrymple/gitbeaker/pull/756) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-plugin-jest from 23.8.2 to 23.9.0 [#753](https://github.com/jdalrymple/gitbeaker/pull/753) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump ts-node from 8.9.1 to 8.10.1 [#746](https://github.com/jdalrymple/gitbeaker/pull/746) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump got from 11.0.3 to 11.1.0 [#745](https://github.com/jdalrymple/gitbeaker/pull/745) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump jest from 25.5.3 to 25.5.4 [#744](https://github.com/jdalrymple/gitbeaker/pull/744) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/exec from 9.30.3 to 9.31.1 [#754](https://github.com/jdalrymple/gitbeaker/pull/754) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump auto from 9.30.3 to 9.31.1 [#758](https://github.com/jdalrymple/gitbeaker/pull/758) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### 📝 Documentation

- Updating the pagination documentation [#760](https://github.com/jdalrymple/gitbeaker/pull/760) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 19.3.0 (Fri May 01 2020)

#### 🐛 Bug Fix

- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/requester-utils`
  - Fixing types field to utils and browser package.json [#742](https://github.com/jdalrymple/gitbeaker/pull/742) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependencies

- chore(deps-dev): bump rollup from 2.7.3 to 2.7.6 [#738](https://github.com/jdalrymple/gitbeaker/pull/738) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump got from 11.0.2 to 11.0.3 [#741](https://github.com/jdalrymple/gitbeaker/pull/741) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump jest from 25.5.0 to 25.5.3 [#740](https://github.com/jdalrymple/gitbeaker/pull/740) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump lint-staged from 10.2.0 to 10.2.2 [#739](https://github.com/jdalrymple/gitbeaker/pull/739) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 19.2.0 (Wed Apr 29 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Daniel Moore ([@danielmoore](https://github.com/danielmoore)), for all your work!

#### 🐛 Bug Fix

- `@gitbeaker/browser`, `@gitbeaker/core`, `@gitbeaker/node`
  - Add types field to node and browser package.json [#737](https://github.com/jdalrymple/gitbeaker/pull/737) ([@danielmoore](https://github.com/danielmoore))

#### ⚠️ Pushed to `master`

- Linting [skip-ci](<[@jdalrymple](https://github.com/jdalrymple)>)

#### 🔩 Dependencies

- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/auto-9.30.3' [#730](https://github.com/jdalrymple/gitbeaker/pull/730) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/puppeteer-3.0.2' [#735](https://github.com/jdalrymple/gitbeaker/pull/735) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/auto-it/all-contributors-9.30.3' [#731](https://github.com/jdalrymple/gitbeaker/pull/731) ([@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump @auto-it/first-time-contributor from 9.30.2 to 9.30.3 [#729](https://github.com/jdalrymple/gitbeaker/pull/729) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.7.2 to 2.7.3 [#733](https://github.com/jdalrymple/gitbeaker/pull/733) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/eslint-plugin from 2.29.0 to 2.30.0 [#732](https://github.com/jdalrymple/gitbeaker/pull/732) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump jest from 25.4.0 to 25.5.0 [#734](https://github.com/jdalrymple/gitbeaker/pull/734) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump lint-staged from 10.1.7 to 10.2.0 [#736](https://github.com/jdalrymple/gitbeaker/pull/736) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 2.29.0 to 2.30.0 [#728](https://github.com/jdalrymple/gitbeaker/pull/728) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 9.30.2 to 9.30.3 [#727](https://github.com/jdalrymple/gitbeaker/pull/727) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Daniel Moore ([@danielmoore](https://github.com/danielmoore))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 19.1.0 (Mon Apr 27 2020)

#### 🚀 Enhancement

- `@gitbeaker/core`
  - feats: adds options interface for MergeRequest.all() [#606](https://github.com/jdalrymple/gitbeaker/pull/606) ([@AlvaroBernalG](https://github.com/AlvaroBernalG) [@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `master`

- Linting [skip-ci](<[@jdalrymple](https://github.com/jdalrymple)>)

#### 🔩 Dependencies

- chore(deps-dev): bump @auto-it/first-time-contributor from 9.30.1 to 9.30.2 [#722](https://github.com/jdalrymple/gitbeaker/pull/722) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 13.13.2 to 13.13.4 [#724](https://github.com/jdalrymple/gitbeaker/pull/724) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @auto-it/released from 9.30.1 to 9.30.2 [#725](https://github.com/jdalrymple/gitbeaker/pull/725) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump ts-node from 8.9.0 to 8.9.1 [#726](https://github.com/jdalrymple/gitbeaker/pull/726) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Alvaro ([@AlvaroBernalG](https://github.com/AlvaroBernalG))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 19.0.0 (Thu Apr 23 2020)

#### 💥 Breaking Change

- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Adding CLI Integration Tests and Preferring named exports [#711](https://github.com/jdalrymple/gitbeaker/pull/711) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 18.2.0 (Wed Apr 22 2020)

#### 🐛 Bug Fix

- `@gitbeaker/browser`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - Updating agent property based on new changes in Got [#712](https://github.com/jdalrymple/gitbeaker/pull/712) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependencies

- chore(deps-dev): bump @types/node from 13.13.1 to 13.13.2 [#700](https://github.com/jdalrymple/gitbeaker/pull/700) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.6.1 to 2.7.1 [#703](https://github.com/jdalrymple/gitbeaker/pull/703) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# 18.1.0 (Wed Apr 22 2020)

#### 🚀 Enhancement

- `@gitbeaker/browser`
  - Adding integration tests for the browser usage [#697](https://github.com/jdalrymple/gitbeaker/pull/697) ([@jdalrymple](https://github.com/jdalrymple))

#### 📝 Documentation

- Update CHANGELOG.md [#696](https://github.com/jdalrymple/gitbeaker/pull/696) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependencies

- chore(deps-dev): bump ts-node from 8.8.2 to 8.9.0 [#695](https://github.com/jdalrymple/gitbeaker/pull/695) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v18.0.0 (Tue Apr 21 2020)

#### 💥 Breaking Change

- `@gitbeaker/core`
  - feat: Updated an API parameter for GitLab 12.9 [#647](https://github.com/jdalrymple/gitbeaker/pull/647) ([@schindld](https://github.com/schindld))

#### ⚠️ Pushed to `master`

- docs: Updating README badges ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@schindld](https://github.com/schindld)
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v17.0.2 (Sun Apr 19 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, akira345 ([@akira345](https://github.com/akira345)), for all your work!

#### 🐛 Bug Fix

- Testing out auto as a release system [#693](https://github.com/jdalrymple/gitbeaker/pull/693) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `master`

- Label configuration updates ([@jdalrymple](https://github.com/jdalrymple))
- docs: Update documentation for browser imports ([@jdalrymple](https://github.com/jdalrymple))
- Create FUNDING.yml ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependencies

- chore(deps-dev): bump @semantic-release/changelog from 5.0.0 to 5.0.1 [#650](https://github.com/jdalrymple/gitbeaker/pull/650) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump eslint-plugin-import from 2.20.1 to 2.20.2 [#655](https://github.com/jdalrymple/gitbeaker/pull/655) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps): bump sywac from 1.2.2 to 1.3.0 [#657](https://github.com/jdalrymple/gitbeaker/pull/657) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @typescript-eslint/parser from 2.25.0 to 2.26.0 [#661](https://github.com/jdalrymple/gitbeaker/pull/661) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump ts-jest from 25.2.1 to 25.3.0 [#662](https://github.com/jdalrymple/gitbeaker/pull/662) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump @types/node from 13.9.3 to 13.9.8 [#663](https://github.com/jdalrymple/gitbeaker/pull/663) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump lint-staged from 10.0.9 to 10.1.1 [#664](https://github.com/jdalrymple/gitbeaker/pull/664) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup from 2.2.0 to 2.3.2 [#665](https://github.com/jdalrymple/gitbeaker/pull/665) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@gitbeaker/browser`, `@gitbeaker/cli`, `@gitbeaker/core`, `@gitbeaker/node`, `@gitbeaker/requester-utils`
  - chore(deps-dev): bump rollup-plugin-typescript2 from 0.26.0 to 0.27.0 [#654](https://github.com/jdalrymple/gitbeaker/pull/654) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### 📝 Documentation

- Add example code into README.md [#639](https://github.com/jdalrymple/gitbeaker/pull/639) ([@akira345](https://github.com/akira345))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- akira345 ([@akira345](https://github.com/akira345))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## [17.0.1](https://github.com/jdalrymple/gitbeaker/compare/17.0.0...17.0.1) (2020-03-24)

### Bug Fixes

- Version updates ([2db0be8](https://github.com/jdalrymple/gitbeaker/commit/2db0be83099be589af956dbac5e201e29e09f7cf))

# [17.0.0](https://github.com/jdalrymple/gitbeaker/compare/16.0.0...17.0.0) (2020-03-24)

### Bug Fixes

- **core:** Adding better handling for form type arguments ([#570](https://github.com/jdalrymple/gitbeaker/issues/570)) ([4751ed2](https://github.com/jdalrymple/gitbeaker/commit/4751ed225fd8df6ac23200e92473ba8346901dbe)), closes [#568](https://github.com/jdalrymple/gitbeaker/issues/568)

### BREAKING CHANGES

- **core:** Trigger.pipeline now has a defined variables property to house all the pipeline variables to be set. Before these variables were set on the root object, but this made it difficult to parse any future options that may be added to this function.

# [16.0.0](https://github.com/jdalrymple/gitbeaker/compare/15.2.0...16.0.0) (2020-03-24)

- Fixed variable name for registry method, as per … (#646) ([992b809](https://github.com/jdalrymple/gitbeaker/commit/992b809cb10959ea8c5c8d16ab7f8713b102da72)), closes [#646](https://github.com/jdalrymple/gitbeaker/issues/646)

### BREAKING CHANGES

- 🧨 A `removeTags` method parameter name changed from tagNameRegex to nameRegex. Works with GitLab 12.x.

Co-authored-by: Joseph Petersen <josephp90@gmail.com>

# [15.2.0](https://github.com/jdalrymple/gitbeaker/compare/15.1.0...15.2.0) (2020-03-22)

### Features

- **core:** Override arguments in all template children ([#597](https://github.com/jdalrymple/gitbeaker/issues/597)) ([d9c97d4](https://github.com/jdalrymple/gitbeaker/commit/d9c97d44d1a64aafbe0fed9404a714dd2de010cb))

# [15.1.0](https://github.com/jdalrymple/gitbeaker/compare/15.0.0...15.1.0) (2020-03-22)

### Features

- Add typing to project and group variables ([#620](https://github.com/jdalrymple/gitbeaker/issues/620)) ([70f39ab](https://github.com/jdalrymple/gitbeaker/commit/70f39ab4310722ea8e61b0309f445ebea758f833))

# [15.0.0](https://github.com/jdalrymple/gitbeaker/compare/14.2.2...15.0.0) (2020-03-22)

### Bug Fixes

- **gitbeaker-core:** 🐛 Notification Settings API special PUT requests ([6c748ec](https://github.com/jdalrymple/gitbeaker/commit/6c748eceb441209a1862bad2790c4c4c1d0bd5e6))
- **gitbeaker-core:** 🐛 ResourceTemplate.show was using the wrong http method ([e068e6a](https://github.com/jdalrymple/gitbeaker/commit/e068e6a0e2ccbaa307d82e8ccecede6d05133805))

### Code Refactoring

- **gitbeaker-core:** 💡 Adjusted the argument order for ResourceAwardEmojis ([348f6c1](https://github.com/jdalrymple/gitbeaker/commit/348f6c1870636d2e3b774c382d1b34e63e9c2aaa))
- **gitbeaker-core:** 💡 Updated the function header for Group.create ([4a3906a](https://github.com/jdalrymple/gitbeaker/commit/4a3906ad358c3903604a44e3278053befd95bef8))
- **gitbeaker-core:** 💡 Updated the License API ([2e9e580](https://github.com/jdalrymple/gitbeaker/commit/2e9e58013bad81187f6bd648905f072c240538a9))
- 💡 Migrated to a monorepo structure ([d9cd4c9](https://github.com/jdalrymple/gitbeaker/commit/d9cd4c9a913d62da7d8337a989bc7bf97d9cc015))

### Features

- **gitbeaker-cli:** 🎸 Added support for GITBEAKER\_[Property] env variable ([6851800](https://github.com/jdalrymple/gitbeaker/commit/6851800ca84e6c26ab555558d07ce38d069d5705))

### BREAKING CHANGES

- **gitbeaker-core:** 🧨 The order of arguments that include both the awardId and noteId has changed. It is now projectId, resourceId, noteId, and then awardId. This affects the award, remove and show functions.
- **gitbeaker-core:** 🧨 Changed the spelling of the License API from Licence to License. Additionally the license.create method has been replaced with license.add and has a required first parameter that is the license. The license.all method now returns all licenses and no longer the license
  for the current user. This is now done by license.show.
- **gitbeaker-core:** 🧨 Group.create takes an additional argument
- 🧨 This migration requires users to import specific subpackages. For NodeJS
  usage, that would be @gitbeaker/node.

## [14.2.2](https://github.com/jdalrymple/node-gitlab/compare/14.2.1...14.2.2) (2020-01-30)

### Bug Fixes

- Incorrect request method in MergeRequests.approvalState() method ([#586](https://github.com/jdalrymple/node-gitlab/issues/586)) ([cb5f822](https://github.com/jdalrymple/node-gitlab/commit/cb5f8228ca1f64cc55b79e1ef475c3d49568267a))

## [14.2.1](https://github.com/jdalrymple/node-gitlab/compare/14.2.0...14.2.1) (2020-01-20)

### Bug Fixes

- added file extension for dummy file name in project import ([#561](https://github.com/jdalrymple/node-gitlab/issues/561)) ([f45cb68](https://github.com/jdalrymple/node-gitlab/commit/f45cb68498b54a2ad1ab1371589d0152d76adf11)), closes [/gitlab.com/gitlab-org/gitlab-foss/issues/50944#note_101737263](https://github.com//gitlab.com/gitlab-org/gitlab-foss/issues/50944/issues/note_101737263)

# [14.2.0](https://github.com/jdalrymple/node-gitlab/compare/14.1.1...14.2.0) (2020-01-17)

### Features

- Adding support for merge_requests in the Deployments API ([911078b](https://github.com/jdalrymple/node-gitlab/commit/911078bba30145a98ba051e672963dbbe8816a6a)), closes [#554](https://github.com/jdalrymple/node-gitlab/issues/554)

## [14.1.1](https://github.com/jdalrymple/node-gitlab/compare/14.1.0...14.1.1) (2020-01-03)

### Bug Fixes

- resourceDiscussions.editNote add content params, and allowed discussionId to accept a string type ([#524](https://github.com/jdalrymple/node-gitlab/issues/524)) ([22d916a](https://github.com/jdalrymple/node-gitlab/commit/22d916a05fdf2f4361fa2e9d17fdd8784ed6bfb3))

# [14.1.0](https://github.com/jdalrymple/node-gitlab/compare/14.0.1...14.1.0) (2019-12-30)

### Bug Fixes

- make ResourceMembers.all/show delivery correct options params ([#521](https://github.com/jdalrymple/node-gitlab/issues/521)) ([505b407](https://github.com/jdalrymple/node-gitlab/commit/505b4072f3441440fd4903089d83d000e701e84c)), closes [#518](https://github.com/jdalrymple/node-gitlab/issues/518)

### Features

- Added support for the Vulnerability Findings API ([#517](https://github.com/jdalrymple/node-gitlab/issues/517)) ([497bf94](https://github.com/jdalrymple/node-gitlab/commit/497bf948d97d58dbe0bc2f57c47c92d646a29790))

## [14.0.1](https://github.com/jdalrymple/node-gitlab/compare/14.0.0...14.0.1) (2019-12-23)

### Bug Fixes

- Adding back functionality for rejectUnauthorized http option ([#502](https://github.com/jdalrymple/node-gitlab/issues/502)) ([0f17bed](https://github.com/jdalrymple/node-gitlab/commit/0f17bedc0b6ec82793d5f7e6f9c3f53b030a642e))

# [14.0.0](https://github.com/jdalrymple/node-gitlab/compare/13.0.0...14.0.0) (2019-12-21)

### Bug Fixes

- Typing on GPGKey method arguments was missing ([#514](https://github.com/jdalrymple/node-gitlab/issues/514)) ([234c9a7](https://github.com/jdalrymple/node-gitlab/commit/234c9a75db9be752e6d4febee171e3b44be6a30a))
- Typing on Group and Project variable keys was incorrect [#512](https://github.com/jdalrymple/node-gitlab/issues/512) ([#515](https://github.com/jdalrymple/node-gitlab/issues/515)) ([c7afca5](https://github.com/jdalrymple/node-gitlab/commit/c7afca523160ac19707d0207b9892a81b799e645))

### BREAKING CHANGES

- The title property is not required for the add method.

# [13.0.0](https://github.com/jdalrymple/node-gitlab/compare/12.1.0...13.0.0) (2019-12-09)

### Features

- Adding ability to get a singular member of a project or group, including inheritedMemebrs ([#508](https://github.com/jdalrymple/node-gitlab/issues/508)) ([807171c](https://github.com/jdalrymple/node-gitlab/commit/807171c3ff29977e8f6f5faa9603c550334c2192)), closes [#507](https://github.com/jdalrymple/node-gitlab/issues/507)

### BREAKING CHANGES

- Updated the Members.all function to have the inheritedMembers option to be in the optional object.

# [12.1.0](https://github.com/jdalrymple/node-gitlab/compare/12.0.1...12.1.0) (2019-12-05)

### Bug Fixes

- Removing required options object in a few of the API methods ([#505](https://github.com/jdalrymple/node-gitlab/issues/505)) ([b709ef6](https://github.com/jdalrymple/node-gitlab/commit/b709ef6716d15368c8775d77e5eb0cf22d6369a7))

### Features

- Add Group/File schemas ([#506](https://github.com/jdalrymple/node-gitlab/issues/506)) ([f467816](https://github.com/jdalrymple/node-gitlab/commit/f467816070bffcd3776e5dc3e6074c92bf6d644e))

## [12.0.1](https://github.com/jdalrymple/node-gitlab/compare/12.0.0...12.0.1) (2019-11-27)

### Bug Fixes

- Encode slug value for Wikis API ([#501](https://github.com/jdalrymple/node-gitlab/issues/501)) ([9c56d48](https://github.com/jdalrymple/node-gitlab/commit/9c56d4819ba120a1ea338fceb950733f0f59f886)), closes [#490](https://github.com/jdalrymple/node-gitlab/issues/490)

# [12.0.0](https://github.com/jdalrymple/node-gitlab/compare/11.6.0...12.0.0) (2019-11-21)

- Switching version option type ([6558f09](https://github.com/jdalrymple/node-gitlab/commit/6558f09522ccb27d4314d99394086301fe5ae85e))

### Bug Fixes

- Fixing the inability to use environment variables in the cli export ([#463](https://github.com/jdalrymple/node-gitlab/issues/463)) ([79d8c71](https://github.com/jdalrymple/node-gitlab/commit/79d8c718b03946e4fc02d57032f37747b1a783f7)), closes [#458](https://github.com/jdalrymple/node-gitlab/issues/458)

### BREAKING CHANGES

- Switch the version option to be a number and not a string. For example 4 instead of 'v4'.

# [11.6.0](https://github.com/jdalrymple/node-gitlab/compare/11.5.1...11.6.0) (2019-11-20)

### Features

- Add Group.projects ([#494](https://github.com/jdalrymple/node-gitlab/issues/494)) ([9def4e7](https://github.com/jdalrymple/node-gitlab/commit/9def4e7f8e7956413b40f159fddefb989fd34628)), closes [#384](https://github.com/jdalrymple/node-gitlab/issues/384)

## [11.5.1](https://github.com/jdalrymple/node-gitlab/compare/11.5.0...11.5.1) (2019-11-14)

### Bug Fixes

- Fixing the map.json file location ([ced9415](https://github.com/jdalrymple/node-gitlab/commit/ced94153d2437c28f4e171ece7573eaf50f7848c)), closes [#491](https://github.com/jdalrymple/node-gitlab/issues/491)

# [11.5.0](https://github.com/jdalrymple/node-gitlab/compare/11.4.2...11.5.0) (2019-11-13)

### Features

- Add downloadSingleArtifactFileFromRef method ([#493](https://github.com/jdalrymple/node-gitlab/issues/493)) ([1967984](https://github.com/jdalrymple/node-gitlab/commit/196798472ae79018132f02ab3cfa3bbb60535148))

## [11.4.2](https://github.com/jdalrymple/node-gitlab/compare/11.4.1...11.4.2) (2019-10-28)

### Bug Fixes

- Non standard mimetype was not handled ([01d17e8](https://github.com/jdalrymple/node-gitlab/commit/01d17e827004dcef0beb11b7520e02b54d89d898)), closes [#424](https://github.com/jdalrymple/node-gitlab/issues/424)

## [11.4.1](https://github.com/jdalrymple/node-gitlab/compare/11.4.0...11.4.1) (2019-10-28)

### Bug Fixes

- Fixing some minor bugs ([#486](https://github.com/jdalrymple/node-gitlab/issues/486)) ([15c841c](https://github.com/jdalrymple/node-gitlab/commit/15c841c15b11c56a735a6ff41db7aa15fe259125)), closes [#485](https://github.com/jdalrymple/node-gitlab/issues/485) [#475](https://github.com/jdalrymple/node-gitlab/issues/475)

# [11.4.0](https://github.com/jdalrymple/node-gitlab/compare/11.3.2...11.4.0) (2019-10-25)

### Features

- Add support for Issue Statistics ([#481](https://github.com/jdalrymple/node-gitlab/issues/481)) ([fdf2575](https://github.com/jdalrymple/node-gitlab/commit/fdf2575047ef533cccceda2ae8ea717afe8274e5))

## [11.3.2](https://github.com/jdalrymple/node-gitlab/compare/11.3.1...11.3.2) (2019-10-24)

### Bug Fixes

- include all modules for the browser bundle - closes [#475](https://github.com/jdalrymple/node-gitlab/issues/475) ([#476](https://github.com/jdalrymple/node-gitlab/issues/476)) ([cb582b8](https://github.com/jdalrymple/node-gitlab/commit/cb582b80c743f00af81ddd4b03e8f0e20515f894))
- resolve import issues ([#477](https://github.com/jdalrymple/node-gitlab/issues/477)) ([dcfe466](https://github.com/jdalrymple/node-gitlab/commit/dcfe466a18aa3c043459df1514492e04e28ed10d))

## [11.3.1](https://github.com/jdalrymple/node-gitlab/compare/11.3.0...11.3.1) (2019-10-18)

### Bug Fixes

- Fixing missing form variables when triggering pipelines ([#465](https://github.com/jdalrymple/node-gitlab/issues/465)) ([3ac6978](https://github.com/jdalrymple/node-gitlab/commit/3ac6978))

# [11.3.0](https://github.com/jdalrymple/node-gitlab/compare/11.2.3...11.3.0) (2019-10-12)

### Features

- Adding support for profile tokens ([#462](https://github.com/jdalrymple/node-gitlab/issues/462)) ([30f246e](https://github.com/jdalrymple/node-gitlab/commit/30f246e))

## [11.2.3](https://github.com/jdalrymple/node-gitlab/compare/11.2.2...11.2.3) (2019-10-09)

### Bug Fixes

- Epic issues HTTP methods are incorrect ([c63c691](https://github.com/jdalrymple/node-gitlab/commit/c63c691))

## [11.2.2](https://github.com/jdalrymple/node-gitlab/compare/11.2.1...11.2.2) (2019-10-06)

### Features

- **Group Labels:** Add group label support ([39a23a1](https://github.com/jdalrymple/node-gitlab/commit/39a23a1))

### Bug Fixes

- Missing gzip content type from body processing logic ([a684a1e](https://github.com/jdalrymple/node-gitlab/commit/a684a1e)), closes [#447](https://github.com/jdalrymple/node-gitlab/issues/447)

## [11.2.1](https://github.com/jdalrymple/node-gitlab/compare/11.2.0...11.2.1) (2019-10-03)

### Bug Fixes

- **package:** update ky to version 0.15.0 ([203e7a9](https://github.com/jdalrymple/node-gitlab/commit/203e7a9))

# [11.2.0](https://github.com/jdalrymple/node-gitlab/compare/11.1.2...11.2.0) (2019-10-01)

### Features

- **Merge Request:** Add Approval State endpoint ([41c4653](https://github.com/jdalrymple/node-gitlab/commit/41c4653))

## [11.1.2](https://github.com/jdalrymple/node-gitlab/compare/11.1.1...11.1.2) (2019-09-10)

### Bug Fixes

- Forgot to await for the response [#426](https://github.com/jdalrymple/node-gitlab/issues/426) ([8c673c3](https://github.com/jdalrymple/node-gitlab/commit/8c673c3))

## [11.1.1](https://github.com/jdalrymple/node-gitlab/compare/11.1.0...11.1.1) (2019-09-09)

### Bug Fixes

- **package:** update ky to version 0.14.0 ([b907f54](https://github.com/jdalrymple/node-gitlab/commit/b907f54))

# [11.1.0](https://github.com/jdalrymple/node-gitlab/compare/11.0.2...11.1.0) (2019-09-09)

### Features

- Adding support for CLI ([6f90f4c](https://github.com/jdalrymple/node-gitlab/commit/6f90f4c)), closes [#146](https://github.com/jdalrymple/node-gitlab/issues/146)

## [11.0.2](https://github.com/jdalrymple/node-gitlab/compare/11.0.1...11.0.2) (2019-08-30)

### Bug Fixes

- Switching type import to hopefully fix [#417](https://github.com/jdalrymple/node-gitlab/issues/417) ([91cfbf2](https://github.com/jdalrymple/node-gitlab/commit/91cfbf2))

## [11.0.1](https://github.com/jdalrymple/node-gitlab/compare/11.0.0...11.0.1) (2019-08-29)

### Bug Fixes

- Handling empty text responses ([c8deaa2](https://github.com/jdalrymple/node-gitlab/commit/c8deaa2))

# [11.0.0](https://github.com/jdalrymple/node-gitlab/compare/10.2.1...11.0.0) (2019-08-28)

### Bug Fixes

- Adding path argument to the Project Imports API ([97a7c59](https://github.com/jdalrymple/node-gitlab/commit/97a7c59))

### Features

- Add support for the Packages API [#430](https://github.com/jdalrymple/node-gitlab/issues/430) ([47e1ff4](https://github.com/jdalrymple/node-gitlab/commit/47e1ff4))

### BREAKING CHANGES

- Added the path argument to the function header.

## [10.2.1](https://github.com/jdalrymple/node-gitlab/compare/10.2.0...10.2.1) (2019-08-28)

### Bug Fixes

- Adding proper support for the buffer responses ([8bbab73](https://github.com/jdalrymple/node-gitlab/commit/8bbab73))

# [10.2.0](https://github.com/jdalrymple/node-gitlab/compare/10.1.2...10.2.0) (2019-08-22)

### Bug Fixes

- incorrect url path for mr unapprove ([85c3329](https://github.com/jdalrymple/node-gitlab/commit/85c3329))

### Features

- Add Gitlab Blame endpoint to the RespositoryFiles API ([ac670cc](https://github.com/jdalrymple/node-gitlab/commit/ac670cc)), closes [#409](https://github.com/jdalrymple/node-gitlab/issues/409)
- Adding fork relationship support ([76cb783](https://github.com/jdalrymple/node-gitlab/commit/76cb783)), closes [#410](https://github.com/jdalrymple/node-gitlab/issues/410)

## [10.1.2](https://github.com/jdalrymple/node-gitlab/compare/10.1.1...10.1.2) (2019-08-13)

### Bug Fixes

- **package:** update ky to version 0.12.0 ([55fdb7a](https://github.com/jdalrymple/node-gitlab/commit/55fdb7a))
- **package:** update ky-universal to version 0.3.0 ([3767c66](https://github.com/jdalrymple/node-gitlab/commit/3767c66))

## [10.1.1](https://github.com/jdalrymple/node-gitlab/compare/10.1.0...10.1.1) (2019-08-09)

### Bug Fixes

- Removing randomstring dependency to improve support for Angular 8 ([c47564b](https://github.com/jdalrymple/node-gitlab/commit/c47564b)), closes [#407](https://github.com/jdalrymple/node-gitlab/issues/407)

# [10.1.0](https://github.com/jdalrymple/node-gitlab/compare/10.0.3...10.1.0) (2019-08-06)

### Features

- Adding Merge Base endpoint for the Repositories API ([040fc78](https://github.com/jdalrymple/node-gitlab/commit/040fc78)), closes [#400](https://github.com/jdalrymple/node-gitlab/issues/400)

## [10.0.3](https://github.com/jdalrymple/node-gitlab/compare/10.0.2...10.0.3) (2019-08-06)

### Bug Fixes

- Removing deprecated Session endpoint (since GitLab 10.2.0) ([fe720d8](https://github.com/jdalrymple/node-gitlab/commit/fe720d8)), closes [#404](https://github.com/jdalrymple/node-gitlab/issues/404)

## [10.0.2](https://github.com/jdalrymple/node-gitlab/compare/10.0.1...10.0.2) (2019-08-06)

### Bug Fixes

- Adding missing TS type import 'FormData' ([a907c7c](https://github.com/jdalrymple/node-gitlab/commit/a907c7c)), closes [#401](https://github.com/jdalrymple/node-gitlab/issues/401)

## [10.0.1](https://github.com/jdalrymple/node-gitlab/compare/10.0.0...10.0.1) (2019-07-30)

### Bug Fixes

- Update to Ky 0.11.2 ([74e2b62](https://github.com/jdalrymple/node-gitlab/commit/74e2b62))

# [10.0.0](https://github.com/jdalrymple/node-gitlab/compare/9.1.0...10.0.0) (2019-07-15)

### Code Refactoring

- Adding required labelName and colour option to the create method ([199e32d](https://github.com/jdalrymple/node-gitlab/commit/199e32d))

### BREAKING CHANGES

- Labels require a colour and a name to be created. Now the create method takes a second and third argument: 'labelName' and 'color'

# [9.1.0](https://github.com/jdalrymple/node-gitlab/compare/9.0.1...9.1.0) (2019-07-12)

### Features

- Adding support for branchName key seen in the Gitlab API v3 ([356466f](https://github.com/jdalrymple/node-gitlab/commit/356466f))

## [9.0.1](https://github.com/jdalrymple/node-gitlab/compare/9.0.0...9.0.1) (2019-07-11)

### Bug Fixes

- Accept any variables that begin with uppercase letters and include an underscore [#254](https://github.com/jdalrymple/node-gitlab/issues/254) ([fe39590](https://github.com/jdalrymple/node-gitlab/commit/fe39590))

# [9.0.0](https://github.com/jdalrymple/node-gitlab/compare/8.0.0...9.0.0) (2019-07-04)

### Bug Fixes

- Fixing project upload [#355](https://github.com/jdalrymple/node-gitlab/issues/355) ([184253e](https://github.com/jdalrymple/node-gitlab/commit/184253e))

### Code Refactoring

- Standardizing the upload argument header ([aa33061](https://github.com/jdalrymple/node-gitlab/commit/aa33061))

### BREAKING CHANGES

- path argument is no longer required/available. Now, it follows a similar function header to Project.upload with an optional metadata argument
  Missing dependency
  dede

# [8.0.0](https://github.com/jdalrymple/node-gitlab/compare/7.0.1...8.0.0) (2019-07-03)

### Bug Fixes

- PushRules were missing from the ProjectBundle export and the README. [#373](https://github.com/jdalrymple/node-gitlab/issues/373) ([f7425a7](https://github.com/jdalrymple/node-gitlab/commit/f7425a7))

### BREAKING CHANGES

- PushRule export was renamed to PushRules to match the plurality of the export names

## [7.0.1](https://github.com/jdalrymple/node-gitlab/compare/7.0.0...7.0.1) (2019-07-01)

### Bug Fixes

- Revert support for the rejectUnauthorized option until issues in [#377](https://github.com/jdalrymple/node-gitlab/issues/377) are sorted. ([f9a47c7](https://github.com/jdalrymple/node-gitlab/commit/f9a47c7))

# [7.0.0](https://github.com/jdalrymple/node-gitlab/compare/6.4.0...7.0.0) (2019-06-28)

### Features

- Adding missing endpoints for deploy keys [#373](https://github.com/jdalrymple/node-gitlab/issues/373) ([b23dd29](https://github.com/jdalrymple/node-gitlab/commit/b23dd29))

### BREAKING CHANGES

- all method now takes an optional object since projectId is no longer required. If no projectId is passed, the all method returns all deploy keys across all projects of the GitLab instance

# [6.4.0](https://github.com/jdalrymple/node-gitlab/compare/6.3.7...6.4.0) (2019-06-28)

### Bug Fixes

- Handle body types properly if not JSON ie formData ([a135841](https://github.com/jdalrymple/node-gitlab/commit/a135841)), closes [#355](https://github.com/jdalrymple/node-gitlab/issues/355)
- Missing headers when posting json data ([861f89e](https://github.com/jdalrymple/node-gitlab/commit/861f89e))
- Use the correct agent configuration for the rejectUnauthorized option ([775d755](https://github.com/jdalrymple/node-gitlab/commit/775d755)), closes [#357](https://github.com/jdalrymple/node-gitlab/issues/357)

### Features

- Adding support for Group Issues ([00068c9](https://github.com/jdalrymple/node-gitlab/commit/00068c9)), closes [#306](https://github.com/jdalrymple/node-gitlab/issues/306)

## [6.3.7](https://github.com/jdalrymple/node-gitlab/compare/6.3.6...6.3.7) (2019-06-12)

### Bug Fixes

- string regex :sob: ([7e94e0b](https://github.com/jdalrymple/node-gitlab/commit/7e94e0b))

## [6.3.6](https://github.com/jdalrymple/node-gitlab/compare/6.3.5...6.3.6) (2019-06-12)

### Bug Fixes

- Use improved pagination regex to remove service url + leaf ([2b290b5](https://github.com/jdalrymple/node-gitlab/commit/2b290b5)), closes [#352](https://github.com/jdalrymple/node-gitlab/issues/352)

## [6.3.5](https://github.com/jdalrymple/node-gitlab/compare/6.3.4...6.3.5) (2019-06-12)

### Bug Fixes

- Fix error due to Typescript 3.5.1 ([bd4e141](https://github.com/jdalrymple/node-gitlab/commit/bd4e141))
- Fix error due to Typescript 3.5.1 ([5474f06](https://github.com/jdalrymple/node-gitlab/commit/5474f06))
- Make package Typescript-conformant ([da1a8f6](https://github.com/jdalrymple/node-gitlab/commit/da1a8f6))
- Update Typescript to 3.5.1 ([8f5fec5](https://github.com/jdalrymple/node-gitlab/commit/8f5fec5))

## [6.3.4](https://github.com/jdalrymple/node-gitlab/compare/6.3.3...6.3.4) (2019-06-11)

### Bug Fixes

- Wrong endpoint being passed during pagination ([a2a6126](https://github.com/jdalrymple/node-gitlab/commit/a2a6126)), closes [#344](https://github.com/jdalrymple/node-gitlab/issues/344)

## [6.3.3](https://github.com/jdalrymple/node-gitlab/compare/6.3.2...6.3.3) (2019-06-10)

### Bug Fixes

- Handle edge cases where content-type headers are missing or the content text is null ([dabcb3d](https://github.com/jdalrymple/node-gitlab/commit/dabcb3d)), closes [#343](https://github.com/jdalrymple/node-gitlab/issues/343)

## [6.3.2](https://github.com/jdalrymple/node-gitlab/compare/6.3.1...6.3.2) (2019-06-10)

### Bug Fixes

- Moving the error wrapper for the Ky Requester to be only around the Ky function request. Also checking to see if the error contains a response before looking for an error message. ([a54a6ae](https://github.com/jdalrymple/node-gitlab/commit/a54a6ae)), closes [#343](https://github.com/jdalrymple/node-gitlab/issues/343)

## [6.3.1](https://github.com/jdalrymple/node-gitlab/compare/6.3.0...6.3.1) (2019-06-10)

### Bug Fixes

- Resource Discussion API was using the incorrect url to add a note ([#345](https://github.com/jdalrymple/node-gitlab/issues/345)) ([c6ff86d](https://github.com/jdalrymple/node-gitlab/commit/c6ff86d)), closes [#342](https://github.com/jdalrymple/node-gitlab/issues/342)

# [6.3.0](https://github.com/jdalrymple/node-gitlab/compare/6.2.0...6.3.0) (2019-06-08)

### Features

- Add configurable request timeout ([#341](https://github.com/jdalrymple/node-gitlab/issues/341)) ([4d99902](https://github.com/jdalrymple/node-gitlab/commit/4d99902))

# [6.2.0](https://github.com/jdalrymple/node-gitlab/compare/6.1.0...6.2.0) (2019-06-07)

### Features

- Adding support for Container Registry API [#274](https://github.com/jdalrymple/node-gitlab/issues/274) ([59f9286](https://github.com/jdalrymple/node-gitlab/commit/59f9286))

# [6.1.0](https://github.com/jdalrymple/node-gitlab/compare/6.0.0...6.1.0) (2019-06-06)

### Bug Fixes

- Make the options argument optional [#336](https://github.com/jdalrymple/node-gitlab/issues/336) ([cf3c17e](https://github.com/jdalrymple/node-gitlab/commit/cf3c17e))

### Features

- Adding support for ReleaseLinks API ([d6a2248](https://github.com/jdalrymple/node-gitlab/commit/d6a2248))
- Adding support for Releases API [#295](https://github.com/jdalrymple/node-gitlab/issues/295) ([7191e81](https://github.com/jdalrymple/node-gitlab/commit/7191e81))

# [6.0.0](https://github.com/jdalrymple/node-gitlab/compare/5.0.2...6.0.0) (2019-06-02)

### Code Refactoring

- **RepositoryFiles:** Missing a required argument from the function headers ([e13c593](https://github.com/jdalrymple/node-gitlab/commit/e13c593))

### BREAKING CHANGES

- **RepositoryFiles:** create, edit and remove functions now require the commitMessage function argument

## [5.0.2](https://github.com/jdalrymple/node-gitlab/compare/5.0.1...5.0.2) (2019-05-31)

### Bug Fixes

- Properly handling the response bodies returned from gitlab ([881b87b](https://github.com/jdalrymple/node-gitlab/commit/881b87b)), closes [#320](https://github.com/jdalrymple/node-gitlab/issues/320)

## [5.0.1](https://github.com/jdalrymple/node-gitlab/compare/5.0.0...5.0.1) (2019-05-26)

### Bug Fixes

- **package:** Making lint-staged a dev dependency ([5c949b2](https://github.com/jdalrymple/node-gitlab/commit/5c949b2))
- **package:** Missing dependency ([40f5d21](https://github.com/jdalrymple/node-gitlab/commit/40f5d21))

# [5.0.0](https://github.com/jdalrymple/node-gitlab/compare/4.5.1...5.0.0) (2019-05-25)

### Bug Fixes

- [#227](https://github.com/jdalrymple/node-gitlab/issues/227) Fixing array syntax thanks to Lukas Eipert (https://github.com/leipert) ([aa6acb1](https://github.com/jdalrymple/node-gitlab/commit/aa6acb1))
- Fixing Todos support. If todoId was not passed, an undefined value would be introduced into the url ([cea5a2b](https://github.com/jdalrymple/node-gitlab/commit/cea5a2b))
- Fixing typing structure and configuration ([a79dabe](https://github.com/jdalrymple/node-gitlab/commit/a79dabe))
- Merge Request Approvals API did not match official API ([e4ba731](https://github.com/jdalrymple/node-gitlab/commit/e4ba731))
- Removed xhr library in favour of ky, and switched request for got for a smaller package size and retry functionality ([ee4730f](https://github.com/jdalrymple/node-gitlab/commit/ee4730f))
- ResourceAwardEmojis API wasn't properly filtering based on awardId ([a7b29c1](https://github.com/jdalrymple/node-gitlab/commit/a7b29c1))

### Code Refactoring

- Expose optional parameters for the NotiicationSettings API ([1ba9126](https://github.com/jdalrymple/node-gitlab/commit/1ba9126))
- Removed Fs dependency for better browser support ([037f4ed](https://github.com/jdalrymple/node-gitlab/commit/037f4ed))
- Removed inconsistent export strategies ([03e85ef](https://github.com/jdalrymple/node-gitlab/commit/03e85ef))
- Removed the confusing url parameter from BaseService ([26e2e52](https://github.com/jdalrymple/node-gitlab/commit/26e2e52))
- Requiring content for the Note related APIs ([7453779](https://github.com/jdalrymple/node-gitlab/commit/7453779))
- Similar to the RepositoryFiles API changes ([97dd060](https://github.com/jdalrymple/node-gitlab/commit/97dd060))
- SystemHooks API function header updates ([6ea90d3](https://github.com/jdalrymple/node-gitlab/commit/6ea90d3))
- Triggers API required arguments exposed as optional ([62e032b](https://github.com/jdalrymple/node-gitlab/commit/62e032b))
- Updating the MergeRequest API's pipeline function header ([46a541b](https://github.com/jdalrymple/node-gitlab/commit/46a541b))

### Features

- Added LDAP support to the Groups API ([3f6d409](https://github.com/jdalrymple/node-gitlab/commit/3f6d409))
- Added the ability to add sudo to specific requests ([18effa2](https://github.com/jdalrymple/node-gitlab/commit/18effa2))
- Added the missing edit function to the Groups API ([ee6d490](https://github.com/jdalrymple/node-gitlab/commit/ee6d490))
- Adding the option to conditionally camelize response body ([5f97193](https://github.com/jdalrymple/node-gitlab/commit/5f97193))

### BREAKING CHANGES

- Triggers API pipeline function requires the ref and token
- Notes now require a body argument
- NotificationSettings API edit function now takes one parameter, `options`
- MergeRequest Pipelines require the mergeRequestId
- Updated Approvals API support to match https://docs.gitlab.com/ee/api/merge_request_approvals.html
- Removed dependency on FS. Now the Projects API takes in two arguments `projectId` and `content` as well as an option fileName argument
- Removed projectId from System Hooks API since it wasn't required
- Added content as a required parameter for RepositoryFiles
- Changing everything to named exports for simplicity
- Switching required initialization argument from 'url' to 'host'

## [4.5.1](https://github.com/jdalrymple/node-gitlab/compare/4.5.0...4.5.1) (2019-03-22)

### Bug Fixes

- Updating packages ([2c47d24](https://github.com/jdalrymple/node-gitlab/commit/2c47d24))

# [4.5.0](https://github.com/jdalrymple/node-gitlab/compare/4.4.1...4.5.0) (2019-03-19)

### Features

- Updated MergeRequests API options ([a306799](https://github.com/jdalrymple/node-gitlab/commit/a306799))

# [4.4.1](https://github.com/jdalrymple/node-gitlab/compare/4.3.0...4.4.1) (2019-03-06)

### Features

- **Projects:**

  - Add support for DELETE /projects/:id/fork ([ef53a2](https://github.com/jdalrymple/node-gitlab/commit/ef53a2))

- **MergeRequests:**

  - Add MergeRequest.participants request ([b11a4f](https://github.com/jdalrymple/node-gitlab/commit/b11a4f))

- **Triggers:**
  - Add missing method for triggering pipelines ([5858fc](https://github.com/jdalrymple/node-gitlab/commit/5858fc))

### Bug Fixes

- Add missing / from unshare in Projects ([6fb7f5](https://github.com/jdalrymple/node-gitlab/commit/6fb7f5))
- Change lint api url. ([1d6e6e](https://github.com/jdalrymple/node-gitlab/commit/1d6e6e))
- Implement jobToken property to allow authentication via CI job token ([8f551f](https://github.com/jdalrymple/node-gitlab/commit/8f551f))

### Docs

- Update README.md with `rejectUnauthorized`
- Fixing typo in the host url

# [4.3.0](https://github.com/jdalrymple/node-gitlab/compare/4.2.7...4.3.0) (2018-12-12)

### Breaking

- Added content as a required parameter for RepositoryFiles
- Removed projectId from System Hooks API since it wasn't required
- Removed dependency on FS. Now the Projects API takes in two arguments `projectId` and `content` as well as an option fileName argument
- Changing everything to named exports for simplicity
- Switching required initialization argument from 'url' to 'host'
- Updated Approvals API support to match https://docs.gitlab.com/ee/api/merge_request_approvals.html
- MergeRequest Pipelines require the mergeRequestId
- NotificationSettings API edit function now takes one parameter, `options`
- Changing the access level enum property from master to maintainer as per https://gitlab.com/gitlab-org/gitlab-ce/issues/42751
- Notes now require a body argument instead of checking the options argument for a body parameter
- Bumped min node version to > v10 LTS

### Bug Fixes

- #227 (https://github.com/jdalrymple/node-gitlab/issues/227) Fixing array syntax thanks to Lukas Eipert (https://github.com/leipert) (f9bc34d (https://github.com/jdalrymple/node-gitlab/commit/f9bc34d))
- Fixing Todos support. If todoId was not passed, an undefined value would be introduced into the url (cbeef18 (https://github.com/jdalrymple/node-gitlab/commit/cbeef18))
- ResourceAwardEmojis API wasn't properly filtering based on awardId (70f4315 (https://github.com/jdalrymple/node-gitlab/commit/70f4315))
- Removed xhr library in favour of ky, and switched request for got for a smaller package size and retry functionality
- Fixing ci lint url (#278)
- Fixing form data (#272)
- Fixing randomstring usage (#271)
- Incorrect http method used to update MR approvers #262

### Features

- Added the ability to add sudo to specific requests (780244f (https://github.com/jdalrymple/node-gitlab/commit/780244f))
- Added the missing edit function to the Groups API
- Added LDAP support to the Groups API
- Added missing method for triggering pipelines (#275)
- Implement jobToken property to allow authentication via CI job token (#269)

### Documentation

- Removing xml request docs
- Updating imports to be named imports

### Tests

- Fixing integration test for ApplicationSettings (#273)

## [4.5.1](https://github.com/jdalrymple/node-gitlab/compare/4.5.0...4.5.1) (2019-03-22)

### Bug Fixes

- Updating packages ([2c47d24](https://github.com/jdalrymple/node-gitlab/commit/2c47d24))

# [4.5.0](https://github.com/jdalrymple/node-gitlab/compare/4.4.1...4.5.0) (2019-03-19)

### Features

- Updated MergeRequests API options ([a306799](https://github.com/jdalrymple/node-gitlab/commit/a306799))

# [4.4.1](https://github.com/jdalrymple/node-gitlab/compare/4.3.0...4.4.1) (2019-03-06)

### Features

- **Projects:**

  - Add support for DELETE /projects/:id/fork ([ef53a2](https://github.com/jdalrymple/node-gitlab/commit/ef53a2))

- **MergeRequests:**

  - Add MergeRequest.participants request ([b11a4f](https://github.com/jdalrymple/node-gitlab/commit/b11a4f))

- **Triggers:**
  - Add missing method for triggering pipelines ([5858fc](https://github.com/jdalrymple/node-gitlab/commit/5858fc))

### Bug Fixes

- Add missing / from unshare in Projects ([6fb7f5](https://github.com/jdalrymple/node-gitlab/commit/6fb7f5))
- Change lint api url. ([1d6e6e](https://github.com/jdalrymple/node-gitlab/commit/1d6e6e))
- Implement jobToken property to allow authentication via CI job token ([8f551f](https://github.com/jdalrymple/node-gitlab/commit/8f551f))

### Docs

- Update README.md with `rejectUnauthorized`
- Fixing typo in the host url

# [4.3.0](https://github.com/jdalrymple/node-gitlab/compare/4.2.7...4.3.0) (2018-12-12)

### Features

- **services:** Add protected tags ([8203830](https://github.com/jdalrymple/node-gitlab/commit/8203830))

## [4.2.7](https://github.com/jdalrymple/node-gitlab/compare/4.2.6...4.2.7) (2018-11-26)

### Bug Fixes

- Handing the function arguments in the incorrect order ([26235ff](https://github.com/jdalrymple/node-gitlab/commit/26235ff))

## [4.2.6](https://github.com/jdalrymple/node-gitlab/compare/4.2.5...4.2.6) (2018-11-26)

### Bug Fixes

- Update pagination docs and conditions [#238](https://github.com/jdalrymple/node-gitlab/issues/238) ([266de00](https://github.com/jdalrymple/node-gitlab/commit/266de00))

## [4.2.5](https://github.com/jdalrymple/node-gitlab/compare/4.2.4...4.2.5) (2018-11-26)

### Bug Fixes

- Project variables urls were being generated incorrectly ([28b28cf](https://github.com/jdalrymple/node-gitlab/commit/28b28cf))

## [4.2.4](https://github.com/jdalrymple/node-gitlab/compare/4.2.3...4.2.4) (2018-11-26)

### Bug Fixes

- Event properties using the incorrect boolean operator ([5f21a46](https://github.com/jdalrymple/node-gitlab/commit/5f21a46))

## [4.2.3](https://github.com/jdalrymple/node-gitlab/compare/4.2.2...4.2.3) (2018-11-26)

### Bug Fixes

- Filtering all events shouldnt require an action or a target [#61](https://github.com/jdalrymple/node-gitlab/issues/61) ([cda23b8](https://github.com/jdalrymple/node-gitlab/commit/cda23b8))

## [4.2.1](https://github.com/jdalrymple/node-gitlab/compare/4.2.0...4.2.1) (2018-10-29)

### Bug Fixes

- Updating application settings test to match updated API ([dececa6](https://github.com/jdalrymple/node-gitlab/commit/dececa6))

# [4.2.0](https://github.com/jdalrymple/node-gitlab/compare/4.1.1...4.2.0) (2018-10-10)

### Bug Fixes

- jest.config file to properly run tests again. Follow up issue to fix these exceptions ([dcee7ac](https://github.com/jdalrymple/node-gitlab/commit/dcee7ac))

### Features

- Add sudo abilities [#203](https://github.com/jdalrymple/node-gitlab/issues/203) ([4bf574c](https://github.com/jdalrymple/node-gitlab/commit/4bf574c))

## [4.1.1](https://github.com/jdalrymple/node-gitlab/compare/4.1.0...4.1.1) (2018-09-25)

### Bug Fixes

- Updating ApplicationSettings test ([0d345b7](https://github.com/jdalrymple/node-gitlab/commit/0d345b7))

# [4.1.0](https://github.com/jdalrymple/node-gitlab/compare/4.0.1...4.1.0) (2018-09-19)

### Features

- Added user edit support [#186](https://github.com/jdalrymple/node-gitlab/issues/186) ([95e8999](https://github.com/jdalrymple/node-gitlab/commit/95e8999))
- Adding markdown support [#182](https://github.com/jdalrymple/node-gitlab/issues/182) ([#193](https://github.com/jdalrymple/node-gitlab/issues/193)) ([2113e8e](https://github.com/jdalrymple/node-gitlab/commit/2113e8e))
- Re-add list all project members endpoint ([#190](https://github.com/jdalrymple/node-gitlab/issues/190)) ([5b07b6a](https://github.com/jdalrymple/node-gitlab/commit/5b07b6a)), closes [/github.com/jdalrymple/node-gitlab/commit/e081a1629f33e3af172101b94977f281879539c9#diff-379104d7d595f3793c2d7380496cc3c3](https://github.com//github.com/jdalrymple/node-gitlab/commit/e081a1629f33e3af172101b94977f281879539c9/issues/diff-379104d7d595f3793c2d7380496cc3c3) [#141](https://github.com/jdalrymple/node-gitlab/issues/141)

## [4.0.1](https://github.com/jdalrymple/node-gitlab/compare/4.0.0...4.0.1) (2018-09-06)

### Bug Fixes

- Updating the package.lock ([9b4b6f9](https://github.com/jdalrymple/node-gitlab/commit/9b4b6f9))

# [4.0.0-beta](https://github.com/jdalrymple/node-gitlab/compare/3.11.0...4.0.0-beta) (2018-08-22)

### Major Update

- Migration to Typescript

## [3.11.3](https://github.com/jdalrymple/node-gitlab/compare/3.11.2...3.11.3) (2018-08-31)

### Bug Fixes

- Camelcasing broke the body params ([e50f588](https://github.com/jdalrymple/node-gitlab/commit/e50f588))

## [3.11.2](https://github.com/jdalrymple/node-gitlab/compare/3.11.1...3.11.2) (2018-08-28)

### Bug Fixes

- obey rate limits for all request types correctly ([#170](https://github.com/jdalrymple/node-gitlab/issues/170)) ([4bc7c69](https://github.com/jdalrymple/node-gitlab/commit/4bc7c69)), closes [#165](https://github.com/jdalrymple/node-gitlab/issues/165)
- Testing negated npmignore ([86960c4](https://github.com/jdalrymple/node-gitlab/commit/86960c4))

## [3.11.1](https://github.com/jdalrymple/node-gitlab/compare/3.11.0...3.11.1) (2018-08-28)

### Bug Fixes

- **applications-settings:** Edit of application settings not working ([#169](https://github.com/jdalrymple/node-gitlab/issues/169)) ([f0213ca](https://github.com/jdalrymple/node-gitlab/commit/f0213ca))
- **test:** Application settings api updated ([#177](https://github.com/jdalrymple/node-gitlab/issues/177)) ([0723a7a](https://github.com/jdalrymple/node-gitlab/commit/0723a7a))

# [3.11.0](https://github.com/jdalrymple/node-gitlab/compare/3.10.1...3.11.0) (2018-08-20)

### Bug Fixes

- Revert "fix(api): Updating project members all function to include the inherited members. [#141](https://github.com/jdalrymple/node-gitlab/issues/141)" until properly implemented by GitLab (https://gitlab.com/gitlab-org/gitlab-ee/merge_requests/6669) ([24d9bcd](https://github.com/jdalrymple/node-gitlab/commit/24d9bcd))

### Features

- **projects:** add archive/unarchive functionality ([#168](https://github.com/jdalrymple/node-gitlab/issues/168)) ([5e7b1bd](https://github.com/jdalrymple/node-gitlab/commit/5e7b1bd)), closes [#166](https://github.com/jdalrymple/node-gitlab/issues/166)

## [3.10.1](https://github.com/jdalrymple/node-gitlab/compare/3.10.0...3.10.1) (2018-08-16)

### Bug Fixes

- Typo in PagesDomains all() method ([#162](https://github.com/jdalrymple/node-gitlab/issues/162)) ([128f150](https://github.com/jdalrymple/node-gitlab/commit/128f150))

# [3.10.0](https://github.com/jdalrymple/node-gitlab/compare/3.9.0...3.10.0) (2018-08-15)

### Features

- Expose reject unauthorized in request helper ([#160](https://github.com/jdalrymple/node-gitlab/issues/160)) ([01a2ce2](https://github.com/jdalrymple/node-gitlab/commit/01a2ce2)), closes [#142](https://github.com/jdalrymple/node-gitlab/issues/142)

# [3.9.0](https://github.com/jdalrymple/node-gitlab/compare/3.8.0...3.9.0) (2018-08-15)

### Bug Fixes

- Fix error while throwing an error in RequestHelper ([#156](https://github.com/jdalrymple/node-gitlab/issues/156)) ([177d7fd](https://github.com/jdalrymple/node-gitlab/commit/177d7fd))
- Handling errors before retrying request ([#142](https://github.com/jdalrymple/node-gitlab/issues/142)) [skip-ci](<[bc3b366](https://github.com/jdalrymple/node-gitlab/commit/bc3b366)>)
- Linting Master ([#157](https://github.com/jdalrymple/node-gitlab/issues/157)) ([ab14ed7](https://github.com/jdalrymple/node-gitlab/commit/ab14ed7))

### Features

- Add deploy keys enable functionality ([#155](https://github.com/jdalrymple/node-gitlab/issues/155)) thanks to [Michael Matzka](https://github.com/mimaidms) ([66547ad](https://github.com/jdalrymple/node-gitlab/commit/66547ad))

# [3.8.0](https://github.com/jdalrymple/node-gitlab/compare/3.7.0...3.8.0) (2018-08-14)

### Bug Fixes

- **api:** Updating project members all function to include the inherited members. [#141](https://github.com/jdalrymple/node-gitlab/issues/141) ([e081a16](https://github.com/jdalrymple/node-gitlab/commit/e081a16))
- **package:** update [@semantic-release](https://github.com/semantic-release)/npm to version 5.0.0 ([dc9748d](https://github.com/jdalrymple/node-gitlab/commit/dc9748d))
- **package:** update [@semantic-release](https://github.com/semantic-release)/npm to version 5.0.1 ([12b6ca1](https://github.com/jdalrymple/node-gitlab/commit/12b6ca1)), closes [#139](https://github.com/jdalrymple/node-gitlab/issues/139)
- **package:** Updating packages and fixing [#140](https://github.com/jdalrymple/node-gitlab/issues/140) due to a babel update ([04d1769](https://github.com/jdalrymple/node-gitlab/commit/04d1769))

### Features

- Add push rule service ([#143](https://github.com/jdalrymple/node-gitlab/issues/143)) ([395f83c](https://github.com/jdalrymple/node-gitlab/commit/395f83c))
- Add transfer a project to a new namespace ([#145](https://github.com/jdalrymple/node-gitlab/issues/145)) ([87e9f55](https://github.com/jdalrymple/node-gitlab/commit/87e9f55))

# [3.7.0](https://github.com/jdalrymple/node-gitlab/compare/3.6.0...3.7.0) (2018-08-02)

### Features

- Adding update push rules to Projects, and updating the Protected Branches service to match the updated API thanks to [jennparise](https://github.com/jennparise)([#134](https://github.com/jdalrymple/node-gitlab/issues/134)) ([9f3de02](https://github.com/jdalrymple/node-gitlab/commit/9f3de02))
- Updating Project Snippets API [#138](https://github.com/jdalrymple/node-gitlab/issues/138) ([a7858bd](https://github.com/jdalrymple/node-gitlab/commit/a7858bd))

# [3.6.0](https://github.com/jdalrymple/node-gitlab/compare/3.5.1...3.6.0) (2018-07-24)

### Bug Fixes

- **package:** update [@semantic-release](https://github.com/semantic-release)/npm to version 4.0.0 ([#122](https://github.com/jdalrymple/node-gitlab/issues/122)) ([5351dcc](https://github.com/jdalrymple/node-gitlab/commit/5351dcc))

### Features

- Add mirror pull trigger ([#130](https://github.com/jdalrymple/node-gitlab/issues/130)) ([b6ccb80](https://github.com/jdalrymple/node-gitlab/commit/b6ccb80)) thanks to [Joseph Petersen](https://github.com/casz)
- Making API version modifyable ([a2732b9](https://github.com/jdalrymple/node-gitlab/commit/a2732b9))
- Updating Jobs API ([03a2f2d](https://github.com/jdalrymple/node-gitlab/commit/03a2f2d))
- Updating participants function for issues ([f60e7ed](https://github.com/jdalrymple/node-gitlab/commit/f60e7ed)) thanks to [Fabian Aussems](https://github.com/mozinator)
- Added pipelines to MergeRequests in [#128](https://github.com/jdalrymple/node-gitlab/pull/128) thanks to [jnovick](https://github.com/jnovick)

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
- The `update` functions are no longer supported and have all been renamed to `edit`
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
- Adding in missing options parameter in the groups API thanks to a pull request from [Cory Zibell](https://github.com/coryzibell)

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
