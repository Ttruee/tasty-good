import { useRestaurantStore } from '@/store/restaurantStore'
import type { RestaurantStatus } from '@/types/restaurant'

type Filter = RestaurantStatus | 'all'

const TABS: { key: Filter; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'visited', label: '가본 곳' },
  { key: 'want', label: '가고 싶은 곳' },
  { key: 'bad', label: '별로였던 곳' },
]

const BADGE_COLOR: Record<Filter, string> = {
  all: 'bg-surface-600 text-content-secondary',
  visited: 'bg-orange-500/20 text-orange-400',
  want: 'bg-blue-500/20 text-blue-400',
  bad: 'bg-red-500/20 text-red-400',
}

export default function FilterTabs() {
  const activeFilter = useRestaurantStore((s) => s.activeFilter)
  const setActiveFilter = useRestaurantStore((s) => s.setActiveFilter)
  const restaurants = useRestaurantStore((s) => s.restaurants)

  const countFor = (key: Filter) =>
    key === 'all' ? restaurants.length : restaurants.filter((r) => r.status === key).length

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {TABS.map((tab) => {
        const active = activeFilter === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-btn text-sm font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer ${
              active
                ? 'bg-primary-500 text-white'
                : 'bg-surface-800 text-content-secondary hover:bg-surface-700'
            }`}
          >
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                active ? 'bg-white/20 text-white' : BADGE_COLOR[tab.key]
              }`}
            >
              {countFor(tab.key)}
            </span>
          </button>
        )
      })}
    </div>
  )
}
