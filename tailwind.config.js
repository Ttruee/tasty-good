/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 에메랄드 그린 포인트 컬러
        primary: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // 메인 에메랄드
          600: '#059669', // 호버
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // 다크 테마 배경 팔레트
        surface: {
          950: '#0d0d0d', // 최상단 배경
          900: '#1a1a1a', // 카드 배경
          800: '#242424', // 입력창 배경
          700: '#2e2e2e', // 호버 배경
          600: '#3a3a3a', // 보더
        },
        // 텍스트
        content: {
          primary:   '#ffffff',
          secondary: '#a8a8a8',
          muted:     '#6b6b6b',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        card: '12px',
        btn:  '8px',
        pill: '9999px',
      },
      boxShadow: {
        card:   '0 2px 12px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 4px 24px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}
