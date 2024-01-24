import { Row } from "antd";
import { addCommas } from "./customMethods";

const pdfDivider =
  "---------------------------------------------------------------------------------------------------------------------";
const modalDivider =
  "-----------------------------------------------------------------------------------------------------------";

const ReceiptFormat = ({ type }: { type?: string }) => {
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
          <p>(+63) 9913700299</p>
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
            <p>Date : Jan 30, 2023</p>
            <p>Time: 3:04 PM</p>
          </Row>
          <p>Sales Clerk: Pia Bonto</p>
          <p>Invoice No. : 3023285</p>
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
          <Row
            style={{
              display: "grid",
              gridTemplateColumns: "2.7fr 0.5fr 0.8fr 1fr",
              width: "100%",
            }}
          >
            <p>Clownfish</p>
            <p style={{ textAlign: "center" }}>15</p>
            <p style={{ textAlign: "end" }}>85,455.00</p>
            <p style={{ textAlign: "end" }}>1,275.00</p>
          </Row>
        </Row>
        <Row>{type === "modal" ? modalDivider : pdfDivider}</Row>
        <Row style={{ padding: "0.5rem 1.5rem", marginBottom: "1rem" }}>
          <Row
            style={{
              display: "grid",
              gridTemplateColumns: "4fr 1fr",
              width: "100%",
            }}
          >
            <p style={{ fontWeight: "bold" }}>TOTAL</p>
            <p style={{ fontWeight: "bold", textAlign: "end" }}>
              ₱{addCommas(12312123)}
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
            <p style={{ textAlign: "end" }}>₱{addCommas(12312123)}</p>
          </Row>
          <Row
            style={{
              display: "grid",
              gridTemplateColumns: "4fr 1fr",
              width: "100%",
            }}
          >
            <p>Change</p>
            <p style={{ textAlign: "end" }}>₱{addCommas(12312123)}</p>
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
