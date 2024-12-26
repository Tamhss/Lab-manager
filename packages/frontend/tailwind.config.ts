import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2DA2BB',
        'dark-red': '#FF0000',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        noto: ['Noto Sans JP', 'sans-serif'], // Đặt tên font là 'noto' để sử dụng
        custom: [
          'Rubik',
          '"GenJyuuGothic"',
          '游ゴシック体',
          'YuGothic-M',
          '"Yu Gothic"',
          'YuGothic',
          '"ヒラギノ角ゴシック Pro"',
          '"Hiragino Kaku Gothic Pro"',
          'メイリオ',
          'Meiryo',
          'Osaka',
          '"ＭＳ Ｐゴシック"',
          '"MS PGothic"',
          'sans-serif'
        ]
      }
    },
  },

  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
