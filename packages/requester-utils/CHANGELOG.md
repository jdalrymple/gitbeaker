# @gitbeaker/requester-utils

## v44.0.0-pre.0 (Wed, Aug 12, 2026)

### Major Changes

- breaking: Major Release v44 ([#3841](https://github.com/jdalrymple/gitbeaker/pull/3841))

  #### 🔧 Dependencies & Build Tools
  - chore(dep): Switch from eslint to oxlint ([#3839](https://github.com/jdalrymple/gitbeaker/issues/3839))
  - chore(dep): Replace tsup with tsdown ([#3837](https://github.com/jdalrymple/gitbeaker/issues/3837))
  - chore: Switch to pnpm ([#3820](https://github.com/jdalrymple/gitbeaker/issues/3820))
  - chore(dep): Migrate off of auto-it to remove lerna dep ([#3819](https://github.com/jdalrymple/gitbeaker/issues/3819))
  - chore(dep): Bump picomatch from 4.0.3 to 4.0.4 ([#3836](https://github.com/jdalrymple/gitbeaker/issues/3836))
  - chore(dep): Bump qs from 6.14.0 to 6.14.1 ([#3808](https://github.com/jdalrymple/gitbeaker/issues/3808))
  - chore(dep): switch to esm-only distributable ([#3849](https://github.com/jdalrymple/gitbeaker/issues/3849))

  #### ✨ Features
  - feat: Add support for filtering Jobs by an array of scopes ([#3827](https://github.com/jdalrymple/gitbeaker/issues/3827))
  - feat: Support inputs on pipeline creation ([#3810](https://github.com/jdalrymple/gitbeaker/issues/3810))
  - feat: JobArtifacts.downloadArchive: Add support for search_recent_successful_pipelines ([#3812](https://github.com/jdalrymple/gitbeaker/issues/3812))
  - refactor: Comprehensive API refactoring and type improvements ([#3645](https://github.com/jdalrymple/gitbeaker/issues/3645))
  - chore: Update API support to match latest Gitlab v19.0 ([#3846](https://github.com/jdalrymple/gitbeaker/issues/3846))
  - chore(dep): Migrate from jest to vitest to leverage native ESM support ([#3838](https://github.com/jdalrymple/gitbeaker/issues/3838) )

  #### 🐛 Bug Fixes
  - fix: Replace qs with picoquery ([#3822](https://github.com/jdalrymple/gitbeaker/issues/3822)) - Security improvement replacing qs dependency
  - fix: Updating picomatch and all-contributors-cli ([#3821](https://github.com/jdalrymple/gitbeaker/issues/3821))
  - fix(rest): correct exponential backoff delay from seconds to milliseconds ([#3806](https://github.com/jdalrymple/gitbeaker/issues/3806))

  #### 🔒 Security
  - security: Update latest security CVE's for lodash and udicii ([#3824](https://github.com/jdalrymple/gitbeaker/issues/3824))
  - security: Update dependencies to address security alerts ([#3799](https://github.com/jdalrymple/gitbeaker/issues/3799))

  #### 🏗️ Infrastructure & CI
  - ci: Adding dedicated codecov upload job ([#3817](https://github.com/jdalrymple/gitbeaker/issues/3817))
  - ci: Improving pipeline config ([#3816](https://github.com/jdalrymple/gitbeaker/issues/3816))
  - ci: Fix codeql-analysis branch reference from master to main ([#3813](https://github.com/jdalrymple/gitbeaker/issues/3813))

  #### 🔧 Enhancements
  - chore(types): Improve webhook reviewer type definitions ([#3803](https://github.com/jdalrymple/gitbeaker/issues/3803))
  - chore(types): Add memberEvents option to AddResourceHookOptions ([#3804](https://github.com/jdalrymple/gitbeaker/issues/3804))

## v43.6.0 (Sun Oct 26 2025)

:tada: This release contains work from a new contributor! :tada:

Thank you, ShaoWei Teo ([@Teo-ShaoWei](https://github.com/Teo-ShaoWei)), for all your work!

#### ✨ Feature

- Add support for passing custom agents [#3716](https://github.com/jdalrymple/gitbeaker/pull/3716) ([@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- Fix compilation issue due to rate-limiter-flexible [#3769](https://github.com/jdalrymple/gitbeaker/pull/3769) ([@Teo-ShaoWei](https://github.com/Teo-ShaoWei))

#### 🗃️ Typescript Definitions

- Add pagination types to MergeRequests.allPipelines [#3784](https://github.com/jdalrymple/gitbeaker/pull/3784) ([@jdalrymple](https://github.com/jdalrymple))
- Fix typing of Resource exports in @gitbeaker/rest [#3767](https://github.com/jdalrymple/gitbeaker/pull/3767) ([@jdalrymple](https://github.com/jdalrymple))

#### 🚨 Tests

- Migrate to Circle CI to improve PR cycle time [#3788](https://github.com/jdalrymple/gitbeaker/pull/3788) ([@jdalrymple](https://github.com/jdalrymple))

#### 📚 Documentation

- Add improved codecov support and further repo maintenance [#3790](https://github.com/jdalrymple/gitbeaker/pull/3790) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- ShaoWei Teo ([@Teo-ShaoWei](https://github.com/Teo-ShaoWei))

---

## v43.5.0 (Tue Sep 02 2025)

#### 🔒 Security

- Update dependencies and address security alert [#3763](https://github.com/jdalrymple/gitbeaker/pull/3763) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v43.4.0 (Thu Aug 07 2025)

:tada: This release contains work from a new contributor! :tada:

Thank you, null[@tcasebiw](https://github.com/tcasebiw), for all your work!

#### ✨ Feature

- Add support for configuring the rate limit duration [#3753](https://github.com/jdalrymple/gitbeaker/pull/3753) ([@tcasebiw](https://github.com/tcasebiw) [@jdalrymple](https://github.com/jdalrymple))

#### 🔒 Security

- Addressing security alert through updating affected packages [#3756](https://github.com/jdalrymple/gitbeaker/pull/3756) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@tcasebiw](https://github.com/tcasebiw)
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v43.0.0 (Sun Jul 13 2025)

:tada: This release contains work from a new contributor! :tada:

Thank you, Aidin Abedi ([@aidinabedi](https://github.com/aidinabedi)), for all your work!

#### ✨ Feature

- Add support for Markdown Uploads [#3737](https://github.com/jdalrymple/gitbeaker/pull/3737) ([@aidinabedi](https://github.com/aidinabedi) [@jdalrymple](https://github.com/jdalrymple))

#### 🔨 Technical Debt

- Merge branch 'chore/assets' ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `main`

- Major dep update ([@jdalrymple](https://github.com/jdalrymple))
- Removing CWS from the README ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Aidin Abedi ([@aidinabedi](https://github.com/aidinabedi))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v40.2.0 (Sat Sep 07 2024)

#### 📚 Documentation

- Adding directory information to the package.json file to fix npm relative path resolution [#3622](https://github.com/jdalrymple/gitbeaker/pull/3622) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v40.1.4 (Thu Sep 05 2024)

#### 📚 Documentation

- Updating sponsors and broken logo links [#3621](https://github.com/jdalrymple/gitbeaker/pull/3621) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v40.1.0 (Mon Jul 08 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, null[@michael-smt](https://github.com/michael-smt), for all your work!

#### ✨ Feature

- Remove token requirement to support access without authentication [#3588](https://github.com/jdalrymple/gitbeaker/pull/3588) ([@michael-smt](https://github.com/michael-smt))

#### 🚑 Hot Fix

- Updating minimum node version and JSON assert keyword [#3592](https://github.com/jdalrymple/gitbeaker/pull/3592) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `main`

- Minor dependency changes ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@michael-smt](https://github.com/michael-smt)
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.34.3 (Tue Feb 20 2024)

#### 🔨 Technical Debt

- Removing native support for rejectUnauthorized - Suggest nodejs env NODE_TLS_REJECT_UNAUTHORIZED=0 instead [#3540](https://github.com/jdalrymple/gitbeaker/pull/3540) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.33.1 (Mon Jan 29 2024)

#### 🔨 Technical Debt

- CI/CD Re-organization and Optimization [#3515](https://github.com/jdalrymple/gitbeaker/pull/3515) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.32.0 (Tue Jan 23 2024)

#### 🐛 Bug Fix

- Updating Gitbeaker Error typings [#3513](https://github.com/jdalrymple/gitbeaker/pull/3513) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.30.0 (Wed Jan 17 2024)

#### 🐛 Bug Fix

- Update rate limit feature to be more browser freindly [#3428](https://github.com/jdalrymple/gitbeaker/pull/3428) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.28.0 (Sun Dec 31 2023)

#### 📚 Documentation

- Updating sponsors header [#3504](https://github.com/jdalrymple/gitbeaker/pull/3504) ([@jdalrymple](https://github.com/jdalrymple))
- Updating badges [#3502](https://github.com/jdalrymple/gitbeaker/pull/3502) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.27.1 (Tue Dec 26 2023)

#### 🔨 Technical Debt

- Add explicit error types for easier debugging [#3496](https://github.com/jdalrymple/gitbeaker/pull/3496) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.25.1 (Sat Dec 09 2023)

#### ↕️ Dependencies

- Updating all package deps [#3483](https://github.com/jdalrymple/gitbeaker/pull/3483) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.24.0 (Fri Nov 17 2023)

#### ↕️ Dependencies

- Dependencies [#3457](https://github.com/jdalrymple/gitbeaker/pull/3457) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `main`

- Merge branch 'docs/updating-readme' into main ([@jdalrymple](https://github.com/jdalrymple))
- Updating contributors settings and the readme image url ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.23.0 (Thu Nov 16 2023)

#### 🐛 Bug Fix

- Fix typing on Project.show methods [#3456](https://github.com/jdalrymple/gitbeaker/pull/3456) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.21.1 (Sat Oct 21 2023)

#### ↕️ Dependencies

- Updating all dependencies to their latest supported versions [#3441](https://github.com/jdalrymple/gitbeaker/pull/3441) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.21.0 (Sat Oct 21 2023)

#### ✨ Feature

- Add support for Service Accounts API [#3438](https://github.com/jdalrymple/gitbeaker/pull/3438) ([@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- Add approvals property to Deployments Schema [#3439](https://github.com/jdalrymple/gitbeaker/pull/3439) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.19.0 (Sat Oct 07 2023)

#### ✨ Feature

- Support for endpoint rate limits [#3426](https://github.com/jdalrymple/gitbeaker/pull/3426) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.18.0 (Wed Oct 04 2023)

#### 🐛 Bug Fix

- Improve docs to highlight supported APIs [#3423](https://github.com/jdalrymple/gitbeaker/pull/3423) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.10.3 (Tue Aug 08 2023)

#### 🔨 Technical Debt

- Embedding the request options normalization [#3374](https://github.com/jdalrymple/gitbeaker/pull/3374) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.6.0 (Wed Jul 12 2023)

#### ↕️ Dependencies

- Dependency updates [#3341](https://github.com/jdalrymple/gitbeaker/pull/3341) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.2.0 (Mon Jun 26 2023)

#### ✨ Feature

- Support defered token retrieval [#3317](https://github.com/jdalrymple/gitbeaker/pull/3317) ([@jdalrymple](https://github.com/jdalrymple))

#### ↕️ Dependencies

- Batch dependency update [#3325](https://github.com/jdalrymple/gitbeaker/pull/3325) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v39.1.1 (Mon Jun 26 2023)

#### 🔨 Technical Debt

- Include request in error cause [#3309](https://github.com/jdalrymple/gitbeaker/pull/3309) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v38.10.0 (Fri Jun 02 2023)

#### 📚 Documentation

- Updating FAQ broken link [#3291](https://github.com/jdalrymple/gitbeaker/pull/3291) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v38.8.0 (Mon May 22 2023)

#### ✨ Feature

- Add support for a query timeout [#3271](https://github.com/jdalrymple/gitbeaker/pull/3271) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v38.3.0 (Sat May 06 2023)

#### ↕️ Dependencies

- Bump @types/node from 18.16.2 to 20.0.0 [#3242](https://github.com/jdalrymple/gitbeaker/pull/3242) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

## v38.2.0 (Fri May 05 2023)

#### 📚 Documentation

- Remove usage of skypack for esm.sh [#3241](https://github.com/jdalrymple/gitbeaker/pull/3241) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v38.1.1 (Wed May 03 2023)

#### 📚 Documentation

- Update sponsors list [#3235](https://github.com/jdalrymple/gitbeaker/pull/3235) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v38.0.0 (Sat Apr 29 2023)

#### 💥 Breaking Change

- v37 Release Housekeeping - Part 2 [#3226](https://github.com/jdalrymple/gitbeaker/pull/3226) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v37.1.0 (Thu Apr 27 2023)

#### 🚑 Hot Fix

- v37 Release Housekeeping [#3222](https://github.com/jdalrymple/gitbeaker/pull/3222) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v37.0.0 (Wed Apr 26 2023)

#### 💥 Breaking Change

- Major Release v36.0.0 - Improved Typing, and API support (16.0) [#2258](https://github.com/jdalrymple/gitbeaker/pull/2258) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v35.8.0 (Wed Nov 16 2022)

#### 🔩 Dependency Updates

- Bump @types/node from 17.0.15 to 18.0.3 [#2586](https://github.com/jdalrymple/gitbeaker/pull/2586) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jest-extended from 1.2.0 to 3.0.0 [#2590](https://github.com/jdalrymple/gitbeaker/pull/2590) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

## v35.6.1 (Mon Jul 11 2022)

:tada: This release contains work from a new contributor! :tada:

Thank you, Jeff Bacon ([@thesuavehog](https://github.com/thesuavehog)), for all your work!

#### 🐛 Bug Fix

- fixes #2545 - compile error in RequesterUtils [#2546](https://github.com/jdalrymple/gitbeaker/pull/2546) ([@thesuavehog](https://github.com/thesuavehog))

#### Authors: 1

- Jeff Bacon ([@thesuavehog](https://github.com/thesuavehog))

---

## v35.3.0 (Sat Feb 05 2022)

#### 🐛 Bug Fix

- Set the minimum supported node version [#2353](https://github.com/jdalrymple/gitbeaker/pull/2353) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v35.2.0 (Sat Feb 05 2022)

#### ⚠️ Pushed to `master`

- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/rollup-2.61.1' ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/qs-6.10.2' ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/packages/requester-utils/types/node-17.0.0' ([@jdalrymple](https://github.com/jdalrymple))
- Bump @types/node from 16.11.14 to 17.0.0 in /packages/requester-utils ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### 🔩 Dependency Updates

- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/jest-27.4.5' [#2287](https://github.com/jdalrymple/gitbeaker/pull/2287) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/auto-10.32.5' [#2288](https://github.com/jdalrymple/gitbeaker/pull/2288) ([@jdalrymple](https://github.com/jdalrymple))
- Merge remote-tracking branch 'origin/dependabot/npm_and_yarn/prettier-2.5.1' [#2261](https://github.com/jdalrymple/gitbeaker/pull/2261) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v34.7.0 (Tue Nov 30 2021)

#### 🔩 Dependency Updates

- Bump rollup-plugin-typescript2 from 0.30.0 to 0.31.1 [#2229](https://github.com/jdalrymple/gitbeaker/pull/2229) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

## v34.3.0 (Sun Oct 17 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, nilennoct ([@nilennoct](https://github.com/nilennoct)), for all your work!

#### 🐛 Bug Fix

- Fix the typing for the supported links functions [#2154](https://github.com/jdalrymple/gitbeaker/pull/2154) ([@jdalrymple](https://github.com/jdalrymple))
- Fix a query formatting issue [#2142](https://github.com/jdalrymple/gitbeaker/pull/2142) ([@nilennoct](https://github.com/nilennoct) [@jdalrymple](https://github.com/jdalrymple))
- Circleci editor/circleci project setup [#2124](https://github.com/jdalrymple/gitbeaker/pull/2124) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump jest-extended from 0.11.5 to 1.0.0 in /packages/requester-utils [#2138](https://github.com/jdalrymple/gitbeaker/pull/2138) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- nilennoct ([@nilennoct](https://github.com/nilennoct))

---

## v34.1.0 (Sat Sep 04 2021)

#### 🐛 Bug Fix

- Fixing stringify of hash arguments [#2057](https://github.com/jdalrymple/gitbeaker/pull/2057) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v31.1.0 (Tue Jul 27 2021)

#### 🔩 Dependency Updates

- Bump @types/node from 15.14.0 to 16.0.0 [#1914](https://github.com/jdalrymple/gitbeaker/pull/1914) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

## v31.0.0 (Mon Jul 05 2021)

#### 💥 Breaking Change

- Expose typing to consumer and remove export complexity [#1818](https://github.com/jdalrymple/gitbeaker/pull/1818) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v29.3.0 (Mon Jun 07 2021)

#### 🐛 Bug Fix

- Revert build system changes [#1851](https://github.com/jdalrymple/gitbeaker/pull/1851) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v29.2.4 (Sun May 30 2021)

#### 🐛 Bug Fix

- Updating browser build and testing [#1780](https://github.com/jdalrymple/gitbeaker/pull/1780) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v29.2.2 (Sat May 29 2021)

#### ⚠️ Pushed to `master`

- Merge remote-tracking branch 'origin/master' ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v29.2.1 (Sat May 29 2021)

#### 🔩 Dependency Updates

- Bump ts-node from 9.1.1 to 10.0.0 [#1798](https://github.com/jdalrymple/gitbeaker/pull/1798) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

## v29.2.0 (Tue May 18 2021)

#### 🔩 Dependency Updates

- Updating all dependencies [#1775](https://github.com/jdalrymple/gitbeaker/pull/1775) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v29.0.0 (Fri May 14 2021)

#### 💥 Breaking Change

- Update service typing and peripheral endpoints [#1768](https://github.com/jdalrymple/gitbeaker/pull/1768) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v28.4.0 (Tue May 04 2021)

#### 🔩 Dependency Updates

- chore(deps-dev): bump @types/node from 14.14.41 to 15.0.1 [#1719](https://github.com/jdalrymple/gitbeaker/pull/1719) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

## v28.2.0 (Sat Mar 20 2021)

#### 🔩 Dependency Updates

- chore(deps): bump query-string from 6.14.1 to 7.0.0 [#1628](https://github.com/jdalrymple/gitbeaker/pull/1628) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

## v28.1.0 (Sun Mar 14 2021)

#### 🐛 Bug Fix

- Package updates to fix build pipeline \[skip ci\] ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps): bump form-data from 3.0.0 to 4.0.0 [#1558](https://github.com/jdalrymple/gitbeaker/pull/1558) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## vnull (Sun Jan 03 2021)

#### 🐛 Bug Fix

- Removing debug message \[skip ci\] ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `master`

- Merge remote-tracking branch 'origin/master' ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v28.0.0 (Mon Dec 28 2020)

#### 💥 Breaking Change

- Replacing BaseService 'url' constructor argument with 'prefixUrl' for clarity [#1412](https://github.com/jdalrymple/gitbeaker/pull/1412) ([@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- Fixing incorrect scoping of the createRequesterFn function [#1413](https://github.com/jdalrymple/gitbeaker/pull/1413) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v27.0.0 (Fri Dec 18 2020)

#### 💥 Breaking Change

- Removed circular references [#1387](https://github.com/jdalrymple/gitbeaker/pull/1387) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v26.0.0 (Sun Dec 06 2020)

#### 💥 Breaking Change

- Export the APIMap through a compile-time replacement [#1352](https://github.com/jdalrymple/gitbeaker/pull/1352) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v25.5.0 (Sun Nov 29 2020)

#### 🔩 Dependency Updates

- chore(deps-dev): bump rollup-plugin-typescript2 from 0.28.0 to 0.29.0 [#1324](https://github.com/jdalrymple/gitbeaker/pull/1324) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

## v25.1.0 (Tue Oct 20 2020)

#### 🔩 Dependency Updates

- chore(deps-dev): bump rollup-plugin-typescript2 from 0.27.3 to 0.28.0 [#1248](https://github.com/jdalrymple/gitbeaker/pull/1248) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

## v24.2.0 (Tue Oct 13 2020)

#### 🐛 Bug Fix

- Handling nesting of not query parameter [#1223](https://github.com/jdalrymple/gitbeaker/pull/1223) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v23.7.0 (Tue Sep 29 2020)

#### 🐛 Bug Fix

- Updating changelog \[skip ci\] ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v23.6.0 (Mon Sep 28 2020)

#### 🚀 Enhancement

- Restructuring the requester utils and update the related typings [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- Updating terser usage to be only on the browser release [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump typescript from 3.9.7 to 4.0.3 [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- chore(deps-dev): bump rollup-plugin-terser from 6.1.0 to 7.0.0 [#1058](https://github.com/jdalrymple/gitbeaker/pull/1058) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Max Wittig ([@max-wittig](https://github.com/max-wittig))

---

## v23.5.0 (Sun Aug 09 2020)

#### 🐛 Bug Fix

- Fixing check for FormData [#1056](https://github.com/jdalrymple/gitbeaker/pull/1056) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v23.4.0 (Sun Jul 12 2020)

#### 🐛 Bug Fix

- Updating min node version supported [#957](https://github.com/jdalrymple/gitbeaker/pull/957) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v23.1.0 (Wed Jul 08 2020)

#### 🐛 Bug Fix

- Fixing up the Type exports for all the distributed libraries [#795](https://github.com/jdalrymple/gitbeaker/pull/795) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v22.0.0 (Sat Jun 20 2020)

#### 💥 Breaking Change

- Reach > 90% coverage and add Integration Testing [#709](https://github.com/jdalrymple/gitbeaker/pull/709) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v21.7.0 (Tue Jun 16 2020)

#### 🐛 Bug Fix

- Fixing extendClass function to properly handle custom configuration passed to constructor [#896](https://github.com/jdalrymple/gitbeaker/pull/896) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v21.6.0 (Tue Jun 16 2020)

#### 🐛 Bug Fix

- Removal of esinterlop to prefer namespace imports over default exports [#893](https://github.com/jdalrymple/gitbeaker/pull/893) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v21.4.0 (Sun Jun 14 2020)

#### 🐛 Bug Fix

- Adding more tests and adjusting Form Data import [#887](https://github.com/jdalrymple/gitbeaker/pull/887) ([@jdalrymple](https://github.com/jdalrymple))
- Updating Changelog.md \[skip ci\] ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v21.3.0 (Sun Jun 14 2020)

#### 🐛 Bug Fix

- Bump version to: 21.3.0 \[skip ci\] ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v21.2.0 (Sun Jun 14 2020)

#### 🐛 Bug Fix

- Fixing package versions \[skip ci\] ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v21.0.1 (Fri Jun 12 2020)

#### 👷🏼‍♀️ Technical Debt

- Remove Gitlab Instance dependency for CLI tests [#883](https://github.com/jdalrymple/gitbeaker/pull/883) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v19.6.0 (Sat May 16 2020)

#### 🔩 Dependencies

- chore(deps-dev): bump @types/node from 13.13.5 to 14.0.1 [#790](https://github.com/jdalrymple/gitbeaker/pull/790) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

## v19.3.0 (Fri May 01 2020)

#### 🐛 Bug Fix

- Fixing types field to utils and browser package.json [#742](https://github.com/jdalrymple/gitbeaker/pull/742) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v19.0.0 (Thu Apr 23 2020)

#### 💥 Breaking Change

- Adding CLI Integration Tests and Preferring named exports [#711](https://github.com/jdalrymple/gitbeaker/pull/711) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v18.2.0 (Wed Apr 22 2020)

#### 🐛 Bug Fix

- Updating agent property based on new changes in Got [#712](https://github.com/jdalrymple/gitbeaker/pull/712) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v18.1.0 (Wed Apr 22 2020)

#### 🚀 Enhancement

- Adding integration tests for the browser usage [#697](https://github.com/jdalrymple/gitbeaker/pull/697) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v18.0.0 (Tue Apr 21 2020)

#### 🐛 Bug Fix

- Testing with verbose logs ([@jdalrymple](https://github.com/jdalrymple))
- docs: Updating README badges ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

## v17.0.2 (Sun Apr 19 2020)

#### 🔩 Dependencies

- chore(deps-dev): bump rollup-plugin-typescript2 from 0.26.0 to 0.27.0 [#654](https://github.com/jdalrymple/gitbeaker/pull/654) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
