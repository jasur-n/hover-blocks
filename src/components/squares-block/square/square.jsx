import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./square.module.scss";

const cx = classNames.bind(styles);

const Square = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseOverHandler = () => {
    setIsHovered((prevState) => !prevState);
  };
  return (
    <div
      onMouseOver={mouseOverHandler}
      className={cx("wrapper", { hovered: isHovered })}
    ></div>
  );
};

Square.propTypes = {
  position: PropTypes.string.isRequired,
  isHovered: PropTypes.bool.isRequired,
};

Square.defaultProps = {};

export default React.memo(Square);
