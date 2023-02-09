import LayoutPrivate from "../components/layout/LayoutPrivate";
import { Card, Row, Col, Input } from "antd";
import Content from "../components/homePrivate/Content";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import clienteAxios from "../config/ClienteAxios";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const HomePrivate = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const [dataSource, setDataSource] = useState([] as any);
  const [products, setProducts] = useState([] as any);
  const [stateInput, setStateInput] = useState("");

  const getProducts = async () => {
    try {
      const res = await clienteAxios.get("/getProductActive");

      setProducts(res.data.products);

      return res.data.products;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setDataSource(products);
  }, [products]);

  useEffect(() => {
    onSearch(stateInput);
  }, [stateInput]);

  const onSearch = (value) => {
    let filters;

    let copia = [...products];
    if (value.lenght === 0) {
      filters = copia;
    } else {
      filters = copia.filter(
        (u) =>
          u.id === value ||
          u.idCategory.toLowerCase().includes(value.toLowerCase()) ||
          u.name.toLowerCase().includes(value.toLowerCase())
      );
    }
    setDataSource(filters);
  };

  return (
    <LayoutPrivate>
      <Row>
        <Col span={12}>
          <Input
            suffix={<SearchOutlined />}
            size="small"
            style={{ width: "95%" }}
            placeholder={t("search")}
            onChange={(e) => {
              setStateInput(e.target.value);
            }}
          />
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
