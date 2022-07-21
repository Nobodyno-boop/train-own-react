import { defineConfig } from 'vite'

import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  base: '/train-own-react/',
  esbuild: {
    jsxFactory: 'Fr.el',
  },
  plugins: [WindiCSS()],
})