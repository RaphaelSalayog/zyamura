import { Input, InputNumber, Modal, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import DropdownMenu from "@/components/util/DropdownMenu";
import ImageUploader from "@/components/util/ImageUploader";
import style from "@/styles/addPet.module.css";

interface AddPetModal {
  openPetModal: boolean;
  setOpenPetModal: (boolean: boolean) => void;
}

const petSupplier = [
  {
    key: "1",
    label: "JXC Corporation",
  },
  {
    key: "2",
    label: "QC Corporation",
  },
];

const petCategory = [
  {
    key: "1",
    label: "Dog",
  },
  {
    key: "2",
    label: "Cat",
  },
];

const petGender = [
  {
    key: "1",
    label: "Male",
  },
  {
    key: "2",
    label: "Female",
  },
];

const AddPetModal: React.FC<AddPetModal> = ({
  openPetModal,
  setOpenPetModal,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (openPetModal) {
      setOpenPetModal(true);
    }
  }, [openPetModal]);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenPetModal(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenPetModal(false);
  };

  //Radio Button
  const [value, setValue] = useState(1);

  const onChange = (e: any) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <>
      <Modal
        title="Add New Pet"
        open={openPetModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
        okText="Add New Pet"
      >
        {/* ADD FORM HERE */}
        <div className={style.modalContent}>
          <div>
            <p>Pet Name</p>
            <Input allowClear />
          </div>
          <div>
            <p>Supplier</p>
            <DropdownMenu
              type="category"
              items={petSupplier}
              trigger="click"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <p>Pet Description</p>
            <TextArea allowClear autoSize={{ minRows: 3, maxRows: 7 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "23%" }}>
              <p>Selling Price</p>
              <InputNumber
                addonBefore="₱"
                min={1}
                precision={2}
                defaultValue={3}
                onChange={() => {}}
              />
            </div>
            <div style={{ width: "23%" }}>
              <p>Investment Cost</p>
              <InputNumber
                addonBefore="₱"
                min={1}
                precision={2}
                defaultValue={3}
                onChange={() => {}}
              />
            </div>
            <div style={{ width: "23%" }}>
              <p>Category</p>
              <DropdownMenu
                type="category"
                items={petCategory}
                trigger="click"
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ width: "23%" }}>
              <p>Gender</p>
              <DropdownMenu
                type="category"
                items={petGender}
                trigger="click"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div>
            <p>Type</p>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Unique</Radio>
              <Radio value={2}>Group</Radio>
            </Radio.Group>
          </div>
          <div>
            <p>Picture</p>
            <ImageUploader />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddPetModal;

// onKeyPress={(event) => {
//   if (
//     !/[0-9\b.]/.test(event.key) ||
//     (event.key === "." &&
//       event.currentTarget.value.includes("."))
//   ) {
//     event.preventDefault();
//   }
// }}
