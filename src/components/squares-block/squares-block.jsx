import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import Square from "./square";
import styles from "./squares-block.module.scss";

const cx = classNames.bind(styles);

const SquaresBlock = ({ fields, setHighlightedSquares }) => {
  const elements = useMemo(() => {
    if (!fields) {
      return [];
    }
    let idCounter = 0;
    return Array(fields)
      .fill(0)
      .map((row) => new Array(fields).fill(1).map((el) => idCounter++));
  }, [fields]);

  return (
    <div className={cx("wrapper")}>
      {elements &&
        elements.map((row, rowIndex) => (
          <div className={cx("row")} key={row[0]}>
            {row.map((id, colIndex) => {
              return (
                <Square
                  position={`row ${rowIndex + 1} col ${colIndex + 1}`}
                  setHighlightedSquares={setHighlightedSquares}
                  key={id}
                />
              );
            })}
          </div>
        ))}
    </div>
  );
};

SquaresBlock.propTypes = {
  fields: PropTypes.number,
  hovered: PropTypes.object.isRequired,
  setHovered: PropTypes.func,
};

export default SquaresBlock;
