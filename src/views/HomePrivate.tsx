import LayoutPrivate from "../components/layout/LayoutPrivate";
import { Card, Row, Col, Input, Select } from "antd";
import Content from "../components/homePrivate/Content";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import clienteAxios from "../config/ClienteAxios";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const HomePrivate = () => {
  let navigate = useNavigate();

  const [dataSource, setDataSource] = useState([] as any);

  const getProducts = async () => {
    try {
      const res = await clienteAxios.get("/product");

      setDataSource(res.data.products);

      return res.data.products;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <LayoutPrivate>
      <Row>
        <Col span={12}>
          <Input
            suffix={<SearchOutlined />}
            size="small"
            style={{ width: "95%" }}
          />
        </Col>
        <Col span={12}>
          <Select size="small" style={{ width: "95%" }}>
            <Option value="si">Si</Option>
            <Option value="no">No</Option>
          </Select>
        </Col>
      </Row>
      <br />
      <Row>
        {dataSource.map((m) => (
          <Col span={6}>
            <Card
              style={{
                width: "95%",
                marginLeft: "5px",
                padding: "5px",
                height: "100%",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/product/${m._id}`)}
            >
              <Content dataCard={m} />
            </Card>
          </Col>
        ))}
      </Row>
    </LayoutPrivate>
  );
};

export default HomePrivate;
