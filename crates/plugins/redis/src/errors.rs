use serde::{ser::Serializer, Serialize};
use redis::RedisError;

#[derive(Debug, thiserror::Error)]
pub enum TauriRedisError {
    #[error(transparent)]
    Io(#[from] std::io::Error),

    #[error(transparent)]
    Request(#[from] reqwest::Error),

    #[error("{0}")]
    ContentLength(String),

    #[error("{0}")]
    Error(String),

    #[error("{0}")]
    RedisError(#[from] RedisError),

    #[error("{0}")]
    WithMsg(String),
}

impl Serialize for TauriRedisError {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}
