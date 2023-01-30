import { useEffect, useState } from "react";
import { Table, Typography, Image, Row, Col, Button, Divider } from "antd";
import { getShoppingCart, deleteShoppingCart } from "../../utils/shoppingCart";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Producto",
      dataIndex: "product",
      key: "product",
      render: (text: an, record: any) => (
        <Image
          src={`http://45.33.14.152:5000/rest/get-resource/ckuik3joa42823vswq3mi50l9s/ckumy18z011933sfwq1cdxgko4/${record.name}/${text}/`}
          style={{ width: "30px" }}
        />
      ),
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },

    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },

    {
      title: "Cantidad",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Precio Unitario",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",

      render: (text: any, record: any) => (
        <Typography.Text>
          ${parseInt(record.price) * parseInt(record.amount)}
        </Typography.Text>
      ),
    },
  ];
  const dataSource = getShoppingCart();

  const [stateTotal, setStateTotal] = useState(0);

  const totalFunction = () => {
    let total = 0;
    dataSource.forEach((f) => {
      let sum = parseInt(f.amount) * parseInt(f.price);
      total = total + sum;
    });

    setStateTotal(total);
  };

  useEffect(() => {
    totalFunction();
  }, []);

  const buyProducts = () => {
    Swal.fire({
      title: "Estas seguro que desea comprar",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteShoppingCart();
        Swal.fire("Se le generara la factura al correo!", "", "success");
        navigate("/");
      } else if (result.isDenied) {
        Swal.fire("No se ha comprado nada", "", "info");
      }
    });
  };

  return (
    <div style={{ padding: "10px" }}>
      <Table
        pagination={false}
        size="small"
        dataSource={dataSource}
        columns={columns}
      />

      <br />
      <Row gutter={[8, 8]}>
        <Col span={18}>
          <Typography.Text>Total:</Typography.Text>
        </Col>
        <Col span={6}>
          <Button
            onClick={buyProducts}
            size="small"
            style={{ width: "100%", color: "#fff", background: "#180222" }}
          >
            ${stateTotal}
          </Button>
        </Col>
      </Row>

      <Divider />


      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button danger size="small" style={{ width: "95%" }} type="primary">
            Cancelar
          </Button>
        </Col>
        <Col span={12}>
          <Button
            onClick={buyProducts}
            size="small"
            style={{ width: "95%" }}
            type="primary"
          >
            Pagar
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ShoppingCart;
