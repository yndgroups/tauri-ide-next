use std::collections::HashMap;
use tauri::{command, AppHandle, Manager, Runtime};

use crate::Result;

#[command]
pub async fn link<R: Runtime>(app: AppHandle<R>, link_info: HashMap<String, String>) -> Result<()> {
    println!(
        "dm连接成功:{:?}=, {:?}",
        app.path().home_dir().unwrap(),
        link_info
    );
    Ok(())
}
