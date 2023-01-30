import React from "react";
import { Row, Col, Form, Typography, Input, Button } from "antd";
import clienteAxios from "../../config/ClienteAxios";
import Swal from "sweetalert2";
import { authToken, authIdiom, authUser, authRol } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();

  const onSubmitFormLogin = async (value) => {
    try {
      const res = await clienteAxios.post("/auth", value);

      authToken(res.data.token);
      authIdiom(res.data.idiom);
      authUser(res.data.user);
      authRol(res.data.rol)

      Swal.fire({
        title: "Bienvenido",
        icon: "success",
      });

      navigate("/home");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Ooops!!",
        text: error.response.data.msg,
      });
    }
  };

  return (
    <Form onFinish={onSubmitFormLogin}>
      <Row>
        <Col span={24}>
          <Typography.Text>Email</Typography.Text>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Ingrese el correo electronico",
              },
            ]}
          >
            <Input
              type="email"
              placeholder="Ingrese su correo"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Typography.Text>Password</Typography.Text>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Ingrese su contraseña",
              },
            ]}
          >
            <Input.Password
              type="email"
              placeholder="Ingrese su contraseña"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item>
            <Button htmlType="submit" style={{ width: "100%" }} type="primary">
              Ingresar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AuthForm;
