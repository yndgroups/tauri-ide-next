use serde::{Deserialize, Serialize};

#[derive(Debug, PartialEq, Eq, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Account {
    pub id: Option<String>,
    pub account: Option<String>,
    pub password: Option<String>,
    pub enabled: Option<i32>,
    pub create_time: Option<String>,
    pub modify_time: Option<String>,
}

#[derive(Debug, PartialEq, Eq, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LinkInfo {
    pub host: String,
    pub user: String,
    pub password: String,
    pub db_type: String,
    pub port: i32,
    pub link_name: String,
}

#[derive(Debug, PartialEq, Eq, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct Item {
    field: String,
    value: String,
}

#[derive(Clone, Serialize)]
pub struct ProgressPayload {
    progress: u64,
    total: u64,
}
