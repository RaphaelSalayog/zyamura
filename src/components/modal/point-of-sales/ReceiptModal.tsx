import PosModalVisibilityContext from "@/common/contexts/PosModalVisibilityContext";
import SelectedDataContext from "@/common/contexts/SelectedDataContext";
import CustomModal from "@/components/modal/CustomModal";
import GenerateReceipt from "@/components/util/GenerateReceipt";
import ReceiptFormat from "@/components/util/ReceiptFormat";
import { Button } from "antd";
import { useContext, useRef } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

const ReceiptModal = () => {
  const { receiptModal } = useContext(PosModalVisibilityContext);
  const { get } = useContext(SelectedDataContext);
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
      <div style={{ display: "none" }}>
        <GenerateReceipt ref={componentRef} type={"pdf"} />
      </div>
      <CustomModal
        open={receiptModal?.visible}
        width={700}
        onClose={() => {
          receiptModal?.setVisible(false);
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

export default ReceiptModal;
