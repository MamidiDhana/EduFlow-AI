# Contributing to EduFlow AI 🎓✨

Thank you for your interest in contributing to **EduFlow AI** — an AI-powered student productivity assistant that brings study planning, notes, AI learning tools, mood tracking, and productivity insights into one clean dashboard.

This guide will walk you through everything you need to go from zero to your first merged PR. Welcome! 🚀

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
  - [Fork & Clone the Repository](#fork--clone-the-repository)
  - [Setting Up the Development Environment](#setting-up-the-development-environment)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Making Changes](#making-changes)
  - [Commit Message Style](#commit-message-style)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Issues](#reporting-issues)
- [Need Help?](#need-help)

---

## Code of Conduct

By participating in this project, you agree to keep this space respectful, inclusive, and beginner-friendly. Be constructive, patient, and kind — especially with first-time contributors.

---

## Getting Started

### Fork & Clone the Repository

1. **Fork** this repository by clicking the **Fork** button at the top-right of the [EduFlow AI GitHub page](https://github.com/prabhakarshukla/EduFlow-AI).

2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/EduFlow-AI.git
   cd EduFlow-AI
   ```

3. **Add the upstream remote** to stay in sync with the original:
   ```bash
   git remote add upstream https://github.com/prabhakarshukla/EduFlow-AI.git
   ```

4. **Verify your remotes:**
   ```bash
   git remote -v
   # origin    https://github.com/YOUR_USERNAME/EduFlow-AI.git (fetch)
   # upstream  https://github.com/prabhakarshukla/EduFlow-AI.git (fetch)
   ```

---

### Setting Up the Development Environment

#### Prerequisites

| Tool | Purpose |
|------|---------|
| [Node.js](https://nodejs.org/) (v18+) | JavaScript runtime |
| [npm](https://npmjs.com/) | Package manager |
| [Supabase account](https://supabase.com/) | Database & auth |
| [Gemini API key](https://ai.google.dev/) | AI features |

#### Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create your environment file** — add a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   AI_PROVIDER=gemini
   GEMINI_API_KEY=your_gemini_api_key
   GEMINI_MODEL=gemini-2.5-flash
   OPENAI_API_KEY=your_openrouter_or_openai_key
   ```

   - Get your Supabase URL and anon key from your [Supabase project settings](https://app.supabase.com/).
   - Get a Gemini API key from [Google AI Studio](https://ai.google.dev/).
   - `OPENAI_API_KEY` is optional — used as a fallback when `AI_PROVIDER` is not set to `gemini`.

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

4. **Keep your fork up to date** before starting any new work:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

---

## Branch Naming Conventions

Always create a new branch for your changes. **Never commit directly to `main`.**

Use this format:

```text
<type>/<short-description>
```

| Type | When to use | Example |
|------|-------------|---------|
| `feat` | New feature | `feat/heatmap-calendar` |
| `fix` | Bug fix | `fix/streak-reset-bug` |
| `docs` | Documentation only | `docs/add-contributing-guide` |
| `chore` | Maintenance (deps, config) | `chore/update-dependencies` |
| `refactor` | Code restructuring, no behavior change | `refactor/ai-provider-logic` |
| `test` | Adding or updating tests | `test/notes-crud-flow` |
| `style` | UI or formatting tweaks | `style/dashboard-mobile-layout` |

**Create your branch:**
```bash
git checkout -b feat/your-feature-name
```

---

## Making Changes

- Keep each PR **focused** — one feature or fix per PR.
- For **AI feature changes**, test with both Gemini and OpenRouter/OpenAI fallback where applicable.
- For **UI changes**, ensure the dashboard stays responsive across desktop, tablet, and mobile — the project uses a mobile-first approach with Tailwind CSS.
- For **Supabase changes** (schema, queries, RLS policies), document what changed and why in your PR description.
- For **TypeScript** changes, ensure there are no type errors before pushing:
  ```bash
  npm run build
  ```
- Keep changes clean, focused, and easy to review — avoid bundling unrelated changes in one PR.

### Commit Message Style

Follow the [Conventional Commits](https://www.conventionalcommits.org/) standard. Your commits are validated automatically by a `commit-msg` hook.

#### Format

```text
<type>(<scope>): <description>

<body (optional)>

<footer (optional)>
```

#### Type

Required. Must be one of:
- **`feat`** — new feature
- **`fix`** — bug fix
- **`docs`** — documentation changes
- **`style`** — UI/formatting changes (not CSS)
- **`refactor`** — code restructuring without behavior change
- **`test`** — adding or updating tests
- **`chore`** — maintenance, deps, config
- **`perf`** — performance improvement
- **`ci`** — CI/CD pipeline changes

#### Scope (Optional)

Component or area affected: `(planner)`, `(streak)`, `(ai)`, `(dashboard)`, `(auth)`, etc.

#### Description

- Use **imperative mood** — "add" not "added" or "adds"
- **Lowercase first letter**
- No period at the end
- Under **100 characters**

#### Body & Footer (Optional)

Add details or reference issues:
```text
feat(planner): add recurring task support to study planner

Recurring tasks help users maintain consistent study habits.
Supports daily, weekly, and custom intervals with skip logic.

Closes #24
```

#### ✅ Good Commits

```text
feat(planner): add recurring task support to study planner
```
Clear, specific, uses imperative mood.

```text
fix(streak): resolve streak reset on timezone change
```
Problem + solution, lowercase, no period.

```text
docs(contributing): add commit message examples

Includes good/bad examples and validation rules.
```
Scope + description, optional body explains impact.

```text
refactor(ai): extract gemini prompt templates into constants

Improves maintainability and reduces duplication across prompt generation.
Templates now defined in constants/prompts.ts.

Closes #42
```
Clear scope, good description, body explains why.

#### ❌ Bad Commits

```text
Update code
```
Too vague. What did you change?

```text
Added new feature to the dashboard component.
```
Imperative mood failed ("Added" not "add"). Too generic.

```text
Fix bugs in the streak calculation and update the notes UI and clean up some CSS
```
Multiple unrelated changes. Split into separate commits.

```text
feat(dashboard): Improve the UI by making it look better and adding new stuff.
```
Vague. "Look better" and "new stuff" don't explain what actually changed.

```text
chore: Update dependencies and refactor auth and fix a critical security issue
```
Mixes chore, refactor, and fix. Should be separate commits.

#### Validation

Your commits are validated with commitlint. Invalid messages are rejected:
```
✖ [type]: type must be one of [feat, fix, docs, style, refactor, test, chore, perf, ci, revert]
✖ [subject-empty]: subject may not be empty
✖ [subject-full-stop]: subject must not end with a full stop
✖ [header-max-length]: header must not be longer than 100 characters
```

If validation fails, amend your commit:
```bash
git commit --amend
```

Then retry the same command.

---

## Submitting a Pull Request

1. **Ensure the production build passes** before pushing:
   ```bash
   npm run build
   ```

2. **Push your branch** to your fork:
   ```bash
   git push origin feat/your-feature-name
   ```

3. Go to [prabhakarshukla/EduFlow-AI](https://github.com/prabhakarshukla/EduFlow-AI) on GitHub and click **"Compare & pull request"**.

4. Fill in the PR description with:
   - A clear **title** (e.g. `feat: add heatmap calendar for study consistency`)
   - **What changed** and **why**
   - Screenshots or screen recordings for any UI changes
   - The issue it resolves: `Closes #<issue-number>`

5. Keep changes clean and easy to review. A maintainer will look over your PR — requested changes are normal. Address the feedback, push updates, and you'll get merged once approved. 🎉

> **Note:** PRs that introduce new AI providers, Supabase schema changes, or significant architecture decisions should be discussed in a GitHub Issue first.

---

## Reporting Issues

Found a bug or have a feature idea? [Open an issue](https://github.com/prabhakarshukla/EduFlow-AI/issues)!

**Before opening an issue:**
- Search [existing issues](https://github.com/prabhakarshukla/EduFlow-AI/issues) to avoid duplicates.
- Check if it's already fixed in the latest commit on `main`.

**For bug reports, include:**
- Clear, descriptive title
- Steps to reproduce the problem
- Expected vs. actual behavior
- Your OS, Node.js version (`node -v`), and browser
- Relevant error logs from the terminal or browser DevTools

**For feature requests, include:**
- The problem you're solving
- Your proposed solution
- Any alternatives you considered

---

## Need Help?

- Browse [open issues](https://github.com/prabhakarshukla/EduFlow-AI/issues) for context on ongoing work.
- Leave a comment directly on the relevant issue or PR.
- Reach the maintainer directly:
  - GitHub: [prabhakarshukla](https://github.com/prabhakarshukla)
  - Gmail: prabhakarshukla669@gmail.com

New to open source? Look for issues tagged **`good first issue`** or **`Easy`** — they're scoped to be approachable for beginners. We'd love to have you! 💙
