import styles from "./Header.module.css";
import { MdOutlineNoteAlt } from "react-icons/md";
import { IHeader } from "@/interfaces";

export const Header = ({ showIcon = true, title }: IHeader) => {
  return (
    <header className={styles["header"]} aria-labelledby="header-title">
      <h1 id="header-title" className={styles["header-title"]}>
        {title}
      </h1>
      {showIcon && (
        <MdOutlineNoteAlt
          className={styles["header-icon"]}
          aria-hidden="true"
          focusable="false"
          data-testid="header-icon"
        />
      )}
    </header>
  );
};
