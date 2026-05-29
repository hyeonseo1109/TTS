import { splitHangul } from "./hangulDisassemble";
import { INITIAL_MAP, VOWEL_MAP, FINAL_MAP } from "./mapper";

export const convertToSound = (input: string): string[] => {
  if (!input) return [];

  const sounds: string[] = [];

  // 1) 한 글자씩 처리 (문자열 전체가 아니라 char 기준)
  const chars = Array.from(input);

  for (const char of chars) {
    const parts = splitHangul(char);

    // 2) 한글이 아닌 경우 (자모/기타)
    if (!parts || parts.length === 0) {
      continue;
    }

    const [initial, vowel, final] = parts;

    // 3) 초성
    if (initial && INITIAL_MAP[initial] !== undefined) {
      const s = INITIAL_MAP[initial];
      if (s) sounds.push(s);
    }

    // 4) 중성
    if (vowel && VOWEL_MAP[vowel]) {
      sounds.push(VOWEL_MAP[vowel]);
    }

    // 5) 종성
    if (final && FINAL_MAP[final]) {
      sounds.push(FINAL_MAP[final]);
    }
  }

  return sounds;
};
