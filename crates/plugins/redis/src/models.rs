use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct  RedisConfig {
    pub host: String,
    pub port: u16,
    pub password: String,
    pub db: i64,
}