import { Row, Col, Button, Badge, Dropdown, Space } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { getShoppingCart } from "../../utils/shoppingCart";
import { useNavigate } from "react-router-dom";
import { getAuthUser, authIdiom } from "../../utils/auth";
import type { MenuProps } from "antd";
import { removeLocalStorage } from "../../utils/auth";
import { useTranslation } from "react-i18next";

const ButtonName = styled(Button)`
  width: 95%;
  background: #f9f9f9;
  border: none;
  box-shadow: 0, 0, 0, #f9f9f9;
  :hover {
    background: #f9f9f9 !important;
    border: none;
  }
  :focus {
    background: #f9f9f9 !important;
    border: none;
  }
`;

const Head = () => {
  const { t } = useTranslation();
  const shoppingCart = getShoppingCart();

  const navigate = useNavigate();

  const exit = () => {
    removeLocalStorage();

    setTimeout(async () => {
     await navigate("/");
    }, 2000);
  };

  const changeIdiom = (value) => {
    authIdiom(value);
    location.reload();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={() => changeIdiom("en")}>En</a>,
    },
    {
      key: "2",
      label: <a onClick={() => changeIdiom("es")}>Es</a>,
    },
    {
      key: "3",
      label: <a onClick={exit}>{t("exit")}</a>,
    },
  ];

  return (
    <Row>
      <Col span={16}></Col>
      <Col span={6}>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {getAuthUser()}
              <UserOutlined />
            </Space>
          </a>
        </Dropdown>
      </Col>

      <Col span={2}>
        <Badge
          count={
            shoppingCart === null || shoppingCart === undefined
              ? 0
              : shoppingCart.length
          }
        >
          <Button
            onClick={() => navigate("/shopping/cart")}
            style={{ fontSize: "1rem", background: "#f9f9f9" }}
          >
            <ShoppingCartOutlined />
          </Button>
        </Badge>
      </Col>
    </Row>
  );
};

export default Head;
