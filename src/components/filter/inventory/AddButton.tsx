import InventoryDrawerVisiblityContext from "@/common/contexts/InventoryDrawerVisibilityContext";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useContext } from "react";

const AddButton = () => {
  const { pet, item } = useContext(InventoryDrawerVisiblityContext);
  const items = [
    {
      key: "1",
      label: "Add New Pet",
      onClick: () => {
        pet?.add?.setVisible(true);
      },
    },
    {
      key: "2",
      label: "Add New Item",
      onClick: () => {
        item?.add?.setVisible(true);
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
    </>
  );
};

export default AddButton;
