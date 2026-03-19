import { useRestaurantStore } from '@/store/restaurantStore'

export default function StatsCards() {
  const stats = useRestaurantStore((s) => s.stats())

  const cards = [
    {
      label: '가본 곳',
      value: stats.visited,
      icon: '✅',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/20',
    },
    {
      label: '가고 싶은 곳',
      value: stats.want,
      icon: '📌',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      label: '별로였던 곳',
      value: stats.bad,
      icon: '👎',
      color: 'text-red-400',
      bg: 'bg-red-500/10 border-red-500/20',
    },
    {
      label: '평균 별점',
      value: stats.avgRating > 0 ? `${stats.avgRating}점` : '-',
      icon: '⭐',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10 border-yellow-500/20',
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
