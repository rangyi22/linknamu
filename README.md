# 링크나무

Linktree처럼 내 모든 링크를 한 페이지에 모아두고, 하나의 URL로 공유하는 Link in Bio 서비스입니다.

## 핵심 기능

- 프로필 표시 (이름, 한 줄 소개, 프로필 사진)
- 링크 카드 목록 (클릭 가능한 SNS · 블로그 링크)
- 다크모드 토글
- 링크 클릭 수 집계 (MongoDB Atlas)

## 기술 스택

- [Next.js 14](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- MongoDB Atlas (클릭 수 저장)
- Vercel (배포)

## 시작하기

의존성 설치 후 개발 서버를 실행합니다.

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 결과를 확인할 수 있습니다.

### 환경 변수

`.env.local.example` 을 `.env.local` 로 복사한 뒤 MongoDB Atlas 연결 문자열을 채워 넣으세요.

```bash
cp .env.local.example .env.local
```

| 변수           | 설명                                  |
| -------------- | ------------------------------------- |
| `MONGODB_URI`  | 클릭 수 집계용 MongoDB Atlas 연결 문자열 |

`MONGODB_URI` 가 없으면 클릭 수 집계 API는 에러를 로그로만 남기고 조용히 무시하므로, 로컬 개발 시 DB 없이도 링크 카드는 정상 동작합니다.

## 프로젝트 구조

```
src/
├─ app/            # 라우트, 레이아웃, 전역 스타일, API 라우트 (app/api/links/[linkId]/click)
├─ components/     # 재사용 UI 컴포넌트 (ProfileHeader, LinkCard, DarkModeToggle 등)
├─ data/           # 프로필 · 링크 데이터
└─ lib/            # MongoDB 클라이언트 등 공용 로직
```

프로필과 링크 목록은 `src/data/profile.ts` 에서 관리합니다. 지금은 더미 데이터가 채워져 있으며, 실제 정보로 교체하면 됩니다.

## 코드 규칙

- TypeScript 사용
- 컴포넌트는 `src/components/` 아래에 작성
- 환경 변수는 `.env.local` 에 저장 (커밋하지 않음)
- 모바일 우선 반응형 디자인

자세한 요구사항은 [`PRD.md`](./PRD.md), 개발 가이드라인은 [`CLAUDE.md`](./CLAUDE.md) 를 참고하세요.
