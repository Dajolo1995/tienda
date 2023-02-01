import {
  Form,
  Row,
  Col,
  Button,
  Typography,
  Input,
  Select,
  InputNumber,
  Upload,
} from "antd";
import clienteAxios from "../../config/ClienteAxios";
import { getAuthUser } from "../../utils/auth";

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

function ProductClientForm({ data, close, record, productsData }) {
  const talla = ["XS", "S", "M", "L", "XL", "XXL"];

  const colors = [
    "white",
    "black",
    "purple",
    "orange",
    "pink",
    "gray",
    "brown",
    "blue",
  ];

  const onFinishForm = async (value) => {
    try {
      if (record.idProducts === null || record.idProducts === undefined) {
        let variable = {
          ...value,
          userId: getAuthUser(),
          color: `${Math.random()}`,
        };
        const res = await clienteAxios.post("/details", variable);
      } else {
        let variable = {
          ...value,
          userId: getAuthUser(),
          color: `${Math.random()}`,
        };
        const res = await clienteAxios.put(`/detail/${record._id}`, variable);

        close();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      onFinish={onFinishForm}
      name="category"
      initialValues={{
        idProducts:
          record.idProducts === null || record.idProducts === undefined
            ? ""
            : record.idProducts,

        state:
          record.state === null || record.state === undefined
            ? ""
            : record.state,

        size:
          record.size === null || record.size === undefined ? "" : record.size,

        quantity:
          record.quantity === null || record.quantity === undefined
            ? ""
            : record.quantity,

        coloress:
          record.coloress === null || record.coloress === undefined
            ? ""
            : record.coloress,
      }}
    >
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Typography.Text>Nombre del producto</Typography.Text>

          <Form.Item
            name="idProducts"
            rules={[
              {
                required: true,
                message: "Ingrese el producto",
              },
            ]}
          >
            <Select size="small" placeholder="Ingrese el estado">
              {productsData.map((m) => (
                <Option value={m.name}>{m.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Typography.Text>Talla</Typography.Text>

          <Form.Item
            name="size"
            rules={[
              {
                required: true,
                message: "Ingrese una talla",
              },
            ]}
          >
            <Select size="small" placeholder="Talla">
              {talla.map((m) => (
                <Option value={m}>{m}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
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
              <Option value={"true"}>Activo</Option>
              <Option value={"false"}>Inactivo</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Typography.Text>Cantidad de producto</Typography.Text>

          <Form.Item
            name="quantity"
            rules={[
              {
                required: true,
                message: "Ingrese la cantidad del producto",
              },
            ]}
          >
            <InputNumber
              size="small"
              min={0}
              max={900000}
              style={{ width: "95%" }}
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Typography.Text>Color</Typography.Text>

          <Form.Item
            name="coloress"
            rules={[
              {
                required: true,
                message: "Ingrese el color del producto",
              },
            ]}
          >
            <Select size="small" placeholder="Color">
              {colors.map((m) => (
                <Option value={m}>{m}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Button size="small" style={{ width: "95%" }} htmlType="submit">
            Guardar
          </Button>
        </Col>
        <Col span={12}>
          <Button size="small" style={{ width: "95%" }} onClick={close}>
            Cancelar
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default ProductClientForm;
