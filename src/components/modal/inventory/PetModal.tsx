import CustomModal from "@/components/modal/CustomModal";
import { PetForm } from "@/components/forms/inventory/PetForm";
import CustomFormButton from "@/components/forms/CustomFormButton";
import { useContext, useState } from "react";
import InventoryDrawerVisiblityContext from "@/common/contexts/InventoryDrawerVisibilityContext";

interface AddPetModal {}

const AddPetModal: React.FC<AddPetModal> = () => {
  const { addPet } = useContext(InventoryDrawerVisiblityContext);
  const [isCancel, setIsCancel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isLoadingHandler = (value: any) => {
    setIsLoading(value);
  };

  const handleCancel = () => {
    setIsCancel(true);
    addPet?.setVisible(false);
  };

  const onClose = () => {
    addPet?.setVisible(false);
  };
  return (
    <>
      <CustomModal
        title={"Add New Pet"}
        open={addPet?.visible}
        width={800}
        onClose={onClose}
      >
        <PetForm.AddPetForm
          isCancel={isCancel}
          setIsCancel={setIsCancel}
          isLoadingHandler={isLoadingHandler}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CustomFormButton
              text={"Add New Pet"}
              handleModalOnClose={handleCancel}
              confirmLoading={isLoading}
            />
          </div>
        </PetForm.AddPetForm>
      </CustomModal>
    </>
  );
};

export const PetModal = {
  AddPetModal,
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
