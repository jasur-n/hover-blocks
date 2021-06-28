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
    if (squaresContainer) {
      squaresContainer.addEventListener("hover", handleHover);
    }
    return () => {
      squaresContainer.removeEventListener("hover", handleHover);
    };
  }, [squaresContainerRef]);
  return (
    ids && (
      <div ref={squaresContainerRef} className={cx("wrapper")}>
        {ids.map((row, index) => (
          <div className={cx("row")} key={index}>
            {row.map((id) => (
              <Square key={id} />
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
