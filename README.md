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

`MONGODB_URI` 가 없으면 클릭 수 집계 API는 `500` 을 반환하고 서버 로그에 사유를 남깁니다. 이때 클릭 수는 계속 `0회` 로 표시되지만, 링크 이동 자체는 정상 동작합니다.

## 링크 클릭 수 집계

각 링크의 클릭 수를 MongoDB Atlas에 누적하고, 카드 오른쪽에 작은 글자로 표시합니다.

### 동작 방식

1. 페이지가 열리면 `GET /api/links/clicks` 로 **모든 링크의 클릭 수를 한 번에** 가져옵니다.
2. 응답이 오기 전에는 모두 `0회` 로 표시되고, 받으면 실제 값으로 갱신됩니다.
3. 카드를 누르면 화면의 숫자를 먼저 1 올린 뒤 `POST /api/links/:linkId/click` 을 보냅니다. 새 탭으로 이동하는 동안 응답을 기다리지 않기 위함입니다.
4. 서버가 확정한 값이 오면 그 값으로 맞추고, 기록에 실패하면 먼저 올렸던 숫자를 **되돌립니다.** 저장되지 않은 클릭이 기록된 것처럼 보이지 않도록 하기 위함입니다.

### API

| 메서드 | 경로 | 설명 | 성공 응답 |
| ------ | ---- | ---- | --------- |
| `GET`  | `/api/links/clicks`          | 전체 링크의 클릭 수 조회 | `{ "ok": true, "counts": { "github": 42 } }` |
| `POST` | `/api/links/:linkId/click`   | 해당 링크 클릭 수 1 증가 | `{ "ok": true, "count": 43 }` |

두 API 모두 DB 연결에 실패하면 `500` 과 `{ "ok": false }` 를 반환합니다.

### 데이터 구조

`linkClicks` 컬렉션에 링크 하나당 문서 하나가 저장됩니다. 문서 `_id` 는 `src/data/profile.ts` 의 링크 `id` 를 그대로 사용합니다.

```json
{ "_id": "github", "count": 42, "updatedAt": "2026-09-26T06:11:30.000Z" }
```

데이터베이스 이름은 코드에 하드코딩하지 않고 `MONGODB_URI` 경로에 적힌 값을 따릅니다.

## 배포

Vercel에 배포할 때 `MONGODB_URI` 를 **프로젝트 환경 변수에 등록**해야 합니다. `.env.local` 은 커밋되지 않으므로 배포본에 포함되지 않습니다.

> **환경 변수는 빌드 시점에 주입됩니다.** 값을 추가하거나 변경한 뒤에는 반드시 **재배포**해야 반영됩니다. 이미 빌드된 배포에는 소급 적용되지 않으므로, 값만 저장하고 재배포하지 않으면 클릭 수가 계속 `0회` 로 보입니다.

MongoDB Atlas의 Network Access에 Vercel 접근이 허용돼 있어야 합니다. 서버리스 함수는 IP가 고정되지 않으므로 `0.0.0.0/0` 허용이 필요합니다.

## 프로젝트 구조

```
src/
├─ app/            # 라우트, 레이아웃, 전역 스타일, API 라우트 (api/links/clicks, api/links/[linkId]/click)
├─ components/     # 재사용 UI 컴포넌트 (ProfileHeader, LinkList, LinkCard, DarkModeToggle 등)
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
