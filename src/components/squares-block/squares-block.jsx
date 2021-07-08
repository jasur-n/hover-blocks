import React, { useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import Square from "./square";
import styles from "./squares-block.module.scss";

const cx = classNames.bind(styles);

const createSquareMatrix = (limit) => {
  return new Promise((resolve, reject) => {
    const idsArray = [];
    let id = 100;
    for (let i = 0; i < limit; i++) {
      const row = [];
      for (let j = 0; j < limit; j++) {
        row.push(id++);
      }
      idsArray.push(row);
    }
    resolve(idsArray);
  });
};

const SquaresBlock = ({ fields, hovered, setHovered }) => {
  const [elements, setElements] = useState(null);

  useEffect(() => {
    if (fields) {
      createSquareMatrix(fields).then((matrix) => setElements(matrix));
    }
  }, [fields]);

  return (
    <div className={cx("wrapper")}>
      {elements &&
        elements.map((row, rowIndex) => (
          <div className={cx("row")} key={row[0]}>
            {row.map((id, colIndex) => {
              return (
                <Square
                  position={{ row: rowIndex + 1, col: colIndex + 1 }}
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
