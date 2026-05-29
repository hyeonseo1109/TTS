import { soundMap } from "./soundMap";

const queue: string[] = [];
let isPlaying = false;

const playNext = () => {
  if (queue.length === 0) {
    isPlaying = false;
    return;
  }

  isPlaying = true;

  const soundKey = queue.shift()!;
  const sound = soundMap[soundKey];

  if (!sound) {
    playNext();
    return;
  }

  sound.play();

  sound.once("end", () => {
    playNext();
  });
};

export const pushSound = (sounds: string[]) => {
  queue.push(...sounds);

  if (!isPlaying) {
    playNext();
  }
};
