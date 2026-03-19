import { useRestaurantStore } from '@/store/restaurantStore'
import Header from '@/components/Header'
import StatsCards from '@/components/StatsCards'
import SearchBar from '@/components/SearchBar'
import FilterTabs from '@/components/FilterTabs'
import RestaurantCard from '@/components/RestaurantCard'

function App() {
  const filteredRestaurants = useRestaurantStore((s) => s.filteredRestaurants())

  const handleAddClick = () => {
    // 4단계에서 모달 연결 예정
    alert('맛집 추가 모달은 4단계에서 구현됩니다!')
  }

  return (
    <div className="min-h-screen bg-surface-950">
      <Header onAddClick={handleAddClick} />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <StatsCards />
        <SearchBar />
        <FilterTabs />

        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-16 text-content-muted">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="text-lg font-medium">맛집이 없어요</p>
            <p className="text-sm mt-1">검색어나 필터를 바꿔보세요</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
