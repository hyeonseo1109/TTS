import { INITIAL_MAP, VOWEL_MAP, FINAL_MAP } from "./mapper";

export const convertToSound = (input: string): string[] => {
  if (!input) return [];

  // 초성/종성 강제 지정
  if (input.startsWith("__initial__")) {
    const c = input.replace("__initial__", "");
    const s = INITIAL_MAP[c];
    return s ? [s] : [];
  }
  if (input.startsWith("__final__")) {
    const c = input.replace("__final__", "");
    const s = FINAL_MAP[c];
    return s ? [s] : [];
  }

  const sounds: string[] = [];

  for (const char of Array.from(input)) {
    if (INITIAL_MAP[char] !== undefined) {
      const s = INITIAL_MAP[char];
      if (s) sounds.push(s);
      continue;
    }

    if (VOWEL_MAP[char]) {
      sounds.push(VOWEL_MAP[char]);
      continue;
    }

    if (FINAL_MAP[char]) {
      sounds.push(FINAL_MAP[char]);
      continue;
    }

    const code = char.charCodeAt(0) - 0xac00;
    if (code < 0 || code > 11171) continue;

    const initialIdx = Math.floor(code / 588);
    const vowelIdx = Math.floor((code % 588) / 28);
    const finalIdx = code % 28;

    const INITIALS = [
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
    ];
    const VOWELS = [
      "ㅏ",
      "ㅐ",
      "ㅑ",
      "ㅒ",
      "ㅓ",
      "ㅔ",
      "ㅕ",
      "ㅖ",
      "ㅗ",
      "ㅘ",
      "ㅙ",
      "ㅚ",
      "ㅛ",
      "ㅜ",
      "ㅝ",
      "ㅞ",
      "ㅟ",
      "ㅠ",
      "ㅡ",
      "ㅢ",
      "ㅣ",
    ];
    const FINALS = [
      "",
      "ㄱ",
      "ㄲ",
      "ㄳ",
      "ㄴ",
      "ㄵ",
      "ㄶ",
      "ㄷ",
      "ㄹ",
      "ㄺ",
      "ㄻ",
      "ㄼ",
      "ㄽ",
      "ㄾ",
      "ㄿ",
      "ㅀ",
      "ㅁ",
      "ㅂ",
      "ㅄ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];

    const initial = INITIALS[initialIdx];
    const vowel = VOWELS[vowelIdx];
    const final = FINALS[finalIdx];

    if (initial && INITIAL_MAP[initial] !== undefined) {
      const s = INITIAL_MAP[initial];
      if (s) sounds.push(s);
    }
    if (vowel && VOWEL_MAP[vowel]) sounds.push(VOWEL_MAP[vowel]);
    if (final && FINAL_MAP[final]) sounds.push(FINAL_MAP[final]);
  }

  return sounds;
};
