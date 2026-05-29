import { useState } from "react";
import * as styles from "./style.css";

export const MainPage = () => {
  const [isOn, setIsOn] = useState<boolean>(false);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.textContainer}>
        <h1>목소리를 키시겠어요?</h1>
        <div className={styles.buttonContainer} onClick={() => setIsOn(!isOn)}>
          <button
            className={styles.button}
            style={{
              backgroundColor: isOn ? "#77e259" : "#ddd",
              transform: isOn ? "translateX(2rem)" : "translateX(-0.2rem)",
            }}
          ></button>
        </div>
      </div>
      <img src="/hi.png" className={styles.backImage} />
    </div>
  );
};
