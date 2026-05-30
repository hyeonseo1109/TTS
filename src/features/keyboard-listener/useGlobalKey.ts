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
        // 모음: 대기 중 자음은 무조건 초성
        flush(true);
        onKey(key);
      } else if (CONSONANTS.has(key)) {
        // 자음: 대기 중 자음은 받침으로 확정
        flush(false);
        pendingConsonant.current = key;
        // 타임아웃: 다음 키 없으면 받침으로
        pendingTimer.current = setTimeout(() => {
          flush(false);
        }, 80);
      } else {
        // 영문 등: 대기 중 자음은 받침
        flush(false);
        onKey(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKey]);
};
