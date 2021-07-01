import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./snackbar.module.scss";

const cx = classNames.bind(styles);

const Snackbar = ({ text }) => <div className={cx("wrapper")}>{text}</div>;

Snackbar.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Snackbar;
