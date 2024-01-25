import { Row } from "antd";
import { addCommas } from "./customMethods";
import { useSelector } from "react-redux";
import { useContext, useMemo } from "react";
import SelectedDataContext from "@/common/contexts/SelectedDataContext";
import { addTransaction } from "@/store/reducers/transactionSlice";
import moment from "moment";
import { inventoryInitialState } from "@/store/reducers/inventorySlice";

const pdfDivider =
  "---------------------------------------------------------------------------------------------------------------------";
const modalDivider =
  "-----------------------------------------------------------------------------------------------------------";

const ReceiptFormat = ({ type }: { type?: string }) => {
  const inventory = useSelector((store: any) => store.inventory.inventory);
  const transaction = useSelector(
    (store: any) => store.transaction.transaction
  );
  const { get } = useContext(SelectedDataContext);

  const transactionData: addTransaction = useMemo(() => {
    return transaction.find(
      (item: addTransaction) => item.transactionId === get
    );
  }, [get, transaction]);

  const dateObject = moment(
    transactionData?.transactionDate,
    "MMMM DD YYYY, h:mm a"
  );
  const date = {
    date: dateObject.format("M/D/YYYY"),
    time: dateObject.format("h:mm a"),
  };

  return (
    <>
      <Row
        style={
          type === "modal"
            ? { width: "600px", padding: "0", margin: "0" }
            : { width: "857px", padding: "5rem" }
        }
      >
        <Row
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0.5rem 0",
          }}
        >
          <h2>Zyamura Mix Pet Shop</h2>
          <p>Barangay Mulawin Francisco Homes 1,</p>
          <p>San Jose del Monte Bulacan, 3023</p>
          <p>(+63) 960 227 1361</p>
        </Row>
        <Row>{type === "modal" ? modalDivider : pdfDivider}</Row>
        <Row justify={"center"} style={{ width: "100%" }}>
          <p style={{ fontWeight: "bold" }}>SALES INVOICE</p>
        </Row>
        <Row>{type === "modal" ? modalDivider : pdfDivider}</Row>
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "start",
            width: "100%",
            padding: "0.5rem 1.5rem",
          }}
        >
          <Row justify={"space-between"} style={{ width: "100%" }}>
            <p>Date : {date?.date}</p>
            <p>Time: {date?.time}</p>
          </Row>
          <p>Sales Clerk: Raphael Salayog</p>
          <p>Invoice No. : {transactionData?.transactionId}</p>
        </Row>
        <Row>{type === "modal" ? modalDivider : pdfDivider}</Row>
        <Row style={{ padding: "0.5rem 1.5rem" }}>
          <Row
            style={{
              display: "grid",
              gridTemplateColumns: "2.7fr 0.5fr 0.8fr 1fr",
              width: "100%",
              marginBottom: "0.4rem",
            }}
          >
            <p style={{ fontWeight: "bold" }}>Product Name</p>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>Quantity</p>
            <p style={{ textAlign: "end", fontWeight: "bold" }}>Unit Cost</p>
            <p style={{ textAlign: "end", fontWeight: "bold" }}>
              Total Unit Cost
            </p>
          </Row>
          {transactionData?.orderedItems?.map((orderedData) => {
            const inventoryData: inventoryInitialState = inventory?.find(
              (value: inventoryInitialState) =>
                value.inventoryId == orderedData.productId
            );
            return (
              <>
                <Row
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2.7fr 0.5fr 0.8fr 1fr",
                    width: "100%",
                  }}
                >
                  <p>{inventoryData.inventoryName}</p>
                  <p style={{ textAlign: "center" }}>{orderedData?.quantity}</p>
                  <p style={{ textAlign: "end" }}>{orderedData?.price}</p>
                  <p style={{ textAlign: "end" }}>
                    {orderedData?.totalItemPrice}
                  </p>
                </Row>
              </>
            );
          })}
        </Row>
        <Row>{type === "modal" ? modalDivider : pdfDivider}</Row>
        <Row
          style={{
            padding: "0.5rem 1.5rem",
            marginBottom: "1rem",
            width: "100%",
          }}
        >
          <Row
            style={{
              display: "grid",
              gridTemplateColumns: "4fr 1fr",
              width: "100%",
            }}
          >
            <p style={{ fontWeight: "bold" }}>TOTAL</p>
            <p style={{ fontWeight: "bold", textAlign: "end" }}>
              ₱{addCommas(transactionData?.totalPrice)}
            </p>
          </Row>
          <Row
            style={{
              display: "grid",
              gridTemplateColumns: "4fr 1fr",
              width: "100%",
            }}
          >
            <p>Cash</p>
            <p style={{ textAlign: "end" }}>
              ₱{addCommas(transactionData?.cash)}
            </p>
          </Row>
          <Row
            style={{
              display: "grid",
              gridTemplateColumns: "4fr 1fr",
              width: "100%",
            }}
          >
            <p>Change</p>
            <p style={{ textAlign: "end" }}>
              ₱{addCommas(transactionData?.change)}
            </p>
          </Row>
        </Row>
        <Row justify={"center"} style={{ width: "100%" }}>
          <p style={{ fontWeight: "bold" }}>THANK YOU FOR PURCHASING!</p>
        </Row>
      </Row>
    </>
  );
};

export default ReceiptFormat;
