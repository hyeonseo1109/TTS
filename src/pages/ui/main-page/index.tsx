import * as styles from "./style.css";

interface Props {
  isOn: boolean;
  onToggle: () => void;
}

export const MainPage = ({ isOn, onToggle }: Props) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.textContainer}>
        <h1>목소리를 키시겠어요?</h1>
        <div className={styles.buttonContainer} onClick={onToggle}>
          <button
            className={styles.button}
            style={{
              backgroundColor: isOn ? "#77e259" : "#ddd",
              transform: isOn ? "translateX(2rem)" : "translateX(-0.2rem)",
            }}
          />
        </div>
      </div>
      <img src="/hi.png" className={styles.backImage} />
    </div>
  );
};
