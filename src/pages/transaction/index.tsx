import GenerateReceipt from "@/components/util/GenerateReceipt";
import { Button } from "antd";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

const Transaction = () => {
  const transaction = useSelector(
    (store: any) => store.transaction.transaction
  );
  const componentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef(null);
  const printHandler = useReactToPrint({
    content: () => componentRef.current as HTMLDivElement,
  });
  return (
    <>
      TRANSACTION
      {/* <div style={{ display: "none" }}> */}
      <GenerateReceipt ref={componentRef} />
      {/* </div> */}
      <Button onClick={printHandler} ref={buttonRef}>
        Print
      </Button>
    </>
  );
};

export default Transaction;
