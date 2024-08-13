use common::{Request, Response};
use log::debug;
use std::collections::HashMap;
use tauri::command;

use crate::{
    core::Sqlite,
    model::{History, Link, Param},
    SqliteError, SqliteResult,
};
// 连接地址保存
use once_cell::sync::Lazy;
use std::sync::Mutex;

static GLOBAL_DATA: Lazy<Mutex<HashMap<i64, Sqlite>>> = Lazy::new(|| {
    let m = HashMap::new();
    Mutex::new(m)
});

#[command]
pub async fn link(link_info: HashMap<String, String>) -> SqliteResult<()> {
    // println!("{:?}", GLOBAL_MAP);
    println!("sqlite连接成功: {:?}", link_info);
    Ok(())
}

// 查询连接列表
#[allow(dead_code, warnings, unused)]
#[tauri::command]
pub async fn get_links() -> Response<Vec<Link>> {
    let maps = GLOBAL_DATA.lock().unwrap();
    let conn = maps.get(&1).unwrap();
    let data = conn.query_links();
    match data {
        Ok(data) => Response::new(1, "查询成功", Some(data)),
        Err(err) => {
            debug!(">>> {:#?}", err);
            Response::new(0, &("查询失败:".to_owned() + &err.to_string()), None)
        }
    }
}

// 查询保存的历史记录
#[allow(dead_code, warnings, unused)]
#[tauri::command]
pub async fn get_history_query_list(_page_info: Request<Param>) -> Response<Vec<History>> {
    let maps = GLOBAL_DATA.lock().unwrap();
    let conn = maps.get(&1).unwrap();
    println!("{:?}", _page_info); // 打印参数信息
    let data = conn.query_history();
    match data {
        Ok(data) => Response::new(1, "查询成功", Some(data)),
        Err(_) => Response::new(0, "查询失败", None),
    }
}

// 保存信息
#[allow(dead_code, warnings, unused)]
#[tauri::command]
pub async fn save_link(link_info: Link) -> SqliteResult<Response<String>> {
    let maps = GLOBAL_DATA.lock().unwrap();
    let conn = maps.get(&1).unwrap();
    debug!("save_link = {:?}", link_info);
    let sql = format!("INSERT INTO palm_link (name,pid,type,host,port,user,password) VALUES ({},{},{},{},{},{},{})", link_info.name,
    link_info.pid,
    link_info.r#type,
    link_info.host,
    link_info.port,
    link_info.user,
    link_info.password,);
    let res = conn.execute(&sql);
    match res {
        Ok(_) => Ok(Response::new(1, "保存成功", None)),
        Err(e) => Err(SqliteError::WithMsg(e.to_string())),
    }
}

#[allow(dead_code, warnings, unused)]
#[tauri::command]
pub fn save_history(data: History) -> SqliteResult<Response<String>> {
    let sql = format!("INSERT INTO palm_history (title,sql_text,link_name,db_name,create_time,update_time) VALUES ({},{},{},{},{},{})", data.title,
    data.sql_text,
    data.link_name,
    data.db_name,
    data.create_time,
    data.update_time,);
    let maps = GLOBAL_DATA.lock().unwrap();
    let conn = maps.get(&1).unwrap();
    let res =  conn.execute(&sql);
    match res {
        Ok(_) => Ok(Response::new(1, "保存成功", None)),
        Err(e) => Err(SqliteError::WithMsg(e.to_string())),
    }
}

// 删除信息
#[allow(dead_code, warnings, unused)]
#[tauri::command]
pub fn delete(id: &str, tb_name: &str) -> SqliteResult<Response<String>> {
    /* let tb = match tb_mark {
        1 => "palm_link",
        2 => "palm_history",
        _ => "",
    }; */
    let maps = GLOBAL_DATA.lock().unwrap();
    let conn = maps.get(&1).unwrap();
    let sql = format!("delete from {} where id = {}", tb_name, id);
    let res = conn.execute(&sql);
    match res {
        Ok(_) => Ok(Response::new(1, "删除成功", None)),
        Err(err) => Err(SqliteError::WithMsg(err.to_string())),
    }
}
