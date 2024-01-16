import { Form, Input, InputNumber, Modal } from "antd";
import CustomModal from "../CustomModal";
import { ItemForm } from "@/components/forms/inventory/ItemForm";
import CustomFormButton from "@/components/forms/CustomFormButton";
import { useContext, useState } from "react";
import InventoryDrawerVisiblityContext from "@/common/contexts/InventoryDrawerVisibilityContext";

const AddItemModal = () => {
  const { item } = useContext(InventoryDrawerVisiblityContext);
  const [isCancel, setIsCancel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isLoadingHandler = (value: any) => {
    setIsLoading(value);
  };

  const handleCancel = () => {
    setIsCancel(true);
    item?.add?.setVisible(false);
  };

  const onClose = () => {
    item?.add?.setVisible(false);
  };

  return (
    <>
      <CustomModal
        title={"Add New Item"}
        open={item?.add?.visible}
        width={800}
        onClose={onClose}
      >
        <ItemForm.AddItemForm
          isCancel={isCancel}
          setIsCancel={setIsCancel}
          isLoadingHandler={isLoadingHandler}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CustomFormButton
              text={"Add New Item"}
              handleModalOnClose={handleCancel}
              confirmLoading={isLoading}
            />
          </div>
        </ItemForm.AddItemForm>
      </CustomModal>
    </>
  );
};

export const ItemModal = { AddItemModal };
