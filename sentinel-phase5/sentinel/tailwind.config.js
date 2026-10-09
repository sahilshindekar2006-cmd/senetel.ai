/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--background) / <alpha-value>)',
        fg: 'rgb(var(--foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-green': 'rgb(var(--accent-green) / <alpha-value>)',
        'accent-purple': 'rgb(var(--accent-purple) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 9vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        title: ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        lead: ['clamp(1rem, 1.4vw, 1.25rem)', { lineHeight: '1.6' }],
      },
    },
  },
  plugins: [],
}
