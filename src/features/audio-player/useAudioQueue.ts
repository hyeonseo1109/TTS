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

  // 없으면 스킵
  if (!sound) {
    playNext();
    return;
  }

  // 이미 재생 중이면 멈추고 다시 재생
  if (sound.playing()) {
    sound.stop();
  }
  sound.play();

  sound.once("end", () => {
    playNext();
  });
};

export const pushSound = (sounds: string[]) => {
  if (!sounds || sounds.length === 0) return;

  queue.push(...sounds);

  if (!isPlaying) {
    playNext();
  }
};
