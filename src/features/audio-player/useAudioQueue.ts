import { Howler } from "howler";
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

  const ctx = Howler.ctx as AudioContext | undefined;
  if (ctx?.state === "suspended") {
    ctx.resume();
  }

  queue.push(...sounds);

  if (!isPlaying) {
    playNext();
  }
};
