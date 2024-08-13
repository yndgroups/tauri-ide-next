use errors::Error;
use tauri::{
    plugin::{Builder as PluginBuilder, TauriPlugin},
    Runtime,
};

mod commands;
mod errors;
mod models;

pub type Result<T> = std::result::Result<T, Error>;

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    PluginBuilder::new("mysql")
        .js_init_script(include_str!("api-iife.js").to_string())
        .invoke_handler(tauri::generate_handler![
            commands::link,
            commands::link_db,
            commands::test_link,
            commands::execute_sql,
            commands::query_schema
        ])
        .build()
}
