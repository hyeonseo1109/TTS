import { soundMap } from "./soundMap";

const DELAY_MS = 30;

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
