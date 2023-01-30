import React from "react";
import { Row, Col, Card } from "antd";
import AuthForm from "../components/auth/AuthForm";

const Auth = () => {
  return (
    <Row>
      <Col span={12}></Col>
      <Col
        span={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card>
          <AuthForm />
        </Card>
      </Col>
    </Row>
  );
};

export default Auth;
