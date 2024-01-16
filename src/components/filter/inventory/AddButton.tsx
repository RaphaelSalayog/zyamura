import InventoryDrawerVisiblityContext from "@/common/contexts/InventoryDrawerVisibilityContext";
import AddItemModal from "@/components/modal/inventory/AddItemModal";
import { PetModal } from "@/components/modal/inventory/PetModal";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useContext, useState } from "react";

const AddButton = () => {
  const { addPet } = useContext(InventoryDrawerVisiblityContext);
  const [openItemModal, setOpenItemModal] = useState(false);
  const items = [
    {
      key: "1",
      label: "Add New Pet",
      onClick: () => {
        addPet?.setVisible(true);
      },
    },
    {
      key: "2",
      label: "Add New Item",
      onClick: () => {
        setOpenItemModal(true);
      },
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} placement="bottom">
        <Button style={{ height: "40px", marginLeft: "10px" }}>
          <PlusOutlined /> Add Listing
        </Button>
      </Dropdown>
      <PetModal.AddPetModal />
      <AddItemModal
        openItemModal={openItemModal}
        setOpenItemModal={setOpenItemModal}
      />
    </>
  );
};

export default AddButton;
