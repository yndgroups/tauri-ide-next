use tauri_plugin_log::{Target, TargetKind};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

mod commands;
mod core;
use core::handle;
use core::menu;
use std::env;

#[allow(unused)]
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    env::set_var("RUST_LOG", "debug");
    let lang = String::from("zh-CN");
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
                // window.close_devtools();
            }
            // let handle = app.app_handle();
            menu::init(app);
            handle::init(app);
            Ok(())
        })
        // 日志打印
        .plugin(
            tauri_plugin_log::Builder::new()
                .targets([
                    // Target::new(TargetKind::Stdout),
                    Target::new(TargetKind::LogDir { file_name: None }),
                    Target::new(TargetKind::Webview),
                ])
                .build(),
        )
        // 自定义插件
        .plugin(tauri_plugin_mysql::init())
        .plugin(tauri_plugin_dm::init())
        .plugin(tauri_plugin_sqlite::init())
        .plugin(tauri_plugin_terminal::init())
        .plugin(tauri_plugin_ai::init())
        .plugin(tauri_plugin_redis::init(lang))
        // 原生插件
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![greet, commands::upload])
        .run(context)
        .expect("error while running tauri application");
}
