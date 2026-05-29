import { MainPage } from "@pages/ui";
import "./global.css.js";
import { useGlobalKey } from "@features/keyboard-listener";
import { pushSound } from "@features/audio-player";
import { convertToSound } from "@features/phoneme-engine";
import { useCallback } from "react";

export const App = () => {
  const handleKey = useCallback((key: string) => {
    const sounds = convertToSound(key);
    pushSound(sounds);
  }, []);

  useGlobalKey(handleKey);

  return <MainPage />;
};
