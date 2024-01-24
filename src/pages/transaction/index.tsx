import CustomModal from "@/components/modal/CustomModal";
import GenerateReceipt from "@/components/util/GenerateReceipt";
import ReceiptFormat from "@/components/util/ReceiptFormat";
import { Button } from "antd";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

const Transaction = () => {
  const transaction = useSelector(
    (store: any) => store.transaction.transaction
  );
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef(null);
  const printHandler = useReactToPrint({
    content: () => componentRef.current as HTMLDivElement,
  });

  return (
    <>
      TRANSACTION
      <div style={{ display: "none" }}>
        <GenerateReceipt ref={componentRef} type={"pdf"} />
      </div>
      <Button
        onClick={() => {
          setIsVisible(true);
        }}
        ref={buttonRef}
      >
        Modal
      </Button>
      <CustomModal
        open={isVisible}
        width={700}
        onClose={() => {
          setIsVisible(false);
        }}
      >
        <ReceiptFormat type={"modal"} />
        <Button
          type="primary"
          onClick={printHandler}
          ref={buttonRef}
          style={{ width: "100%", marginTop: "2rem" }}
        >
          Print
        </Button>
      </CustomModal>
    </>
  );
};

export default Transaction;

// style={{
//   width: "857px",
//   padding: "5rem",
// }}

// { width: "600px", padding: "0", margin: "0" }
