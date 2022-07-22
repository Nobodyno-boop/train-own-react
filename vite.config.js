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
            src: '/android-icon-36x36.png',
            sizes: '36x36',
            type: 'image/png',
            density: '0.75',
          },
          {
            src: '/android-icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
            density: '1.0',
          },
          {
            src: '/android-icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
            density: '1.5',
          },
          {
            src: '/android-icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            density: '2.0',
          },
          {
            src: '/android-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            density: '3.0',
          },
          {
            src: '/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            density: '4.0',
          },
        ],
      },
    }),
  ],
})
