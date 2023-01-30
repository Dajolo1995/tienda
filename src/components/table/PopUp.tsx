import React from "react";
import { Row, Col } from "antd";

interface PropsBudgetClientTableContextMenu {
  record: any;
  visible: boolean;
  x: number;
  y: number;
  options: any;
}

const PopUp = ({
  record,
  visible,
  x,
  y,
  options,
}: PropsBudgetClientTableContextMenu) => {
  return visible ? (
    <ul className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
      <>
        {options && options.length !== 0 ? (
          <>
            {options.map((item: any) => (
              <>
                {item.permissions && (
                  <Row gutter={[8, 8]} justify="center">
                    <Col span={24}>
                      <li onClick={ async() =>  await item.click(record)}>
                        <span
                          className="material-icons"
                          style={{
                            marginRight: "0.1rem",
                            position: "relative",
                            top: "2px",
                            fontSize: "1rem",
                            color: `${item.color}`,
                          }}
                        >
                          {item.icon}
                        </span>

                        {item.title}
                      </li>
                    </Col>
                  </Row>
                )}
              </>
            ))}
          </>
        ) : null}
      </>
    </ul>
  ) : null;
};

export default PopUp;
