import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./select-mode.module.scss";

const cx = classNames.bind(styles);

const SelectMode = ({ modes, activeMode, startHandler }) => {
  const [selectedMode, setSelectedMode] = useState(activeMode);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <select
          value={selectedMode}
          placeholder="Select mode"
          onChange={(event) => setSelectedMode(event.target.value)}
        >
          <option value="default" disabled>
            Pick mode
          </option>
          {modes &&
            Object.keys(modes).map((mode, index) => (
              <option value={mode} key={index}>
                {mode.toUpperCase().toLowerCase()}
              </option>
            ))}
        </select>
        <button
          disabled={selectedMode === "default"}
          onClick={() => startHandler(selectedMode)}
        >
          Start
        </button>
      </div>
    </div>
  );
};

SelectMode.propTypes = {
  modes: PropTypes.object,
  activeMode: PropTypes.string.isRequired,
  startHandler: PropTypes.func,
};

export default React.memo(SelectMode);
