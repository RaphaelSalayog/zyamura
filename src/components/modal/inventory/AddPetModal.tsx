import { Form, Input, InputNumber, Modal, Radio } from "antd";
import { useState } from "react";
import DropdownMenu from "@/components/util/DropdownMenu";
import TextArea from "antd/es/input/TextArea";
import ImageUploader from "@/components/util/ImageUploader";

interface AddPetModal {
  openPetModal: boolean;
  setOpenPetModal: (boolean: boolean) => void;
}

const petSupplierOption = [
  {
    key: "JXC Corporation",
    label: "JXC Corporation",
  },
  {
    key: "QC Corporation",
    label: "QC Corporation",
  },
];

const petCategoryOption = [
  {
    key: "Dog",
    label: "Dog",
  },
  {
    key: "Cat",
    label: "Cat",
  },
];

const petGenderOption = [
  {
    key: "Male",
    label: "Male",
  },
  {
    key: "Female",
    label: "Female",
  },
];

const AddPetModal: React.FC<AddPetModal> = ({
  openPetModal,
  setOpenPetModal,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [petType, setPetType] = useState("Unique");
  const [petSupplier, setPetSupplier] = useState("");
  const [petCategory, setPetCategory] = useState("");
  const [petGender, setPetGender] = useState("");
  const [petImage, setPetImage] = useState([]);
  const [form] = Form.useForm();

  // <--FORMS-->
  // >>To get value from child custom component to parent
  const petSupplierHandler = (value: any) => {
    setPetSupplier(value);
  };
  const petCategoryHandler = (value: any) => {
    setPetCategory(value);
  };
  const petGenderHandler = (value: any) => {
    setPetGender(value);
  };
  const petImageHandler = (value: any) => {
    setPetImage(value);
  };

  // >>Radio Button
  const onChange = (e: any) => {
    // console.log("radio checked", e.target.value);
    setPetType(e.target.value);
  };

  //<--MODAL-->
  const resetState = () => {
    setPetType("");
    setPetSupplier("");
    setPetCategory("");
    setPetGender("");
    setPetImage([]);
  };

  const handleOk = (value: any) => {
    const data = {
      ...value,
      petQuantity: value.petType === "Unique" ? 1 : value?.petQuantity,
      petCategory: petCategory,
      petGender: petGender,
      petSupplier: petSupplier,
      petImage: petImage,
    };
    console.log("data >> ", data);
    console.log("value >> ", value);

    setConfirmLoading(true);
    setTimeout(() => {
      resetState();
      form.resetFields();
      setOpenPetModal(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    // console.log("Clicked cancel button");
    resetState();
    form.resetFields();
    setOpenPetModal(false);
  };
  return (
    <>
      <Modal
        title="Add New Pet"
        open={openPetModal}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
        okText="Add New Pet"
      >
        <Form
          form={form}
          onFinish={handleOk}
          id="addPetForm"
          // labelCol={{ span: 4 }}
          // wrapperCol={{ span: 14 }}
          layout="vertical"
        >
          <Form.Item
            name="petName"
            label="Pet Name"
            rules={[
              {
                required: true,
                message: "Please enter the pet name.",
              },
            ]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item name="petSupplier" label="Supplier">
            <DropdownMenu
              type="category"
              items={petSupplierOption}
              trigger="click"
              style={{ width: "100%" }}
              getValue={petSupplierHandler}
            />
          </Form.Item>
          <Form.Item name="petDescription" label="Pet Description">
            <TextArea allowClear autoSize={{ minRows: 3, maxRows: 7 }} />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              name="petSellingPrice"
              label="Selling Price"
              style={{ width: "23%" }}
            >
              <InputNumber
                addonBefore="₱"
                min={0}
                precision={2}
                placeholder="0.00"
              />
            </Form.Item>
            <Form.Item
              name="petInvestmentCost"
              label="Investment Cost"
              style={{ width: "23%" }}
            >
              <InputNumber
                addonBefore="₱"
                min={0}
                precision={2}
                placeholder="0.00"
              />
            </Form.Item>
            <Form.Item
              name="petCategory"
              label="Category"
              style={{ width: "23%" }}
            >
              <DropdownMenu
                type="category"
                items={petCategoryOption}
                trigger="click"
                style={{ width: "100%" }}
                getValue={petCategoryHandler}
              />
            </Form.Item>
            <Form.Item name="petGender" label="Gender" style={{ width: "23%" }}>
              <DropdownMenu
                type="category"
                items={petGenderOption}
                trigger="click"
                style={{ width: "100%" }}
                getValue={petGenderHandler}
              />
            </Form.Item>
          </div>
          <Form.Item name="petType" label="Type">
            <Radio.Group
              onChange={onChange}
              value={petType}
              defaultValue={petType}
            >
              <Radio value={"Unique"}>Unique</Radio>
              <Radio value={"Group"}>Group</Radio>
            </Radio.Group>
          </Form.Item>
          {petType === "Group" && (
            <Form.Item
              name="petQuantity"
              label="Quantity"
              style={{ width: "23%" }}
            >
              <InputNumber
                min={0}
                precision={0}
                placeholder="0"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}
          <Form.Item name="petImage" label="Image">
            <ImageUploader getValue={petImageHandler} />
          </Form.Item>
        </Form>
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
