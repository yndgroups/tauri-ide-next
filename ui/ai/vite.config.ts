import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { internalIpV4 } from 'internal-ip';
import VueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path';

const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);

export default defineConfig(async ({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd()) as any
  const prod: boolean = command === 'build' && mode === 'production';
  let fileName = prod ? 'openai' : 'index';
  return {
    plugins: [
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: false })],
        directoryAsNamespace: true,
        dts: './temp/auto-components.d.ts',
      }),
      vue(),
      VueJsx()
    ],
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: '@import "@/style/styles.scss";',
    //     },
    //   },
    // },
    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
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
        // 3. tell vite to ignore watching `src-tauri`
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
