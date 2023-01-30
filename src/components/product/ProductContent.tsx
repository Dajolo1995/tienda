import React from "react";
import LayoutPrivate from "../layout/LayoutPrivate";
import { Modal, Row, Col, Table, Button, Input, Badge, Image } from "antd";

import ProductsForm from "./ProductsForm";
import PopUp from "../table/PopUp";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";

const ProductContent = ({
  dataSource,
  openModal,
  onRow,
  stateOpenModal,
  closeModal,
  stateRecord,
  menuContext,
  setStateOpenModal,
  setStateInput,
}) => {
  const columns = [
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (text: any, record: any) => (
        <Image
          src={`http://45.33.14.152:5000/rest/get-resource/ckuik3joa42823vswq3mi50l9s/ckumy18z011933sfwq1cdxgko4/${record.name}/${text}/`}
          style={{ width: "30px" }}
        />

        // <>{text}</>
      ),
    },

    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Categoria",
      dataIndex: "idCategory",
      key: "idCategory",
    },

    {
      title: "Descrición",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Estado",
      dataIndex: "state",
      key: "state",
      render: (text: any) => (
        <>
          {text === true ? (
            <Badge count="active" color="#52c41a" />
          ) : (
            <Badge count="Inactivo" color="#FF4D4F" />
          )}
        </>
      ),
    },
  ];
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
            style={{ width: "95%" }}
            placeholder="Buscar"
          />
        </Col>

        <Col span={6}>
          <Button size="small" onClick={openModal} style={{ width: "70%" }}>
            Crear producto
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
        <ProductsForm
          data={stateOpenModal}
          close={closeModal}
          record={stateRecord}
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

export default ProductContent;
