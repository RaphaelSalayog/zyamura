import { Button, Divider, Input, InputNumber, Modal, Row } from "antd";
import CustomModal from "../CustomModal";
import {
  addCommas,
  generateUniqueId,
  onKeyDownTypeNumber,
} from "@/components/util/customMethods";
import { useContext, useState } from "react";
import PosModalVisibilityContext from "@/common/contexts/PosModalVisibilityContext";
import { useDispatch, useSelector } from "react-redux";
import { Transaction, addTransaction } from "@/store/reducers/transactionSlice";
import { removeOrder } from "@/store/reducers/pointOfSalesSlice";
import { deductOrderedItems } from "@/store/reducers/inventorySlice";
import moment from "moment";
import SelectedDataContext from "@/common/contexts/SelectedDataContext";

const AmountChangeModal = () => {
  const transaction = useSelector(
    (store: any) => store.transaction.transaction
  );
  const totalPrice = useSelector((store: any) => store.pointOfSales.totalPrice);
  const orderedItem = useSelector(
    (store: any) => store.pointOfSales.orderedItems
  );
  const dispatch = useDispatch();
  const { modal, receiptModal } = useContext(PosModalVisibilityContext);
  const { set } = useContext(SelectedDataContext);

  const formattedDate = {
    date: moment().format("M/D/YYYY"),
    time: moment().format("h:mm:ss A"),
  };

  const [value, setValue] = useState<number | null>(null);
  const [change, setChange] = useState(0);

  const inputHandler = (value: number | null) => {
    if (value === 0 || value) {
      setValue(value);
      const computeChange = value - totalPrice;
      setChange(computeChange);
    } else {
      setValue(null);
      setChange(0);
    }
  };

  const resetValues = () => {
    modal?.setVisible(false);
    setValue(null);
    setChange(0);
  };

  const submitHandler = () => {
    Modal.confirm({
      title: "Confirm Transaction",
      content: `Are you sure you want to confirm the transaction? This action cannot be undone.`,
      onOk: async () => {
        const transactionId = generateUniqueId(
          transaction.map((item: Transaction) =>
            item.transactionData.map((value) => value.transactionId)
          )
        );
        dispatch(
          addTransaction({
            date: formattedDate.date,
            transactionData: {
              transactionId: transactionId,
              time: formattedDate.time,
              orderedItems: orderedItem,
              totalPrice: totalPrice,
              cash: value!,
              change: change,
            },
          })
        );
        dispatch(removeOrder());
        dispatch(deductOrderedItems(orderedItem));
        set(transactionId);
        resetValues();
        receiptModal?.setVisible(true);
      },
      centered: true,
    });
  };
  return (
    <>
      <CustomModal
        title={"Change Calculator"}
        open={modal?.visible}
        width={500}
        onClose={() => {
          modal?.setVisible(false);
        }}
        centered={"centered"}
      >
        <Row
          justify={"space-between"}
          style={{ height: "32px", alignItems: "center" }}
        >
          <h3>Total Amount Due</h3>
          <Input
            addonBefore="₱"
            style={{ width: "35%" }}
            value={addCommas(totalPrice)}
            readOnly
          />
        </Row>
        <Divider style={{ margin: "1rem 0" }} />
        <Row
          justify={"space-between"}
          style={{ alignItems: "center", marginBottom: "0.5rem" }}
        >
          <p>Payment</p>
          <InputNumber
            type="number"
            addonBefore="₱"
            min={0}
            precision={2}
            placeholder="0.00"
            style={{ width: "35%" }}
            onKeyDown={(event) => onKeyDownTypeNumber(event, "price")}
            onChange={inputHandler}
            value={value}
          />
        </Row>
        <Row
          justify={"space-between"}
          style={{
            height: "32px",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <p>Change</p>
          <Input
            addonBefore="₱"
            style={{ width: "35%" }}
            value={addCommas(change)}
            status={
              value
                ? value < totalPrice
                  ? "error"
                  : ""
                : value === 0
                ? "error"
                : ""
            }
            readOnly
          />
        </Row>
        <Row justify={"space-between"}>
          <Button
            type="default"
            style={{ width: "30%" }}
            onClick={() => {
              modal?.setVisible(false);
              setValue(null);
              setChange(0);
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            style={{ width: "65%" }}
            onClick={submitHandler}
            disabled={value ? (value < totalPrice ? true : false) : true}
          >
            Proceed
          </Button>
        </Row>
      </CustomModal>
    </>
  );
};
export default AmountChangeModal;
