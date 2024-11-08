import "./App.css";
import "@fontsource/poppins/800.css";
import "@fontsource/inter/400.css";
import styles from "./App.module.css";
import { TodoList, Celebration } from "@/components";
import { useIsReady, useMoodState, useStoredItems } from "@/hooks";

function App() {
  const { items, setItems } = useStoredItems();
  const { mood, backgroundClass } = useMoodState(items, styles);
  const isReady = useIsReady();

  if (!isReady) {
    return <></>;
  }

  return (
    <>
      <div className={`${styles["background"]} ${backgroundClass}`}>
        <div className={styles["container"]}>
          <TodoList items={items} setItems={setItems} />
        </div>
      </div>
      <Celebration mood={mood} />
    </>
  );
}

export default App;
