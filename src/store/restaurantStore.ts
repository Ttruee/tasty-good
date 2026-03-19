import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Restaurant, RestaurantStatus } from '@/types/restaurant'

interface RestaurantStore {
  restaurants: Restaurant[]
  searchQuery: string
  activeFilter: RestaurantStatus | 'all'

  // actions
  addRestaurant: (data: Omit<Restaurant, 'id' | 'createdAt'>) => void
  updateRestaurant: (id: string, data: Partial<Restaurant>) => void
  deleteRestaurant: (id: string) => void
  setSearchQuery: (q: string) => void
  setActiveFilter: (f: RestaurantStatus | 'all') => void
  exportData: () => void
  importData: (json: string) => { success: boolean; count: number; error?: string }

  // selectors (computed via getState)
  filteredRestaurants: () => Restaurant[]
  stats: () => { visited: number; want: number; bad: number; avgRating: number }
}

const SAMPLE_DATA: Restaurant[] = [
  {
    id: '1',
    name: '을지로 골목 냉면',
    category: '한식',
    address: '서울 중구 을지로 123',
    status: 'visited',
    rating: 5,
    visitDate: '2024-07-15',
    review: '여름에 꼭 가야하는 냉면집! 면이 쫄깃하고 육수가 시원해요. 사장님도 친절하시고 가격도 착해요.',
    createdAt: '2024-07-15T00:00:00Z',
  },
  {
    id: '2',
    name: '성수 브런치 카페',
    category: '카페',
    address: '서울 성동구 성수동 456',
    status: 'want',
    review: '인스타에서 본 곳! 분위기 좋아보여서 가보고 싶다',
    createdAt: '2024-08-01T00:00:00Z',
  },
  {
    id: '3',
    name: '홍대 유명 라멘집',
    category: '일식',
    address: '서울 마포구 홍대입구역 789',
    status: 'bad',
    rating: 2,
    visitDate: '2024-06-10',
    review: '기대했는데 너무 짜고 양이 적었어요.',
    createdAt: '2024-06-10T00:00:00Z',
  },
  {
    id: '4',
    name: '압구정 스테이크 하우스',
    category: '양식',
    address: '서울 강남구 압구정로 321',
    status: 'visited',
    rating: 4,
    visitDate: '2024-09-20',
    review: '특별한 날 가기 좋은 곳. 스테이크가 완벽했어요.',
    createdAt: '2024-09-20T00:00:00Z',
  },
  {
    id: '5',
    name: '광장시장 마약김밥',
    category: '분식',
    address: '서울 종로구 창경궁로 88',
    status: 'visited',
    rating: 5,
    visitDate: '2024-05-03',
    review: '마약김밥이 왜 마약인지 알 것 같아요. 참기름 향이 일품!',
    createdAt: '2024-05-03T00:00:00Z',
  },
  {
    id: '6',
    name: '이태원 수제버거',
    category: '양식',
    address: '서울 용산구 이태원로 55',
    status: 'want',
    createdAt: '2024-10-01T00:00:00Z',
  },
]

export const useRestaurantStore = create<RestaurantStore>()(
  persist(
    (set, get) => ({
      restaurants: SAMPLE_DATA,
      searchQuery: '',
      activeFilter: 'all',

      addRestaurant: (data) => {
        const newItem: Restaurant = {
          ...data,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }
        set((s) => ({ restaurants: [newItem, ...s.restaurants] }))
      },

      updateRestaurant: (id, data) => {
        set((s) => ({
          restaurants: s.restaurants.map((r) =>
            r.id === id ? { ...r, ...data } : r,
          ),
        }))
      },

      deleteRestaurant: (id) => {
        set((s) => ({
          restaurants: s.restaurants.filter((r) => r.id !== id),
        }))
      },

      setSearchQuery: (q) => set({ searchQuery: q }),
      setActiveFilter: (f) => set({ activeFilter: f }),

      exportData: () => {
        const { restaurants } = get()
        const blob = new Blob(
          [JSON.stringify({ version: 1, data: restaurants }, null, 2)],
          { type: 'application/json' },
        )
        const url = URL.createObjectURL(blob)
        const a   = document.createElement('a')
        a.href     = url
        a.download = `tasty-good-${new Date().toISOString().slice(0, 10)}.json`
        a.click()
        URL.revokeObjectURL(url)
      },

      importData: (json) => {
        try {
          const parsed = JSON.parse(json)
          const items: Restaurant[] = parsed?.data ?? parsed
          if (!Array.isArray(items)) return { success: false, count: 0, error: '올바른 형식이 아니에요.' }
          const valid = items.filter(
            (r) => typeof r.id === 'string' && typeof r.name === 'string' && typeof r.status === 'string',
          )
          if (valid.length === 0) return { success: false, count: 0, error: '가져올 항목이 없어요.' }
          set((s) => {
            const existingIds = new Set(s.restaurants.map((r) => r.id))
            const newItems    = valid.filter((r) => !existingIds.has(r.id))
            return { restaurants: [...newItems, ...s.restaurants] }
          })
          return { success: true, count: valid.length }
        } catch {
          return { success: false, count: 0, error: 'JSON 파싱에 실패했어요.' }
        }
      },

      filteredRestaurants: () => {
        const { restaurants, searchQuery, activeFilter } = get()
        return restaurants.filter((r) => {
          const matchFilter =
            activeFilter === 'all' || r.status === activeFilter
          const q = searchQuery.toLowerCase()
          const matchSearch =
            !q ||
            r.name.toLowerCase().includes(q) ||
            r.category.toLowerCase().includes(q) ||
            r.address.toLowerCase().includes(q)
          return matchFilter && matchSearch
        })
      },

      stats: () => {
        const { restaurants } = get()
        const visited = restaurants.filter((r) => r.status === 'visited')
        const want    = restaurants.filter((r) => r.status === 'want').length
        const bad     = restaurants.filter((r) => r.status === 'bad').length
        const ratings = visited.map((r) => r.rating ?? 0).filter(Boolean)
        const avgRating =
          ratings.length > 0
            ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
            : 0
        return { visited: visited.length, want, bad, avgRating }
      },
    }),
    { name: 'tasty-good-store' },
  ),
)
