import React, { useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { v4 as uuidv4 } from "uuid";

import Square from "./square";
import styles from "./squares-block.module.scss";

const cx = classNames.bind(styles);

const createSquareMatrix = (limit) => {
  return new Promise((resolve, reject) => {
    const idsArray = [];
    for (let i = 0; i < limit; i++) {
      const row = [];
      for (let j = 0; j < limit; j++) {
        row.push(uuidv4());
      }
      idsArray.push(row);
    }
    resolve(idsArray);
  });
};

const SquaresBlock = ({ fields, hovered, setHovered }) => {
  const [ids, setIds] = useState(null);
  const squaresContainerRef = useRef(null);

  useEffect(() => {
    if (fields) {
      createSquareMatrix(fields).then((matrix) => setIds(matrix));
    }
  }, [fields]);

  const hoverHandler = useCallback(
    (event) => {
      const newPosition = event.target.dataset?.position;

      if (!newPosition) {
        return;
      }

      const parsedPosition = JSON.parse(newPosition);

      setHovered((prevState) => {
        const foundPosition = prevState.find(
          (element) =>
            element.row === parsedPosition.row &&
            element.col === parsedPosition.col
        );

        if (foundPosition === undefined) {
          return [...prevState, parsedPosition];
        }

        return prevState.filter(
          (element) =>
            element.row !== parsedPosition.row &&
            element.col !== parsedPosition.col
        );
      });
    },
    [setHovered]
  );

  useEffect(() => {
    const squaresContainer = squaresContainerRef.current;
    if (squaresContainer && ids) {
      squaresContainer.addEventListener("mouseover", hoverHandler);
    }
    return () => {
      squaresContainer.removeEventListener("mouseover", hoverHandler);
    };
  }, [hoverHandler, ids]);

  return (
    <div ref={squaresContainerRef} className={cx("wrapper")}>
      {ids &&
        ids.map((row, rowIndex) => (
          <div className={cx("row")} key={rowIndex}>
            {row.map((id, colIndex) => (
              <Square
                key={id}
                position={{ row: rowIndex + 1, col: colIndex + 1 }}
                hovered={hovered}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

SquaresBlock.propTypes = {};

SquaresBlock.defaultProps = {};

export default SquaresBlock;
