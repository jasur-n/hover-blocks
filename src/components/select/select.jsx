import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./select.module.scss";

const cx = classNames.bind(styles);

const Select = ({ modes, activeMode, setActiveMode }) => {
  return (
    <div className={cx("wrapper")}>
      <select
        value={activeMode}
        placeholder="Select mode"
        onChange={(event) => setActiveMode(event.target.value)}
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
    </div>
  );
};

Select.propTypes = {};

Select.defaultProps = {};

export default Select;
