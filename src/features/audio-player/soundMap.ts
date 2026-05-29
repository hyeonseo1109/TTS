import { Howl } from "howler";

export const soundMap: Record<string, Howl> = {
  그: new Howl({ src: ["/sounds/그.mp3"] }),
  느: new Howl({ src: ["/sounds/느.mp3"] }),
  브: new Howl({ src: ["/sounds/브.mp3"] }),
  아: new Howl({ src: ["/sounds/아.mp3"] }),
  읍: new Howl({ src: ["/sounds/읍.mp3"] }),
};
