import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./hovered-list.module.scss";
import Snackbar from "../snackbar/snackbar";

const cx = classNames.bind(styles);

const HoveredList = ({ hovered }) => (
  <div className={cx("wrapper")}>
    <h2>Hovered squares</h2>
    <div className={cx("container")}>
      {hovered.map((el) => {
        const text = `row ${el.row} col ${el.col}`;
        return <Snackbar key={text} text={text} />; //text here is used as key as there are not two snackbars with the same text
      })}
    </div>
  </div>
);

HoveredList.propTypes = {
  hovered: PropTypes.arrayOf(
    PropTypes.shape({
      col: PropTypes.number,
      row: PropTypes.number,
    })
  ),
};

HoveredList.defaultProps = {
  hovered: null,
};

export default HoveredList;
