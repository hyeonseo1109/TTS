import { useEffect } from "react";

// 한글 IME가 입력 중일 때 compositionend로 완성된 글자 캐치
// keydown으로 영문 캐치
export const useGlobalKey = (onKey: (key: string) => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // IME 조합 중이면 무시 (compositionend에서 처리)
      if (e.isComposing) return;

      // 영문 단일 문자만
      if (e.key.length === 1) {
        onKey(e.key);
      }
    };

    const handleCompositionEnd = (e: CompositionEvent) => {
      // 한글 완성 시 (예: "밥", "안녕" 등)
      if (e.data) {
        for (const char of e.data) {
          onKey(char);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("compositionend", handleCompositionEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("compositionend", handleCompositionEnd);
    };
  }, []);
};
