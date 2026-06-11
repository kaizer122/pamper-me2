# AGENTS.md

## Agent skills

### Issue tracker

Local markdown — issues live as files under `.scratch/<feature>/` in this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Code quality gate

After completing each implementation phase (before committing), **always** run the auto-fixers:

```sh
bunx eslint --fix apps/*/src packages/*/src scripts 2>/dev/null
bunx prettier --write "**/*.{ts,tsx,json,md}" --ignore-path .gitignore --ignore-path .prettierignore
```

Then verify zero warnings remain:

```sh
bun run lint
bunx prettier --check "**/*.{ts,tsx,json,md}" --ignore-path .gitignore --ignore-path .prettierignore
```

Do NOT commit code that fails lint or format. Fix issues inline if auto-fix doesn't resolve them.
