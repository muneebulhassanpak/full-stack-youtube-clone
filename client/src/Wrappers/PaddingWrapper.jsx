import React from "react";

const PaddingWrapper = (props) => {
  return <div className="px-2 lg:px-1">{props.children}</div>;
};

export default PaddingWrapper;
