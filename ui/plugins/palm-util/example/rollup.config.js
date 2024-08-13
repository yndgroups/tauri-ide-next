import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
import html from "@rollup/plugin-html";
import sass from "rollup-plugin-sass";
import { minify } from "rollup-plugin-esbuild";
import json from "rollup-plugin-json";
import livereload from 'rollup-plugin-livereload'
import dev from 'rollup-plugin-dev'

/*
  esm es6 模式
  iife(Immediately-invoked function expression ) 立即调用模式
  AMD
  CommonJS
  UMD
*/

// 返回文件的绝对路径
const resolveFile = function (filename) {
  return path.join(__dirname, "..", filename);
};

/**
 * html 文件解析属性
 * @param {*} attributes
 * @returns
 */
const makeHtmlAttributes = (attributes) => {
  if (!attributes) {
    return "";
  }
  const keys = Object.keys(attributes);
  // eslint-disable-next-line no-param-reassign
  return keys.reduce(
    (result, key) => (result += ` ${key}="${attributes[key]}"`),
    ""
  );
};

/**
 * 输出的文件
 */
const output = [
  {
    name: "PalmEditor",
    file: "dist/index.umd.min.js",
    format: "umd",
    plugins: [minify()],
  },
  {
    name: "PalmEditor",
    file: "dist/index.umd.js",
    format: "umd",
  },
  {
    name: "PalmEditor",
    file: "dist/index.amd.js",
    format: "amd",
  },
  {
    name: "PalmEditor",
    file: "dist/index.cjs.js",
    format: "cjs",
  },
  {
    name: "PalmEditor",
    file: "dist/index.iife.js",
    format: "iife",
  },
];

/**
 * 打包需要复制的文件
 */
let targets = [
  { src: "index.html", dest: "dist" },
  { src: "package.json", dest: "dist" },
  { src: "README.md", dest: "dist" },
  { src: "../plugins/lang-sql/dist/*", dest: "plugins/lang-sql" },
  {
    src: "../plugins/lang-javascript/dist/*",
    dest: "plugins/lang-javascript",
  },
  {
    src: "../plugins/lang-vue/dist/*",
    dest: "plugins/lang-vue",
  },
];

// 配置文件
export default {
  input: "example/index.ts",
  output: [
    {
      name: "PalmEditor",
      file: "example/index.umd.js",
      format: "umd",
    },
  ],
  plugins: [
    dev(),
    // so Rollup can read file `.json`
    json(),
    // 打包插件
    babel(),
    // 查找和打包node_modules中的第三方模块
    resolve(),
    // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    commonjs(),
    // 解析TypeScript
    typescript(),
    livereload(),
    // 服务开启
    serve({
      // open: true,
      contentBase: ["./example"],
      host: "localhost",
      port: 3000,
    }),
    // 模版处理
    /* html({
      fileName: "index.html",
      title: "palm-editor",
      template: async ({ attributes, files, meta, publicPath, title }) => {
        // 解析script
        const scripts = (files.js || [])
          .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.script);
            return `<script src="${publicPath}${fileName}"${attrs}></script>`;
          })
          .join("\n");
        // 解析css
        const links = (files.css || [])
          .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.link);
            return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
          })
          .join("\n");
        //  解析mata data
        const metas = meta
          .map((input) => {
            const attrs = makeHtmlAttributes(input);
            return `<meta${attrs}>`;
          })
          .join("\n");
        return `
        <!doctype html>
        <html ${makeHtmlAttributes(attributes.html)}>
          <head>
            ${metas}
            <title>${title}</title>
            ${links}
          </head>
          <body>
          <div id='app'></div>
            ${scripts}
            <style>#app{height:200px;border:1px solid #ccc}</style>
          </body>
        </html>`;
      },
    }), */
    sass({ output: "dist/index.css" }),
    // terser(), //开启代码压缩
    // copy({
    //   targets: [{ src: "./core/**", dest: "./core" }],
    //   verbose: true,
    // }),
  ],
  treeshake: true,
  watch: { include: "./**" },
};
