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
    item?.edit?.setVisible(false);
  };

  const onClose = () => {
    item?.add?.setVisible(false);
    item?.edit?.setVisible(false);
  };

  return (
    <>
      <CustomModal
        title={
          item?.add?.visible
            ? "Add New Item"
            : item?.edit?.visible
            ? "Update Item Information"
            : "Item Information"
        }
        open={item?.add?.visible || item?.edit?.visible || item?.view?.visible}
        width={800}
        onClose={onClose}
      >
        <ItemForm.AddItemForm
          isCancel={isCancel}
          setIsCancel={setIsCancel}
          isLoadingHandler={isLoadingHandler}
        >
          <CustomFormButton
            text={
              item?.add?.visible
                ? "Add New Item"
                : item?.edit?.visible
                ? "Update"
                : ""
            }
            handleModalOnClose={handleCancel}
            confirmLoading={isLoading}
          />
        </ItemForm.AddItemForm>
      </CustomModal>
    </>
  );
};

export const ItemModal = { AddItemModal };
