import { Modal } from "antd";
import { useEffect, useState } from "react";

interface AddItemModal {
  open: boolean;
  setOpen: (boolean: boolean) => void;
}

const AddItemModal: React.FC<AddItemModal> = ({ open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setOpen(true);
    }
  }, [open]);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>qweqwe</div>
      </Modal>
    </>
  );
};

export default AddItemModal;
