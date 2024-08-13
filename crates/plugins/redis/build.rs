const COMMANDS: &[&str] = &[
    "test_link",
    "create_link",
    "delete_link",
    "get",
    "set",
    "get_server_info",
    "get_memory_info"
];

fn main() {
    tauri_plugin::Builder::new(COMMANDS).build();
}
