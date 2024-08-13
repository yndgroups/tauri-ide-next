// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::errors::TauriRedisError;
use crate::models::RedisConfig;
use crate::utils::{self, Resp};
use crate::RedisResult;
use lazy_static::lazy_static;
use redis::aio::MultiplexedConnection;
use redis::AsyncCommands;
use std::collections::HashMap;
use std::sync::Mutex;
use std::time::Duration;
use crate::scope::Scope;
use tauri::State;

lazy_static! {
    static ref GLOBAL_MAP: Mutex<HashMap<String, MultiplexedConnection>> = Mutex::new(HashMap::new());
}

/// 设置连接
pub async fn chance_conn(key: String, conn: MultiplexedConnection) {
    let mut map: std::sync::MutexGuard<HashMap<String, MultiplexedConnection>> = GLOBAL_MAP.lock().unwrap();
    if map.get_mut(&key).is_none() {
        map.insert(key, conn);
    }
}

/// 获取连接
pub async  fn get_conn(key: &str) -> RedisResult<MultiplexedConnection> {
    match GLOBAL_MAP.lock() {
        Ok(mut maps) => match maps.get_mut(key) {
            Some(state) => {
                let s = state.clone();
                Ok(s)
            }
            None => Err(TauriRedisError::Error(String::from(
                "未获取到命令行初始化信息",
            ))),
        },
        Err(err) => Err(TauriRedisError::Error(String::from(err.to_string()))),
    }
}

/// 测试连接
#[tauri::command]
pub async fn test_link(
    state: State<'_, Scope>,
    config: RedisConfig
) -> RedisResult<Resp<String>> {
    let lang = state.lang.lock().unwrap().clone();
    println!("{:?}", lang);
    let redis_url = format!(
        "redis://:{}@{}:{}/{}",
        config.password, config.host, config.port, config.db
    );
    match redis::Client::open(redis_url) {
        Ok(client) => match client.get_multiplexed_async_connection().await {
            Ok(_conn) => Ok(Resp::success(Some(String::from("测试连接成功")))),
            Err(err) => Ok(Resp::fail(Some(format!("测试连接失败: {}", err.to_string())))),
        },
        Err(err) => Ok(Resp::fail(Some(format!("测试连接失败: {}", err.to_string())))),
    }
}

/*
 pub async fn create_link<R: Runtime>(
    // app: AppHandle<R>,
 */
// 创建连接
#[tauri::command]
pub async fn create_link(
    state: State<'_, Scope>,
    config: RedisConfig
) -> RedisResult<Resp<String>> {
    let lang = state.lang.lock().unwrap().clone();
    println!("{:?}", lang);
    let url = format!(
        "redis://:{}@{}:{}/{}",
        config.password, config.host, config.port, config.db
    );
    match redis::Client::open(url) {
        Ok(client) => match client
            .get_multiplexed_tokio_connection_with_response_timeouts(
                Duration::from_secs(60),
                Duration::from_secs(15),
            )
            .await
        {
            Ok(conn) => {
                let uuid = utils::create_uuid_str(19);
                chance_conn(uuid.clone(), conn).await;
                Ok(Resp::success(Some(uuid)))
            },
            Err(err) => Ok(Resp::fail(Some(format!("client创建失败:{}",err.to_string())))),
        },
        Err(err) => Ok(Resp::fail(Some(format!("client创建失败:{}",err.to_string())))),
    }
}


/// 读取数据
#[tauri::command]
pub async fn get(uuid: String, key: String) -> Resp<String>  {
    println!("get: uuid = {}, key = {}", uuid, key);
    match get_conn(&uuid).await {
        Ok(mut rds) => {
            match  rds.get(key).await {
                Ok(resp) =>  {
                    println!("{:#?}", resp);
                    Resp::success(Some(resp))
                },
                Err(err) => Resp::fail(Some(err.to_string())),
            }
        },
        Err(err) => Resp::fail(Some(err.to_string()))
    }
}

/// 删除数据
#[tauri::command]
pub async fn set(uuid: String, key: String, value: String) -> Resp<String>  {
    println!("set: uuid = {}, key = {}", uuid, key);
    match get_conn(&uuid).await {
        Ok(mut conn) => {
            match  conn.set(key, value).await {
                Ok(resp) =>  {
                    Resp::success(Some(resp))
                },
                Err(err) => Resp::fail(Some(err.to_string())),
            }
        },
        Err(err) => Resp::fail(Some(err.to_string()))
    }
}

/// 删除数据
#[tauri::command]
pub async fn delete_link(uuid: String, key: String) -> Resp<String> {
    match get_conn(&uuid).await {
        Ok(mut rds) => {
            match  rds.del(key).await {
                Ok(resp) =>  {
                    Resp::success(Some(resp))
                },
                Err(err) => Resp::fail(Some(err.to_string())),
            }
        },
        Err(err) => Resp::fail(Some(err.to_string()))
    }
}

/// get_server_info
#[tauri::command]
pub async fn get_server_info() {
    println!("get_server_info");
}


/// get_memory_info
#[tauri::command]
pub async fn get_memory_info() {
    println!("get_memory_info");
}