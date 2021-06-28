import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./square.module.scss";

const cx = classNames.bind(styles);

const Square = () => <div className={cx("wrapper")}></div>;

Square.propTypes = {};

Square.defaultProps = {};

export default Square;
