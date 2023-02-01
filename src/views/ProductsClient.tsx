import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Image,
  Typography,
  Button,
  InputNumber,
  notification,
} from "antd";
import LayoutPrivate from "../components/layout/LayoutPrivate";
import { useParams } from "react-router-dom";
import ButtonProducts from "../components/productClient/ButtonProducts";
import { setShoppingCart, getShoppingCart } from "../utils/shoppingCart";
import Swal from "sweetalert2";
import clienteAxios from "../config/ClienteAxios";

const ProductsClient = () => {
  const id = useParams();

  const [stateDataProducts, setDataProducts] = useState({} as any);
  const [dataSource, setDataSource] = useState([] as any);
  const [validations, setValidations] = useState(false);

  const getDataClient = async () => {
    try {
      const res = await clienteAxios.get(`/product/${id.id}`);

      setDataProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const detailsProduct = async () => {
    try {
      let variable = {
        idProducts: stateDataProducts.name,
      };

      const res = await clienteAxios.post("/detail", variable);

      setDataSource(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      stateDataProducts.name === undefined ||
      stateDataProducts.name === null
    ) {
      getDataClient();
    } else {
      detailsProduct();
    }
  }, [stateDataProducts]);

  const [stateColors, setStateColors] = useState(`${dataSource[0]?.color}`);
  const [stateSize, setStateSize] = useState([] as any);
  const [stateDetailSale, setStateDetailSale] = useState({
    amount: 1,
    size: "",
  } as any);

  let colors: String[] = [];

  dataSource.forEach((f) => {
    if (f.quantity > 0) {
      colors.push(f.coloress);
    }
  });

  let resultColors = colors.filter((item, index) => {
    return colors.indexOf(item) === index;
  });

  const openNotification = () => {
    notification.open({
      message: "RECUERDE",
      description: "Seleccionar la talla para poder añadir al carrito.",
      onClick: () => {},
    });
  };

  const onClickColor = (value: string) => {
    setStateColors(value);

    setStateDetailSale({
      amount: 1,
      size: "",
    });
  };

  useEffect(() => {
    getSize(stateColors);
    openNotification();
  }, [stateColors]);

  const getSize = (stateColors: string) => {
    let productsSize: any = [];

    dataSource.forEach((f) => {
      if (f.quantity > 0 && f.coloress === stateColors) {
        productsSize.push(f.size);
      }
    });

    setStateSize(productsSize);
  };

  const shoppingCart = () => {
    const filterId = dataSource.filter(
      (f) => f.coloress === stateColors && f.size === stateDetailSale.size
    )[0];

    let variable = {
      idProduct: id.id,
      name: stateDataProducts.name,
      amount: parseInt(stateDetailSale.amount),
      size: stateDetailSale.size,
      price: parseInt(stateDataProducts.price),
      product: stateDataProducts.image,
      color: stateColors,
      _id: filterId._id,
      id: `${Math.random()}`,
    };

    const dataStorage = getShoppingCart() ?? [];

    const data = [...dataStorage, variable];

    Swal.fire({
      title: "Desea añadir el producto al carrito de compra?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setShoppingCart(data);
        Swal.fire("Producto añadido!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No se guardo el producto", "", "info");
      }
    });
  };

  return (
    <LayoutPrivate>
      <Row style={{ height: "70%" }}>
        <Col span={12} style={{ padding: "10px" }}>
          <Image
            src={
              stateDataProducts.image === null ||
              stateDataProducts.image === undefined
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXkNdFKq2NvmHA6aZOkynglat2SmMFvF4Ang&usqp=CAU"
                : `http://45.33.14.152:5000/rest/get-resource/ckuik3joa42823vswq3mi50l9s/ckumy18z011933sfwq1cdxgko4/${stateDataProducts.name}/${stateDataProducts.image}/`
            }
          />
        </Col>
        <Col span={6} style={{ padding: "10px" }}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Typography.Text style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {stateDataProducts?.name?.toUpperCase()}
              </Typography.Text>
            </Col>

            <Col span={24}>
              <Typography.Text style={{ fontSize: "1.2rem" }}>
                {stateDataProducts?.description?.toUpperCase()}
              </Typography.Text>
            </Col>

            <Col span={24}>
              {resultColors.map((m) => (
                <ButtonProducts
                  onClick={onClickColor}
                  colors={m}
                  stateColors={stateColors}
                />
              ))}
            </Col>

            <br />

            <Col span={24} style={{ marginTop: "15px" }}>
              {stateSize.map((m) => (
                <Button
                  style={{
                    fontSize: "1rem",
                    marginRight: "3px",
                    width: "60px",
                    height: "40px",
                    marginBottom: "5px",
                    background:
                      stateDetailSale.size === m ? "#3690f8" : stateColors,

                    color:
                      stateColors === "white" || stateColors === "#fff"
                        ? "#000"
                        : stateDetailSale.size === m
                        ? "#fff"
                        : "#fff",
                    fontWeight: "600",
                  }}
                  onClick={() => {
                    setStateDetailSale({
                      ...stateDetailSale,
                      size: m,
                    });
                  }}
                >
                  {m.toUpperCase()}
                </Button>
              ))}
            </Col>

            <Col span={24}>
              <InputNumber
                size="small"
                min={1}
                max={3}
                defaultValue={1}
                onChange={(e) => {
                  setStateDetailSale({
                    ...stateDetailSale,
                    amount: `${e}`,
                  });
                }}
              />
            </Col>

            <Col span={24}>
              <Button
                style={{
                  background: "#180222",
                  color: "#fff",
                  width: "100%",
                }}
                disabled={stateDetailSale.size === "" ? true : false}
                onClick={shoppingCart}
              >
                Añadir al carrito
              </Button>
            </Col>
          </Row>
        </Col>

        <Col span={6} style={{ padding: "10px" }}>
          ll
        </Col>
      </Row>
    </LayoutPrivate>
  );
};

export default ProductsClient;
