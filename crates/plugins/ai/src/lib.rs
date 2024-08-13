use tauri::{
    plugin::{Builder as PluginBuilder, TauriPlugin},
    Runtime,
};

mod core;
use core::{commands, errors};
use errors::Error;
pub mod apis;

pub type Result<T> = std::result::Result<T, Error>;

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    PluginBuilder::new("ai")
        .js_init_script(include_str!("api-iife.js").to_string())
        .invoke_handler(tauri::generate_handler![commands::send_ask,])
        .build()
}