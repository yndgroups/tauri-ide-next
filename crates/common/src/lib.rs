use serde::{Deserialize, Serialize};

pub trait SqlExecute {
    fn sql_query(sql: &str) -> Response<std::string::String>;
}

#[derive(Debug, thiserror::Error)]
pub enum PalmError {
    #[error("读取字符串失败")]
    ReadError(#[from] std::io::Error),

    #[error("数据库连接失败")]
    MySqlConnectError(#[from] mysql::Error),

    #[error("json解析失败")]
    JsonParseError(#[from] serde_json::Error),

    // "{\"code\":".to_owned() + &self.code.to_string() + ",\"msg\":\"" + &self.msg + "\"}"
    #[error("{0}")]
    FailedWithMsg(String),
}

// 封装统一请求头
#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Request<T> {
    pub page_index: u16,
    pub page_size: u16,
    pub params: T,
}

// 统一返回枚举类
#[allow(dead_code)]
pub enum Resp<T, E> {
    Data(T),
    Err(E),
}

// 数据统一返回封装
#[derive(Serialize, Deserialize, Debug)]
pub struct Response<T> {
    pub code: u8,
    pub msg: String,
    pub data: Option<T>,
}

// 返回数据结果处理
impl<T> Response<T> {
    pub fn new(code: u8, msg: &str, data: Option<T>) -> Self {
        Response {
            msg: msg.to_string(),
            code: code,
            data,
        }
    }

    // 实现转为json string
    #[allow(dead_code)]
    pub fn to_json_string(&self) -> String {
        let s =
            "{\"code\":".to_owned() + &self.code.to_string() + ",\"msg\":\"" + &self.msg + "\"}";
        format!("{}", s)
    }
}

/// 将首字符转大写
pub fn capit(s: &str) -> String {
    let mut c = s.chars();
    match c.next() {
        Some(f) => f.to_uppercase().collect::<String>() + c.as_str(),
        None => String::new(),
    }
}

// 下划线转小驼峰
pub fn underline_to_small_hump(s: &str) -> String {
    if s.contains("_") {
        let strs = s.split("_");
        let mut s = String::new();
        for (i, v) in strs.enumerate() {
            if i == 0 {
                s += v
            } else {
                s += &capit(v)
            }
        }
        s
    } else {
        return s.to_string();
    }
}
