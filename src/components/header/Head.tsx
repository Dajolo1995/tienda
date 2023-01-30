import { Row, Col, Typography, Button, Badge } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { getShoppingCart } from "../../utils/shoppingCart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../../utils/auth";

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
  const shoppingCart = getShoppingCart();

  const navigate = useNavigate();

  return (
    <Row>
      <Col span={16}></Col>
      <Col span={6}>
        <ButtonName size="small" type="text">
        <UserOutlined /> {getAuthUser()}
        </ButtonName>
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
