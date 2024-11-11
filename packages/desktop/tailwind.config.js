import { TailwindGlobalConfig } from '@etu-access/config';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [TailwindGlobalConfig],
  content: [
    './index.html',
    './splash.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    '../lib/src/**/*.{js,ts,jsx,tsx}',
  ],
};
