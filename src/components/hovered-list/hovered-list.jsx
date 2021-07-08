import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./hovered-list.module.scss";
import Snackbar from "../snackbar/snackbar";

const cx = classNames.bind(styles);

const HoveredList = ({ highlightedSquares }) => (
  <div className={cx("wrapper")}>
    <h2>Hovered squares</h2>
    <div className={cx("container")}>
      {highlightedSquares.map((el) => {
        return <Snackbar key={el} text={el} />; //position here is used as key as there are not two positions in the Set with the same coordinates
      })}
    </div>
  </div>
);

HoveredList.propTypes = {
  hovered: PropTypes.object,
};

HoveredList.defaultProps = {
  hovered: null,
};

export default HoveredList;
