// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod db;
mod github;

use db::Database;
use std::sync::Mutex;
use tauri::Manager;

pub struct AppState {
    pub db: Mutex<Database>,
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let app_dir = app.path().app_data_dir().expect("failed to get app data dir");
            std::fs::create_dir_all(&app_dir).ok();
            let db_path = app_dir.join("gitgael.db");
            let database = Database::new(&db_path).expect("failed to initialize database");

            app.manage(AppState {
                db: Mutex::new(database),
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::repo_list,
            commands::repo_get,
            commands::repo_search,
            commands::repo_create,
            commands::repo_update,
            commands::repo_delete,
            commands::category_tree,
            commands::github_auth_start,
            commands::github_auth_status,
            commands::github_auth_logout,
            commands::github_fork,
            commands::export_catalog,
            commands::export_markdown,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
