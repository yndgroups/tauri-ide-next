// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use errors::PalmError;
use tauri::{
    plugin::{Builder as PluginBuilder, TauriPlugin},
    Runtime,
};

#[allow(dead_code)]
pub type Result<T> = std::result::Result<T, PalmError>;

mod commands;
mod errors;
mod models;
mod utils;

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    PluginBuilder::new("terminal")
        .js_init_script(include_str!("api-iife.js").to_string())
        .invoke_handler(tauri::generate_handler![
            commands::create_terminal,
            commands::write_to_pty,
            commands::read_from_pty,
            commands::resize_pty,
            commands::get_terminal_unique_keys,
            commands::clear_terminal,
        ])
        .build()
}
