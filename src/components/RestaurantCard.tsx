import type { Restaurant } from '@/types/restaurant'

interface RestaurantCardProps {
  restaurant: Restaurant
  onEdit: (restaurant: Restaurant) => void
}

const STATUS_CONFIG = {
  visited: {
    label: '가본 곳',
    badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    border: 'border-l-orange-500',
  },
  want: {
    label: '가고 싶은 곳',
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    border: 'border-l-blue-500',
  },
  bad: {
    label: '별로였던 곳',
    badge: 'bg-red-500/20 text-red-400 border-red-500/30',
    border: 'border-l-red-500',
  },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? 'text-amber-500' : 'text-surface-600'}>
          ★
        </span>
      ))}
      <span className="text-xs text-content-muted ml-1">{rating}.0</span>
    </div>
  )
}

export default function RestaurantCard({ restaurant, onEdit }: RestaurantCardProps) {
  const { name, category, address, status, rating, visitDate, review } = restaurant
  const cfg = STATUS_CONFIG[status]

  return (
    <div className={`card border-l-4 ${cfg.border} p-4 hover:bg-surface-800 transition-colors duration-150`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <h3 className="font-bold text-content-primary truncate">{name}</h3>
          <span className="text-xs bg-surface-700 text-content-muted px-2 py-0.5 rounded-full shrink-0">
            {category}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs px-2 py-1 rounded-full border font-medium ${cfg.badge}`}>
            {cfg.label}
          </span>
          <button
            type="button"
            onClick={() => onEdit(restaurant)}
            className="text-content-muted hover:text-content-primary transition-colors text-sm cursor-pointer leading-none"
            title="수정"
          >
            ✏️
          </button>
        </div>
      </div>

      <p className="text-sm text-content-muted mb-2 flex items-center gap-1">
        <span>📍</span>
        {address}
      </p>

      {rating !== undefined && <div className="mb-2"><StarRating rating={rating} /></div>}

      {review && (
        <p className="text-sm text-content-secondary line-clamp-2 mb-2">"{review}"</p>
      )}

      {visitDate && (
        <p className="text-xs text-content-muted flex items-center gap-1">
          <span>📅</span>
          {visitDate}
        </p>
      )}
    </div>
  )
}
