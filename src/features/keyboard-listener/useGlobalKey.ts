import { useEffect, useRef } from "react";
import { VOWEL_MAP } from "@features/phoneme-engine";

export const useGlobalKey = (onKey: (key: string) => void) => {
  const pendingConsonant = useRef<string | null>(null);
  const pendingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (pendingTimer.current) {
      clearTimeout(pendingTimer.current);
      pendingTimer.current = null;
    }
  };

  const flush = (asInitial: boolean) => {
    if (pendingConsonant.current === null) return;
    const c = pendingConsonant.current;
    pendingConsonant.current = null;
    clearTimer();
    onKey(asInitial ? `__initial__${c}` : `__final__${c}`);
  };

  useEffect(() => {
    const CONSONANTS = new Set([
      "ㄱ",
      "ㄲ",
      "ㄴ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ]);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.isComposing || e.key.length !== 1) return;
      const key = e.key;

      if (VOWEL_MAP[key]) {
        flush(true);
        onKey(key);
      } else if (CONSONANTS.has(key)) {
        flush(false);
        pendingConsonant.current = key;
        pendingTimer.current = setTimeout(() => flush(false), 80);
      } else {
        flush(false);
        onKey(key);
      }
    };

    // Tauri 백그라운드 이벤트 (키 종류는 모름, 카운트만)
    let unlisten: (() => void) | null = null;
    const isTauri = "__TAURI_INTERNALS__" in window;
    if (isTauri) {
      import("@tauri-apps/api/event").then(({ listen }) => {
        listen("global-keydown", () => {
          // 백그라운드에서는 어떤 키인지 모르므로 카운트만
          // 필요시 여기서 별도 처리
        }).then((fn) => {
          unlisten = fn;
        });
      });
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      unlisten?.();
    };
  }, [onKey]);
};
