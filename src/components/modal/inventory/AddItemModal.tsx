import { Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";

interface AddItemModal {
  openItemModal: boolean;
  setOpenItemModal: (boolean: boolean) => void;
}

const AddItemModal: React.FC<AddItemModal> = ({
  openItemModal,
  setOpenItemModal,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (openItemModal) {
      setOpenItemModal(true);
    }
  }, [openItemModal]);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenItemModal(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenItemModal(false);
  };
  return (
    <>
      <Modal
        title="Add New Pet"
        open={openItemModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
      >
        ITEM
      </Modal>
    </>
  );
};

export default AddItemModal;
