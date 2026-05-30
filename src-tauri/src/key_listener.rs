use tauri::{AppHandle, Emitter};

pub fn start(app: AppHandle) {
    use core_graphics::event::{CGEventTap, CGEventTapLocation, CGEventTapPlacement, CGEventTapOptions, CGEventType, EventField};
    
    let tap = CGEventTap::new(
        CGEventTapLocation::HID,
        CGEventTapPlacement::HeadInsertEventTap,
        CGEventTapOptions::ListenOnly,
        vec![CGEventType::KeyDown],
        move |_, _, event| {
            let keycode = event.get_integer_value_field(EventField::KEYBOARD_EVENT_KEYCODE);
            app.emit("global-keydown", keycode).ok();
            None
        },
    );

    if let Ok(tap) = tap {
        let loop_source = tap.mach_port.create_runloop_source(0).unwrap();
        let run_loop = core_foundation::runloop::CFRunLoop::get_current();
        run_loop.add_source(&loop_source, unsafe { core_foundation::runloop::kCFRunLoopCommonModes });
        tap.enable();
        core_foundation::runloop::CFRunLoop::run_current();
    }
}