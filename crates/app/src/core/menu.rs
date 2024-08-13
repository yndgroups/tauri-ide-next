use tauri::{
    menu::{MenuBuilder, SubmenuBuilder},
    App,
};

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
pub struct Payload {
    pub(crate) message: String,
    pub(crate) code: i8,
}

// 应用菜单项
pub fn init(app: &App) {
    let menu = MenuBuilder::new(app);

    // 第一项菜单
    let submenu = SubmenuBuilder::new(app, "palm")
        .text("palm_about", "关于palm".to_string())
        .text("check_update", "检测更新".to_string())
        .separator()
        .text("home_item", "首选项".to_string())
        .separator()
        .text("redis", "redis".to_string())
        .text("data_manage", "数据管理".to_string())
        .text("markdown", "Markdown".to_string())
        .text("openai", "知行通".to_string())
        .text("music", "音乐".to_string())
        .separator()
        .text("soft_server", "服务".to_string())
        .separator()
        .text("hide_palm", "隐藏palm".to_string())
        .text("hide_other", "隐藏其他".to_string())
        .text("display_all", "全部显示".to_string())
        .separator()
        .text("exit", "退出palm".to_string());

    let menu = match submenu.build() {
        Ok(sm) => menu.item(&sm),
        Err(_) => menu,
    };

    // 文件
    let sub_file_menu = SubmenuBuilder::new(app, "文件")
        .text("create_file_text", "新建文本文件".to_string())
        .text("create_file", "新建文件".to_string())
        .text("create_window", "新建窗口".to_string())
        .separator()
        .text("open", "打开".to_string())
        .text("open_folder", "打开文件夹".to_string())
        .text("open_file_in_workspace", "从文件打开工作区".to_string())
        .text("open_file_recently", "打开最近文件".to_string())
        .separator()
        .text("add_file_to_workspace", "将文件添加到工作区".to_string())
        .text("save_workspace_as", "将工作区另存为".to_string())
        .text("copy_workspace_as", "复制工作区".to_string())
        .separator()
        .text("save", "保存".to_string())
        .text("save_as", "另存为".to_string())
        .text("save_all", "全部保存".to_string())
        .separator()
        .text("share", "共享".to_string())
        .separator()
        .text("auto_share", "自动保存".to_string())
        .separator()
        .text("reduction_file", "还原文件".to_string())
        .text("close_editor", "关闭编辑器".to_string())
        .text("close_folder", "关闭文件夹".to_string())
        .text("close_window", "关闭文窗口".to_string());

    let menu = match sub_file_menu.build() {
        Ok(sm) => menu.item(&sm),
        Err(_) => menu,
    };

    // 查看
    let view = SubmenuBuilder::with_id(app, "view", "查看")
        .item(
            &SubmenuBuilder::new(app, "外观")
                .text("full_screen", "全屏".to_string())
                .separator()
                .text("zen_mode", "禅模式".to_string())
                .build()
                .unwrap(),
        )
        .text("change_theme", "修改主题");

    let menu = match view.build() {
        Ok(sm) => menu.item(&sm),
        Err(_) => menu,
    };

    // 窗口
    let windwo_menu = SubmenuBuilder::new(app, "窗口")
        .text("minimize_window", "最小化".to_string())
        .text("scale_window", "缩放".to_string())
        .text("close_window", "关闭窗口".to_string());

    let menu = match windwo_menu.build() {
        Ok(sm) => menu.item(&sm),
        Err(_) => menu,
    };

    // 设置
    let setting = SubmenuBuilder::with_id(app, "setting", "设置")
        .item(
            &SubmenuBuilder::new(app, "语言")
                .text("zh_CN", "中文(简体)".to_string())
                .text("zh_TW", "中文(繁体)".to_string())
                .separator()
                .text("en_ES", "English".to_string())
                .build()
                .unwrap(),
        )
        .item(
            &SubmenuBuilder::new(app, "外观")
                .text("full_screen", "全屏".to_string())
                .separator()
                .text("zen_mode", "禅模式".to_string())
                .build()
                .unwrap(),
        )
        .item(
            &SubmenuBuilder::new(app, "切换主题")
                .text("theme_light", "light".to_string())
                .text("theme_dark", "dark".to_string())
                .separator()
                .text("theme_light", "monika".to_string())
                .build()
                .unwrap(),
        );

    let menu = match setting.build() {
        Ok(sm) => menu.item(&sm),
        Err(_) => menu,
    };

    let help_menu = SubmenuBuilder::new(app, "帮助")
        .text("welcome", "欢迎".to_string())
        .text("rust_docs", "rust在线开发文档".to_string())
        .text("rust_libs", "rust远程仓库".to_string())
        .text("tauri_docs", "tauri在线开发文档".to_string())
        .separator()
        .text("contact_us", "联系我们".to_string());

    let menu = match help_menu.build() {
        Ok(sm) => menu.item(&sm),
        Err(_) => menu,
    };

    let _ = match menu.build() {
        Ok(m) => app.set_menu(m),
        Err(err) => Err(err),
    };
}
