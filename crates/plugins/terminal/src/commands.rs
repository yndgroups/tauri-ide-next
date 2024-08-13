// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::errors::PalmError;
use crate::models::AppState;
use crate::utils::{self, Resp};
use anyhow::Result;
use lazy_static::lazy_static;
use portable_pty::{native_pty_system, CommandBuilder, PtySize};
use std::collections::HashMap;
use std::io::{BufRead, BufReader};
use std::sync::Mutex;
use std::{io::Write, process::exit, sync::Arc, thread};
use tauri::async_runtime::Mutex as AsyncMutex;

lazy_static! {
    static ref GLOBAL_MAP: Mutex<HashMap<String, AppState>> = Mutex::new(HashMap::new());
}

pub async fn set_value(key: String) {
    let mut map: std::sync::MutexGuard<HashMap<String, AppState>> = GLOBAL_MAP.lock().unwrap();
    if let Some(_value) = map.get_mut(&key) {
        // *value = value;
    } else {
        // 如果键不存在，则插入新键值对
        let pty_system = native_pty_system();
        let pty_pair = pty_system
            .openpty(PtySize {
                rows: 24,
                cols: 80,
                pixel_width: 0,
                pixel_height: 0,
            })
            .unwrap();
        let reader = pty_pair.master.try_clone_reader().unwrap();
        let writer: Box<dyn Write + Send> = pty_pair.master.take_writer().unwrap();
        let state = AppState {
            pty_pair: Arc::new(AsyncMutex::new(pty_pair)),
            writer: Arc::new(AsyncMutex::new(writer)),
            reader: Arc::new(AsyncMutex::new(BufReader::new(reader))),
        };
        map.insert(key, state);
    }
}

pub fn get_state(key: &str) -> Result<AppState, PalmError> {
    match GLOBAL_MAP.lock() {
        Ok(mut maps) => match maps.get_mut(key) {
            Some(state) => {
                let s = state.clone();
                Ok(s)
            }
            None => Err(PalmError::Error(String::from("未获取到命令行初始化信息"))),
        },
        Err(err) => Err(PalmError::Error(String::from(err.to_string()))),
    }
}

/// //创建一个shell并添加$TERM env变量，这样我们就可以使用clear和其他命令
#[tauri::command]
pub async fn create_terminal() -> Resp<String> {
    // 构建控制台配置
    let uuid = utils::create_uuid_str(32);
    println!("create_terminal 构建控制台 = {}", uuid);
    set_value(uuid.clone()).await;

    // 配置
    #[cfg(target_os = "windows")]
    let mut cmd = CommandBuilder::new("powershell.exe");

    #[cfg(not(target_os = "windows"))]
    let mut cmd = CommandBuilder::new("bash");

    // 添加$TERM env变量，以便我们可以使用clear和其他命令

    #[cfg(target_os = "windows")]
    cmd.env("TERM", "cygwin");

    #[cfg(not(target_os = "windows"))]
    cmd.env("TERM", "xterm-256color");

    // 创建uuid
    let state = get_state(&uuid.clone()).unwrap();
    let child = state
        .pty_pair
        .lock()
        .await
        .slave
        .spawn_command(cmd)
        .map_err(|err| err.to_string());
    match child {
        Ok(mut cd) => {
            thread::spawn(move || {
                let status = cd.wait().unwrap();
                exit(status.exit_code() as i32)
            });
            Resp::success(Some(uuid))
        },
        Err(err) =>  Resp::fail(Some(format!("操作失败: {:?}", err))),
    }
   
}

/// 写入数据
#[tauri::command]
pub async fn write_to_pty(data: &str, key: String) -> Result<(), ()> {
    println!("write_to_pty 写入数据 = {}", key);
    let state = get_state(&key.to_string()).unwrap();
    write!(state.writer.lock_owned().await, "{}", data).map_err(|_| ())
}

/// 读取数据
#[tauri::command]
pub async fn read_from_pty(key: &str) -> Result<Option<String>, ()> {
    println!("read_from_pty 读取数据 = {}", key);
    let state = get_state(key).unwrap();
    let mut reader = state.reader.lock().await;
    let data = {
        // 阅读所有可用文本
        let data = reader.fill_buf().map_err(|_| ())?;
        // 如有必要，将数据发送到网络视图
        if data.len() > 0 {
            std::str::from_utf8(data)
                .map(|v| Some(v.to_string()))
                .map_err(|_| ())?
        } else {
            None
        }
    };

    if let Some(data) = &data {
        reader.consume(data.len());
    }
    Ok(data)
}

/// 修改窗口尺寸
#[tauri::command]
pub async fn resize_pty(rows: u16, cols: u16, key: &str) -> Result<(), ()> {
    println!("resize_pty 修改窗口尺寸 = {}", key);
    let state = get_state(key).unwrap();
    state
        .pty_pair
        .lock_owned()
        .await
        .master
        .resize(PtySize {
            rows,
            cols,
            ..Default::default()
        })
        .map_err(|_| ())
}

/// 获取元素的唯一值
#[tauri::command]
pub async fn get_terminal_unique_keys() -> Result<Vec<String>, PalmError> {
    match GLOBAL_MAP.lock() {
        Ok(maps) => {
            let mut keys = Vec::new();
            for (key, _value) in maps.clone() {
                // println!("{}: {:?}", key, value);
                keys.push(key)
            }
            Ok(keys)
        }
        Err(err) => Err(PalmError::Error(String::from(err.to_string()))),
    }
}

#[tauri::command]
pub async fn clear_terminal() -> Resp<String> {
    match GLOBAL_MAP.lock() {
        Ok(mut maps) => {
            maps.clear();
            Resp::success(Some(String::from("操作成功")))
        }
        Err(err) => Resp::fail(Some(format!("操作失败: {:?}", err))),
    }
}