import { MainPage } from "@pages/ui";
import "./global.css.js";
import { useGlobalKey } from "@features/keyboard-listener";
import { pushSound } from "@features/audio-player";
import { convertToSound } from "@features/phoneme-engine";
import { useCallback, useState, useRef, useEffect } from "react";

export const App = () => {
  const [isOn, setIsOn] = useState(false);
  const isOnRef = useRef(isOn);

  useEffect(() => {
    isOnRef.current = isOn;
  }, [isOn]);

  const handleKey = useCallback((key: string) => {
    if (!isOnRef.current) return;
    const sounds = convertToSound(key);
    console.log("key:", key, "sounds:", sounds);
    pushSound(sounds);
  }, []);

  useGlobalKey(handleKey);

  return <MainPage isOn={isOn} onToggle={() => setIsOn((v) => !v)} />;
};
