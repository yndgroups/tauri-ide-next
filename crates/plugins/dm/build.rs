const COMMANDS: &[&str] = &["link"];

fn main() {
    tauri_plugin::Builder::new(COMMANDS).build();
}
