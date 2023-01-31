import { Row, Col, Card, Drawer } from "antd";
import AuthForm from "../components/auth/AuthForm";
import AuthContent from "../components/auth/AuthContent";
import { useState } from "react";
import RegisterForm from "../components/auth/RegisterForm";

const Auth = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Row>
        <Col span={12} style={{ background: "#e6f4ff", minHeight: "100vh" }}>
          <AuthContent />
        </Col>
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
            <AuthForm openDrawer={openDrawer} />
          </Card>
        </Col>
      </Row>

      <Drawer
        onClose={closeDrawer}
        open={open}
        width={1200}
        title="Registrate"
        destroyOnClose={true}
      >
        <RegisterForm cancel={closeDrawer} record={null} />
      </Drawer>
    </>
  );
};

export default Auth;
