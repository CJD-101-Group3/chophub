/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Inter"', '"Noto Sans TC"', 'sans-serif'],
                heading: ['"Inter"', '"Noto Sans TC"', 'sans-serif'],
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
            },
            keyframes: {
            gradientDiagonalMove: {
                    '0%': { 'background-position': '100% 0%' },
                    '50%': { 'background-position': '0% 100%' },
                    '100%': { 'background-position': '100% 0%' },
            },
            },
            animation: {
                    'gradient-diagonal': 'gradientDiagonalMove 25s ease infinite',
            },
            backgroundSize: {
                    '600%': '600% 600%',
            },
            },
    },
    plugins: [],
}

