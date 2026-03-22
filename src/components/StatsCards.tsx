import { useShallow } from 'zustand/react/shallow'
import { useRestaurantStore } from '@/store/restaurantStore'

export default function StatsCards() {
  const stats = useRestaurantStore(useShallow((s) => s.stats()))

  const cards = [
    {
      label: '가본 곳',
      value: stats.visited,
      icon: '✅',
      color: 'text-teal-400',
      bg: 'bg-teal-400/10 border-teal-400/20',
    },
    {
      label: '가고 싶은 곳',
      value: stats.want,
      icon: '📌',
      color: 'text-violet-400',
      bg: 'bg-violet-400/10 border-violet-400/20',
    },
    {
      label: '별로였던 곳',
      value: stats.bad,
      icon: '👎',
      color: 'text-rose-400',
      bg: 'bg-rose-400/10 border-rose-400/20',
    },
    {
      label: '평균 별점',
      value: stats.avgRating > 0 ? `${stats.avgRating}점` : '-',
      icon: '⭐',
      color: 'text-amber-400',
      bg: 'bg-amber-400/10 border-amber-400/20',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className={`card border ${card.bg} p-4`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{card.icon}</span>
            <span className="text-xs text-content-muted">{card.label}</span>
          </div>
          <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  )
}
