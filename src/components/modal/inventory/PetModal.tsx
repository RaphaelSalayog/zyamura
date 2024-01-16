import CustomModal from "@/components/modal/CustomModal";
import { PetForm } from "@/components/forms/inventory/PetForm";
import CustomFormButton from "@/components/forms/CustomFormButton";
import { useState } from "react";

interface AddPetModal {
  openPetModal: boolean;
  setOpenPetModal: (boolean: boolean) => void;
}

const AddPetModal: React.FC<AddPetModal> = ({
  openPetModal,
  setOpenPetModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleCancel = () => {
    setOpenPetModal(false);
  };

  const isLoadingHandler = (value: any) => {
    setIsLoading(value);
  };
  return (
    <>
      <CustomModal
        title={"Add New Pet"}
        open={openPetModal}
        width={800}
        onClose={handleCancel}
      >
        <PetForm.AddPetForm
          setOpenPetModal={setOpenPetModal}
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
