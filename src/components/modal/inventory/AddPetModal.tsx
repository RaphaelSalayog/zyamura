import { Form, Input, InputNumber, Modal, Radio } from "antd";
import { useState } from "react";
import DropdownMenu from "@/components/util/DropdownMenu";
import TextArea from "antd/es/input/TextArea";
import ImageUploader from "@/components/util/ImageUploader";
import { addPet } from "@/store/reducers/inventorySlice";
import { useDispatch } from "react-redux";
import { capitalizeFirstLetter } from "@/components/util/customMethods";

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
  const [petType, setPetType] = useState("");
  const [petSupplier, setPetSupplier] = useState("");
  const [petCategory, setPetCategory] = useState("");
  const [petGender, setPetGender] = useState("");
  const [petImage, setPetImage] = useState([]);

  // State for validation. To change the border color of custom Dropdown component
  const [isSupplierNotValid, setIsSupplierNotValid] = useState(false);
  const [isCategoryNotValid, setIsCategoryNotValid] = useState(false);
  const [isGenderNotValid, setIsGenderNotValid] = useState(false);
  const [isImageNotValid, setIsImageNotValid] = useState(false);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // <--FORMS-->
  // >>To get value from child custom component to parent
  const petSupplierHandler = (value: any) => {
    setPetSupplier(value);
    setIsSupplierNotValid(value && false);
    form.setFieldsValue({ petSupplier: value }); // To set the value of Form.Item from custom Dropdown component
  };
  const petCategoryHandler = (value: any) => {
    setPetCategory(value);
    setIsCategoryNotValid(value && false);
    form.setFieldsValue({ petCategory: value }); // To set the value of Form.Item from custom Dropdown component
  };
  const petGenderHandler = (value: any) => {
    setPetGender(value);
    setIsGenderNotValid(value && false);
    form.setFieldsValue({ petGender: value }); // To set the value of Form.Item from custom Dropdown component
  };
  const petImageHandler = (value: any) => {
    setPetImage(value);
    setIsImageNotValid(value && false);
    form.setFieldsValue({ petImage: value }); // To set the value of Form.Item from custom Dropdown component
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

    setIsSupplierNotValid(false);
    setIsCategoryNotValid(false);
    setIsGenderNotValid(false);
    setIsImageNotValid(false);
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
    //Add data to Inventory Slice in Redux
    dispatch(addPet(data));

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

  // To change the border color of custom Dropdown component
  const onFinishFailed = (errorInfo: any) => {
    setIsSupplierNotValid(errorInfo.values.petSupplier === undefined);
    setIsCategoryNotValid(errorInfo.values.petCategory === undefined);
    setIsGenderNotValid(errorInfo.values.petGender === undefined);
    setIsImageNotValid(errorInfo.values.petImage.length === 0);
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
          layout="vertical"
          initialValues={{ petType: "Unique" }}
          onFinishFailed={onFinishFailed}
          onValuesChange={(changedValues, allValues) => {
            // To capitalize the first letter for every word
            if (changedValues && changedValues.petName) {
              form.setFieldsValue({
                ...allValues,
                petName: capitalizeFirstLetter(changedValues.petName),
              });
            }
          }}
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
          <Form.Item
            name="petSupplier"
            label="Supplier"
            rules={[
              {
                required: true,
                message: "Please enter the supplier.",
              },
            ]}
            dependencies={["petSupplier"]}
          >
            <DropdownMenu
              type="category"
              items={petSupplierOption}
              trigger="click"
              style={{
                width: "100%",
                borderColor: isSupplierNotValid ? "#ff4d4f" : "#d9d9d9",
              }}
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
              rules={[
                {
                  required: true,
                  message: "Please enter the selling price.",
                },
              ]}
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
              rules={[
                {
                  required: true,
                  message: "Please enter the investment cost.",
                },
              ]}
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
              rules={[
                {
                  required: true,
                  message: "Please enter the category.",
                },
              ]}
              dependencies={["petCategory"]}
            >
              <DropdownMenu
                type="category"
                items={petCategoryOption}
                trigger="click"
                style={{
                  width: "100%",
                  borderColor: isCategoryNotValid ? "#ff4d4f" : "#d9d9d9",
                }}
                getValue={petCategoryHandler}
              />
            </Form.Item>
            <Form.Item
              name="petGender"
              label="Gender"
              style={{ width: "23%" }}
              rules={[
                {
                  required: true,
                  message: "Please enter the gender.",
                },
              ]}
              dependencies={["petGender"]}
            >
              <DropdownMenu
                type="category"
                items={petGenderOption}
                trigger="click"
                style={{
                  width: "100%",
                  borderColor: isGenderNotValid ? "#ff4d4f" : "#d9d9d9",
                }}
                getValue={petGenderHandler}
              />
            </Form.Item>
          </div>
          <Form.Item name="petType" label="Type">
            <Radio.Group onChange={onChange} value={petType}>
              <Radio value={"Unique"}>Unique</Radio>
              <Radio value={"Group"}>Group</Radio>
            </Radio.Group>
          </Form.Item>
          {petType === "Group" && (
            <Form.Item
              name="petQuantity"
              label="Quantity"
              style={{ width: "23%" }}
              rules={[
                {
                  required: true,
                  message: "Please enter the quantity.",
                },
              ]}
            >
              <InputNumber
                min={0}
                precision={0}
                placeholder="0"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}
          <Form.Item
            name="petImage"
            label="Image"
            rules={[
              {
                required: true,
                message: "Please upload an image.",
              },
            ]}
            dependencies={["petImage"]}
          >
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
