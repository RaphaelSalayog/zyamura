import CustomModal from "@/components/modal/CustomModal";
import { PetForm } from "@/components/forms/inventory/PetForm";
import CustomFormButton from "@/components/forms/CustomFormButton";
import { useContext, useState } from "react";
import InventoryDrawerVisiblityContext from "@/common/contexts/InventoryDrawerVisibilityContext";

const AddPetModal = () => {
  const { pet } = useContext(InventoryDrawerVisiblityContext);
  const [isCancel, setIsCancel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isLoadingHandler = (value: any) => {
    setIsLoading(value);
  };

  const handleCancel = () => {
    setIsCancel(true);
    pet?.add?.setVisible(false);
  };

  const onClose = () => {
    pet?.add?.setVisible(false);
  };
  return (
    <>
      <CustomModal
        title={"Add New Pet"}
        open={pet?.add?.visible}
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

const EditPetModal = () => {
  const { pet } = useContext(InventoryDrawerVisiblityContext);
  const [isCancel, setIsCancel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isLoadingHandler = (value: any) => {
    setIsLoading(value);
  };

  const handleCancel = () => {
    setIsCancel(true);
    pet?.edit?.setVisible(false);
  };

  const onClose = () => {
    pet?.edit?.setVisible(false);
  };
  return (
    <>
      <CustomModal
        title={"Add New Pet"}
        open={pet?.edit?.visible}
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
              text={"Update"}
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
  EditPetModal,
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
