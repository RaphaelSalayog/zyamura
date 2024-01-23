import { Row } from "antd";
import React, { forwardRef } from "react";
import { addCommas } from "./customMethods";

const GenerateReceipt = forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <Row
      ref={ref}
      style={{
        width: "857px",
        padding: "5rem",
      }}
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
        <p>Zyamura Mix Pet Shop</p>
        <p>Barangay Mulawin Francisco Homes 1,</p>
        <p>San Jose del Monte Bulacan, 3023</p>
        <p>(+63) 9913700299</p>
      </Row>
      <Row>
        ----------------------------------------------------------------------------------------------------------------------------------
      </Row>
      <Row justify={"center"} style={{ width: "100%" }}>
        <p>Sales Invoice</p>
      </Row>
      <Row>
        ----------------------------------------------------------------------------------------------------------------------------------
      </Row>
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
      <p>
        ----------------------------------------------------------------------------------------------------------------------------------
      </p>
      <Row style={{ padding: "0.5rem 1.5rem" }}>
        <Row
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            width: "100%",
          }}
        >
          <p>Product Name</p>
          <p style={{ textAlign: "end" }}>Quantity</p>
          <p style={{ textAlign: "end" }}>Unit Cost</p>
          <p style={{ textAlign: "end" }}>Total Unit Cost</p>
        </Row>
        <Row
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            width: "100%",
          }}
        >
          <p>Clownfish</p>
          <p style={{ textAlign: "end" }}>15</p>
          <p style={{ textAlign: "end" }}>8,455.00</p>
          <p style={{ textAlign: "end" }}>1,275.00</p>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <p>Total</p>
          <p>₱{addCommas(12312123)}</p>
        </Row>
      </Row>
      <p>
        ----------------------------------------------------------------------------------------------------------------------------------
      </p>
      <Row justify={"center"} style={{ width: "100%" }}>
        <p>Thank you for purchasing!</p>
      </Row>
    </Row>
  );
});

export default GenerateReceipt;
