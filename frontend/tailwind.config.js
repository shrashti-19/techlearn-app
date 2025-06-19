// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//     "./public/index.html"
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'gray-800': '#1F2937',
//         'gray-900': '#111827',
//         'blue-500': '#3B82F6',
//       }
//     },
//   },
//   plugins: [],
// }

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      keyframes: {
        fall: {
          '0%': {
            transform: 'translateY(-100px) rotate(0deg)',
            opacity: '1'
          },
          '70%': {
            opacity: '0.9'
          },
          '100%': {
            // Changed from calc() to a fixed large value
            transform: 'translateY(1000px) rotate(360deg)',
            opacity: '0'
          }
        }
      },
      animation: {
        fall: 'fall 5s linear infinite',
      },
    },
  },
  plugins: [],
}