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
primary-500  #10b981   에메랄드 그린 (버튼, 활성 탭, 핵심 포인트)
primary-600  #059669   호버

surface-950  #0d0d0d   페이지 배경
surface-900  #1a1a1a   카드 배경
surface-800  #242424   입력창 배경
surface-700  #2e2e2e   호버 배경
surface-600  #3a3a3a   보더

content-primary   #ffffff
content-secondary #a8a8a8
content-muted     #6b6b6b
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
