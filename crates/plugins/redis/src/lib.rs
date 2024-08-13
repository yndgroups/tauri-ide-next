// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use errors::TauriRedisError;
use scope::Scope;
use serde::Deserialize;
use tauri::{
    plugin::{Builder as PluginBuilder, TauriPlugin}, Manager, Runtime
};

pub type RedisResult<T> = std::result::Result<T, TauriRedisError>;

mod commands;
mod errors;
mod models;
mod utils;
mod scope;
pub fn init<R: Runtime>(lang: String) -> TauriPlugin<R> {
    PluginBuilder::new("redis")
        .js_init_script(include_str!("api-iife.js").to_string())
        .invoke_handler(tauri::generate_handler![
            commands::create_link,
            commands::test_link,
            commands::delete_link,
            commands::get,
            commands::set,
            commands::get_server_info,
            commands::get_memory_info,
        ])
        .setup(|app, _api| {
            let scope = Scope::new(lang);
            app.manage(scope);
            Ok(())
        })
        .build()
}
