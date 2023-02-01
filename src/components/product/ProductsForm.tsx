import {
  Form,
  Row,
  Col,
  Button,
  Typography,
  Input,
  Select,
  Divider,
  InputNumber,
  message,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useEffect, useState } from "react";
import { getTokenBack } from "../../utils/TokenTools";
import { getAuthUser } from "../../utils/auth";
import clienteAxios from "../../config/ClienteAxios";

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

const ProductsForm = ({ data, close, record }) => {
  const [form] = Form.useForm();

  const [block, setBlock] = useState(false);
  const [images, setImages] = useState([] as any);
  const [nameImage, setNameImage] = useState("");

  const beforeUpload = (file: any) => {
    const isLt2M = file.size / 20971520 / 20971520 < 2;
    if (!isLt2M) {
      message.error(`Error`);
      setBlock(true);
    } else {
      setBlock(false);
    }
    return isLt2M;
  };

  const propers = {
    name: "file",
    multiple: false,
    action:
      "http://45.33.14.152:5000" +
      `/rest/save-resource/ckuik3joa42823vswq3mi50l9s/ckumy18z011933sfwq1cdxgko4/${nameImage}/`,
    headers: {
      Authorization: `Bearer ${getTokenBack()}`,
    },
    onChange(info: any) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        const imagenes =
          info && info?.fileList && info?.fileList?.length > 0
            ? info.fileList.map((file: any) => {
                return file.response.imgname;
              })
            : [];
        setImages([...imagenes] as any);
        form.setFieldsValue({ attachment: images });
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onFinishForm = async (value) => {
    try {
      if (record.name === null || record.name === undefined) {
        let variable = {
          ...value,
          userId: getAuthUser(),
          image: images[0],
        };

        const res = await clienteAxios.post("/product", variable);
      } else {
        let variable = {
          ...value,
          userId: getAuthUser(),
          image: images[0],
        };

        const res = await clienteAxios.put(`product/${record._id}`, variable);
      }

      close();
    } catch (error) {
      console.log(error);
    }
  };

  const [dataSource, setDataSource] = useState([] as any);
  const getCategory = async () => {
    try {
      const res = await clienteAxios.get("/categoryActive");

      setDataSource(res.data);
      return res.data.categoria;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

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

        idCategory:
          record.idCategory === null || record.idCategory === undefined
            ? ""
            : record.idCategory,

        price:
          record.price === null || record.price === undefined
            ? ""
            : record.price,

        description:
          record.description === null || record.description === undefined
            ? ""
            : record.description,
      }}
    >
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Typography.Text>Estado de la categoria</Typography.Text>

          <Form.Item
            name="idCategory"
            rules={[
              {
                required: true,
                message: "Ingrese la Categoria",
              },
            ]}
          >
            <Select size="small" placeholder="Ingrese el estado">
              {dataSource.map((m) => (
                <Option value={m.name}>{m.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Typography.Text>Nombre del producto</Typography.Text>

          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Ingrese el nombre del producto",
              },
            ]}
          >
            <Input
              size="small"
              placeholder="Ingrese el nombre del producto"
              style={{ width: "95%" }}
              onChange={(value) => setNameImage(value.target.value)}
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

        <Col span={12}>
          <Typography.Text>Precio del producto</Typography.Text>

          <Form.Item
            name="price"
            rules={[
              {
                required: true,
                message: "Ingrese el estado de la categoría",
              },
            ]}
          >
            <InputNumber
              size="small"
              min={5000}
              max={900000}
              defaultValue={0}
              style={{ width: "95%" }}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Typography.Text>Descrición del producto</Typography.Text>

          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Ingrese la descricion",
              },
            ]}
          >
            <TextArea
              rows={3}
              placeholder="Ingrese la descrición"
              maxLength={100}
              showCount
            />
          </Form.Item>

          {nameImage === "" ? null : (
            <Col span={24}>
              <Typography.Text>Imagen del producto</Typography.Text>
              <Form.Item>
                <Form.Item>
                  <Dragger
                    {...propers}
                    accept=".png, .jpg"
                    style={{ height: "2vh", width: "100%" }}
                    beforeUpload={beforeUpload}
                    disabled={block}
                    listType="picture-card"
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <Typography.Text>
                      Arrastre los archivos o haga click para seleccionar y
                      subir las fotos
                    </Typography.Text>
                  </Dragger>
                </Form.Item>
              </Form.Item>
            </Col>
          )}
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
            type="primary"
            danger
          >
            Cancelar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductsForm;
