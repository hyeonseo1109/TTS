pub mod key_map;

use rdev::{listen, Event, EventType};
use tauri::{AppHandle, Emitter};

use crate::keyboard::key_map::key_to_string;

pub fn start_global_listener(app_handle: AppHandle) {
    std::thread::spawn(move || {
        let callback = move |event: Event| {
            if let EventType::KeyPress(key) = event.event_type {
                if let Some(k) = key_to_string(key) {
                    let _ = app_handle.emit("global-key", k);
                }
            }
        };

        let _ = listen(callback);
    });
}