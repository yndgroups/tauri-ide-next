const COMMANDS: &[&str] = &["send_ask"];

fn main() {
    tauri_plugin::Builder::new(COMMANDS).build();
}
