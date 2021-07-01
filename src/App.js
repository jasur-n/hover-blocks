import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";

import SquaresBlock from "./components/squares-block/squares-block";
import SelectMode from "./components/select-mode/select-mode";
import styles from "./app.module.scss";

const cx = classNames.bind(styles);

const App = () => {
  const [modes, setModes] = useState(null);
  const [activeMode, setActiveMode] = useState("default");
  const [hovered, setHovered] = useState([]);

  //Fetch available modes from remote url and save data in state
  useEffect(() => {
    fetch("http://demo1030918.mockable.io/")
      .then((response) => response.json())
      .then((data) => setModes(data));
  }, []);

  console.log(hovered);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("left")}>
          <SelectMode
            modes={modes}
            activeMode={activeMode}
            setActiveMode={setActiveMode}
          />

          <SquaresBlock
            hovered={hovered}
            setHovered={setHovered}
            fields={modes && modes[activeMode]?.field}
          />
        </div>
        <div className={cx("right")}>
          <h2>Hover Squares</h2>
        </div>
      </div>
    </div>
  );
};

export default App;
