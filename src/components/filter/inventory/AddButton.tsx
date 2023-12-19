import AddItemModal from "@/components/modal/AddItemModal";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Modal } from "antd";
import { useState } from "react";

const AddButton = () => {
  const [open, setOpen] = useState(false);
  const items = [
    {
      key: "1",
      label: "Add New Pet",
      onClick: () => {
        setOpen(true);
        console.log("Add New Pet");
      },
    },
    {
      key: "2",
      label: "Add New Item",
      onClick: () => {
        setOpen(true);
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
      <AddItemModal open={open} setOpen={setOpen} />
    </>
  );
};

export default AddButton;
