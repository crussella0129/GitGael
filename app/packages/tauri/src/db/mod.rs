use rusqlite::{Connection, Result};
use std::path::Path;

pub struct Database {
    pub conn: Connection,
}

impl Database {
    pub fn new(path: &Path) -> Result<Self> {
        let conn = Connection::open(path)?;

        // Enable WAL mode and foreign keys
        conn.execute_batch("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;")?;

        // Create tables
        conn.execute_batch(include_str!("../../../../packages/shared/src/db/schema.sql"))?;

        Ok(Database { conn })
    }
}
