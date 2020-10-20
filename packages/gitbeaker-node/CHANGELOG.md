# v25.1.0 (Tue Oct 20 2020)

#### 🐛 Bug Fix

- RejectUnauthorized being set incorrectly for the NodeJS release [#1252](https://github.com/jdalrymple/gitbeaker/pull/1252) ([@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump rollup-plugin-typescript2 from 0.27.3 to 0.28.0 [#1248](https://github.com/jdalrymple/gitbeaker/pull/1248) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

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

#### 🐛 Bug Fix

- Agent-Type error for GotRequester [#1224](https://github.com/jdalrymple/gitbeaker/pull/1224) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v24.0.3 (Mon Oct 12 2020)

#### 🐛 Bug Fix

- Merge branch '1222-integration-stability' \[skip ci\] ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `master`

- perform retries on a wider range of error codes ([@jdalrymple](https://github.com/jdalrymple))
- Wrapping error messages to avoid JSON.parse non json responses ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# vnull (Sun Oct 11 2020)

#### 🐛 Bug Fix

- Locate 400 test error \[skip ci\] ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `master`

- Merge branch '1222-integration-stability' ([@jdalrymple](https://github.com/jdalrymple))
- Embedding project creation prior to upload ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# vnull (Sun Oct 11 2020)

#### 🐛 Bug Fix

- Adding pagination tests [#1186](https://github.com/jdalrymple/gitbeaker/pull/1186) ([@jdalrymple](https://github.com/jdalrymple))

#### ⚠️ Pushed to `master`

- Merge branch '1222-integration-stability' ([@jdalrymple](https://github.com/jdalrymple))
- Skip pagination tests until stability is sorted ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v24.0.0 (Mon Oct 05 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Sander Cox ([@sandercox](https://github.com/sandercox)), for all your work!

#### 💥 Feature

- feat: Get runners for a group [#1182](https://github.com/jdalrymple/gitbeaker/pull/1182) ([@sandercox](https://github.com/sandercox) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 2

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Sander Cox ([@sandercox](https://github.com/sandercox))

---

# v23.7.0 (Tue Sep 29 2020)

#### 🐛 Bug Fix

- Updating changelog \[skip ci\] ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v23.6.0 (Mon Sep 28 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, xieyu ([@Gkxie](https://github.com/Gkxie)), for all your work!

#### 🚀 Enhancement

- Restructuring the requester utils and update the related typings [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- Updating terser usage to be only on the browser release [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))

#### 💥 Feature

- Apply exponential backoff for 429 errors ([@max-wittig](https://github.com/max-wittig))

#### 🐛 Bug Fix

- fix(node): Error response body needs parsing first when it's type is json [#1057](https://github.com/jdalrymple/gitbeaker/pull/1057) ([@Gkxie](https://github.com/Gkxie) [@jdalrymple](https://github.com/jdalrymple))

#### 🔩 Dependency Updates

- chore(deps-dev): bump typescript from 3.9.7 to 4.0.3 [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- Update ts-node [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- Updating node deps [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- Updating openpgp [#1163](https://github.com/jdalrymple/gitbeaker/pull/1163) ([@jdalrymple](https://github.com/jdalrymple))
- chore(deps-dev): bump rollup-plugin-terser from 6.1.0 to 7.0.0 [#1058](https://github.com/jdalrymple/gitbeaker/pull/1058) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]) [@jdalrymple](https://github.com/jdalrymple))

#### Authors: 4

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))
- Max Wittig ([@max-wittig](https://github.com/max-wittig))
- xieyu ([@Gkxie](https://github.com/Gkxie))

---

# v23.5.0 (Sun Aug 09 2020)

#### 🐛 Bug Fix

- Fixing check for FormData [#1056](https://github.com/jdalrymple/gitbeaker/pull/1056) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v23.4.0 (Sun Jul 12 2020)

#### 🐛 Bug Fix

- Updating min node version supported [#957](https://github.com/jdalrymple/gitbeaker/pull/957) ([@jdalrymple](https://github.com/jdalrymple))
- Fixing encoding for requests of archive data [#954](https://github.com/jdalrymple/gitbeaker/pull/954) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

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

#### 👷🏼‍♀️ Technical Debt

- Remove Gitlab Instance dependency for CLI tests [#883](https://github.com/jdalrymple/gitbeaker/pull/883) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v19.6.0 (Sat May 16 2020)

#### 🔩 Dependencies

- chore(deps-dev): bump @types/node from 13.13.5 to 14.0.1 [#790](https://github.com/jdalrymple/gitbeaker/pull/790) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v19.2.0 (Wed Apr 29 2020)

:tada: This release contains work from a new contributor! :tada:

Thank you, Daniel Moore ([@danielmoore](https://github.com/danielmoore)), for all your work!

#### 🐛 Bug Fix

- Add types field to node and browser package.json [#737](https://github.com/jdalrymple/gitbeaker/pull/737) ([@danielmoore](https://github.com/danielmoore))

#### Authors: 1

- Daniel Moore ([@danielmoore](https://github.com/danielmoore))

---

# v19.0.0 (Thu Apr 23 2020)

#### 💥 Breaking Change

- Adding CLI Integration Tests and Preferring named exports [#711](https://github.com/jdalrymple/gitbeaker/pull/711) ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v18.2.0 (Wed Apr 22 2020)

#### 🐛 Bug Fix

- Updating agent property based on new changes in Got [#712](https://github.com/jdalrymple/gitbeaker/pull/712) ([@jdalrymple](https://github.com/jdalrymple))

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

#### 🐛 Bug Fix

- Testing with verbose logs ([@jdalrymple](https://github.com/jdalrymple))
- docs: Updating README badges ([@jdalrymple](https://github.com/jdalrymple))

#### Authors: 1

- Justin Dalrymple ([@jdalrymple](https://github.com/jdalrymple))

---

# v17.0.2 (Sun Apr 19 2020)

#### 🔩 Dependencies

- chore(deps-dev): bump rollup-plugin-typescript2 from 0.26.0 to 0.27.0 [#654](https://github.com/jdalrymple/gitbeaker/pull/654) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
