# AGENTS.md — devlog 프로젝트 패턴 & 컨벤션

## 1. 프로젝트 구조

```
app/                  # Next.js App Router 페이지
  layout.tsx          # 루트 레이아웃 (Header, Footer, AdSense 스크립트)
  page.tsx            # 홈 페이지 (목록 + 사이드바)
  blog/[slug]/        # 블로그 상세 페이지
  category/[name]/    # 카테고리 필터 페이지
  tag/[name]/         # 태그 필터 페이지
  tags/               # 전체 태그 목록
  about/              # 소개 페이지
  sitemap.ts          # /sitemap.xml 자동 생성
  robots.ts           # /robots.txt 자동 생성
components/
  layout/             # Header, Footer
  blog/               # PostCard, PostList, PostNavigation, RelatedPosts, TableOfContents, MobileToc, SearchModal, MdxComponents
  ads/                # AdBanner, AdInFeed, AdSidebar
  ui/                 # Badge, Tag
lib/
  mdx.ts              # getAllPosts(), getPostBySlug(), serializeMdx(), getAdjacentPosts()
  types.ts            # Post, PostMeta 인터페이스
content/posts/        # MDX 파일 저장소
scripts/
  generate-search-index.js  # 빌드 시 public/search-index.json 생성
```

## 2. 핵심 컨벤션

### 컴포넌트
- 서버 컴포넌트: `'use client'` 없이 작성 (기본값)
- 클라이언트 컴포넌트: 파일 상단에 `'use client'` 선언 필수 (useState, useEffect, onClick 등 사용 시)
- 모든 컴포넌트 TypeScript 타입 정의 필수 — `any` 타입 금지

### 광고 컴포넌트
- AdBanner, AdInFeed, AdSidebar 모두 `'use client'`
- 개발 환경(`process.env.NODE_ENV !== 'production'`)에서는 플레이스홀더 표시
- 환경변수: `NEXT_PUBLIC_ADSENSE_ID`, `NEXT_PUBLIC_AD_SLOT_BANNER/INFEED/SIDEBAR`

### MDX 파이프라인
- `gray-matter`: frontmatter 파싱 (title, date, category, tags[], excerpt, readTime 필수)
- `next-mdx-remote/rsc`: 서버 컴포넌트에서 MDX 렌더링
- rehype 플러그인: `rehype-slug` → `rehype-autolink-headings` → `rehype-highlight` 순서
- remark 플러그인: `remark-gfm` (GFM 지원)

## 3. 라우팅 패턴

### URL 인코딩
- 카테고리/태그 URL에서 한글 인코딩: `encodeURIComponent(value)`
- 파라미터 수신 시: `decodeURIComponent(params.name)`

### 정적 생성
- 동적 라우트는 `generateStaticParams()` 사용
- `notFound()`: 포스트/카테고리/태그 없을 때 호출

## 4. 데이터 흐름

```
content/posts/*.mdx
  → getAllPosts()     → PostMeta[] (목록용, 파일시스템 읽기)
  → getPostBySlug()  → Post (상세용, content 포함)
  → getAdjacentPosts() → { prev, next }
  → scripts/generate-search-index.js → public/search-index.json
```

## 5. SEO 설정

- 각 페이지: `generateMetadata()` 또는 `export const metadata = {}` 사용
- OG 태그: `openGraph.type = 'article'` (블로그 상세), `'website'` (목록/태그/카테고리)
- Twitter Card: `'summary_large_image'` (상세), `'summary'` (목록)
- JSON-LD: 블로그 상세 페이지에 `BlogPosting` 스키마 삽입
- sitemap.ts: 모든 포스트 + 정적 페이지 포함
- robots.ts: `/api/`, `/_next/` 차단, 크롤러 허용

## 6. 다크 테마

- `tailwind.config.ts`: `darkMode: 'class'` 설정
- `app/layout.tsx`: `<html className="dark">` — 다크 테마 기본 적용
- 모든 컴포넌트: `dark:` prefix로 다크 모드 색상 정의

## 7. 검색 기능

- 빌드 시 `scripts/generate-search-index.js`로 `public/search-index.json` 생성 (`prebuild` 스크립트)
- `SearchModal`: fetch로 검색 인덱스 로드 → 실시간 필터링 (디바운스 300ms)
- Header의 검색 아이콘 클릭 → SearchModal 오픈

## 8. 광고 통합

- `app/layout.tsx`: AdSense 글로벌 스크립트 (프로덕션 + NEXT_PUBLIC_ADSENSE_ID 있을 때만)
- `AdBanner`: 728×90, 홈 상단 + 블로그 본문 중간/하단
- `AdInFeed`: 반응형, PostList 2번째 카드 뒤 자동 삽입
- `AdSidebar`: 300×250, sticky prop 지원

## 9. 알려진 이슈 & 주의사항

- `RegExpStringIterator` 이터레이션: `tsconfig.json`에 `"lib": ["esnext"]` 설정 필요. 대안으로 배열 분할 방식 사용
- `next-mdx-remote/rsc` vs `next-mdx-remote/serialize`: App Router에서는 `/rsc`를 사용해야 서버 컴포넌트에서 직접 렌더링 가능
- `node_modules` 커밋 방지: `.gitignore`에 `node_modules/` 항목 필수
- MDX 콘텐츠 분할: 본문 중간 광고 삽입을 위해 두 번째 `##` 기준으로 내용 분할 후 각각 `MDXRemote`로 렌더링

## 10. 배포 설정

- 배포 타겟: Vercel
- 환경변수: `.env.example` 참조
- `prebuild` 스크립트가 검색 인덱스 자동 생성
- `NEXT_PUBLIC_BASE_URL`: sitemap, JSON-LD URL 기반으로 사용
