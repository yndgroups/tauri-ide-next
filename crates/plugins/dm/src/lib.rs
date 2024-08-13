use serde::{ser::Serializer, Serialize};
use tauri::{
    plugin::{Builder as PluginBuilder, TauriPlugin},
    Runtime,
};

mod commands;
pub type Result<T> = std::result::Result<T, Error>;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error(transparent)]
    Request(#[from] reqwest::Error),
    #[error("{0}")]
    ContentLength(String),
}

impl Serialize for Error {
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

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    PluginBuilder::new("dm")
        .js_init_script(include_str!("api-iife.js").to_string())
        .invoke_handler(tauri::generate_handler![
            commands::link
        ])
        .build()
}
