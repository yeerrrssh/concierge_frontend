import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/modules/**/*.{ts,tsx,js,jsx,mdx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontWeight: {
        inherit: 'inherit',
      },
      fontFamily: {
        inter: 'Inter',
      },
      colors: {
        'surface-50': '#F2F2F2',
        'surface-100': '#CCCED5',
        'surface-150': '#C0C0C0',
        'surface-200': '#9E9E9E',
        'surface-300': '#8F8F8F',
        'surface-400': '#404040',

        purple: '#5845B8',
        error: '#EB5757',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

export default config;
