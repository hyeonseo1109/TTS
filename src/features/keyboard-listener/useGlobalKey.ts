import { useEffect, useRef } from "react";
import { VOWEL_MAP } from "@features/phoneme-engine";

export const useGlobalKey = (onKey: (key: string) => void) => {
  const pendingConsonant = useRef<string | null>(null);
  const pendingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevWasVowel = useRef(false);

  const flush = (asInitial: boolean) => {
    if (pendingConsonant.current === null) return;
    const c = pendingConsonant.current;
    pendingConsonant.current = null;
    if (pendingTimer.current) {
      clearTimeout(pendingTimer.current);
      pendingTimer.current = null;
    }
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
        // 모음: 대기 중 자음은 초성
        flush(true);
        onKey(key);
        prevWasVowel.current = true;
      } else if (CONSONANTS.has(key)) {
        if (pendingConsonant.current !== null) {
          // 대기 중 자음 있으면 받침으로 확정
          flush(false);
        }
        pendingConsonant.current = key;
        // 이전이 모음이 아니면 (자음 연속, 문장 시작 등) 바로 초성 가능성 낮음
        const wasVowel = prevWasVowel.current;
        pendingTimer.current = setTimeout(() => {
          // 타임아웃: 이전이 모음이었으면 받침, 아니면 초성
          flush(!wasVowel);
        }, 80);
        prevWasVowel.current = false;
      } else {
        // 영문 등
        flush(false);
        onKey(key);
        prevWasVowel.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKey]);
};
