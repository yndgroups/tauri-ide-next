use portable_pty::PtyPair;
use std::{
    io::{ BufReader, Read, Write},
    sync::Arc,
};
use tauri::async_runtime::Mutex as AsyncMutex;
#[derive(Clone)]
pub struct AppState {
    pub pty_pair: Arc<AsyncMutex<PtyPair>>,
    pub writer: Arc<AsyncMutex<Box<dyn Write + Send>>>,
    pub reader: Arc<AsyncMutex<BufReader<Box<dyn Read + Send>>>>,
}