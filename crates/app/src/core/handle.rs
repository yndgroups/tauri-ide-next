use crate::core::{
    consts::{WINDOW_HEIGHT, WINDOW_WIDTH},
    menu::Payload,
};
use tauri::{
    App, AppHandle, LogicalPosition, Manager, PhysicalSize, WebviewBuilder, WebviewUrl,
    WindowBuilder,
};
// 应用菜单处理事件
pub fn init(app: &App) {
    app.on_menu_event(|app, event| {
        println!("{:?}", &app.config().identifier);
        println!("{:?}", event.clone());
        let identifier = &app.config().identifier;

        let id = format!("{}", event.id.0);
        println!("点击了菜单id为{:?}的选项", id);
        match &id as &str {
            "editor" => {
                println!("{:?}", "编辑器");
                if identifier.ends_with("build") {
                    open_window(
                        app,
                        WebviewUrl::App("index.html".parse().unwrap()),
                        String::from("editor"),
                    );
                } else {
                    open_window(
                        app,
                        WebviewUrl::External("http://localhost:1420".parse().unwrap()),
                        String::from("editor"),
                    );
                }
            }
            "redis" => {
                println!("{:?}", "redis数据库管理");
                if identifier.ends_with("build") {
                    open_window(
                        app,
                        WebviewUrl::App("redis.html".parse().unwrap()),
                        String::from("redis"),
                    );
                } else {
                    open_window(
                        app,
                        WebviewUrl::External("http://localhost:1425".parse().unwrap()),
                        String::from("redis"),
                    );
                }
            }
            "data_manage" => {
                println!("{:?}", "数据库管理");
                if identifier.ends_with("build") {
                    open_window(
                        app,
                        WebviewUrl::App("db.html".parse().unwrap()),
                        String::from("db"),
                    );
                } else {
                    open_window(
                        app,
                        WebviewUrl::External("http://localhost:1421".parse().unwrap()),
                        String::from("db"),
                    );
                }
            }
            "openai" => {
                println!("{:?}", "知行通");
                if identifier.ends_with("build") {
                    open_window(
                        app,
                        WebviewUrl::App("openai.html".parse().unwrap()),
                        String::from("openai"),
                    );
                } else {
                    open_window(
                        app,
                        WebviewUrl::External("http://localhost:1422".parse().unwrap()),
                        String::from("openai"),
                    );
                }
            }
            "markdown" => {
                println!("{:?}", "markdown");
                if identifier.ends_with("build") {
                    open_window(
                        app,
                        WebviewUrl::App("markdown.html".parse().unwrap()),
                        String::from("markdown"),
                    );
                } else {
                    open_window(
                        app,
                        WebviewUrl::External("http://localhost:1423".parse().unwrap()),
                        String::from("markdown"),
                    );
                }
            }
            "music" => {
                println!("{:?}", "音乐播放器");
                if identifier.ends_with("build") {
                    open_window(
                        app,
                        WebviewUrl::App("music.html".parse().unwrap()),
                        String::from("music"),
                    );
                } else {
                    open_window(
                        app,
                        WebviewUrl::External("http://localhost:1424".parse().unwrap()),
                        String::from("markdown"),
                    );
                }
            }
            "theme_light" => {
                let _ = app.emit("setTheme", "theme_light");
            }
            "theme_dark" => {
                let _ = app.emit("setTheme", "theme_dark");
            }
            "create_file_text" => {
                println!("{:?}", "创建文本文件");
            }
            "rust_docs" => {
                println!("{:?}", "打开rust tauri学习文档");
                open_window(
                    app,
                    WebviewUrl::External(
                        "https://v2.tauri.app/features/window-customization/"
                            .parse()
                            .unwrap(),
                    ),
                    String::from("rust_docs"),
                );
            }
            "exit" => {
                app.exit(1);
            }
            "open_folder" => app
                .emit(
                    "openFolder",
                    Payload {
                        message: "打开文件夹".into(),
                        code: 1,
                    },
                )
                .unwrap(),
            "zh_CN" => {
                let _ = app.emit("changeLanguage", id);
            }
            "zh_TW" => {
                let _ = app.emit("changeLanguage", id);
            }
            "en_ES" => {
                let _ = app.emit("changeLanguage", id);
            }
            _ => (),
        }
    })
}

fn open_window(app: &AppHandle, url: WebviewUrl, label: String) {
    let win = app.clone();
    std::thread::spawn(move || {
        let window = WindowBuilder::new(&win, label.clone())
            .inner_size(WINDOW_WIDTH as f64, WINDOW_HEIGHT as f64)
            .title(label.clone())
            .build();
        match window {
            Ok(window) => {
                let webview_builder = WebviewBuilder::new(label, url);
                match window.inner_size() {
                    Ok(win) => {
                        let _ = window.add_child(webview_builder, LogicalPosition::new(0, 0), win);
                    }
                    Err(_) => {
                        let win: PhysicalSize<u32> = PhysicalSize::new(WINDOW_WIDTH, WINDOW_HEIGHT);
                        let _ = window.add_child(webview_builder, LogicalPosition::new(0, 0), win);
                    }
                }
            }
            Err(_) => (),
        }
    });
}
