import type { Config } from 'tailwindcss'
import { openui } from '@openlabs/ui/tailwind'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@openlabs/ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: { },
  },
  plugins: [openui()],
}
export default config
