import { Table, Input, Typography, Row, Col, Divider, Badge } from "antd";

import LayoutPrivate from "../../components/layout/LayoutPrivate";

import PopUp from "../../components/table/PopUp";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";

const UserContent = ({
  onRow,
  setStateInput,
  dataSource,
  setStateOpenModal,
  stateRecord,
  menuContext,
}: any) => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (text: any, record: any) => (
        <Typography.Text>
          {text} {record.lastName}
        </Typography.Text>
      ),
    },
    {
      title: "Nombre de usuario",
      dataIndex: "nickName",
      key: "nickName",
    },
    {
      title: "Rol",
      dataIndex: "rol",
      key: "rol",
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Celular",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Pais",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Ciudad",
      dataIndex: "city",
      key: "city",
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

  return (
    <LayoutPrivate>
      <Row>
        <Col span={12}>
          <Input
            suffix={<SearchOutlined />}
            size="small"
            onChange={(e) => {
              setStateInput(e.target.value);
            }}
            placeholder="Buscar"
            style={{width:"95%"}}
          />
        </Col>
      </Row>

      <Divider />

      <Table
        onRow={(record: any) => onRow(record)}
        size="small"
        columns={columns}
        dataSource={dataSource}
      />

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

export default UserContent;
