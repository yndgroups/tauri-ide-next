use tauri::{command, ipc::Channel, AppHandle, Runtime, Window};

#[command]
pub async fn upload<R: Runtime>(
    app: AppHandle<R>,
    window: Window<R>,
    on_progress: Channel,
    url: String,
) {
    println!("{:?}", app);
    println!("{:?}", window);
    println!("{:?}", url);
    // implement command logic here
    on_progress.send(100).unwrap();
}
