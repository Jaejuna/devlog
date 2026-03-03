# devlog. — 개발자 블로그

개발 경험과 면접 준비 콘텐츠를 다루는 개인 기술 블로그입니다.

**Next.js 14 App Router + MDX + Tailwind CSS** 기반으로 구축되었으며, Google AdSense 수익화를 지원합니다.

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Next.js 14 (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS |
| 콘텐츠 | MDX (next-mdx-remote) + gray-matter |
| 코드 하이라이팅 | rehype-highlight |
| 배포 | Vercel |

---

## 로컬 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.example`을 복사하여 `.env.local`을 생성합니다.

```bash
cp .env.example .env.local
```

AdSense를 사용하지 않는 경우 환경변수를 비워두면 개발 환경에서 플레이스홀더가 표시됩니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

### 4. 빌드

```bash
npm run build
npm start
```

빌드 시 `prebuild` 스크립트가 자동으로 실행되어 `public/search-index.json`을 생성합니다.

---

## 포스트 작성 방법

모든 포스트는 `content/posts/` 디렉토리에 `.mdx` 파일로 작성합니다.

### 파일 이름 규칙

```
content/posts/my-post-slug.mdx
```

파일 이름이 URL slug가 됩니다 (`/blog/my-post-slug`).

### frontmatter 스키마

```yaml
---
title: "포스트 제목"
date: "2024-01-15"
category: "개발"
tags: ["React", "TypeScript"]
excerpt: "포스트 요약 (목록 및 SEO에 사용)"
readTime: 5
---
```

| 필드 | 타입 | 설명 |
|------|------|------|
| `title` | string | 포스트 제목 |
| `date` | string | 작성일 (`YYYY-MM-DD` 형식) |
| `category` | string | 카테고리 (예: `개발`, `면접 준비`) |
| `tags` | string[] | 태그 배열 |
| `excerpt` | string | 발췌문 (목록, SEO, 검색 인덱스에 사용) |
| `readTime` | number | 예상 읽기 시간 (분) |

### 예시

````mdx
---
title: "React useEffect 완전 정복"
date: "2024-03-01"
category: "개발"
tags: ["React", "Hooks"]
excerpt: "useEffect의 의존성 배열과 클린업 함수를 완전히 이해합니다."
readTime: 7
---

## 소개

내용을 여기에 작성합니다.

```tsx
const [count, setCount] = useState(0)
```
````

---

## 배포 방법 (Vercel)

### 1. Vercel에 프로젝트 연결

```bash
npm i -g vercel
vercel
```

또는 Vercel 대시보드에서 GitHub 저장소를 연결합니다.

### 2. 환경변수 설정

Vercel 대시보드 → Project Settings → Environment Variables에서 아래 변수를 설정합니다:

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_BASE_URL` | 사이트 URL (예: `https://your-domain.com`) |
| `NEXT_PUBLIC_ADSENSE_ID` | AdSense 발행자 ID |
| `NEXT_PUBLIC_AD_SLOT_BANNER` | 배너 광고 슬롯 ID |
| `NEXT_PUBLIC_AD_SLOT_INFEED` | 인피드 광고 슬롯 ID |
| `NEXT_PUBLIC_AD_SLOT_SIDEBAR` | 사이드바 광고 슬롯 ID |

### 3. 자동 배포

`main` 브랜치에 푸시하면 Vercel이 자동으로 배포합니다. `prebuild` 스크립트로 검색 인덱스가 자동 생성됩니다.

---

## Google AdSense 설정 방법

1. [Google AdSense](https://www.google.com/adsense)에 사이트를 등록합니다.
2. AdSense 발행자 ID (`ca-pub-XXXXXXXXXXXXXXXX`)를 확인합니다.
3. 광고 단위를 생성하고 슬롯 ID를 확인합니다:
   - **배너 (728×90)**: 홈 페이지 상단, 블로그 본문 중간/하단
   - **인피드 (반응형)**: 포스트 목록 사이
   - **사이드바 (300×250)**: 우측 사이드바
4. 확인한 ID를 Vercel 환경변수에 설정합니다.
5. 사이트 URL을 AdSense에서 승인받습니다.

> **참고**: 개발 환경에서는 광고 대신 플레이스홀더가 표시됩니다.

---

## 프로젝트 구조

```
devlog/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈 페이지
│   ├── blog/[slug]/page.tsx # 블로그 상세
│   ├── category/[name]/     # 카테고리 페이지
│   ├── tag/[name]/          # 태그 페이지
│   ├── tags/                # 전체 태그 목록
│   ├── about/               # 소개 페이지
│   ├── sitemap.ts           # sitemap.xml 생성
│   └── robots.ts            # robots.txt 생성
├── components/              # 리액트 컴포넌트
├── lib/                     # 유틸리티 함수
├── content/posts/           # MDX 포스트 파일
├── public/                  # 정적 파일
│   └── search-index.json    # 검색 인덱스 (빌드 시 자동 생성)
└── scripts/
    └── generate-search-index.js  # 검색 인덱스 생성 스크립트
```

---

## 라이선스

MIT License
