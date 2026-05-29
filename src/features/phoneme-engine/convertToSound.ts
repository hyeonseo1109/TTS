import { splitHangul } from "./hanguelDisassemble";
import { INITIAL_MAP, VOWEL_MAP, FINAL_MAP } from "./mapper";

export const convertToSound = (char: string) => {
  const parts = splitHangul(char);

  if (!parts) return [];

  const [initial, vowel, final] = parts;

  const result: string[] = [];

  // 초성
  if (initial && INITIAL_MAP[initial] !== undefined) {
    const v = INITIAL_MAP[initial];
    if (v) result.push(v);
  }

  // 중성
  if (vowel && VOWEL_MAP[vowel]) {
    result.push(VOWEL_MAP[vowel]);
  }

  // 종성
  if (final && FINAL_MAP[final]) {
    result.push(FINAL_MAP[final]);
  }

  return result;
};
