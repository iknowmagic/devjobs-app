# Git Workflow

A tag‑centric process with disposable branches—minimal ceremony, maximal clarity.

---

## Why this workflow?

- **Immutable history** – every deployable build is sealed behind a `v<semver>` tag that never drifts.
- **Clean branch list** – day‑to‑day coding lives in short‑lived `work/b####` branches; they vanish after the pull‑request merge.
- **Optional snapshots** – need a nightly “save game”? Drop a `snap/YYYY.MM.DD‑n‑b####` tag.
- **Friendly releases** – final publishing (codename, notes, assets) happens in GitHub’s Releases UI; local scripts stay light.

---

## Ref map at a glance

| Ref              | Example                   | Mutable? | Use‑case                                            |
| ---------------- | ------------------------- | -------- | --------------------------------------------------- |
| **Main**         | `main`                    | ❌       | Always deploy‑ready.                                |
| **Work**         | `work/b0042`              | ✅       | Focused coding; auto‑deleted by GitHub on PR merge. |
| **Version tag**  | `v1.8.0`                  | ❌       | Single source of truth for what shipped.            |
| **Snapshot tag** | `snap/2025.05.12‑1‑b0042` | ❌       | Optional daily checkpoint.                          |

> GitHub releases (e.g. **Peter Pan ‑ 5**) are manual aliases that point to the matching `v*` tag.

---

## npm helpers (scripts/ folder)

| npm command                              | Behind the curtain                                                            |
| ---------------------------------------- | ----------------------------------------------------------------------------- |
| `npm run branch`                         | Creates the next `work/b####` branch and checks it out.                       |
| `npm run snap`                           | Tags the current work branch with `snap/YYYY.MM.DD‑n‑b####` and pushes it.    |
| `npm run bump:patch` / `minor` / `major` | On `main`: bumps `package.json`, commits, tags `vX.Y.Z`, pushes commit + tag. |

_(Script internals live in `scripts/`; this document focuses on when to run them.)_

---

## Daily routine

1. **Spin a branch** `npm run branch` → you land on `work/b####`.
2. Code; commit granularly.
3. _(Optional)_ Add your changes to the "Unreleased" section of CHANGELOG.md.
4. _(Optional)_ `npm run snap` at day's end for a rollback anchor.
5. **Complete the PR process:**
   - Push your branch to GitHub
   - Create a pull request (PR) to merge into `main`
   - Review your changes
   - Merge the PR (preferably using "Squash and merge")
6. **After merge is complete:**

   - `git checkout main` (switch to main branch locally)
   - `git pull` (get latest changes including your merged PR)

   **Option A: Using GitHub Copilot (recommended)**

   - Run `npm run changelog` to generate changes.txt
   - Share changes.txt with GitHub Copilot, asking it to:
     1. Analyze commit types (feat, fix, docs, etc.)
     2. Suggest appropriate version bump (minor for features, patch for fixes)
     3. Generate formatted CHANGELOG entries
   - Update CHANGELOG.md based on Copilot's recommendations
   - Commit: `git commit -am "docs: update CHANGELOG for v1.X.Y"`

   **Option B: Manual update**

   - Check current version in package.json
   - Review recent commits with `git log --oneline v[last-tag]..HEAD`
   - Decide on version bump based on commit types:
     - Features (`feat:`) → Minor version bump
     - Fixes (`fix:`) → Patch version bump
     - Breaking changes → Major version bump
   - Rename the "Unreleased" section in CHANGELOG.md to the new version
   - Commit: `git commit -am "docs: update CHANGELOG for v1.X.Y"`

   **Final step (both options)**

   - `npm run bump:<level>` (patch/minor/major) → creates and pushes `vX.Y.Z` tag

7. In GitHub → **Draft new release** → choose the new tag, add notes, publish.

---

## Hotfix routine

1. `git checkout -b hotfix/<topic> v1.8.0` (start from the last good tag).
2. Repair, commit, PR, merge.
3. `npm run bump:patch` → creates & pushes `v1.8.1`.
4. Draft a GitHub release (**Peter Pan ‑ 6**) pointing to the new tag.

---

## Quick‑reference commands

| Need                    | Command                                |
| ----------------------- | -------------------------------------- |
| Next work branch        | `npm run branch`                       |
| Nightly snapshot        | `npm run snap`                         |
| Ship a patch            | `npm run bump:patch`                   |
| Roll back to yesterday  | `git checkout snap/YYYY.MM.DD‑n‑b####` |
| Deploy previous release | `git checkout v1.7.0`                  |

---

## FAQ

**Will deleting `work/b####` lose history?** No. Tags keep the commits alive.

**Do I have to snapshot every night?** No. Run snapshots only when you want a rollback anchor.

**Need parallel prod versions?** Branch off the tag you need (`release/1.x`) and continue using the same bump script inside that branch.

Everything else—branch protection, auto‑delete merged branches, required status checks—is configured in GitHub settings.

Stay lean, keep the tags immutable, and your history reads like a clean jazz chart instead of a scribbled napkin.

**Note for teams with protected branches:** If your main branch is protected, create a "release preparation" PR that updates the CHANGELOG.md with the new version number. After merging, an authorized team member can create the version tag.
**Note for teams with multiple developers:** Ensure that all developers are aware of the workflow and follow the same process to avoid confusion and maintain a clean history.
