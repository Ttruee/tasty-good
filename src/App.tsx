import { useState } from 'react'
import { useRestaurantStore } from '@/store/restaurantStore'
import type { Restaurant } from '@/types/restaurant'
import Header from '@/components/Header'
import StatsCards from '@/components/StatsCards'
import SearchBar from '@/components/SearchBar'
import FilterTabs from '@/components/FilterTabs'
import RestaurantCard from '@/components/RestaurantCard'
import RestaurantModal from '@/components/RestaurantModal'

function EmptyState({ hasData, onAddClick }: { hasData: boolean; onAddClick: () => void }) {
  if (!hasData) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">🗺️</p>
        <p className="text-xl font-bold text-content-primary mb-2">맛집 지도가 비어있어요</p>
        <p className="text-sm text-content-muted mb-6">첫 번째 맛집을 추가해보세요!</p>
        <button className="btn-primary text-sm" onClick={onAddClick}>
          + 첫 맛집 추가하기
        </button>
      </div>
    )
  }
  return (
    <div className="text-center py-16 text-content-muted">
      <p className="text-4xl mb-3">🔍</p>
      <p className="text-lg font-medium text-content-secondary">검색 결과가 없어요</p>
      <p className="text-sm mt-1">검색어나 필터를 바꿔보세요</p>
    </div>
  )
}

function App() {
  const filteredRestaurants = useRestaurantStore((s) => s.filteredRestaurants())
  const totalCount          = useRestaurantStore((s) => s.restaurants.length)

  const [modalOpen, setModalOpen]   = useState(false)
  const [editTarget, setEditTarget] = useState<Restaurant | undefined>(undefined)

  const handleAddClick = () => {
    setEditTarget(undefined)
    setModalOpen(true)
  }

  const handleEditClick = (restaurant: Restaurant) => {
    setEditTarget(restaurant)
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
    setEditTarget(undefined)
  }

  return (
    <div className="min-h-screen bg-surface-950">
      <Header onAddClick={handleAddClick} />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <StatsCards />
        <SearchBar />
        <FilterTabs />

        {filteredRestaurants.length === 0 ? (
          <EmptyState hasData={totalCount > 0} onAddClick={handleAddClick} />
        ) : (
          <div className="space-y-3">
            {filteredRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} onEdit={handleEditClick} />
            ))}
          </div>
        )}
      </main>

      {modalOpen && (
        <RestaurantModal restaurant={editTarget} onClose={handleClose} />
      )}
    </div>
  )
}

export default App
