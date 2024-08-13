use std::sync::Mutex;

#[derive(Debug)]
pub struct Scope {
    pub lang: Mutex<String>,
}

impl Default for Scope {
    fn default() -> Self {
        Self { lang: String::from("zh_CN").into() }
    }
}

impl Scope {
    pub fn new(lang: String) -> Self {
        Self { lang: lang.into() }
    }
}

// #[derive(Default)]
// struct Store(Mutex<HashMap<usize, String>>);