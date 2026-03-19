/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 오렌지 포인트 컬러
        primary: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // 메인 오렌지
          600: '#ea6c0a',
          700: '#c2510b',
          800: '#9a3c09',
          900: '#7c2d09',
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
