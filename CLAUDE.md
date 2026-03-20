# 나만의 맛집 지도 (tasty-good)

## 스택
- React 18 + TypeScript, Vite 6
- Zustand 5 (`persist` → localStorage `tasty-good-store`)
- Tailwind CSS 3 (커스텀 디자인 토큰)
- path alias: `@/` = `src/`

## 구조
```
src/
  types/restaurant.ts      # 타입·상수
  store/restaurantStore.ts # 상태 + actions + selectors
  components/
    Header.tsx             # 헤더 (추가 버튼, export/import)
    StatsCards.tsx         # 통계 카드 4개
    SearchBar.tsx          # 검색
    FilterTabs.tsx         # all/visited/want/bad 탭 + 카운트 뱃지
    RestaurantCard.tsx     # 맛집 카드 (수정 버튼)
    RestaurantModal.tsx    # 추가/수정 모달
  App.tsx
```

## 데이터 모델
```ts
interface Restaurant {
  id: string
  name: string
  category: '한식'|'일식'|'중식'|'양식'|'카페'|'분식'|'패스트푸드'|'기타'
  address: string
  status: 'visited' | 'want' | 'bad'
  rating?: number      // 1–5, want일 때 없음
  visitDate?: string   // YYYY-MM-DD, want일 때 없음
  review?: string
  createdAt: string    // ISO 8601
}
```

## 스토어 API
- `addRestaurant(data)` / `updateRestaurant(id, data)` / `deleteRestaurant(id)`
- `setSearchQuery(q)` / `setActiveFilter(f)`
- `exportData()` — JSON 다운로드
- `importData(json)` — 병합, `{ success, count, error }` 반환
- `filteredRestaurants()` — 검색어+필터 적용 목록
- `stats()` — `{ visited, want, bad, avgRating }`

## 디자인 토큰
```
primary-500  #D85A30   코럴 (버튼, 활성 탭, 핵심 포인트)
primary-600  #993C1D   다크 코럴 (호버)
amber-500    #EF9F27   앰버 (별점, 보조 강조)

surface-950  #F1EFE8   페이지 배경 (크림)
surface-900  #FAECE7   카드 배경 (웜 크림)
surface-800  #FFFFFF   입력창 배경
surface-700  #EDE9E0   호버 배경
surface-600  #D4CFC7   보더

content-primary   #2C2C2A   본문 텍스트
content-secondary #888780   보조 텍스트
content-muted     #AAAAAA   흐린 텍스트
```

**공통 클래스:** `.card` `.btn-primary` `.btn-ghost` `.input-base`

**상태별 색상:**
- `visited` → `border-l-orange-500`, `bg-orange-500/20 text-orange-400`
- `want` → `border-l-blue-500`, `bg-blue-500/20 text-blue-400`
- `bad` → `border-l-red-500`, `bg-red-500/20 text-red-400`

## 주요 동작
- **RestaurantModal:** `restaurant` prop 없으면 추가, 있으면 수정 / `want`이면 별점·방문일 숨김 / 삭제 2-step confirm / 모바일 bottom sheet, 데스크탑 중앙 모달
- **Zustand 셀렉터:** 객체·배열 반환 시 `useShallow` 필수 (무한 리렌더링 방지)
- **로컬 UI 상태만** `useState` 사용 (모달 열림 여부, editTarget 등)

## 명령어
```bash
npm run dev    # localhost:5173
npm run build
npm run lint
```
