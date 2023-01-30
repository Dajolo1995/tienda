import React, { useState } from "react";
import { Button } from "antd";
import styled from "@emotion/styled";

const ButtonProducts = ({ colors, stateColors, onClick }) => {
  const [statePosition, setStatePosition] = useState(10);

  return (
    <Button
      style={{
        width: "20px",
        height: "20px",
        background: `${colors}`,
        // borderRadius: "50%",
        marginRight: "7px",
        top: stateColors === colors ? `${statePosition}px` : "0px",
      }}
      onClick={() => onClick(colors)}
    ></Button>
  );
};

export default ButtonProducts;
