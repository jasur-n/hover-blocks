import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames/bind";

import styles from "./hovered-list.module.scss";
import Snackbar from "../snackbar/snackbar";

const cx = classNames.bind(styles);

const HoveredList = ({ hovered }) => (
  <div className={cx("wrapper")}>
    <h2>Hovered squares</h2>
    <div className={cx("container")}>
      {hovered.map((el) => (
        <Snackbar key={uuidv4()} text={`row ${el.row} col ${el.col}`} />
      ))}
    </div>
  </div>
);

HoveredList.propTypes = {};

HoveredList.defaultProps = {};

export default HoveredList;
