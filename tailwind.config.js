/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 코럴 포인트 컬러
        primary: {
          50:  '#fdf3ef',
          100: '#fae3d9',
          200: '#f5c4ae',
          300: '#eda07f',
          400: '#e37850',
          500: '#D85A30', // 메인 코럴
          600: '#993C1D', // 다크 코럴 (호버)
          700: '#7a2f16',
          800: '#5e2310',
          900: '#481a0c',
        },
        // 앰버 (별점, 보조 강조)
        amber: {
          500: '#EF9F27',
        },
        // 크림 라이트 배경 팔레트
        surface: {
          950: '#F1EFE8', // 페이지 배경
          900: '#FAECE7', // 카드 배경
          800: '#FFFFFF', // 입력창 배경
          700: '#EDE9E0', // 호버 배경
          600: '#D4CFC7', // 보더
        },
        // 텍스트
        content: {
          primary:   '#2C2C2A',
          secondary: '#888780',
          muted:     '#AAAAAA',
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
