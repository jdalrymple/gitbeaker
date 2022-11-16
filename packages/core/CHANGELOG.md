# v35.8.0 (Wed Nov 16 2022)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Sander Cox ([@sandercox](https://github.com/sandercox))

:heart: Ivan Katliarchuk ([@ivankatliarchuk](https://github.com/ivankatliarchuk))

:heart: null[@phillipB-nmprofile](https://github.com/phillipB-nmprofile)

:heart: Robert Donnelly ([@robdonn](https://github.com/robdonn))

:heart: Felix Herold ([@DerHerrGammler](https://github.com/DerHerrGammler))

#### 🐛 Bug Fix

- Allow MR discussions to be resolved [#2463](https://github.com/jdalrymple/gitbeaker/pull/2463) ([@sandercox](https://github.com/sandercox) [@jdalrymple](https://github.com/jdalrymple))
- fix: Update Users current method return type to UserExtendedSchema [#2737](https://github.com/jdalrymple/gitbeaker/pull/2737) ([@ivankatliarchuk](https://github.com/ivankatliarchuk) [@jdalrymple](https://github.com/jdalrymple))
- Expand Groups.search's options parameter type to PaginatedRequestOptions [#2813](https://github.com/jdalrymple/gitbeaker/pull/2813) ([@phillipB-nmprofile](https://github.com/phillipB-nmprofile) [@jdalrymple](https://github.com/jdalrymple))
- fix: allow string discussionId for MergeRequestDiscussions [#2818](https://github.com/jdalrymple/gitbeaker/pull/2818) ([@robdonn](https://github.com/robdonn) [@jdalrymple](https://github.com/jdalrymple))
- fix: missing resolved key in DiscussionNote interface [#2821](https://github.com/jdalrymple/gitbeaker/pull/2821) ([@DerHerrGammler](https://github.com/DerHerrGammler))

#### 🔩 Dependency Updates

- Bump @types/mime from 2.0.3 to 3.0.1 in /packages/core [#2636](https://github.com/jdalrymple/gitbeaker/pull/2636) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 17.0.15 to 18.0.3 [#2586](https://github.com/jdalrymple/gitbeaker/pull/2586) ([@dependabot[bot]](https://github.com/dependabot[bot]))
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

# v35.7.0 (Mon Jul 11 2022)

:tada: This release contains work from a new contributor! :tada:

Thank you, Sullivan SENECHAL ([@soullivaneuh](https://github.com/soullivaneuh)), for all your work!

#### 🐛 Bug Fix

- fix(resources): missing project default branch possible undefined value [#2515](https://github.com/jdalrymple/gitbeaker/pull/2515) ([@soullivaneuh](https://github.com/soullivaneuh))

#### Authors: 1

- Sullivan SENECHAL ([@soullivaneuh](https://github.com/soullivaneuh))

---

# v35.6.0 (Wed Mar 23 2022)

:tada: This release contains work from a new contributor! :tada:

Thank you, youngje ([@siosio34](https://github.com/siosio34)), for all your work!

#### 🐛 Bug Fix

- Support camelized keys on discussions [#2433](https://github.com/jdalrymple/gitbeaker/pull/2433) ([@jdalrymple](https://github.com/jdalrymple))
- Typo in MergeRequest type [#2431](https://github.com/jdalrymple/gitbeaker/pull/2431) ([@siosio34](https://github.com/siosio34))
- Update del requests to accept body parameters [#2424](https://github.com/jdalrymple/gitbeaker/pull/2424) ([@jdalrymple](https://github.com/jdalrymple))
- Handle position arguments correctly [#2423](https://github.com/jdalrymple/gitbeaker/pull/2423) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- youngje ([@siosio34](https://github.com/siosio34))

---

# v35.5.0 (Wed Mar 16 2022)

:tada: This release contains work from a new contributor! :tada:

Thank you, Bilal Aslam ([@BilalAslam1](https://github.com/BilalAslam1)), for all your work!

#### 🐛 Bug Fix

- Remove double encoding [#2401](https://github.com/jdalrymple/gitbeaker/pull/2401) ([@jdalrymple](https://github.com/jdalrymple))
- Updating return type for repository files raw method [#2383](https://github.com/jdalrymple/gitbeaker/pull/2383) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `master`

- Updating tests to reflect recent bug fix ([@jdalrymple](https://github.com/jdalrymple))

#### 📝 Documentation

- Add reviewerId as a static type option for editing mergerequest approvals [#2368](https://github.com/jdalrymple/gitbeaker/pull/2368) (bilalaslam@carfax.com)

#### Authors: 2

- Bilal Aslam ([@BilalAslam1](https://github.com/BilalAslam1))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v35.4.0 (Mon Feb 07 2022)

#### 🐛 Bug Fix

- Fix the parsing of pagination link querystrings [#2366](https://github.com/jdalrymple/gitbeaker/pull/2366) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v35.3.0 (Sat Feb 05 2022)

#### 🐛 Bug Fix

- Set the minimum supported node version [#2353](https://github.com/jdalrymple/gitbeaker/pull/2353) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v35.2.0 (Sat Feb 05 2022)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Carsten Moberg Hammer ([@moberghammer](https://github.com/moberghammer))

:heart: null[@pataar](https://github.com/pataar)

#### 🐛 Bug Fix

- Return type of showPipelineBridge [#2311](https://github.com/jdalrymple/gitbeaker/pull/2311) ([@moberghammer](https://github.com/moberghammer) [@jdalrymple](https://github.com/jdalrymple))
- Fix typing for the particpants and relatedMergeRequests functions within the Issues API [#2262](https://github.com/jdalrymple/gitbeaker/pull/2262) ([@pataar](https://github.com/pataar))

#### 🔩 Dependency Updates

- Bump @types/node from 16.11.14 to 17.0.0 in /packages/core [#2282](https://github.com/jdalrymple/gitbeaker/pull/2282) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@pataar](https://github.com/pataar)
- Carsten Moberg Hammer ([@moberghammer](https://github.com/moberghammer))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v35.0.0 (Wed Dec 01 2021)

#### 💥 Breaking Change

- Merge branch '2246-tags-signature' [#2255](https://github.com/jdalrymple/gitbeaker/pull/2255) ([@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- Merge branch 'master' into 2246-tags-signature ([@jdalrymple](https://github.com/jdalrymple))
- Updating Tag.create function to match latest API ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v34.7.0 (Tue Nov 30 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Martin Howarth ([@MartinHowarth](https://github.com/MartinHowarth)), for all your work!

#### 💥 Feature

- Add support for CI lint with namespace context [#2222](https://github.com/jdalrymple/gitbeaker/pull/2222) ([@MartinHowarth](https://github.com/MartinHowarth) [@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- Fix lintWithNamespace integration test [#2247](https://github.com/jdalrymple/gitbeaker/pull/2247) ([@MartinHowarth](https://github.com/MartinHowarth))

#### ⚠️ Pushed to `master`

- Minor linting fix ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump rollup-plugin-typescript2 from 0.30.0 to 0.31.1 [#2229](https://github.com/jdalrymple/gitbeaker/pull/2229) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Martin Howarth ([@MartinHowarth](https://github.com/MartinHowarth))

---

# v34.6.0 (Mon Nov 15 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Laffargue Michael ([@mlaffargue](https://github.com/mlaffargue)), for all your work!

#### 🐛 Bug Fix

- Renamed parameter [#2205](https://github.com/jdalrymple/gitbeaker/pull/2205) ([@mlaffargue](https://github.com/mlaffargue))

#### 👷🏼‍♀️ Technical Debt

- Swap mime-types with mime for a smaller pkg size [#2195](https://github.com/jdalrymple/gitbeaker/pull/2195) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Laffargue Michael ([@mlaffargue](https://github.com/mlaffargue))

---

# v34.5.0 (Fri Nov 05 2021)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Martin Howarth ([@MartinHowarth](https://github.com/MartinHowarth))

:heart: Petr Plenkov ([@ThePlenkov](https://github.com/ThePlenkov))

#### 💥 Feature

- Add ability to request merged_yaml from the Gitlab Lint API [#2185](https://github.com/jdalrymple/gitbeaker/pull/2185) ([@MartinHowarth](https://github.com/MartinHowarth) [@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- Commit merge requests should be an array instead of a record [#2192](https://github.com/jdalrymple/gitbeaker/pull/2192) ([@ThePlenkov](https://github.com/ThePlenkov))

#### 👷🏼‍♀️ Technical Debt

- Refactor endpoint generation, using tagged template to encode parameters [#2173](https://github.com/jdalrymple/gitbeaker/pull/2173) ([@nilennoct](https://github.com/nilennoct) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 4

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Martin Howarth ([@MartinHowarth](https://github.com/MartinHowarth))
- nilennoct ([@nilennoct](https://github.com/nilennoct))
- Petr Plenkov ([@ThePlenkov](https://github.com/ThePlenkov))

---

# v34.3.0 (Sun Oct 17 2021)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: null[@GMZwinge](https://github.com/GMZwinge)

:heart: Ian Jenkins ([@jenkoian](https://github.com/jenkoian))

#### 💥 Feature

- Add support for username lookup. [#2147](https://github.com/jdalrymple/gitbeaker/pull/2147) ([@jenkoian](https://github.com/jenkoian) [@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- Fixing protect request format [#2155](https://github.com/jdalrymple/gitbeaker/pull/2155) ([@jdalrymple](https://github.com/jdalrymple))
- Fix the typing for the supported links functions [#2154](https://github.com/jdalrymple/gitbeaker/pull/2154) ([@jdalrymple](https://github.com/jdalrymple))
- Correct approvalRules returned type [#2133](https://github.com/jdalrymple/gitbeaker/pull/2133) (gmzwingelstein@rockwellautomation.com [@jdalrymple](https://github.com/jdalrymple) [@GMZwinge](https://github.com/GMZwinge))
- Circleci editor/circleci project setup [#2124](https://github.com/jdalrymple/gitbeaker/pull/2124) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump jest-extended from 0.11.5 to 1.0.0 in /packages/core [#2141](https://github.com/jdalrymple/gitbeaker/pull/2141) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))
- Bump @rollup/plugin-replace from 2.4.2 to 3.0.0 in /packages/core [#1948](https://github.com/jdalrymple/gitbeaker/pull/1948) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@GMZwinge](https://github.com/GMZwinge)
- Georges M. Zwingelstein (gmzwingelstein@rockwellautomation.com)
- Ian Jenkins ([@jenkoian](https://github.com/jenkoian))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v34.2.0 (Sat Sep 18 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Roy Jacobs ([@sagacity](https://github.com/sagacity)), for all your work!

#### 🐛 Bug Fix

- Users.search should return an array [#2070](https://github.com/jdalrymple/gitbeaker/pull/2070) ([@sagacity](https://github.com/sagacity))

#### 🔩 Dependency Updates

- Bump @rollup/plugin-replace from 2.4.2 to 3.0.0 [#1947](https://github.com/jdalrymple/gitbeaker/pull/1947) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Roy Jacobs ([@sagacity](https://github.com/sagacity))

---

# v34.1.0 (Sat Sep 04 2021)

#### 🐛 Bug Fix

- Fixing stringify of hash arguments [#2057](https://github.com/jdalrymple/gitbeaker/pull/2057) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump eslint-plugin-prettier from 3.4.1 to 4.0.0 [#2043](https://github.com/jdalrymple/gitbeaker/pull/2043) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v34.0.0 (Sat Sep 04 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Paul Lemke ([@lemkepf](https://github.com/lemkepf)), for all your work!

#### 💥 Breaking Change

- Update Jobs showPipelineJobs to have correct array return type [#2056](https://github.com/jdalrymple/gitbeaker/pull/2056) (plemke@acculynx.com)

#### Authors: 1

- Paul Lemke ([@lemkepf](https://github.com/lemkepf))

---

# v33.0.0 (Fri Aug 27 2021)

#### 💥 Breaking Change

- Update MergeRequestApprovals API to match latest Gitlab API Release [#2035](https://github.com/jdalrymple/gitbeaker/pull/2035) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v32.3.0 (Fri Aug 27 2021)

#### 🐛 Bug Fix

- Adding a core integration test, and fixing the resource imports [#2039](https://github.com/jdalrymple/gitbeaker/pull/2039) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v32.2.0 (Mon Aug 23 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Feng Yu ([@F3n67u](https://github.com/F3n67u)), for all your work!

#### 🐛 Bug Fix

- fix(core): change Commits.diff response type to CommitDiffSchema[] [#2025](https://github.com/jdalrymple/gitbeaker/pull/2025) ([@F3n67u](https://github.com/F3n67u))

#### Authors: 1

- Feng Yu ([@F3n67u](https://github.com/F3n67u))

---

# v32.1.2 (Thu Aug 12 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Mahmoud Saada ([@saada](https://github.com/saada)), for all your work!

#### 🐛 Bug Fix

- Fix showArchive return type [#2001](https://github.com/jdalrymple/gitbeaker/pull/2001) ([@saada](https://github.com/saada) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Mahmoud Saada ([@saada](https://github.com/saada))

---

# v32.1.1 (Mon Aug 09 2021)

#### 👷🏼‍♀️ Technical Debt

- Improved mime handling [#1979](https://github.com/jdalrymple/gitbeaker/pull/1979) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v32.1.0 (Tue Aug 03 2021)

#### 🐛 Bug Fix

- Revert pagination changes. Information is available, just not through gitlab.com [#1985](https://github.com/jdalrymple/gitbeaker/pull/1985) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v32.0.0 (Tue Jul 27 2021)

#### 💥 Breaking Change

- Added Topics to ProjectSchema & Updated Commit.ts [#1932](https://github.com/jdalrymple/gitbeaker/pull/1932) ([@Aliyss](https://github.com/Aliyss) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Aliyss Snow ([@Aliyss](https://github.com/Aliyss))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v31.1.0 (Tue Jul 27 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Aliyss Snow ([@Aliyss](https://github.com/Aliyss)), for all your work!

#### 💥 Feature

- Added RepositorySubmodules.ts [#1931](https://github.com/jdalrymple/gitbeaker/pull/1931) ([@Aliyss](https://github.com/Aliyss) [@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump @types/node from 15.14.0 to 16.0.0 [#1914](https://github.com/jdalrymple/gitbeaker/pull/1914) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Aliyss Snow ([@Aliyss](https://github.com/Aliyss))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v31.0.0 (Mon Jul 05 2021)

#### 💥 Breaking Change

- Expose typing to consumer and remove export complexity [#1818](https://github.com/jdalrymple/gitbeaker/pull/1818) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v30.5.0 (Thu Jun 24 2021)

#### 🐛 Bug Fix

- Updating paginationInfo property to match latest API [#1898](https://github.com/jdalrymple/gitbeaker/pull/1898) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v30.4.0 (Tue Jun 22 2021)

#### 🐛 Bug Fix

- Remove log artifact [#1895](https://github.com/jdalrymple/gitbeaker/pull/1895) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v30.3.0 (Tue Jun 22 2021)

#### 🐛 Bug Fix

- Improve pagination logic by parsing query parameters explicitly on response [#1889](https://github.com/jdalrymple/gitbeaker/pull/1889) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v30.0.0 (Mon Jun 07 2021)

#### 💥 Breaking Change

- Package Registry Support [#1822](https://github.com/jdalrymple/gitbeaker/pull/1822) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v29.3.0 (Mon Jun 07 2021)

#### 🐛 Bug Fix

- Revert build system changes [#1851](https://github.com/jdalrymple/gitbeaker/pull/1851) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v29.2.4 (Sun May 30 2021)

#### 🐛 Bug Fix

- Updating browser build and testing [#1780](https://github.com/jdalrymple/gitbeaker/pull/1780) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v29.2.2 (Sat May 29 2021)

#### ⚠️ Pushed to `master`

- Merge remote-tracking branch 'origin/master' ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v29.2.1 (Sat May 29 2021)

#### 🔩 Dependency Updates

- Bump ts-node from 9.1.1 to 10.0.0 [#1798](https://github.com/jdalrymple/gitbeaker/pull/1798) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# v29.2.0 (Tue May 18 2021)

#### 🐛 Bug Fix

- Fixing weird request format for discussions [#1781](https://github.com/jdalrymple/gitbeaker/pull/1781) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Updating all dependencies [#1775](https://github.com/jdalrymple/gitbeaker/pull/1775) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v29.1.0 (Fri May 14 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, Vincent Boulaye ([@vboulaye](https://github.com/vboulaye)), for all your work!

#### 💥 Feature

- add Jobs.showPipelineBridges [#1766](https://github.com/jdalrymple/gitbeaker/pull/1766) ([@vboulaye](https://github.com/vboulaye) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Vincent Boulaye ([@vboulaye](https://github.com/vboulaye))

---

# v29.0.0 (Fri May 14 2021)

#### 💥 Breaking Change

- Update service typing and peripheral endpoints [#1768](https://github.com/jdalrymple/gitbeaker/pull/1768) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- Bump fs-extra from 9.1.0 to 10.0.0 [#1738](https://github.com/jdalrymple/gitbeaker/pull/1738) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v28.4.0 (Tue May 04 2021)

:tada: This release contains work from a new contributor! :tada:

Thank you, null[@divido](https://github.com/divido), for all your work!

#### 🐛 Bug Fix

- Change Issues.unsubscribe to a POST operation instead of DELETE [#1726](https://github.com/jdalrymple/gitbeaker/pull/1726) ([@divido](https://github.com/divido) [@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump @types/node from 14.14.41 to 15.0.1 [#1719](https://github.com/jdalrymple/gitbeaker/pull/1719) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- [@divido](https://github.com/divido)
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v28.1.0 (Sun Mar 14 2021)

#### 🐛 Bug Fix

- Package updates to fix build pipeline \[skip ci\] ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps): bump form-data from 3.0.0 to 4.0.0 [#1558](https://github.com/jdalrymple/gitbeaker/pull/1558) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# vnull (Sun Jan 03 2021)

#### ⚠️ Pushed to `master`

- Merge remote-tracking branch 'origin/master' ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v28.0.0 (Mon Dec 28 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Martin Helmich ([@martin-helmich](https://github.com/martin-helmich)), for all your work!

#### 💥 Breaking Change

- Replacing BaseService 'url' constructor argument with 'prefixUrl' for clarity [#1412](https://github.com/jdalrymple/gitbeaker/pull/1412) ([@jdalrymple](https://github.com/jdalrymple))

#### 💥 Feature

- Implement "Commits.signature" method [#1386](https://github.com/jdalrymple/gitbeaker/pull/1386) ([@martin-helmich](https://github.com/martin-helmich) [@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- Fixing incorrect scoping of the createRequesterFn function [#1413](https://github.com/jdalrymple/gitbeaker/pull/1413) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Martin Helmich ([@martin-helmich](https://github.com/martin-helmich))

---

# v27.0.0 (Fri Dec 18 2020)

#### 💥 Breaking Change

- Removed circular references [#1387](https://github.com/jdalrymple/gitbeaker/pull/1387) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v26.0.0 (Sun Dec 06 2020)

#### 💥 Breaking Change

- Export the APIMap through a compile-time replacement [#1352](https://github.com/jdalrymple/gitbeaker/pull/1352) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v25.6.0 (Mon Nov 30 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Hennadii Varava ([@Sumragen](https://github.com/Sumragen)), for all your work!

#### 💥 Feature

- Revert project to commit [#1353](https://github.com/jdalrymple/gitbeaker/pull/1353) ([@Sumragen](https://github.com/Sumragen) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Hennadii Varava ([@Sumragen](https://github.com/Sumragen))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v25.5.0 (Sun Nov 29 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Omar Awamry ([@wamry](https://github.com/wamry)), for all your work!

#### 🐛 Bug Fix

- fix: change labels type in all MergeRequestPptions types [#1355](https://github.com/jdalrymple/gitbeaker/pull/1355) (omar.awamry@vodafone.com)

#### 🔩 Dependency Updates

- chore(deps-dev): bump rollup-plugin-typescript2 from 0.28.0 to 0.29.0 [#1324](https://github.com/jdalrymple/gitbeaker/pull/1324) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Omar Awamry ([@wamry](https://github.com/wamry))

---

# v25.4.0 (Tue Nov 24 2020)

#### 🐛 Bug Fix

- Supress Bundler typescript warnings [#1328](https://github.com/jdalrymple/gitbeaker/pull/1328) ([@kiprasmel](https://github.com/kiprasmel))

#### ⚠️ Pushed to `master`

- Temporary omission of ts error ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Kipras Melnikovas ([@kiprasmel](https://github.com/kiprasmel))

---

# v25.3.0 (Fri Nov 06 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Ilya Dus ([@illyaMs](https://github.com/illyaMs)), for all your work!

#### 🐛 Bug Fix

- refactor: export CommitAction interface [#1307](https://github.com/jdalrymple/gitbeaker/pull/1307) ([@illyaMs](https://github.com/illyaMs))

#### Authors: 1

- Ilya Dus ([@illyaMs](https://github.com/illyaMs))

---

# v25.1.0 (Tue Oct 20 2020)

#### 🔩 Dependency Updates

- chore(deps-dev): bump rollup-plugin-typescript2 from 0.27.3 to 0.28.0 [#1248](https://github.com/jdalrymple/gitbeaker/pull/1248) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v25.0.0 (Thu Oct 15 2020)

#### 💥 Breaking Change

- Add approval rule management [#1233](https://github.com/jdalrymple/gitbeaker/pull/1233) ([@nlochschmidt](https://github.com/nlochschmidt))

#### Authors: 1

- Niklas Lochschmidt ([@nlochschmidt](https://github.com/nlochschmidt))

---

# v24.3.0 (Thu Oct 15 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Niklas Lochschmidt ([@nlochschmidt](https://github.com/nlochschmidt)), for all your work!

#### 💥 Feature

- Add support for Freeze Periods [#1231](https://github.com/jdalrymple/gitbeaker/pull/1231) ([@nlochschmidt](https://github.com/nlochschmidt) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Niklas Lochschmidt ([@nlochschmidt](https://github.com/nlochschmidt))

---

# v24.1.0 (Mon Oct 12 2020)

#### 💥 Feature

- Adding MR rebase endpoint [#1225](https://github.com/jdalrymple/gitbeaker/pull/1225) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# vnull (Sun Oct 11 2020)

#### 📝 Documentation

- Updating incorrect showExtended->showExpanded property documentation [#1205](https://github.com/jdalrymple/gitbeaker/pull/1205) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v24.0.0 (Mon Oct 05 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Sander Cox ([@sandercox](https://github.com/sandercox)), for all your work!

#### 💥 Breaking Change

- Feature: Support keyset pagination [#1184](https://github.com/jdalrymple/gitbeaker/pull/1184) ([@max-wittig](https://github.com/max-wittig) [@jdalrymple](https://github.com/jdalrymple))

#### 💥 Feature

- feat: Get runners for a group [#1182](https://github.com/jdalrymple/gitbeaker/pull/1182) ([@sandercox](https://github.com/sandercox) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 3

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Max Wittig ([@max-wittig](https://github.com/max-wittig))
- Sander Cox ([@sandercox](https://github.com/sandercox))

---

# v23.7.0 (Tue Sep 29 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, null[@st1gok](https://github.com/st1gok), for all your work!

#### 🐛 Bug Fix

- Update CommitDiscussions.ts [#1168](https://github.com/jdalrymple/gitbeaker/pull/1168) ([@st1gok](https://github.com/st1gok) [@jdalrymple](https://github.com/jdalrymple))
- Updating changelog \[skip ci\] ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@st1gok](https://github.com/st1gok)
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v23.6.0 (Mon Sep 28 2020)

#### 🚀 Enhancement

- Restructuring the requester utils and update the related typings [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- Updating terser usage to be only on the browser release [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump typescript from 3.9.7 to 4.0.3 [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- Update ts-node [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- Updating core deps [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump rollup-plugin-terser from 6.1.0 to 7.0.0 [#1058](https://github.com/jdalrymple/gitbeaker/pull/1058) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v23.4.0 (Sun Jul 12 2020)

#### 🐛 Bug Fix

- Updating min node version supported [#957](https://github.com/jdalrymple/gitbeaker/pull/957) ([@jdalrymple](https://github.com/jdalrymple))
- Fixing encoding for requests of archive data [#954](https://github.com/jdalrymple/gitbeaker/pull/954) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v23.3.0 (Sat Jul 11 2020)

#### 🐛 Bug Fix

- Fixing type definitions for optional arguments [#956](https://github.com/jdalrymple/gitbeaker/pull/956) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v23.2.0 (Wed Jul 08 2020)

#### 🐛 Bug Fix

- Fixing closes_issues endpoint [#953](https://github.com/jdalrymple/gitbeaker/pull/953) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v23.0.0 (Tue Jul 07 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, s-kazuki ([@s-kazuki](https://github.com/s-kazuki)), for all your work!

#### 💥 Breaking Change

- :up: create todos for issues [#925](https://github.com/jdalrymple/gitbeaker/pull/925) ([@s-kazuki](https://github.com/s-kazuki))

#### Authors: 1

- s-kazuki ([@s-kazuki](https://github.com/s-kazuki))

---

# v22.0.1 (Thu Jun 25 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Flavien Bridault ([@fbridault](https://github.com/fbridault)), for all your work!

#### 🐛 Bug Fix

- Add `related merge requests` and `closed by` in Issues service [#903](https://github.com/jdalrymple/gitbeaker/pull/903) ([@fbridault](https://github.com/fbridault) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Flavien Bridault ([@fbridault](https://github.com/fbridault))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v22.0.0 (Sat Jun 20 2020)

#### 💥 Breaking Change

- Reach > 90% coverage and add Integration Testing [#709](https://github.com/jdalrymple/gitbeaker/pull/709) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v21.6.0 (Tue Jun 16 2020)

#### 🐛 Bug Fix

- Removal of esinterlop to prefer namespace imports over default exports [#893](https://github.com/jdalrymple/gitbeaker/pull/893) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v21.4.0 (Sun Jun 14 2020)

#### 🐛 Bug Fix

- Updating Changelog.md \[skip ci\] ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v21.3.0 (Sun Jun 14 2020)

#### 🐛 Bug Fix

- Bump version to: 21.3.0 \[skip ci\] ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v21.2.0 (Sun Jun 14 2020)

#### 🐛 Bug Fix

- Fixing missing CLI tests and modifyServices function [#886](https://github.com/jdalrymple/gitbeaker/pull/886) ([@jdalrymple](https://github.com/jdalrymple))
- Fixing package versions \[skip ci\] ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v21.0.1 (Fri Jun 12 2020)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Yevgeny Petukhov ([@yepninja](https://github.com/yepninja))

:heart: Andrea ([@andreasciamanna](https://github.com/andreasciamanna))

#### 💥 Breaking Change

- Adjust casing to be properly handled by the conversion to snake case in the CLI [#857](https://github.com/jdalrymple/gitbeaker/pull/857) ([@jdalrymple](https://github.com/jdalrymple))

#### 🐛 Bug Fix

- Additional linting ([@jdalrymple](https://github.com/jdalrymple))
- Issue links (get, delete) [#868](https://github.com/jdalrymple/gitbeaker/pull/868) ([@yepninja](https://github.com/yepninja) [@jdalrymple](https://github.com/jdalrymple))
- Add YouTrack to the supported services [#853](https://github.com/jdalrymple/gitbeaker/pull/853) ([@andreasciamanna](https://github.com/andreasciamanna))

#### 👷🏼‍♀️ Technical Debt

- Remove Gitlab Instance dependency for CLI tests [#883](https://github.com/jdalrymple/gitbeaker/pull/883) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 3

- Andrea ([@andreasciamanna](https://github.com/andreasciamanna))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Yevgeny Petukhov ([@yepninja](https://github.com/yepninja))

---

# v19.7.0 (Sun May 17 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, null[@xatavian](https://github.com/xatavian), for all your work!

#### 🚀 Enhancement

- Feature: Arbitrary parameters for Projects.search [#801](https://github.com/jdalrymple/gitbeaker/pull/801) (avi.szychter@trialog.com [@xatavian](https://github.com/xatavian))

#### Authors: 2

- [@xatavian](https://github.com/xatavian)
- Avi SZYCHTER (avi.szychter@trialog.com)

---

# v19.6.0 (Sat May 16 2020)

#### 🐛 Bug Fix

- Project upload is not formatting form-data correctly [#797](https://github.com/jdalrymple/gitbeaker/pull/797) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependencies

- chore(deps-dev): bump @types/node from 13.13.5 to 14.0.1 [#790](https://github.com/jdalrymple/gitbeaker/pull/790) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### 📝 Documentation

- Update typing to specify that the path or name property must be passed [#796](https://github.com/jdalrymple/gitbeaker/pull/796) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v19.5.0 (Mon May 11 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Corentin Mors ([@Mikescops](https://github.com/Mikescops)), for all your work!

#### 🐛 Bug Fix

- Fix: Update DELETE method to POST in todos.done() [#780](https://github.com/jdalrymple/gitbeaker/pull/780) ([@Mikescops](https://github.com/Mikescops))

#### Authors: 1

- Corentin Mors ([@Mikescops](https://github.com/Mikescops))

---

# v19.4.0 (Wed May 06 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Dylan M. Taylor ([@dylanmtaylor](https://github.com/dylanmtaylor)), for all your work!

#### 💥 Feature

- Add Deploy tokens API [#762](https://github.com/jdalrymple/gitbeaker/pull/762) ([@jdalrymple](https://github.com/jdalrymple) [@dylanmtaylor](https://github.com/dylanmtaylor))

#### 🐛 Bug Fix

- Merge branch 'deploy-fix' ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Dylan M. Taylor ([@dylanmtaylor](https://github.com/dylanmtaylor))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v19.3.0 (Fri May 01 2020)

#### 🐛 Bug Fix

- Fixing types field to utils and browser package.json [#742](https://github.com/jdalrymple/gitbeaker/pull/742) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v19.2.0 (Wed Apr 29 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Daniel Moore ([@danielmoore](https://github.com/danielmoore)), for all your work!

#### 🐛 Bug Fix

- Add types field to node and browser package.json [#737](https://github.com/jdalrymple/gitbeaker/pull/737) ([@danielmoore](https://github.com/danielmoore))

#### Authors: 1

- Daniel Moore ([@danielmoore](https://github.com/danielmoore))

---

# v19.1.0 (Mon Apr 27 2020)

#### 🚀 Enhancement

- feats: adds options interface for MergeRequest.all() [#606](https://github.com/jdalrymple/gitbeaker/pull/606) ([@AlvaroBernalG](https://github.com/AlvaroBernalG) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Alvaro ([@AlvaroBernalG](https://github.com/AlvaroBernalG))
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v19.0.0 (Thu Apr 23 2020)

#### 💥 Breaking Change

- Adding CLI Integration Tests and Preferring named exports [#711](https://github.com/jdalrymple/gitbeaker/pull/711) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v18.1.0 (Wed Apr 22 2020)

#### 🚀 Enhancement

- Adding integration tests for the browser usage [#697](https://github.com/jdalrymple/gitbeaker/pull/697) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v18.0.0 (Tue Apr 21 2020)

#### 💥 Breaking Change

- feat: Updated an API parameter for GitLab 12.9 [#647](https://github.com/jdalrymple/gitbeaker/pull/647) ([@schindld](https://github.com/schindld))

#### 🐛 Bug Fix

- Testing with verbose logs ([@jdalrymple](https://github.com/jdalrymple))
- docs: Updating README badges ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- [@schindld](https://github.com/schindld)
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v17.0.2 (Sun Apr 19 2020)

#### 🔩 Dependencies

- chore(deps-dev): bump rollup-plugin-typescript2 from 0.26.0 to 0.27.0 [#654](https://github.com/jdalrymple/gitbeaker/pull/654) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
