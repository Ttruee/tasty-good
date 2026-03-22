/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 앰버 골드 포인트 컬러
        primary: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#F59E0B', // 메인 앰버
          600: '#D97706', // 호버
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
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
