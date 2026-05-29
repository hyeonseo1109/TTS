import { soundMap } from "./soundMap";

const DELAY_MS = 80; // 이 값 조절해보세요 (50~150)

export const pushSound = (sounds: string[]) => {
  if (!sounds || sounds.length === 0) return;

  sounds.forEach((soundKey, i) => {
    setTimeout(() => {
      const sound = soundMap[soundKey];
      if (!sound) return;
      sound.stop();
      sound.play();
    }, i * DELAY_MS);
  });
};
