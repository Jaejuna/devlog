# PRD — 개발자 블로그 (Dev Blog)

개발 경험과 면접 준비 콘텐츠를 다루는 개인 기술 블로그.
Next.js 14 App Router + MDX + Tailwind CSS 기반. Google AdSense 수익화 목표.

---

## Phase 1: 프로젝트 기반 세팅

- [ ] **1-1. Next.js 프로젝트 초기화**
  패키지: `next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `@types/node`, `@types/react`
  `tsconfig.json`, `tailwind.config.ts`, `next.config.ts` 기본 설정 완료.
  Acceptance: `npm run dev` 성공, `npm run typecheck` 에러 없음.

- [ ] **1-2. 폴더 구조 세팅**
  ```
  app/
    layout.tsx          ← root layout (폰트, 메타, AdSense 스크립트)
    page.tsx            ← 홈(목록)
    blog/[slug]/
      page.tsx          ← 상세 페이지
    about/page.tsx
  components/
    layout/Header.tsx
    layout/Footer.tsx
    blog/PostCard.tsx
    blog/PostList.tsx
    blog/TableOfContents.tsx
    ads/AdBanner.tsx
    ads/AdInFeed.tsx
    ads/AdSidebar.tsx
    ui/Badge.tsx
    ui/Tag.tsx
  lib/
    mdx.ts              ← MDX 파싱 유틸
    types.ts            ← Post 타입 정의
  content/posts/        ← MDX 파일 저장소
  public/
  ```
  Acceptance: 모든 폴더와 빈 파일 생성, import 경로 alias `@/` 설정.

- [ ] **1-3. MDX 파이프라인 구축**
  패키지: `next-mdx-remote`, `gray-matter`, `rehype-highlight`, `rehype-slug`, `rehype-autolink-headings`, `remark-gfm`
  `lib/mdx.ts`에 `getAllPosts()`, `getPostBySlug(slug)` 구현.
  Post frontmatter 스키마: `title`, `date`, `category`, `tags[]`, `excerpt`, `readTime`.
  Acceptance: 샘플 MDX 3개 파싱 성공.

- [ ] **1-4. 샘플 MDX 포스트 3개 생성**
  - `os-interview-questions.mdx` — 카테고리: 면접 준비, 태그: [CS, OS]
  - `useeffect-deep-dive.mdx` — 카테고리: 개발, 태그: [React, Hooks]
  - `nextjs-app-router-migration.mdx` — 카테고리: 개발, 태그: [Next.js]
  각 포스트 300자 이상 본문, 헤딩 최소 3개, 코드블록 최소 1개 포함.
  Acceptance: `getAllPosts()` 호출 시 3개 반환.

---

## Phase 2: 레이아웃 & 공통 컴포넌트

- [ ] **2-1. Header 컴포넌트**
  로고(devlog.), 네비게이션(홈 / 개발 / 면접 준비 / 태그 / 소개), 검색 아이콘.
  sticky + 반투명 blur 배경. 모바일 햄버거 메뉴(상태: useState).
  Acceptance: 데스크탑/모바일 양쪽 렌더링 확인, hydration 오류 없음.

- [ ] **2-2. Footer 컴포넌트**
  로고, 저작권 문구, 깃허브/이메일 링크 자리.
  Acceptance: 모든 페이지 하단에 표시.

- [ ] **2-3. Badge & Tag UI 컴포넌트**
  `Badge`: 카테고리 표시용 (보라 계열).
  `Tag`: 해시태그 표시용 (파랑 계열).
  variant props 지원(색상).
  Acceptance: Storybook 불필요, 직접 렌더 확인.

- [ ] **2-4. AdBanner 컴포넌트 (728×90)**
  `'use client'` — AdSense 스크립트 `useEffect`로 로드.
  `data-ad-client`, `data-ad-slot` props 필수.
  개발 환경에서는 더미 플레이스홀더 표시(`process.env.NODE_ENV !== 'production'`).
  Acceptance: 개발 환경 플레이스홀더 표시, props 타입 정의 완료.

- [ ] **2-5. AdInFeed 컴포넌트 (반응형)**
  포스트 목록 사이 삽입용. 2번째 카드 뒤에 자동 삽입.
  Acceptance: PostList에서 2번째 항목 뒤 렌더 확인.

- [ ] **2-6. AdSidebar 컴포넌트 (300×250)**
  사이드바용. sticky 옵션 prop.
  Acceptance: 사이드바 위치에서 렌더 확인.

---

## Phase 3: 홈 페이지 (목록)

- [ ] **3-1. PostCard 컴포넌트**
  표시 항목: 카테고리 Badge, 태그 Tag[], 제목, 발췌문, 날짜, 읽기 시간, 조회수(MDX frontmatter).
  hover 시 translateY(-2px) + border 색상 변경.
  클릭 시 `/blog/[slug]`로 이동.
  Acceptance: 모든 항목 렌더, Next.js Link 사용.

- [ ] **3-2. 홈 페이지 레이아웃 (2컬럼: 목록 + 사이드바)**
  좌측: 필터(카테고리 버튼 + 태그 버튼) + PostList.
  우측 사이드바(데스크탑 전용): 검색박스, AdSidebar, 인기글(조회수 기준 Top 4), 뉴스레터 구독 폼(정적), 태그 클라우드.
  카테고리/태그 필터: URL searchParam 기반(`?category=개발&tag=React`) — 서버 컴포넌트에서 처리.
  Acceptance: 필터 클릭 시 URL 업데이트 + 목록 필터링 동작.

- [ ] **3-3. 상단 AdBanner 삽입**
  홈 페이지 포스트 목록 상단에 AdBanner(728×90) 삽입.
  Acceptance: 목록 위에 광고 영역 표시.

---

## Phase 4: 블로그 상세 페이지

- [ ] **4-1. 상세 페이지 레이아웃**
  좌측: MDX 본문 영역. 우측 사이드바(sticky): 목차(ToC) + AdSidebar.
  상단: 카테고리 Badge, 제목(h1), 날짜·읽기시간·조회수 메타, 태그 Tag[].
  Acceptance: slug 라우팅 동작, 본문 렌더.

- [ ] **4-2. MDX 렌더링 커스텀 컴포넌트**
  커스텀 MDX 컴포넌트 맵 정의:
  - `h2`, `h3`: anchor 링크 아이콘 포함
  - `code` (인라인): 배경색 강조
  - `pre > code`: 코드 하이라이팅 (rehype-highlight)
  - `a`: 외부 링크 `target="_blank" rel="noopener"`
  - `blockquote`: 왼쪽 border 강조 스타일
  Acceptance: 샘플 포스트 본문이 스타일 적용된 상태로 렌더.

- [ ] **4-3. 목차(Table of Contents) 컴포넌트**
  MDX 본문에서 h2/h3 추출 → 계층 구조 목차 생성.
  현재 읽는 섹션 하이라이트 (`IntersectionObserver`).
  클릭 시 해당 섹션으로 스크롤.
  Acceptance: 포스트 상세에서 동적 목차 표시, 스크롤 추적 동작.

- [ ] **4-4. 상세 페이지 내 광고 삽입**
  본문 중간(첫 번째 h2 이후)에 AdBanner 자동 삽입.
  본문 하단(푸터 위)에 AdBanner 삽입.
  Acceptance: 본문 내 광고 영역 2개 표시.

- [ ] **4-5. 이전/다음 포스트 네비게이션**
  날짜 기준 이전 포스트, 다음 포스트 링크.
  Acceptance: 이전/다음 링크 렌더, 없으면 해당 방향 숨김.

- [ ] **4-6. 관련 포스트 추천**
  동일 카테고리 내 최근 3개 포스트 카드 표시.
  현재 포스트는 제외.
  Acceptance: 관련 포스트 3개 하단에 표시.

---

## Phase 5: 카테고리 & 태그 페이지

- [ ] **5-1. 카테고리 페이지 (`/category/[name]`)**
  해당 카테고리 포스트 목록 + 사이드바.
  Acceptance: `/category/개발` 접근 시 개발 카테고리 포스트만 표시.

- [ ] **5-2. 태그 페이지 (`/tag/[name]`)**
  해당 태그 포스트 목록.
  Acceptance: `/tag/React` 접근 시 React 태그 포스트만 표시.

- [ ] **5-3. 전체 태그 목록 페이지 (`/tags`)**
  모든 태그 + 각 태그의 포스트 수 표시.
  Acceptance: 태그 클릭 시 태그 페이지 이동.

---

## Phase 6: 검색 기능

- [ ] **6-1. 정적 검색 인덱스 생성**
  빌드 시 `public/search-index.json` 생성 (제목 + 발췌문 + 태그).
  Acceptance: `public/search-index.json` 파일 생성됨.

- [ ] **6-2. 클라이언트 사이드 검색 UI**
  헤더 검색 아이콘 클릭 → 검색 모달/드롭다운 오버레이.
  `search-index.json` fetch → 실시간 필터링 (디바운스 300ms).
  결과 클릭 시 해당 포스트로 이동.
  Acceptance: 검색어 입력 → 결과 표시 → 이동 동작.

---

## Phase 7: About 페이지

- [ ] **7-1. About 페이지 (`/about`)**
  자기소개 영역, 기술 스택 목록, 최근 포스트 3개, GitHub 링크.
  Acceptance: `/about` 렌더 성공.

---

## Phase 8: SEO & 메타데이터

- [ ] **8-1. 동적 메타데이터 (generateMetadata)**
  홈, 상세, 카테고리, 태그 페이지에 `generateMetadata` 적용.
  OG 태그(title, description, og:image 자리), Twitter Card 포함.
  Acceptance: `<head>` 내 메타태그 확인.

- [ ] **8-2. sitemap.xml 자동 생성**
  `app/sitemap.ts` — 모든 포스트 + 정적 페이지 포함.
  Acceptance: `/sitemap.xml` 접근 시 XML 반환.

- [ ] **8-3. robots.txt**
  `app/robots.ts` — 크롤러 허용, sitemap 경로 포함.
  Acceptance: `/robots.txt` 반환.

- [ ] **8-4. JSON-LD 구조화 데이터**
  상세 페이지에 `BlogPosting` 스키마 삽입.
  Acceptance: 페이지 소스에 `application/ld+json` script 태그 존재.

---

## Phase 9: Google AdSense 최종 통합

- [ ] **9-1. AdSense 글로벌 스크립트 삽입**
  `app/layout.tsx`의 `<head>`에 AdSense `<script>` 삽입.
  `NEXT_PUBLIC_ADSENSE_ID` 환경변수 사용.
  Acceptance: 환경변수 없으면 스크립트 미삽입 (개발 환경 안전).

- [ ] **9-2. 광고 슬롯 환경변수화**
  `NEXT_PUBLIC_AD_SLOT_BANNER`, `NEXT_PUBLIC_AD_SLOT_INFEED`, `NEXT_PUBLIC_AD_SLOT_SIDEBAR` 환경변수로 관리.
  `.env.example` 파일 생성.
  Acceptance: `.env.example` 파일 존재, 환경변수 참조 코드 적용.

---

## Phase 10: 마무리

- [ ] **10-1. 반응형 최종 점검**
  모바일(375px), 태블릿(768px), 데스크탑(1280px) 기준 레이아웃 확인.
  사이드바 모바일에서 숨김, 목차 모바일에서 접기 처리.
  Acceptance: 각 breakpoint에서 레이아웃 깨짐 없음.

- [ ] **10-2. 다크 테마 기본 적용**
  `tailwind.config.ts`에 `darkMode: 'class'` 설정.
  root layout에 `dark` 클래스 기본 적용.
  전체 컴포넌트 dark variant 색상 정의.
  Acceptance: 전체 UI 다크 테마 적용.

- [ ] **10-3. `AGENTS.md` 최종 정리**
  프로젝트 전반의 패턴, 주요 컨벤션, 알려진 이슈 문서화.
  Acceptance: `AGENTS.md`에 최소 10개 항목.

- [ ] **10-4. README.md 작성**
  프로젝트 개요, 로컬 실행 방법, 포스트 작성 방법, 배포 방법, AdSense 설정 방법.
  Acceptance: README.md 500자 이상.
