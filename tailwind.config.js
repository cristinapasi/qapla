/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark space theme
        'bg-start': '#0f0f1a',
        'bg-end': '#1a1025',
        // Module colors
        'module-1': '#f97316', // orange
        'module-2': '#a855f7', // purple
        'module-3': '#06b6d4', // cyan
        'module-4': '#eab308', // gold
        'module-5': '#ec4899', // pink
        // Feedback colors
        'success': '#22c55e',
        'error': '#ef4444',
        'xp-gold': '#fbbf24',
        // Text colors
        'text-primary': '#e2e8f0',
        'text-secondary': '#64748b',
      },
      fontFamily: {
        'klingon': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      maxWidth: {
        'app': '520px',
      },
    },
  },
  plugins: [],
}
