import { readFileSync, watch } from "fs";
import { join } from "path";
import { cwd } from "process";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";

export function createConfig(options = {}) {
  const {
    input = "src/index.ts",
    external = [/^@tauri-apps\/api/],
    additionalConfigs = [],
  } = options;

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const pkg = JSON.parse(readFileSync(join(cwd(), "package.json"), "utf8"));

  return [
    {
      input,
      output: [
        {
          file: pkg.exports.import,
          format: "esm",
        },
        {
          file: pkg.exports.require,
          format: "cjs",
        },
      ],
      plugins: [
        typescript({
          declaration: true,
          declarationDir: `./${pkg.exports.import.split("/")[0]}`,
        }),
        copy({
          targets: [
            {
              src: "package.json",
              dest: "dist",
            },
          ],
        }),
      ],
      external: [
        ...external,
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
      ],
      onwarn: (warning) => {
        throw Object.assign(new Error(), warning);
      }
    },
    ...(Array.isArray(additionalConfigs)
      ? additionalConfigs
      : [additionalConfigs]),
  ];
}

export default createConfig();
