use serde::{ser::Serializer, Serialize};

#[derive(Debug, thiserror::Error)]
pub enum PalmError {
    #[error(transparent)]
    Io(#[from] std::io::Error),

    #[error(transparent)]
    Request(#[from] reqwest::Error),

    #[error("{0}")]
    ContentLength(String),

    #[error("{0}")]
    Error(String),
    
    // #[error(transparent)]
    // Io(#[from] PoisonError),
}

impl Serialize for PalmError {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}
