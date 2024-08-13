use rand::{rngs::ThreadRng, Rng};
use serde::{Deserialize, Serialize};

// 数据统一返回封装
#[derive(Serialize, Deserialize, Debug)]
pub struct Resp<T> {
    pub code: u8,
    pub msg: String,
    pub data: Option<T>,
    pub err_msg: Option<T>,
}

// 返回数据结果处理
#[allow(unused)]
impl<T> Resp<T> {
    pub fn new(code: u8, msg: &str, data: Option<T>) -> Self {
        if code == 1 {
            Resp {
                msg: msg.to_string(),
                code: code,
                data,
                err_msg: None,
            }
        } else {
            Resp {
                msg: msg.to_string(),
                code: code,
                data: None,
                err_msg: data,
            }
        }
    }

    pub fn success(data: Option<T>) -> Self {
        Resp {
            msg: String::from("操作成功"),
            code: 1,
            data,
            err_msg: None,
        }
    }

    pub fn fail(err_msg: Option<T>) -> Self {
        Resp {
            msg: String::from("操作失败"),
            code: 0,
            data: None,
            err_msg,
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

/// 根据传入长度生成随机的字符串
pub fn create_uuid_str(length: u8) -> String {
    let mut verify_code_vec: Vec<char> = Vec::new();
    const CHAR_ARRAY: [char; 62] = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ];
    let mut rng: ThreadRng = rand::thread_rng();
    for _i in 0..length {
        verify_code_vec.push(CHAR_ARRAY[rng.gen_range(0..CHAR_ARRAY.len())]);
    }
    String::from_iter(verify_code_vec.iter())
}
