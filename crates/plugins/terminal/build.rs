const COMMANDS: &[&str] = &[
    "create_terminal",
    "write_to_pty",
    "read_from_pty",
    "resize_pty",
    "get_terminal_unique_keys",
    "clear_terminal",
];

fn main() {
    tauri_plugin::Builder::new(COMMANDS).build();
}
