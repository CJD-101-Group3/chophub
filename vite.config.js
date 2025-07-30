import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
<<<<<<< HEAD
  const env = loadEnv(mode, process.cwd())
  return {
base: env.VITE_BASE || '/', build: { outDir: env.VITE_OUT_DIR || 'dist' },
  plugins: [vue()],
  resolve:{
    alias:{
      '@':fileURLToPath(new URL('./src',import.meta.url)),
    },
  },
}
});
=======
    const env = loadEnv(mode, process.cwd())
    return {
        plugins: [vue()],
        base: env.VITE_BASE || '/',
        build: { outDir: env.VITE_OUT_DIR || 'dist' },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    }
})
>>>>>>> d2d493f57e47b571da7d55c87bcd4bd188952724


