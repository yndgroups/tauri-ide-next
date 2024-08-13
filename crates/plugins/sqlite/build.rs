const COMMANDS: &[&str] = &[
    "link",
    "get_links",
    "save_link",
    "get_history_query_list",
    "save_history",
];

fn main() {
    tauri_plugin::Builder::new(COMMANDS).build();
}
