use serde::{ser::Serializer, Serialize};
use tauri::{
    plugin::{Builder as PluginBuilder, TauriPlugin},
    Manager, Runtime,
};

mod commands;
mod model;
mod core;

pub type SqliteResult<T> = std::result::Result<T, SqliteError>;

#[derive(Debug, thiserror::Error)]
pub enum SqliteError {
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error(transparent)]
    RusqliteError(#[from] rusqlite::Error),
    #[error(transparent)]
    Request(#[from] reqwest::Error),
    #[error("{0}")]
    ContentLength(String),
    #[error("{0}")]
    WithMsg(String),
}

impl Serialize for SqliteError {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

#[derive(Clone, Serialize)]
pub struct ProgressPayload {
    progress: u64,
    total: u64,
}

// 初始化插件
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    PluginBuilder::new("sqlite")
        .js_init_script(include_str!("api-iife.js").to_string())
        .invoke_handler(tauri::generate_handler![
            commands::link,
            commands::get_links,
            commands::save_link,
            commands::get_history_query_list,
            commands::save_history,
        ])
        .setup(|app, _api| {
            /* match app.path().home_dir() {
                Ok(mut pb) => {
                    pb.push("palm");
                    pb.push("palm.db");
                    let _ = PATH_BUF.set(pb);
                    let _ = core::init_db();
                }
                Err(_) => (),
            }; */
            Ok(())
        })
        .build()
}
