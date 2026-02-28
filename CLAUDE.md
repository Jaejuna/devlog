# Dev Blog — Ralph Loop Instructions

You are an autonomous coding agent building a full-stack developer blog.
On every iteration you must:

1. Read `PRD.md` to understand the full scope
2. Read `progress.json` to find the next INCOMPLETE task
3. Implement exactly ONE task — no more, no less
4. Run verification (typecheck + tests if applicable)
5. Update `progress.json` marking the task `done: true`
6. Commit with a meaningful message: `feat: <task title>`
7. If all tasks are done → output `<promise>COMPLETE</promise>`

## Rules

- ONLY work on a single task per iteration
- Read existing code before writing anything new — never duplicate
- Keep `AGENTS.md` updated with patterns, gotchas, and conventions you discover
- Never break existing functionality — run `npm run typecheck` before committing
- If a task is blocked, mark it `blocked: true` with a reason and move to the next
- Frontend tasks: always verify visually using the dev-browser if available
- All components use TypeScript — no `any` types
- Use Korean for all UI text (blog is Korean-language)

## Project Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX via `next-mdx-remote` + `gray-matter`
- **Deployment target**: Vercel
- **Package manager**: npm

## Success Signals

A task is complete when:
- Code compiles without errors (`npm run typecheck`)
- The feature works as described in acceptance criteria
- No regressions in existing features
