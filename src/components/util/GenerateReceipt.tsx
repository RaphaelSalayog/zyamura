import { Row } from "antd";
import React, { forwardRef } from "react";
import ReceiptFormat from "./ReceiptFormat";

const GenerateReceipt = forwardRef<HTMLDivElement, { type?: string }>(
  ({ type }, ref) => {
    return (
      <Row ref={ref}>
        <ReceiptFormat type={type} />
      </Row>
    );
  }
);

export default GenerateReceipt;

// const GenerateReceipt = forwardRef<
//   HTMLDivElement,
//   { style?: React.CSSProperties; divider?: string }
// >(({ style, divider }, ref) => {
//   return (
//     <Row ref={ref} style={style}>
//       <ReceiptFormat style={style} divider={divider} />
//     </Row>
//   );
// });
