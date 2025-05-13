import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'splash-screen.png' // optional splash screen image
      ],
      manifest: {
        name: 'ImpactConnect',
        short_name: 'ImpactConnect',
        description: 'Discover your passion, connect with change-makers, and take action.',
        theme_color: '#0F766E',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        shortcuts: [
          {
            name: 'Explore Causes',
            short_name: 'Explore',
            description: 'Browse causes that need action',
            url: '/explore',
            icons: [{ src: 'icons/explore.png', sizes: '192x192', type: 'image/png' }]
          },
          {
            name: 'Join Community',
            short_name: 'Community',
            description: 'Connect with change-makers',
            url: '/community',
            icons: [{ src: 'icons/community.png', sizes: '192x192', type: 'image/png' }]
          }
        ],
        categories: ['social', 'education', 'nonprofit'],
        screenshots: [
          {
            src: 'screenshots/homepage.png',
            sizes: '640x480',
            type: 'image/png'
          },
          {
            src: 'screenshots/actionhub.png',
            sizes: '640x480',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});

