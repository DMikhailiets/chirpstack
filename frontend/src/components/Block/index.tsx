
import React from "react";
import classNames from "classnames";

import "./block.scss";

const Block = (props: any) => (
  <div className={classNames("block", props.className)}>{props.children}</div>
);

export default Block;