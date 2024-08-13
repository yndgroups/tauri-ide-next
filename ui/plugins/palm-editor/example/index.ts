import  { PalmEditor , LanguageType, Themes } from "../dist/index.js";
const editor = new PalmEditor(document.getElementById('app') as any, 's1', {
    view: {
      placeholder: '请输入',
      change: (nv: string) => {
        // console.log(store.file.path, 'store.file.path')
        console.log(nv, '值改变执行');
      },
      extensions: [],
      theme: Themes.basicLight,
    },
    state: {},
    languageType: LanguageType.vue,
  });
  console.log(editor, 'editor')


/*   import  { DiffView } from "../dist/index.js";
  let dv = new DiffView(`server:
  port: 8082
  api: noAuthPath:  /auth/createAnonymityToken,/wechat/notify,/v2/api-docs,favicon.ico,swagger,doc.jsonnoAuthPath:  /auth/createAnonymityToken,/wechat/notify,/v2/api-docs,favicon.ico,swagger,doc.jsonnoAuthPath:  /auth/createAnonymityToken,/wechat/notify,/v2/api-docs,favicon.ico,swagger,doc.json`, `server:
  port: 80811`, document.getElementById('app') as any)
  console.log(dv, 'DiffView') */