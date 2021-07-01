import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";

import SquaresBlock from "./components/squares-block/squares-block";
import SelectMode from "./components/select-mode/select-mode";
import styles from "./app.module.scss";
import HoveredList from "./components/hovered-list/hovered-list";

const cx = classNames.bind(styles);

const App = () => {
  const [modes, setModes] = useState(null);
  const [activeMode, setActiveMode] = useState("default");
  const [hovered, setHovered] = useState([]);

  //Fetch available modes from remote url and save data in state
  useEffect(() => {
    Promise.race([
      fetch("https://demo1030918.mockable.io/"),
      fetch("http://demo1030918.mockable.io/"),
    ])
      .then((response) => response.json())
      .then((data) => setModes(data))
      .catch((err) => {
        console.error(new Error(err));
      });
  }, []);

  const startHandler = (mode) => {
    setHovered([]);
    setActiveMode(mode);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("left")}>
          <SelectMode
            modes={modes}
            activeMode={activeMode}
            startHandler={startHandler}
          />

          <SquaresBlock
            hovered={hovered}
            setHovered={setHovered}
            fields={modes && modes[activeMode]?.field}
          />
        </div>
        <HoveredList hovered={hovered} />
      </div>
    </div>
  );
};

export default App;
