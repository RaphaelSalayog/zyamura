import { TransactionData } from "@/store/reducers/transactionSlice";
import { EyeOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Row } from "antd";
import { addCommas, truncateString } from "../util/customMethods";
import { useContext, useMemo } from "react";
import PosModalVisibilityContext from "@/common/contexts/PosModalVisibilityContext";
import SelectedDataContext from "@/common/contexts/SelectedDataContext";

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
  const { receiptModal } = useContext(PosModalVisibilityContext);
  const { set } = useContext(SelectedDataContext);

  const name = useMemo(
    () =>
      data?.orderedItems?.map((item) => {
        return item.itemDetails.name;
      }),
    [data]
  );

  const invoiceHandler = () => {
    set(data.transactionId);
    receiptModal?.setVisible(true);
  };
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
            const randomIndex = Math.floor(Math.random() * colors.length);
            return (
              <Avatar
                src={item.itemDetails.imageUrl[0]?.thumbUrl}
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
            width: "154px",
          }}
        >
          <p>Raphael Salayog</p>
          <p style={{ color: "#bfbfbf" }}>#{data.transactionId}</p>
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
          <p>{truncateString(name.join(", "), 81)}</p>
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
          <p style={{ fontWeight: "bold", color: "#237804" }}>
            ₱{addCommas(data.totalPrice)}
          </p>
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Button type="primary" onClick={invoiceHandler}>
            Invoice
          </Button>
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
