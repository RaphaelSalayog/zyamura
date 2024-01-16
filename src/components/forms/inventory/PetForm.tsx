import { useContext, useEffect, useState } from "react";
import { Form, Input, InputNumber, Radio } from "antd";

import DropdownMenu from "@/components/util/DropdownMenu";
import TextArea from "antd/es/input/TextArea";
import ImageUploader from "@/components/util/ImageUploader";
import { addPet } from "@/store/reducers/inventorySlice";
import { useDispatch } from "react-redux";
import {
  capitalizeFirstLetter,
  onKeyDownTypeNumber,
} from "@/components/util/customMethods";
import InventoryDrawerVisiblityContext from "@/common/contexts/InventoryDrawerVisibilityContext";

interface AddPetForm {
  isCancel: boolean;
  setIsCancel: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingHandler: (boolean: boolean) => void;
  children: any;
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

const AddPetForm = ({
  isCancel,
  setIsCancel,
  isLoadingHandler,
  children,
}: AddPetForm) => {
  const { pet } = useContext(InventoryDrawerVisiblityContext);
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
      petQuantity: value.petType === "unique" ? 1 : value?.petQuantity,
      petCategory: petCategory,
      petGender: petGender,
      petSupplier: petSupplier,
      petImage: petImage,
    };
    //Add data to Inventory Slice in Redux
    dispatch(addPet(data));

    isLoadingHandler(true);
    setTimeout(() => {
      resetState();
      form.resetFields();
      pet?.add?.setVisible(false);
      isLoadingHandler(false);
    }, 1000);
  };

  // Reset fields when the cancel button was clicked
  useEffect(() => {
    if (isCancel) {
      resetState();
      form.resetFields();
      setIsCancel(false);
    }
  }, [isCancel]);

  // Close the modal when the backdrop of modal was clicked (It will not reset the fields)
  useEffect(() => {
    if (!pet?.add?.visible) {
      pet?.add?.setVisible(false);
    }
  }, [pet?.add]);

  // To change the border color of custom Dropdown component
  const onFinishFailed = (errorInfo: any) => {
    setIsSupplierNotValid(errorInfo.values.petSupplier === undefined);
    setIsCategoryNotValid(errorInfo.values.petCategory === undefined);
    setIsGenderNotValid(errorInfo.values.petGender === undefined);
    setIsImageNotValid(errorInfo.values.petImage.length === 0);
  };
  return (
    <>
      <Form
        form={form}
        onFinish={handleOk}
        id="addPetForm"
        layout="vertical"
        initialValues={{ petType: "unique" }}
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
              type="number"
              addonBefore="₱"
              min={0}
              precision={2}
              placeholder="0.00"
              onKeyDown={(event) => onKeyDownTypeNumber(event, "price")}
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
              type="number"
              addonBefore="₱"
              min={0}
              precision={2}
              placeholder="0.00"
              onKeyDown={(event) => onKeyDownTypeNumber(event, "price")}
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
            <Radio value={"unique"}>Unique</Radio>
            <Radio value={"group"}>Group</Radio>
          </Radio.Group>
        </Form.Item>
        {petType === "group" && (
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
              type="number"
              min={0}
              precision={0}
              placeholder="0"
              style={{ width: "100%" }}
              onKeyDown={(event) => onKeyDownTypeNumber(event, "quantity")}
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
        {children}
      </Form>
    </>
  );
};

export const PetForm = {
  AddPetForm,
};