const COMMANDS: &[&str] = &["link", "execute_sql", "test_link"];

fn main() {
    tauri_plugin::Builder::new(COMMANDS).build();
}
