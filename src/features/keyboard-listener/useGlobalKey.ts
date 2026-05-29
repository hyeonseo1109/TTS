import { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";

export const useGlobalKey = (onKey: (key: string) => void) => {
  useEffect(() => {
    let unlisten: () => void;

    listen<string>("global-key", (event) => {
      onKey(event.payload);
    }).then((fn) => {
      unlisten = fn;
    });

    return () => {
      unlisten?.();
    };
  }, []);
};
