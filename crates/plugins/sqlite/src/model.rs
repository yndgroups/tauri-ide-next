use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Link {
    // id
    pub id: i64,
    // pid
    pub pid: i64,
    // 名称
    pub name: String,
    // 类型: 1:分组 2:dm 3:dmkingbase 4:mysql 5:mariadb 6:oracle
    // 5:redis 6:sqlite 7:sqlserver 8:mongodb 9:postgresql
    pub r#type: String,
    // 主机地址
    pub host: String,
    // 端口
    pub port: u16,
    // 用户名
    pub user: String,
    // 密码
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct History {
    // id
    pub id: i64,
    // 保存标题
    pub title: String,
    // sql文本
    pub sql_text: String,
    // 连接名称
    pub link_name: String,
    // 数据库名称
    pub db_name: String,
    // 创建时间
    pub create_time: String,
    // 更新时间
    pub update_time: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Param {}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum System {
    Link,
}
