import { Row, Col, Button, Image, Typography } from "antd";
import CountUp from "react-countup";

const Content = ({ dataCard }) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
        <img
          style={{ width: "100%", height: "260px" }}
          src={
            dataCard.image === null || dataCard.image === undefined
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXkNdFKq2NvmHA6aZOkynglat2SmMFvF4Ang&usqp=CAU"
              : `http://45.33.14.152:5000/rest/get-resource/ckuik3joa42823vswq3mi50l9s/ckumy18z011933sfwq1cdxgko4/${dataCard.name}/${dataCard.image}/`
          }
        />
      </Col>

      <Col span={24}>
        <Typography.Text style={{ fontSize: "1.5rem", fontWeight: "500" }}>
          {dataCard.name.toUpperCase()}
        </Typography.Text>
      </Col>

      <Col span={24}>
        <Typography.Text style={{ fontSize: "1rem", fontWeight: "500" }}>
          {dataCard.description.toUpperCase()}
        </Typography.Text>
      </Col>

      <Col span={24}>
        <Typography.Text style={{ fontSize: "1rem", fontWeight: "500" }}>
          $ {dataCard.price}
        </Typography.Text>
      </Col>
    </Row>
  );
};

export default Content;
