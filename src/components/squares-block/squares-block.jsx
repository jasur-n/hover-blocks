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
  const squaresContainerRef = useRef(null);

  useEffect(() => {
    if (fields) {
      createSquareMatrix(fields).then((matrix) => setElements(matrix));
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
            element.row !== parsedPosition.row ||
            element.col !== parsedPosition.col
        );
      });
    },
    [setHovered]
  );

  useEffect(() => {
    const squaresContainer = squaresContainerRef.current;
    if (squaresContainer && elements) {
      squaresContainer.addEventListener("mouseover", hoverHandler);
    }
    return () => {
      squaresContainer.removeEventListener("mouseover", hoverHandler);
    };
  }, [hoverHandler, elements]);

  return (
    <div ref={squaresContainerRef} className={cx("wrapper")}>
      {elements &&
        elements.map((row, rowIndex) => (
          <div className={cx("row")} key={row[0]}>
            {row.map((id, colIndex) => {
              const position = { row: rowIndex + 1, col: colIndex + 1 };
              const isHovered = hovered.find(
                (element) =>
                  element.row === position.row && element.col === position.col
              );
              return (
                <Square key={id} position={position} isHovered={!!isHovered} />
              );
            })}
          </div>
        ))}
    </div>
  );
};

SquaresBlock.propTypes = {
  fields: PropTypes.number,
  hovered: PropTypes.arrayOf(
    PropTypes.shape({
      col: PropTypes.number,
      row: PropTypes.number,
    })
  ).isRequired,
  setHovered: PropTypes.func,
};

export default SquaresBlock;
