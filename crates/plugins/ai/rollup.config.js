import { readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

export function createConfig(options = {}) {
  const { input = 'guest-js/index.ts', external = [/^@tauri-apps\/api/], additionalConfigs = [] } = options;

  const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json'), 'utf8'));

  const pluginJsName = pkg.name.replace('@tauri-apps/plugin-', '').replace(/-./g, (x) => x[1].toUpperCase());
  const iifeVarName = `__TAURI_PLUGIN_${pluginJsName.toUpperCase()}__`;

  return [
    {
      input,
      output: [
        {
          file: pkg.exports.import,
          format: 'esm',
        },
        {
          file: pkg.exports.require,
          format: 'cjs',
        },
      ],
      plugins: [
        typescript({
          declaration: true,
          declarationDir: `./${pkg.exports.import.split('/')[0]}`,
        }),
        copy({
          targets: [
            {
              src: 'package.json',
              dest: 'dist-js',
            },
          ],
        }),
      ],
      external: [...external, ...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
      onwarn: (warning) => {
        throw Object.assign(new Error(), warning);
      },
    },

    {
      input,
      output: {
        format: 'iife',
        name: iifeVarName,
        banner: "if ('__TAURI__' in window) {",
        footer: `Object.defineProperty(window.__TAURI__, '${pluginJsName}', { value: ${iifeVarName} }) }`,
        file: 'src/api-iife.js',
      },
      plugins: [typescript(), terser(), nodeResolve()],
      onwarn: (warning) => {
        throw Object.assign(new Error(), warning);
      },
    },

    ...(Array.isArray(additionalConfigs) ? additionalConfigs : [additionalConfigs]),
  ];
}

export default createConfig()