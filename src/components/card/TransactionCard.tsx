import { EyeOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Row } from "antd";

const TransactionCard = () => {
  return (
    <>
      <Row
        style={{
          width: "100% ",
          height: "120px",
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          padding: "0.7rem",
          border: "1px solid #f0f0f0",
          marginBottom: "0.5rem",
          borderRadius: "5px",
        }}
      >
        <Avatar.Group
          maxCount={2}
          maxPopoverTrigger="hover"
          shape="square"
          size={100}
          maxStyle={{
            color: "white",
            backgroundColor: "#003a8c",
            cursor: "pointer",
          }}
          style={{ width: "286px" }}
        >
          <Avatar src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" />
          <Avatar
            src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
            style={{ backgroundColor: "#f56a00" }}
          />
          <Avatar
            src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
            style={{ backgroundColor: "#87d068" }}
          />
          <Avatar
            src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
            style={{ backgroundColor: "#1677ff" }}
          />
          <Avatar
            src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
            style={{ backgroundColor: "#1677ff" }}
          />
          <Avatar
            src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
            style={{ backgroundColor: "#1677ff" }}
          />
          <Avatar
            src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
            style={{ backgroundColor: "#1677ff" }}
          />
        </Avatar.Group>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <p>WALK IN</p>
          <p>TIME</p>
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <p>Raphael Salayog</p>
          <p>#0000098</p>
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            width: "300px",
          }}
        >
          <p>Clownfish and Mermaid Mussel Acquarium Figurine</p>
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            width: "100px",
          }}
        >
          <p>P10,000,000.020</p>
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Button>Invoice</Button>
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Button>
            <EyeOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default TransactionCard;
