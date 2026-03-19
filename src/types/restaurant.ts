export type RestaurantStatus = 'visited' | 'want' | 'bad'

export interface Restaurant {
  id: string
  name: string
  category: string
  address: string
  status: RestaurantStatus
  rating?: number       // 1-5, visited일 때만
  visitDate?: string    // YYYY-MM-DD
  review?: string
  createdAt: string
}

export type RestaurantCategory =
  | '한식'
  | '일식'
  | '중식'
  | '양식'
  | '카페'
  | '분식'
  | '패스트푸드'
  | '기타'

export const CATEGORIES: RestaurantCategory[] = [
  '한식', '일식', '중식', '양식', '카페', '분식', '패스트푸드', '기타',
]

export const STATUS_LABELS: Record<RestaurantStatus, string> = {
  visited: '가본 곳',
  want:    '가고 싶은 곳',
  bad:     '별로였던 곳',
}
