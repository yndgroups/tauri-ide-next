import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { internalIpV4 } from 'internal-ip';
import VueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

// @ts-ignore
const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd()) as any
  const prod: boolean = command === 'build' && mode === 'production';
  let fileName = prod ? 'markdown' : 'index';
  return {
    plugins: [vue(), VueJsx()],
    clearScreen: false,
    server: {
      port: env.VITE_APP_PORT,
      strictPort: true,
      host: mobile ? '0.0.0.0' : false,
      hmr: mobile
        ? {
            protocol: 'ws',
            host: await internalIpV4(),
            port: env.VITE_APP_PORT,
          }
        : undefined,
      watch: {
        // ignored: ['../../**/src-tauri/**'],
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@views': resolve(__dirname, './src/views'),
      },
      extensions: ['.jsx', '.tsx', '.vue', '.js', '.json', '.ts'],
    },
    build: {
      outDir: '../dist',
      rollupOptions: {
        input: {
          [fileName]: resolve(__dirname, `./${fileName}.html`),
        },
      },
    },
  }
});
