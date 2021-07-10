import React, { useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import Square from "./square";
import styles from "./squares-block.module.scss";

const cx = classNames.bind(styles);

const SquaresBlock = ({
  fields,
  highlightedSquares,
  setHighlightedSquares,
}) => {
  const elements = useMemo(() => {
    if (!fields) {
      return [];
    }
    let idCounter = fields * fields;
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
              const position = `row ${rowIndex + 1} col ${colIndex + 1}`;
              const isHighlighted = highlightedSquares.includes(position);
              return (
                <Square
                  position={position}
                  isHighlighted={isHighlighted}
                  setHighlightedSquares={setHighlightedSquares}
                  fields={fields}
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
  setHighlightedSquares: PropTypes.func.isRequired,
};

export default SquaresBlock;
