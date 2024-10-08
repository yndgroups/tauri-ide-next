```
import { defineComponent, onMounted, ref, nextTick, withModifiers } from 'vue';
import { AppstoreAddOutlined, MediumOutlined, SettingOutlined, FileAddOutlined, BranchesOutlined, CodeSandboxOutlined, FileMarkdownOutlined } from '@ant-design/icons-vue';
import { useAppStroe } from '../store';
import { AnyObject } from '../../types';
import WorkspaceEditor from '../components/WorkspaceEditor.vue';
import Extend from '../components/Extend.vue';
import Palm from '../core/palm';
import { Tooltip } from 'ant-design-vue';
export default defineComponent({
  name: 'Framework',
  setup() {
    const expansionBridge = ref<HTMLElement>();
    const showEditor = ref(false);
    const icons = {
      CodeSandboxOutlined: CodeSandboxOutlined,
      FileAddOutlined: FileAddOutlined,
      BranchesOutlined: BranchesOutlined,
      FileMarkdownOutlined: FileMarkdownOutlined,
      MediumOutlined: MediumOutlined,
      AppstoreAddOutlined: AppstoreAddOutlined,
      SettingOutlined: SettingOutlined,
    } as AnyObject;
    const appSore = useAppStroe();
    const finished = ref(false);
    const appUniqueKey = ref<string>('1');
    // 初始化应用界面
    onMounted(async () => {
      let palm = new Palm('palm', 'v0.0.1');
      finished.value = true;
      if (appSore.app && appSore.app.uniqueKey != undefined && appSore.app.uniqueKey !== '1') {
        showEditor.value = false;
        await palm.loadPlugins();
        palm.registerPlugins();
        nextTick(async () => {
          palm.initApp(appSore.app);
        });
      } else {
        await palm.loadPlugins();
        palm.registerPlugins();
        showEditor.value = true;
      }
      window.Palm = palm;
    });

    // 应用事件
    function appClickHandle(index: number, uniqueKey: string) {
      try {
        // 卸载
        if (uniqueKey !== appSore.app.uniqueKey) {
          appUniqueKey.value = uniqueKey;
          window.Palm.unmount();
          if (uniqueKey !== '1') {
            showEditor.value = false;
            nextTick(() => {
              let app = appSore.microApps.get(uniqueKey);
              window.Palm.initApp(app);
            });
          } else {
            showEditor.value = true;
          }
          appSore.setActiveIndex(index);
        }
      } catch (error) {
        console.error(error);
      }
    }

    return () => (
      <>
        {finished.value ? (
          <div class="app-layout">
            <div class="app-top-bar">
              <div>Palm</div>
              <div>
                <SettingOutlined />
              </div>
            </div>
            <div class="app-workspace">
              <div class="app-actions">
                {appSore.appList && appSore.appList.length ? (
                  <ul>
                    {appSore.getApp.map((app, index) => (
                      <li
                        class={appSore.appActiveIndex === index ? 'active' : ''}
                        key={app.uniqueKey}>
                        <Tooltip
                          placement="right"
                          title={app.name}
                          color={app.color}
                          onClick={withModifiers(() => appClickHandle(index, app.uniqueKey), ['self'])}>
                          <div class="item">
                            <component is={icons[app.icon]} />
                          </div>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ''
                )}
              </div>
              <div class="app-workspace-editor">
                {appUniqueKey.value === '1' ? (
                  <WorkspaceEditor />
                ) : appUniqueKey.value === '1' ? (
                  <Extend />
                ) : (
                  <div
                    id="expansion-bridge"
                    ref="expansionBridge"></div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  },
});
```

```
{
  "identifier": "main-capability",
  "windows": ["main"],
  "platforms": ["linux", "macOS", "windows"],
  "permissions": [
    "global-shortcut:allow-register",
    "global-shortcut:allow-register not found",
    "expected one of app:default",
    "app:allow-app-hide",
    "app:allow-app-show",
    "app:allow-name",
    "app:allow-tauri-version",
    "app:allow-version",
    "app:deny-app-hide",
    "app:deny-app-show",
    "app:deny-name",
    "app:deny-tauri-version",
    "app:deny-version",
    "event:default",
    "event:allow-emit",
    "event:allow-emit-to",
    "event:allow-listen",
    "event:allow-unlisten",
    "event:deny-emit",
    "event:deny-emit-to",
    "event:deny-listen",
    "event:deny-unlisten",
    "menu:default",
    "menu:allow-append",
    "menu:allow-create-default",
    "menu:allow-get",
    "menu:allow-insert",
    "menu:allow-is-checked",
    "menu:allow-is-enabled",
    "menu:allow-items",
    "menu:allow-new",
    "menu:allow-popup",
    "menu:allow-prepend",
    "menu:allow-remove",
    "menu:allow-remove-at",
    "menu:allow-set-accelerator",
    "menu:allow-set-as-app-menu",
    "menu:allow-set-as-help-menu-for-nsapp",
    "menu:allow-set-as-window-menu",
    "menu:allow-set-as-windows-menu-for-nsapp",
    "menu:allow-set-checked",
    "menu:allow-set-enabled",
    "menu:allow-set-icon",
    "menu:allow-set-text",
    "menu:allow-text",
    "menu:deny-append",
    "menu:deny-create-default",
    "menu:deny-get",
    "menu:deny-insert",
    "menu:deny-is-checked",
    "menu:deny-is-enabled",
    "menu:deny-items",
    "menu:deny-new",
    "menu:deny-popup",
    "menu:deny-prepend",
    "menu:deny-remove",
    "menu:deny-remove-at",
    "menu:deny-set-accelerator",
    "menu:deny-set-as-app-menu",
    "menu:deny-set-as-help-menu-for-nsapp",
    "menu:deny-set-as-window-menu",
    "menu:deny-set-as-windows-menu-for-nsapp",
    "menu:deny-set-checked",
    "menu:deny-set-enabled",
    "menu:deny-set-icon",
    "menu:deny-set-text",
    "menu:deny-text",
    "path:default",
    "path:allow-basename",
    "path:allow-dirname",
    "path:allow-extname",
    "path:allow-is-absolute",
    "path:allow-join",
    "path:allow-normalize",
    "path:allow-resolve",
    "path:allow-resolve-directory",
    "path:deny-basename",
    "path:deny-dirname",
    "path:deny-extname",
    "path:deny-is-absolute",
    "path:deny-join",
    "path:deny-normalize",
    "path:deny-resolve",
    "path:deny-resolve-directory",
    "resources:default",
    "resources:allow-close",
    "resources:deny-close",
    "shell:allow-execute",
    "shell:allow-kill",
    "shell:allow-open",
    "shell:allow-stdin-write",
    "shell:deny-execute",
    "shell:deny-kill",
    "shell:deny-open",
    "shell:deny-stdin-write",
    "tray:default",
    "tray:allow-new",
    "tray:allow-set-icon",
    "tray:allow-set-icon-as-template",
    "tray:allow-set-menu",
    "tray:allow-set-show-menu-on-left-click",
    "tray:allow-set-temp-dir-path",
    "tray:allow-set-title",
    "tray:allow-set-tooltip",
    "tray:allow-set-visible",
    "tray:deny-new",
    "tray:deny-set-icon",
    "tray:deny-set-icon-as-template",
    "tray:deny-set-menu",
    "tray:deny-set-show-menu-on-left-click",
    "tray:deny-set-temp-dir-path",
    "tray:deny-set-title",
    "tray:deny-set-tooltip",
    "tray:deny-set-visible",
    "webview:default",
    "webview:allow-create-webview",
    "webview:allow-create-webview-window",
    "webview:allow-internal-toggle-devtools",
    "webview:allow-print",
    "webview:allow-set-webview-focus",
    "webview:allow-set-webview-position",
    "webview:allow-set-webview-size",
    "webview:allow-webview-close",
    "webview:allow-webview-position",
    "webview:allow-webview-size",
    "webview:deny-create-webview",
    "webview:deny-create-webview-window",
    "webview:deny-internal-toggle-devtools",
    "webview:deny-print",
    "webview:deny-set-webview-focus",
    "webview:deny-set-webview-position",
    "webview:deny-set-webview-size",
    "webview:deny-webview-close",
    "webview:deny-webview-position",
    "webview:deny-webview-size",
    "window:default",
    "window:allow-available-monitors",
    "window:allow-center",
    "window:allow-close",
    "window:allow-create",
    "window:allow-current-monitor",
    "window:allow-destroy",
    "window:allow-hide",
    "window:allow-inner-position",
    "window:allow-inner-size",
    "window:allow-internal-on-mousedown",
    "window:allow-internal-on-mousemove",
    "window:allow-internal-toggle-maximize",
    "window:allow-is-closable",
    "window:allow-is-decorated",
    "window:allow-is-focused",
    "window:allow-is-fullscreen",
    "window:allow-is-maximizable",
    "window:allow-is-maximized",
    "window:allow-is-minimizable",
    "window:allow-is-minimized",
    "window:allow-is-resizable",
    "window:allow-is-visible",
    "window:allow-maximize",
    "window:allow-minimize",
    "window:allow-outer-position",
    "window:allow-outer-size",
    "window:allow-primary-monitor",
    "window:allow-request-user-attention",
    "window:allow-scale-factor",
    "window:allow-set-always-on-bottom",
    "window:allow-set-always-on-top",
    "window:allow-set-closable",
    "window:allow-set-content-protected",
    "window:allow-set-cursor-grab",
    "window:allow-set-cursor-icon",
    "window:allow-set-cursor-position",
    "window:allow-set-cursor-visible",
    "window:allow-set-decorations",
    "window:allow-set-effects",
    "window:allow-set-focus",
    "window:allow-set-fullscreen",
    "window:allow-set-icon",
    "window:allow-set-ignore-cursor-events",
    "window:allow-set-max-size",
    "window:allow-set-maximizable",
    "window:allow-set-min-size",
    "window:allow-set-minimizable",
    "window:allow-set-position",
    "window:allow-set-progress-bar",
    "window:allow-set-resizable",
    "window:allow-set-shadow",
    "window:allow-set-size",
    "window:allow-set-skip-taskbar",
    "window:allow-set-title",
    "window:allow-set-visible-on-all-workspaces",
    "window:allow-show",
    "window:allow-start-dragging",
    "window:allow-theme",
    "window:allow-title",
    "window:allow-toggle-maximize",
    "window:allow-unmaximize",
    "window:allow-unminimize",
    "window:deny-available-monitors",
    "window:deny-center",
    "window:deny-close",
    "window:deny-create",
    "window:deny-current-monitor",
    "window:deny-destroy",
    "window:deny-hide",
    "window:deny-inner-position",
    "window:deny-inner-size",
    "window:deny-internal-on-mousedown",
    "window:deny-internal-on-mousemove",
    "window:deny-internal-toggle-maximize",
    "window:deny-is-closable",
    "window:deny-is-decorated",
    "window:deny-is-focused",
    "window:deny-is-fullscreen",
    "window:deny-is-maximizable",
    "window:deny-is-maximized",
    "window:deny-is-minimizable",
    "window:deny-is-minimized",
    "window:deny-is-resizable",
    "window:deny-is-visible",
    "window:deny-maximize",
    "window:deny-minimize",
    "window:deny-outer-position",
    "window:deny-outer-size",
    "window:deny-primary-monitor",
    "window:deny-request-user-attention",
    "window:deny-scale-factor",
    "window:deny-set-always-on-bottom",
    "window:deny-set-always-on-top",
    "window:deny-set-closable",
    "window:deny-set-content-protected",
    "window:deny-set-cursor-grab",
    "window:deny-set-cursor-icon",
    "window:deny-set-cursor-position",
    "window:deny-set-cursor-visible",
    "window:deny-set-decorations",
    "window:deny-set-effects",
    "window:deny-set-focus",
    "window:deny-set-fullscreen",
    "window:deny-set-icon",
    "window:deny-set-ignore-cursor-events",
    "window:deny-set-max-size",
    "window:deny-set-maximizable",
    "window:deny-set-min-size",
    "window:deny-set-minimizable",
    "window:deny-set-position",
    "window:deny-set-progress-bar",
    "window:deny-set-resizable",
    "window:deny-set-shadow",
    "window:deny-set-size",
    "window:deny-set-skip-taskbar",
    "window:deny-set-title",
    "window:deny-set-visible-on-all-workspaces",
    "window:deny-show",
    "window:deny-start-dragging",
    "window:deny-theme",
    "window:deny-title",
    "window:deny-toggle-maximize",
    "window:deny-unmaximize",
    "window:deny-unminimize"
  ]
}
```
