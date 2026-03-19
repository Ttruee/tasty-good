import { useState, useEffect } from 'react'
import type { Restaurant, RestaurantStatus } from '@/types/restaurant'
import { CATEGORIES } from '@/types/restaurant'
import { useRestaurantStore } from '@/store/restaurantStore'

interface RestaurantModalProps {
  restaurant?: Restaurant  // undefined = 추가 모드, 있으면 수정 모드
  onClose: () => void
}

const STATUS_OPTIONS: { value: RestaurantStatus; label: string; active: string }[] = [
  { value: 'visited', label: '✅ 가본 곳',      active: 'bg-orange-500 text-white border-orange-500' },
  { value: 'want',    label: '🔖 가고 싶은 곳',  active: 'bg-blue-500 text-white border-blue-500' },
  { value: 'bad',     label: '😞 별로였던 곳',   active: 'bg-red-500 text-white border-red-500' },
]

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition-transform hover:scale-110 cursor-pointer"
        >
          <span className={(hovered || value) >= i ? 'text-yellow-400' : 'text-surface-600'}>
            ★
          </span>
        </button>
      ))}
      {value > 0 && (
        <span className="text-sm text-content-muted self-center ml-1">{value}.0</span>
      )}
    </div>
  )
}

export default function RestaurantModal({ restaurant, onClose }: RestaurantModalProps) {
  const addRestaurant    = useRestaurantStore((s) => s.addRestaurant)
  const updateRestaurant = useRestaurantStore((s) => s.updateRestaurant)
  const deleteRestaurant = useRestaurantStore((s) => s.deleteRestaurant)

  const isEdit = !!restaurant

  const [name,      setName]      = useState(restaurant?.name      ?? '')
  const [category,  setCategory]  = useState(restaurant?.category  ?? '한식')
  const [address,   setAddress]   = useState(restaurant?.address   ?? '')
  const [status,    setStatus]    = useState<RestaurantStatus>(restaurant?.status ?? 'visited')
  const [rating,    setRating]    = useState(restaurant?.rating    ?? 0)
  const [visitDate, setVisitDate] = useState(restaurant?.visitDate ?? '')
  const [review,    setReview]    = useState(restaurant?.review    ?? '')
  const [showDelete, setShowDelete] = useState(false)

  // status가 visited/bad 가 아니면 rating/visitDate 초기화
  useEffect(() => {
    if (status === 'want') {
      setRating(0)
      setVisitDate('')
    }
  }, [status])

  const isValid = name.trim() && address.trim()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    const data = {
      name:      name.trim(),
      category,
      address:   address.trim(),
      status,
      rating:    (status !== 'want' && rating > 0) ? rating : undefined,
      visitDate: (status !== 'want' && visitDate) ? visitDate : undefined,
      review:    review.trim() || undefined,
    }

    if (isEdit) {
      updateRestaurant(restaurant.id, data)
    } else {
      addRestaurant(data)
    }
    onClose()
  }

  const handleDelete = () => {
    if (isEdit) {
      deleteRestaurant(restaurant.id)
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* 모달 본체 */}
      <div className="relative w-full sm:max-w-lg bg-surface-900 rounded-t-2xl sm:rounded-2xl shadow-2xl border border-surface-700 overflow-hidden">
        {/* 모바일 드래그 핸들 */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-surface-600" />
        </div>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-700">
          <h2 className="text-lg font-bold text-content-primary">
            {isEdit ? '맛집 수정' : '맛집 추가'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-content-muted hover:text-content-primary transition-colors text-xl leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5 max-h-[70dvh] overflow-y-auto">

          {/* 맛집 이름 */}
          <div>
            <label className="block text-sm font-medium text-content-secondary mb-1.5">
              맛집 이름 <span className="text-orange-400">*</span>
            </label>
            <input
              className="input-base"
              placeholder="예) 을지로 냉면집"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-medium text-content-secondary mb-1.5">
              카테고리
            </label>
            <select
              className="input-base appearance-none cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* 주소 */}
          <div>
            <label className="block text-sm font-medium text-content-secondary mb-1.5">
              주소 <span className="text-orange-400">*</span>
            </label>
            <input
              className="input-base"
              placeholder="예) 서울 중구 을지로 123"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* 상태 */}
          <div>
            <label className="block text-sm font-medium text-content-secondary mb-1.5">
              상태
            </label>
            <div className="flex gap-2 flex-wrap">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStatus(opt.value)}
                  className={`px-3 py-1.5 rounded-full text-sm border font-medium transition-all duration-150 cursor-pointer
                    ${status === opt.value
                      ? opt.active
                      : 'border-surface-600 text-content-muted hover:border-surface-400 hover:text-content-secondary'
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 별점 + 방문일 (가고싶은 곳 제외) */}
          {status !== 'want' && (
            <>
              <div>
                <label className="block text-sm font-medium text-content-secondary mb-1.5">
                  별점
                </label>
                <StarPicker value={rating} onChange={setRating} />
                {rating > 0 && (
                  <button
                    type="button"
                    onClick={() => setRating(0)}
                    className="text-xs text-content-muted hover:text-content-secondary mt-1 cursor-pointer"
                  >
                    별점 초기화
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-content-secondary mb-1.5">
                  방문일
                </label>
                <input
                  type="date"
                  className="input-base"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </>
          )}

          {/* 리뷰 */}
          <div>
            <label className="block text-sm font-medium text-content-secondary mb-1.5">
              리뷰
            </label>
            <textarea
              className="input-base resize-none"
              rows={3}
              placeholder="한 줄 리뷰를 남겨보세요"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
        </form>

        {/* 푸터 */}
        <div className="px-6 py-4 border-t border-surface-700 flex items-center justify-between gap-3">
          {/* 삭제 버튼 (수정 모드만) */}
          <div>
            {isEdit && !showDelete && (
              <button
                type="button"
                onClick={() => setShowDelete(true)}
                className="text-sm text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                삭제
              </button>
            )}
            {isEdit && showDelete && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-red-400">정말 삭제할까요?</span>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-sm text-red-400 hover:text-red-300 font-medium cursor-pointer underline"
                >
                  삭제
                </button>
                <button
                  type="button"
                  onClick={() => setShowDelete(false)}
                  className="text-sm text-content-muted hover:text-content-secondary cursor-pointer"
                >
                  취소
                </button>
              </div>
            )}
          </div>

          {/* 취소 / 저장 */}
          <div className="flex gap-2 ml-auto">
            <button type="button" onClick={onClose} className="btn-ghost text-sm">
              취소
            </button>
            <button
              type="button"
              disabled={!isValid}
              onClick={handleSubmit}
              className={`btn-primary text-sm ${!isValid ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {isEdit ? '저장' : '추가'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
