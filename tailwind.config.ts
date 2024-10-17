import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'banner': "url('/bannerbg.png')",
        'abstractBg': "url('/bg2.png')",
        'bg2': "url('/yelloblackbg.png')",
        'bg3': "url('/bg3.png')",
        'rp': "url('/rp2.png')",
        'rp2': "url('/rp.svg')",
        'icecream': "url('/spice.svg')",
        "botsbanner-sm":"url('/botsbanner_mobile.svg')",
        "botsbanner":"url('/botsbanner.svg')",
        "bubbles":"url('/pixel-bubble.svg')",
      },
    },
    fontFamily:{
      fredoka : ["var(--font-fredoka)"],
      nunito: ["var(--font-nunito)"],
    }
  },
  plugins: [],
}
export default config
