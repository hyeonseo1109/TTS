#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod keyboard;

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle().clone();

            keyboard::start_global_listener(handle);

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}