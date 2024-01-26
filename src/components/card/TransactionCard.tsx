import { inventoryInitialState } from "@/store/reducers/inventorySlice";
import { TransactionData } from "@/store/reducers/transactionSlice";
import { EyeOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { addCommas, truncateString } from "../util/customMethods";
import { useMemo } from "react";

const colors = [
  "#f5222d",
  "#fa541c",
  "#fa8c16",
  "#faad14",
  "#fadb14",
  "#a0d911",
  "#52c41a",
  "#13c2c2",
  "#1677ff",
  "#2f54eb",
  "#722ed1",
  "#eb2f96",
];
const TransactionCard = ({ data }: { data: TransactionData }) => {
  const inventoryData: inventoryInitialState[] = useSelector(
    (store: any) => store.inventory.inventory
  );

  const inventoryName = useMemo(
    () =>
      data?.orderedItems?.map((item) => {
        const data = inventoryData?.filter(
          (value) => item.productId === value.inventoryId && value.inventoryName
        );
        return data[0].inventoryName;
      }),
    [data, inventoryData]
  );

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
          {data.orderedItems.map((item) => {
            const inventory = inventoryData.filter(
              (value) => item.productId === value.inventoryId
            );
            const randomIndex = Math.floor(Math.random() * colors.length);
            return (
              <Avatar
                src={inventory[0]?.inventoryImage[0]?.thumbUrl}
                style={{ backgroundColor: colors[randomIndex] }}
              />
            );
          })}
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
          <p>{data.time}</p>
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
          <p>{data.transactionId}</p>
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            width: "300px",
            wordWrap: "break-word",
          }}
        >
          <p>{truncateString(inventoryName.join(", "), 81)}</p>
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
          <p>₱{addCommas(data.totalPrice)}</p>
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
