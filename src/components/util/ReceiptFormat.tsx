import { Row } from "antd";
import { addCommas, truncateString } from "./customMethods";
import { useSelector } from "react-redux";
import { useContext, useMemo, useState } from "react";
import SelectedDataContext from "@/common/contexts/SelectedDataContext";
import { Transaction } from "@/store/reducers/transactionSlice";

const pdfDivider =
  "---------------------------------------------------------------------------------------------------------------------";
const modalDivider =
  "-----------------------------------------------------------------------------------------------------------";

const ReceiptFormat = ({ type }: { type?: string }) => {
  const transaction = useSelector(
    (store: any) => store.transaction.transaction
  );
  const { get } = useContext(SelectedDataContext);

  const [index, setIndex] = useState(0);

  const transactionData: Transaction[] = useMemo(
    () =>
      transaction?.map((item: Transaction, index: number) => {
        const data = item.transactionData.filter((value) => value._id === get);

        if (data) {
          setIndex(index);
        }
        return {
          date: item.date,
          transactionData: data,
        };
      }),
    [get, transaction]
  );

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
            <p>Date : {transactionData[index]?.date}</p>
            <p>Time: {transactionData[index]?.transactionData[0]?.time}</p>
          </Row>
          <p>Sales Clerk : Raphael Salayog</p>
          <p>Invoice No. : {transactionData[index]?.transactionData[0]?._id}</p>
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
          {transactionData[index]?.transactionData[0]?.orderedItems.map(
            (item) => (
              <Row
                key={item._id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.7fr 0.5fr 0.8fr 1fr",
                  width: "100%",
                  wordWrap: "break-word",
                }}
              >
                <p style={{ maxWidth: type === "modal" ? "280px" : "320px" }}>
                  {truncateString(
                    item.itemDetails.name,
                    type === "modal" ? 77 : 87
                  )}
                </p>
                <p style={{ textAlign: "center" }}>{item?.quantity}</p>
                <p style={{ textAlign: "end" }}>{item?.price}</p>
                <p style={{ textAlign: "end" }}>{item?.totalItemPrice}</p>
              </Row>
            )
          )}
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
              ₱
              {addCommas(
                transactionData[index]?.transactionData[0]?.totalPrice
              )}
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
              ₱{addCommas(transactionData[index]?.transactionData[0]?.cash)}
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
              ₱{addCommas(transactionData[index]?.transactionData[0]?.change)}
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
