# Jaejuna · j-devlog

**Localization Engineer & PM** at Nexon Korea  
Researching LLM translation and evaluation for Korean cultural content

🌐 [j-devlog.space](https://j-devlog.space) · [LinkedIn](https://www.linkedin.com/in/jaejun-jung-37107a293/) · [GitHub](https://github.com/Jaejuna)

---

## About

I work at the intersection of language and engineering — building LLM-powered localization systems, evaluating machine translation quality, and writing about what I learn along the way.

This blog is a personal space for technical deep-dives, project retrospectives, and interview prep notes. It also doubles as my portfolio.

**Currently at Nexon Korea:**
- Built a HITL LLM translation platform with RAG & Graph resources → ¥120M annual cost reduction (4 games as of 2025)
- Designed a game-domain translation benchmark system with HITL pipeline
- Managing end-to-end localization for MapleStory: Idle RPG

---

## Writing

Posts are organized into five categories:

| Category | Focus |
|----------|-------|
| **AI** | LLM, prompt engineering, AI tooling |
| **개발** | Web & backend concepts, patterns, engineering |
| **면접** | CS fundamentals & interview prep |
| **회고** | Project & event retrospectives |
| **MMD** | Linear algebra, calculus & stats for ML/DS |

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Content | MDX via `next-mdx-remote` |
| i18n | next-intl (ko/en) |
| Search | Client-side JSON index |
| Views | Upstash Redis |
| Deploy | Vercel |

---

## Local Development

```bash
npm install
cp .env.example .env.local   # fill in optional env vars
npm run dev                   # http://localhost:3000
```

**Writing a post:**

```yaml
# content/posts/my-post.mdx
---
title: "Post Title"
date: "2025-01-15"
category: "AI"
tags: ["LLM", "RAG"]
excerpt: "One-line summary used in list and SEO."
readTime: 7
---
```

**Adding translations** — edit `messages/ko.json` and `messages/en.json`.  
**Locale routing** — Korean at `/`, English at `/en/` (existing URLs preserved).

---

## Project Structure

```
app/
  [locale]/         ← all pages under locale segment
    layout.tsx
    page.tsx
    about/
    blog/[slug]/
    tags/, tag/[name]/
  api/              ← views + visitors (Redis)
i18n/               ← next-intl routing, navigation, request config
messages/           ← ko.json, en.json
content/posts/      ← MDX files
components/
  layout/           ← Header, Footer
  blog/             ← PostCard, SearchModal, PostList…
  ui/               ← HeroSection, Badge, Tag…
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_BASE_URL` | Site URL (e.g. `https://j-devlog.space`) |
| `UPSTASH_REDIS_REST_URL` | Redis endpoint for view counting |
| `UPSTASH_REDIS_REST_TOKEN` | Redis auth token |
| `NEXT_PUBLIC_ADSENSE_ID` | AdSense publisher ID (optional) |
| `NEXT_PUBLIC_AD_SLOT_*` | Ad slot IDs (optional) |

---

<details>
<summary>한국어 안내</summary>

## j-devlog

Nexon Korea에서 현지화 PM·엔지니어로 일하는 재준의 기술 블로그입니다.  
LLM 번역 시스템, AI 도구, 개발 경험을 기록합니다.

**로컬 실행:**
```bash
npm install && npm run dev
```

**포스트 작성:** `content/posts/` 디렉토리에 `.mdx` 파일 추가  
**번역 수정:** `messages/ko.json` 또는 `messages/en.json` 편집  
**배포:** `main` 브랜치 푸시 → Vercel 자동 배포

</details>

---

MIT License
