use crate::model::{History, Link};
use crate::{SqliteError, SqliteResult};
use anyhow::Error;
use common::Response;
use rusqlite::Connection;

#[derive(Debug)]
pub struct Sqlite {
    conn: Connection,
}

#[allow(dead_code, warnings, unused)]
impl Sqlite {
    pub fn new(path: String) -> SqliteResult<Sqlite> {
        match Connection::open(path) {
            Ok(coon) => Ok(Sqlite {
                conn: coon,
            }),
            Err(err) => Err(SqliteError::WithMsg(err.to_string())),
        }
    }

    // 初始化系统基本数据
    pub fn init_db(&self) {
        self.execute(
            "CREATE TABLE IF NOT EXISTS palm_link (
        id INTEGER PRIMARY KEY,
        pid INTEGER,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        host TEXT,
        port INTEGER,
        user TEXT,
        password  TEXT
    )",
        );
        self.execute(
            "CREATE TABLE IF NOT EXISTS palm_history (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        sql_text TEXT NOT NULL,
        link_name TEXT NOT NULL,
        db_name TEXT NOT NULL,
        create_time TEXT NOT NULL,
        update_time TEXT
    )",
        );
    }

    // execute 执行sql
    pub fn execute(&self, sql_text: &str) -> SqliteResult<Response<String>> {
        let res = self.conn.execute(sql_text, ());
        match res {
            Ok(_) => Ok(Response::new(1, "创建成功", None)),
            Err(err) => Err(SqliteError::WithMsg(err.to_string())),
        }
    }

    // 查询连接信息
    pub fn query_links(&self) -> Result<Vec<Link>, Error> {
        let mut stmt = self
            .conn
            .prepare("SELECT id,pid,name,type,host,port,user,password FROM palm_link")?;
        let links = stmt.query_map([], |row| {
            Ok(Link {
                id: row.get(0)?,
                pid: row.get(1)?,
                name: row.get(2)?,
                r#type: row.get(3)?,
                host: row.get(4)?,
                port: row.get(5)?,
                user: row.get(6)?,
                password: row.get(7)?,
            })
        })?;
        let mut ls: Vec<Link> = Vec::new();
        for l in links {
            ls.push(l?);
        }
        Ok(ls)
    }

    // 查询历史记录
    pub fn query_history(&self) -> SqliteResult<Vec<History>> {
        let mut stmt = self.conn.prepare(
            "SELECT id,title,sql_text,link_name,db_name,create_time,update_time FROM palm_history",
        )?;
        let links = stmt.query_map([], |row| {
            Ok(History {
                id: row.get(0)?,
                title: row.get(1)?,
                sql_text: row.get(2)?,
                link_name: row.get(3)?,
                db_name: row.get(4)?,
                create_time: row.get(5)?,
                update_time: row.get(6)?,
            })
        })?;
        let mut ls: Vec<History> = Vec::new();
        for l in links {
            match l {
                Ok(l) => ls.push(l),
                Err(_) => break,
            }
        }
        Ok(ls)
    }
}
