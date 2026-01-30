import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        home: path.resolve(__dirname, 'src/home.html'),
        discovery: path.resolve(__dirname, 'src/discovery.html'),
        'discovery-new': path.resolve(__dirname, 'src/discovery-new.html'),
        'social-feed': path.resolve(__dirname, 'src/social-feed.html'),
        map: path.resolve(__dirname, 'src/map.html'),
        'ai-nutritionist': path.resolve(__dirname, 'src/ai-nutritionist.html'),
        orders: path.resolve(__dirname, 'src/orders.html'),
        saved: path.resolve(__dirname, 'src/saved.html'),
        masonry: path.resolve(__dirname, 'src/masonry.html'),
      },
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|gif|svg/.test(ext)) {
            return `images/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
