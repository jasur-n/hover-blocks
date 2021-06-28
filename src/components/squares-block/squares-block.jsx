import React, { useEffect, useState, useRef } from "react";
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

const SquaresBlock = ({ fields }) => {
  const [ids, setIds] = useState(null);
  const squaresContainerRef = useRef(null);

  useEffect(() => {
    createSquareMatrix(fields).then((matrix) => setIds(matrix));
  }, [fields]);

  const handleHover = (event) => {
    console.log(event);
    console.log("hover");
  };

  useEffect(() => {
    const squaresContainer = squaresContainerRef.current;
    console.log(squaresContainer);
    if (squaresContainer) {
      squaresContainer.addEventListener("hover", (event) => console.log(event));
    }
    return () => {
      squaresContainer.removeEventListener("hover", handleHover);
    };
  }, []);
  return (
    ids && (
      <div ref={squaresContainerRef} className={cx("wrapper")}>
        {ids.map((row, rowIndex) => (
          <div className={cx("row")} key={rowIndex}>
            {row.map((id, index) => (
              <Square
                key={id}
                position={{ row: rowIndex + 1, col: index + 1 }}
              />
            ))}
          </div>
        ))}
      </div>
    )
  );
};

SquaresBlock.propTypes = {};

SquaresBlock.defaultProps = {};

export default SquaresBlock;
