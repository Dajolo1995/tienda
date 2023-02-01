import React from "react";
import {
  Form,
  Row,
  Col,
  Typography,
  Divider,
  Input,
  Select,
  Button,
} from "antd";
import Rol from "../../db/rol.json";
import country from "../../db/country.json";
import Swal from "sweetalert2";
import clienteAxios from "../../config/ClienteAxios";

const { Option } = Select;

const RegisterForm = ({ record, cancel }) => {
  const validations =
    record?._id === null || record?._id === undefined ? false : true;

  const onFinish = (value) => {
    try {
      if (validations === false) {
        if (value.password === value.recordPassword) {
          let variable = {
            ...value,
            rol: "cliente",
            state: "true",
          };
          const res = clienteAxios.post("/user", variable);

          Swal.fire({
            title: "OK!",
            text: "Usuario creado correctamente",
            icon: "success",
          });
          cancel();
        } else {
          Swal.fire({
            title: "Ooops!!",
            text: "Contraseña nos son iguales",
            icon: "error",
          });
        }
      } else {
        let variable = {
          ...value,
        };
        const res = clienteAxios.put(`/user/${record?._id}`, variable);

        Swal.fire({
          title: "OK!",
          text: "Usuario editado correctamente",
          icon: "success",
        });
        cancel();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        name:
          record?.name === null || record?.name === undefined
            ? ""
            : record?.name.toUpperCase(),

        lastName:
          record?.lastName === null || record?.lastName === undefined
            ? ""
            : record?.lastName.toUpperCase(),

        nickName:
          record?.nickName === null || record?.nickName === undefined
            ? ""
            : record?.nickName.toUpperCase(),

        phone:
          record?.phone === null || record?.phone === undefined
            ? ""
            : record?.phone,

        email:
          record?.email === null || record?.email === undefined
            ? ""
            : record?.email,
        idiom:
          record?.idiom === null || record?.idiom === undefined
            ? ""
            : record?.idiom,

        city:
          record?.city === null || record?.city === undefined
            ? ""
            : record?.city,

        country:
          record?.country === null || record?.country === undefined
            ? ""
            : record?.country,

        rol:
          record?.rol === null || record?.rol === undefined ? "" : record?.rol,

        state:
          record?.state === null || record?.state === undefined
            ? ""
            : record?.state,
      }}
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          {" "}
          <Typography.Text>Datos personales</Typography.Text>
        </Col>

        <Col span={6}>
          <Typography.Text>Nombre</Typography.Text>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Ingrese su nombre",
              },
            ]}
          >
            <Input
              style={{ width: "95%" }}
              placeholder="Ingrese su nombre"
              size="small"
              disabled={validations}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Typography.Text>Apellido</Typography.Text>

          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: "Ingrese su apellido",
              },
            ]}
          >
            <Input
              style={{ width: "95%" }}
              placeholder="Ingrese su apellido"
              size="small"
              disabled={validations}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Typography.Text>Nombre de usuario</Typography.Text>

          <Form.Item
            name="nickName"
            rules={[
              {
                required: true,
                message: "Ingrese su nombre de usuario",
              },
            ]}
          >
            <Input
              style={{ width: "95%" }}
              placeholder="Ingrese su nombre de usuario"
              size="small"
              disabled={validations}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Typography.Text>
            Telefono
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Ingrese un numero de contacto",
                },
              ]}
            >
              <Input
                style={{ width: "95%" }}
                placeholder="Ingrese un numero de contacto"
                size="small"
                disabled={validations}
              />
            </Form.Item>
          </Typography.Text>
        </Col>

        <Divider />

        <Col span={24}>
          {" "}
          <Typography.Text>Acceso</Typography.Text>
        </Col>

        <Col span={validations === true ? 24 : 8}>
          <Typography.Text>Email</Typography.Text>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Ingrese su email",
              },
            ]}
          >
            <Input
              style={{ width: "95%" }}
              placeholder="Ingrese su email"
              size="small"
              type="email"
              disabled={validations}
            />
          </Form.Item>
        </Col>

        {validations === true ? null : (
          <>
            <Col span={8}>
              <Typography.Text>Contraseña</Typography.Text>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Ingrese una contraseña valida",
                  },
                ]}
              >
                <Input.Password
                  style={{ width: "95%" }}
                  placeholder="Ingrese una contraseña valida"
                  size="small"
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Typography.Text>Confirmar contraseña</Typography.Text>
              <Form.Item
                name="recordPassword"
                rules={[
                  {
                    required: true,
                    message: "Ingrese una contraseña valida",
                  },
                ]}
              >
                <Input.Password
                  style={{ width: "95%" }}
                  placeholder="Ingrese una contraseña valida"
                  size="small"
                />
              </Form.Item>
            </Col>
          </>
        )}

        <Divider />

        <Col span={24}>
          {" "}
          <Typography.Text>Ubicación e idioma</Typography.Text>
        </Col>

        <Col span={8}>
          <Typography.Text>Pais</Typography.Text>
          <Form.Item name="country">
            <Select
              style={{ width: "95%" }}
              placeholder="Ingrese su nombre"
              size="small"
              disabled={validations}
            >
              {country.countries.map((m) => (
                <Option value={m.name_es}>{m.name_es}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Typography.Text>
            Ciudad
            <Form.Item
              name="city"
              rules={[
                {
                  required: true,
                  message: "Ingrese su nombre",
                },
              ]}
            >
              <Input
                style={{ width: "95%" }}
                placeholder="Ingrese su nombre"
                size="small"
                disabled={validations}
              />
            </Form.Item>
          </Typography.Text>
        </Col>

        <Col span={8}>
          <Typography.Text>Idioma de acceso</Typography.Text>
          <Form.Item name="idiom">
            <Select
              style={{ width: "95%" }}
              placeholder="Ingrese su nombre"
              size="small"
              disabled={validations}
            >
              <Option value={"es"}>Español</Option>{" "}
              <Option value={"en"}>Ingles</Option>
            </Select>
          </Form.Item>
        </Col>

        {record?._id === null || record?._id === undefined ? null : (
          <>
            <Divider />

            <Col span={24}>
              {" "}
              <Typography.Text>Acceso</Typography.Text>
            </Col>

            <Col span={8}>
              <Typography.Text>Rol</Typography.Text>
              <Form.Item name="rol">
                <Select
                  style={{ width: "95%" }}
                  placeholder="Ingrese su nombre"
                  size="small"
                  disabled={record?.rol === "root" ? true : false}
                >
                  {Rol.data.map((m) => (
                    <Option value={m}>{m}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Typography.Text>Estado</Typography.Text>

              <Form.Item name="state">
                <Select
                  style={{ width: "95%" }}
                  placeholder="Ingrese su nombre"
                  size="small"
                >
                  <Option value="true">Activo</Option>
                  <Option value="false">Inactivo</Option>
                </Select>
              </Form.Item>
            </Col>
          </>
        )}

        <Divider />

        <Col span={12}>
          <Button
            onClick={cancel}
            size="small"
            type="primary"
            style={{ width: "95%" }}
            danger
          >
            Cancelar
          </Button>
        </Col>
        <Col span={12}>
          <Button
            size="small"
            type="primary"
            style={{ width: "95%" }}
            htmlType="submit"
          >
            {record?._id === null || record?._id === null
              ? "Crear usuario"
              : "Editar usuario"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default RegisterForm;
