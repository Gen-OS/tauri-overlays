// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use tauri::Manager;
use serde::{Deserialize, Serialize};

use tauri::{AppHandle};
use tauri::{Emitter, Listener};


#[cfg(target_os = "macos")]
use {
    tauri::menu::MenuItem,
    tauri_nspanel::{
        cocoa::base::{id, NO, YES},
        objc::{msg_send, sel, sel_impl},
    },
};

#[derive(Debug, Serialize, Deserialize)]
struct MouseEventPayload {
    allowMouseEvents: bool,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            #[cfg(target_os = "macos")]
            {
                let app_handle = app.handle().clone();
                let app_handle_clone = app_handle.clone();
                app_handle.listen_any("toggle_mouse_events", move |event| {
                    println!("Received event: {:?}", event);
                    if let Ok(payload) = serde_json::from_str::<MouseEventPayload>(event.payload()) {
                        println!("Mouse events allowed: {}", payload.allowMouseEvents);
                        
                        // Get all windows and update their mouse event handling
                        if let Some(window) = app_handle_clone.get_window("main") {
                            unsafe {
                                let ns_window: id = window.ns_window().unwrap() as _;
                                let _: () = msg_send![ns_window, setIgnoresMouseEvents:!payload.allowMouseEvents];
                            }
                        }
                    }
                });

                Ok(())
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
