import React, { useState } from "react";
import {
  Table,
  Typography,
  Image,
  Row,
  Col,
  Button,
  Divider,
  Modal,
  Input,
  Form,
} from "antd";
import PopUp from "../table/PopUp";
import {
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ShoppingCartForm from "./ShoppingCartForm";

const ShoppingCartTable = ({
  buyProducts,
  dataSource,
  stateTotal,
  menuContext,
  stateRecord,
  onRow,
  editShoppeCart,
  setStateOpenModal,
  stateOpenModal,
  deleteShoppeCart,
}: any) => {
  const columns = [
    {
      title: "Producto",
      dataIndex: "product",
      key: "product",
      render: (text: any, record: any) => (
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


  return (
    <>
      <Table
        pagination={false}
        size="small"
        dataSource={dataSource}
        columns={columns}
        onRow={(record: any) => onRow(record)}
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

      <PopUp
        {...menuContext.popup}
        options={[
          {
            click: () => {
              setStateOpenModal({
                vidible: true,
                title: `Editar la categoria ${stateRecord.name}, talla ${stateRecord.size}, color ${stateRecord.color}`,
              });
            },
            title: "Editar",
            icon: <EditOutlined />,
            permissions: true,
            color: "#4096FF",
          },

          {
            click: deleteShoppeCart,
            title: "Eliminar",
            icon: <DeleteOutlined />,
            permissions: true,
            color: "red",
          },
        ]}
      />

      <Modal
        open={stateOpenModal.vidible}
        title={stateOpenModal.title}
        closable
        onCancel={() => {
          setStateOpenModal({
            vidible: false,
            title: "",
          });
        }}
        footer=""
        destroyOnClose={true}
      >
        <ShoppingCartForm
          stateRecord={stateRecord}
          editShoppeCart={editShoppeCart}
        />
      </Modal>
    </>
  );
};

export default ShoppingCartTable;
