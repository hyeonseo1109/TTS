import { MainPage } from "@pages/ui";
import "./global.css.js";
import { useGlobalKey } from "@features/keyboard-listener";
import { pushSound } from "@features/audio-player";
import { convertToSound } from "@features/phoneme-engine";

export const App = () => {
  useGlobalKey((key) => {
    const sounds = convertToSound(key);
    pushSound(sounds);
  });

  return <MainPage />;
};
