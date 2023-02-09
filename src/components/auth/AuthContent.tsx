import React from "react";
import { Carousel } from "antd";
import AuthFirst from "./AuthFirst";
import "./auth.css";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#e6f4ff",
};

const AuthContent = () => {
  return (
    <Carousel autoplay style={{ height: "100vh" }}>
      <div>
        <AuthFirst />
      </div>
      {/* <div> */}
      {/* <Todo /> */}
      {/* </div> */}
    </Carousel>
  );
};

export default AuthContent;
