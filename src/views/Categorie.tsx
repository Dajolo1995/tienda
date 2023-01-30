import React, { useState, useEffect } from "react";
import LayoutPrivate from "../components/layout/LayoutPrivate";
import { Modal, Row, Col, Table, Button, Input, Badge } from "antd";
import CategorieForm from "../components/categorie/CategorieForm";
import PopUp from "../components/table/PopUp";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import clienteAxios from "../config/ClienteAxios";
import { SearchOutlined } from "@ant-design/icons";

const Categorie = () => {
  const columns = [
    {
      title: "Nombre de la categoria",
      dataIndex: "name",
      key: "name",
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

  const [category, setStateCategory] = useState([] as any);
  const [dataSource, setDataSource] = useState([] as any);
  const [stateInput, setStateInput] = useState("");

  const getCategory = async () => {
    try {
      const res = await clienteAxios.get("/category");

      setStateCategory(res.data.categoria);
      return res.data.categoria;
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
    getCategory();
    setStateRecord({});
    setStateOpenModal({
      vidible: false,
      title: "",
    });
  };

  const [stateRecord, setStateRecord] = useState({});

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

  const onSearch = (value) => {
    let filters;

    let copia = [...category];
    if (value.lenght === 0) {
      filters = copia;
    } else {
      filters = copia.filter(
        (u) =>
          u.id === value || u.name.toLowerCase().includes(value.toLowerCase())
      );
    }
    setDataSource(filters);
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    setDataSource(category);
  }, [category]);

  useEffect(() => {
    onSearch(stateInput);
  }, [stateInput]);

  return (
    <LayoutPrivate>
      <Row>
        <Col span={16}>
          <Input
            suffix={<SearchOutlined />}
            size="small"
            style={{ width: "95%" }}
            onChange={(e) => {
              setStateInput(e.target.value);
            }}
          />
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "start" }}>
          <Button size="small" onClick={openModal} style={{ width: "40%" }}>
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
      >
        <CategorieForm
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

export default Categorie;
