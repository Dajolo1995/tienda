import {
  Form,
  Row,
  Col,
  Button,
  Typography,
  Input,
  Select,

} from "antd";
import { getAuthUser } from "../../utils/auth";
import clienteAxios from "../../config/ClienteAxios";

const { Option } = Select;

const CategorieForm = ({ data, close, record }) => {
  const onFinishForm = async (value) => {
    try {
      if (record.name === null || record.name === undefined) {
        let variable = {
          ...value,
          userId: getAuthUser(),
        };
        const res = await clienteAxios.post("/createCategory", variable);
      } else {
        let variable = {
          ...value,
          userId: getAuthUser(),
        };
        const res = await clienteAxios.put(`/category/${record._id}`, variable);
      }

      close();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form
      onFinish={onFinishForm}
      name="category"
      initialValues={{
        name:
          record.name === null || record.name === undefined ? "" : record.name,
        state:
          record.state === null || record.state === undefined
            ? ""
            : record.state,
      }}
    >
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Typography.Text>Nombre de la categoria</Typography.Text>

          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Ingrese el nombre de la categoría ",
              },
            ]}
          >
            <Input
              size="small"
              placeholder="Ingrese el nombre de la categoria"
              style={{ width: "95%" }}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Typography.Text>Estado de la categoria</Typography.Text>

          <Form.Item
            name="state"
            rules={[
              {
                required: true,
                message: "Ingrese el estado de la categoría",
              },
            ]}
          >
            <Select size="small" placeholder="Ingrese el estado">
              <Option value={true}>Activo</Option>
              <Option value={false}>Inactivo</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Button
            size="small"
            style={{ width: "95%" }}
            htmlType="submit"
            type="primary"
          >
            Guardar
          </Button>
        </Col>
        <Col span={12}>
          <Button
            size="small"
            style={{ width: "95%" }}
            onClick={close}
            danger
            type="primary"
          >
            Cancelar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CategorieForm;
