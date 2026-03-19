import { useRestaurantStore } from '@/store/restaurantStore'

export default function SearchBar() {
  const searchQuery = useRestaurantStore((s) => s.searchQuery)
  const setSearchQuery = useRestaurantStore((s) => s.setSearchQuery)

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted text-lg">
        🔍
      </span>
      <input
        className="input-base pl-10"
        type="text"
        placeholder="맛집 이름, 카테고리, 주소로 검색..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary transition-colors"
          onClick={() => setSearchQuery('')}
        >
          ✕
        </button>
      )}
    </div>
  )
}
