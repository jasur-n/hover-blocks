import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./square.module.scss";

const cx = classNames.bind(styles);

const Square = ({ setHighlightedSquares, position, isHighlighted }) => {
  const mouseOverHandler = () => {
    if (isHighlighted) {
      setHighlightedSquares((prevState) =>
        prevState.filter((el) => el !== position)
      );
    } else {
      setHighlightedSquares((prevState) => [...prevState, position]);
    }
  };

  return (
    <div
      onMouseOver={mouseOverHandler}
      className={cx("wrapper", { colored: isHighlighted })}
    ></div>
  );
};

Square.propTypes = {
  position: PropTypes.string.isRequired,
  setHighlightedSquares: PropTypes.func.isRequired,
};

Square.defaultProps = {};

export default React.memo(Square);
