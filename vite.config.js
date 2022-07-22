import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  base: '/train-own-react/',
  build: {
    manifest: true,
  },
  esbuild: {
    jsxFactory: 'Fr.el',
  },
  plugins: [
    WindiCSS(),
    VitePWA({
      includeAssets: ['github.png', 'icon.svg'],
      manifest: {
        short_name: 'shortU',
        name: 'ShortU',
        description: 'Simple all to make short urls',
        theme_color: '#3367D6',
        icons: [
          {
            src: 'icon.svg',
            type: 'image/svg+xml',
            sizes: '512x512',
          },
          {
            src: 'icon.svg',
            type: 'image/svg+xml',
            sizes: '192x192',
          },
          {
            src: 'icon.svg',
            type: 'image/svg+xml',
            sizes: '512x512',
          },
        ],
      },
    }),
  ],
})
