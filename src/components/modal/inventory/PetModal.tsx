import CustomModal from "@/components/modal/CustomModal";
import { PetForm } from "@/components/forms/inventory/PetForm";
import CustomFormButton from "@/components/forms/CustomFormButton";
import { useContext, useState } from "react";
import InventoryDrawerVisiblityContext from "@/common/contexts/InventoryDrawerVisibilityContext";

const PetInformationModal = () => {
  const { pet } = useContext(InventoryDrawerVisiblityContext);
  const [isCancel, setIsCancel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isLoadingHandler = (value: any) => {
    setIsLoading(value);
  };

  const handleCancel = () => {
    setIsCancel(true);
    pet?.add?.setVisible(false);
    pet?.edit?.setVisible(false);
  };

  const onClose = () => {
    pet?.add?.setVisible(false);
    pet?.edit?.setVisible(false);
  };

  return (
    <>
      <CustomModal
        title={
          pet?.add?.visible
            ? "Add New Pet"
            : pet?.edit?.visible
            ? "Update Pet Information"
            : "Pet Information"
        }
        open={pet?.add?.visible || pet?.edit?.visible || pet?.view?.visible}
        width={800}
        onClose={onClose}
      >
        <PetForm.AddPetForm
          isCancel={isCancel}
          setIsCancel={setIsCancel}
          isLoadingHandler={isLoadingHandler}
        >
          <CustomFormButton
            text={
              pet?.add?.visible
                ? "Add New Pet"
                : pet?.edit?.visible
                ? "Update"
                : ""
            }
            handleModalOnClose={handleCancel}
            confirmLoading={isLoading}
          />
        </PetForm.AddPetForm>
      </CustomModal>
    </>
  );
};

export const PetMainModal = {
  PetInformationModal,
};

// onKeyPress={(event) => {
//   if (
//     !/[0-9\b.]/.test(event.key) ||
//     (event.key === "." &&
//       event.currentTarget.value.includes("."))
//   ) {
//     event.preventDefault();
//   }
// }}
