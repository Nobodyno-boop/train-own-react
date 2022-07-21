import { defineConfig } from 'vite'

import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  esbuild: {
    jsxFactory: 'Fr.el',
  },
  plugins: [WindiCSS()],
})
