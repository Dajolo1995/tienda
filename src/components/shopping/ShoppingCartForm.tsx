import React from "react";
import { Row, Form, Typography, Col, InputNumber, Button } from "antd";

const ShoppingCartForm = ({ stateRecord, editShoppeCart }) => {
  return (
    <Form
      initialValues={{
        amount: stateRecord.amount,
      }}
      onFinish={editShoppeCart}
    >
      <Row>
        <Col span={24}>
          <Typography.Text>Cantidad</Typography.Text>

          <Form.Item name="amount">
            <InputNumber
              size="small"
              min={1}
              max={3}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Button size="small" type="primary" style={{ width: "95%" }} danger>
            Cancelar
          </Button>
        </Col>
        <Col span={12}>
          <Button
            htmlType="submit"
            size="small"
            type="primary"
            style={{ width: "95%" }}
          >
            Guardar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ShoppingCartForm;
