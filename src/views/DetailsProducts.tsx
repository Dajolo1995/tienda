import React, { useEffect, useState } from "react";
import LayoutPrivate from "../components/layout/LayoutPrivate";
import { Modal, Row, Col, Table, Button, Input, Badge, Select } from "antd";
import PopUp from "../components/table/PopUp";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import ProductClientForm from "../components/productClient/ProductClientForm";
import clienteAxios from "../config/ClienteAxios";

const { Option } = Select;

const DetailsProducts = () => {
  const columns = [
    {
      title: "Producto",
      dataIndex: "idProducts",
      key: "idProducts",
    },

    {
      title: "Talla",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
      render: (text: any) => (
        <>
          <Badge
            count={text}
            showZero
            style={{ fontWeight: "bold" }}
            color={
              text >= 1 && text < 10
                ? "#faad14"
                : text >= 11 && text < 20
                ? "#25C2DB"
                : text > 21
                ? "#79CAA5"
                : "red"
            }
          />
        </>
      ),
    },

    {
      title: "color",
      dataIndex: "coloress",
      key: "coloress",
      render: (text: any) => (
        <>
          <Badge
            count={text}
            showZero
            style={{ fontWeight: "bold" }}
            color={text === "white" || text === "#fff" ? "#000" : text}
          />
        </>
      ),
    },

    {
      title: "Estado",
      dataIndex: "state",
      key: "state",
      render: (text: any) => (
        <>
          {text === "true" ? (
            <Badge count="active" color="#52c41a" />
          ) : (
            <Badge count="Inactivo" color="#FF4D4F" />
          )}
        </>
      ),
    },
  ];

  const [menuContext, setMenuContext] = useState({
    popup: {
      record: [],
      visible: false,
      x: 0,
      y: 0,
    },
  });

  const [stateOpenModal, setStateOpenModal] = useState({
    vidible: false,
    title: "",
  });

  const [stateRecord, setStateRecord] = useState({});
  const [dataSource, setDataSource] = useState();
  const [productsData, setDataProducts] = useState([] as any);

  const [stateInput, setStateInput] = useState("");

  const getProducts = async () => {
    try {
      const res = await clienteAxios.get("/product");

      setDataProducts(res.data.products);
      return res.data.products;
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsDetails = async () => {
    try {
      const res = await clienteAxios.get("/details");

      setDataSource(res.data.products);
      console.log(res.data.products);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setStateRecord({});
    setStateOpenModal({
      vidible: true,
      title: "Crear Categoria",
    });
  };

  const closeModal = () => {
    getProductsDetails();
    setStateRecord({});
    setStateOpenModal({
      vidible: false,
      title: "",
    });
  };

  const onRow = (record: any) => ({
    onContextMenu: (event: any) => {
      event.preventDefault();
      if (!menuContext.popup.visible) {
        document.addEventListener(`click`, function onClickOutside() {
          setMenuContext({
            popup: { record: [], visible: false, x: 0, y: 0 },
          });
          document.removeEventListener(`click`, onClickOutside);
        });
      }
      setMenuContext({
        popup: {
          record,
          visible: true,
          x: event.clientX,
          y: event.clientY,
        },
      });

      setStateRecord(record);
    },
  });

  useEffect(() => {
    getProducts();
    getProductsDetails();
  }, []);

  return (
    <LayoutPrivate>
      <Row>
        <Col span={18}>
          <Input
            suffix={<SearchOutlined />}
            size="small"
            onChange={(e) => {
              setStateInput(e.target.value);
            }}
            placeholder="Buscar"
            style={{ width: "95%" }}
          />
        </Col>
        <Col span={6}>
          <Button size="small" onClick={openModal}>
            Crear categoria
          </Button>
        </Col>

        <Col span={24} style={{ padding: "20px" }}>
          <Table
            size="small"
            columns={columns}
            dataSource={dataSource}
            onRow={(record: any) => onRow(record)}
          />
        </Col>
      </Row>

      <Modal
        open={stateOpenModal.vidible}
        title={stateOpenModal.title}
        closable
        onCancel={closeModal}
        footer={false}
        destroyOnClose={true}
        width={900}
      >
        <ProductClientForm
          data={stateOpenModal}
          close={closeModal}
          record={stateRecord}
          productsData={productsData}
        />
      </Modal>

      <PopUp
        {...menuContext.popup}
        options={[
          {
            click: () => {
              setStateOpenModal({
                vidible: true,
                title: `Editar la categoria ${stateRecord.name}`,
              });
            },
            title: "Editar",
            icon: <EditOutlined />,
            permissions: true,
            color: "#4096FF",
          },
        ]}
      />
    </LayoutPrivate>
  );
};

export default DetailsProducts;
