#![cfg_attr(
    all(not(debug_assertions), target_os = "macos"),
    windows_subsystem = "macos"
)]

use tauri::{Manager, WebviewUrl, WebviewWindowBuilder};

#[derive(Clone, serde::Serialize, serde::Deserialize, Debug)]
struct WindowOptions {
    title: String,
    width: f64,
    height: f64,
    x: f64,
    y: f64,
}

#[tauri::command]
async fn create_overlay_window(
    app: tauri::AppHandle,
    options: WindowOptions,
) -> Result<(), String> {
    println!("Creating window with options: {:?}", options);
    
    let window = WebviewWindowBuilder::new(
        &app,
        options.title.clone(),
        WebviewUrl::App("/overlay".into())
    )
    .inner_size(options.width, options.height)
    .position(options.x, options.y)
    .decorations(false)
    .transparent(true)
    .always_on_top(true)
    .visible(true)
    .resizable(false)
    .build()
    .map_err(|e| e.to_string())?;
    
    println!("Window created successfully");
    
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let main_window = WebviewWindowBuilder::new(
                app,
                "main",
                WebviewUrl::App("/".into())
            )
            .title("Overlays")
            .inner_size(128.0, 200.0)
            .decorations(false)
            .transparent(true)
            .resizable(false)
            .always_on_top(true)
            .center()
            .build()?;

            println!("Main window created successfully");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![create_overlay_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}