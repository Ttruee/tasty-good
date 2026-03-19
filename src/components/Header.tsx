import { useRef, useState } from 'react'
import { useRestaurantStore } from '@/store/restaurantStore'

interface HeaderProps {
  onAddClick: () => void
}

export default function Header({ onAddClick }: HeaderProps) {
  const exportData = useRestaurantStore((s) => s.exportData)
  const importData = useRestaurantStore((s) => s.importData)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [importMsg, setImportMsg] = useState<{ text: string; ok: boolean } | null>(null)

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const result = importData(ev.target?.result as string)
      const msg = result.success
        ? { text: `${result.count}개를 가져왔어요!`, ok: true }
        : { text: result.error ?? '가져오기 실패', ok: false }
      setImportMsg(msg)
      setTimeout(() => setImportMsg(null), 3000)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <header className="bg-surface-900 border-b border-surface-600 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
        {/* 로고 */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-3xl shrink-0">🗺️</span>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-content-primary leading-tight truncate">
              나만의 맛집 지도
            </h1>
            <p className="text-xs text-content-muted hidden sm:block">내가 찾은 맛집을 기록해요</p>
          </div>
        </div>

        {/* 우측 액션 */}
        <div className="flex items-center gap-2 shrink-0">
          {/* 내보내기 */}
          <button
            type="button"
            onClick={exportData}
            title="JSON으로 내보내기"
            className="btn-ghost text-sm px-2.5 py-2 text-content-muted hover:text-content-primary hidden sm:flex items-center gap-1.5"
          >
            <span>⬆️</span>
            <span className="hidden md:inline">내보내기</span>
          </button>

          {/* 가져오기 */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="JSON에서 가져오기"
            className="btn-ghost text-sm px-2.5 py-2 text-content-muted hover:text-content-primary hidden sm:flex items-center gap-1.5"
          >
            <span>⬇️</span>
            <span className="hidden md:inline">가져오기</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={handleImportFile}
          />

          {/* 맛집 추가 */}
          <button className="btn-primary flex items-center gap-1.5 text-sm" onClick={onAddClick}>
            <span className="text-lg leading-none">+</span>
            <span>맛집 추가</span>
          </button>
        </div>
      </div>

      {/* 모바일용 내보내기/가져오기 바 */}
      <div className="sm:hidden px-4 pb-3 flex gap-2">
        <button
          type="button"
          onClick={exportData}
          className="flex-1 btn-ghost text-xs py-1.5 flex items-center justify-center gap-1 text-content-muted"
        >
          ⬆️ 내보내기
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 btn-ghost text-xs py-1.5 flex items-center justify-center gap-1 text-content-muted"
        >
          ⬇️ 가져오기
        </button>
      </div>

      {/* 가져오기 결과 토스트 */}
      {importMsg && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full text-sm font-medium shadow-lg
            ${importMsg.ok ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
        >
          {importMsg.text}
        </div>
      )}
    </header>
  )
}
