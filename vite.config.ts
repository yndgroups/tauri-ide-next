import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { internalIpV4 } from 'internal-ip';
import VueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

// @ts-ignore
const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [vue(), VueJsx()],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: mobile ? '0.0.0.0' : false,
    hmr: mobile
      ? {
          protocol: 'ws',
          host: await internalIpV4(),
          port: 1421,
        }
      : undefined,
    watch: {
      // ignored: ['**/src-tauri/**'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@views': resolve(__dirname, './src/views'),
    },
    extensions: ['.jsx', '.tsx', '.vue', '.js', '.json', '.ts'],
  },
}));
