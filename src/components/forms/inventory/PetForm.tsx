import { useContext, useEffect, useState } from "react";
import { Form, Input, InputNumber, Modal, Radio } from "antd";

import DropdownMenu from "@/components/util/DropdownMenu";
import TextArea from "antd/es/input/TextArea";
import ImageUploader from "@/components/util/ImageUploader";
import { addPet, updatePet } from "@/store/reducers/inventorySlice";
import { useDispatch, useSelector } from "react-redux";
import {
  capitalizeFirstLetter,
  generateUniqueId,
  onKeyDownTypeNumber,
} from "@/components/util/customMethods";
import InventoryDrawerVisiblityContext from "@/common/contexts/InventoryDrawerVisibilityContext";
import SelectedDataContext from "@/common/contexts/SelectedDataContext";
import { removeOrderItem } from "@/store/reducers/pointOfSalesSlice";

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
  {
    key: "Kim's Pet Accessories",
    label: "Kim's Pet Accessories",
  },
  {
    key: "Lotte's Trading",
    label: "Lotte's Trading",
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
  {
    key: "Fish",
    label: "Fish",
  },
  {
    key: "Bird",
    label: "Bird",
  },
  {
    key: "Rabbit",
    label: "Rabbit",
  },
  {
    key: "Hamster",
    label: "Hamster",
  },
  {
    key: "Turtle",
    label: "Turtle",
  },
  {
    key: "Hedgehog",
    label: "Hedgehog",
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
  const data = useSelector((store: any) => store.inventory.inventory);
  const { pet, item } = useContext(InventoryDrawerVisiblityContext);
  const { get, set } = useContext(SelectedDataContext);
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

  const submitHandler = async (value: any) => {
    const id = generateUniqueId(data.map((item: any) => item.inventoryId));
    const newData = {
      petId: pet?.add?.visible ? id : get.inventoryId,
      ...value,
      petQuantity: value.petType === "unique" ? 1 : value?.petQuantity,
      petCategory: petCategory,
      petGender: petGender,
      petSupplier: petSupplier,
      petImage: petImage,
    };

    // Add data to Inventory Slice in Redux
    if (pet?.add?.visible) {
      isLoadingHandler(true);
      await dispatch(addPet(newData));
      // Mongo DB
      // await fetch("/api/inventory", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     // inventoryId: newData.petId,
      //     inventoryObject: "Pet",
      //     inventoryName: newData.petName,
      //     inventorySupplier: newData.petSupplier,
      //     inventoryDescription: newData.petDescription,
      //     inventorySellingPrice: newData.petSellingPrice,
      //     inventoryInvestmentCost: newData.petInvestmentCost,
      //     inventoryCategory: newData.petCategory,
      //     inventoryGender: newData.petGender,
      //     inventoryType: newData.petType,
      //     inventoryQuantity: newData.petQuantity,
      //     inventoryImage: newData.petImage,
      //   }),
      // });
      // console.log(qwe);
      resetState();
      form.resetFields();
      pet?.add?.setVisible(false);
      pet?.edit?.setVisible(false);
      isLoadingHandler(false);
    }

    // Update data from Inventory Slice in Redux
    if (pet?.edit?.visible) {
      Modal.confirm({
        title: "Confirm Update",
        content: `Are you sure you want to save the changes made? This action cannot be undone.`,
        onOk: async () => {
          isLoadingHandler(true);
          await dispatch(updatePet(newData));
          await dispatch(removeOrderItem({ productId: newData.petId }));
          resetState();
          form.resetFields();
          pet?.add?.setVisible(false);
          pet?.edit?.setVisible(false);
          isLoadingHandler(false);
        },
        centered: true,
      });
    }
  };

  useEffect(() => {
    // Form setField for Edit and View
    if (pet?.edit?.visible || pet?.view?.visible) {
      if (get) {
        form.setFieldsValue({
          petName: get.inventoryName,
          petSupplier: get.inventorySupplier,
          petDescription: get.inventoryDescription,
          petSellingPrice: get.inventorySellingPrice,
          petInvestmentCost: get.inventoryInvestmentCost,
          petCategory: get.inventoryCategory,
          petGender: get.inventoryGender,
          petType: get.inventoryType,
          petQuantity:
            get.inventoryType === "group" ? get.inventoryQuantity : "",
          petImage: get.inventoryImage,
        });
        setPetSupplier(get.inventorySupplier);
        setPetCategory(get.inventoryCategory);
        setPetGender(get.inventoryGender);
        setPetType(get.inventoryType);
        setPetImage(get.inventoryImage);
      }
    }

    // Clear form fields when closing modal
    if (
      !(pet?.edit?.visible || pet?.view?.visible) &&
      !(item?.edit?.visible || item?.view?.visible)
    ) {
      resetState();
      form.resetFields();
      set(null);
    }
  }, [
    get,
    pet?.edit?.visible,
    pet?.view?.visible,
    item?.edit?.visible,
    item?.view?.visible,
  ]);

  // Reset fields when the cancel button was clicked
  useEffect(() => {
    if (isCancel) {
      if (pet?.add?.visible) {
        resetState();
        form.resetFields();
      }
      setIsCancel(false);
    }
  }, [isCancel]);

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
        onFinish={submitHandler}
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
          <Input allowClear readOnly={pet?.view?.visible} />
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
            value={petSupplier}
            setValue={petSupplierHandler}
          />
        </Form.Item>
        <Form.Item name="petDescription" label="Pet Description">
          <TextArea
            allowClear={!pet?.view?.visible}
            autoSize={{ minRows: 3, maxRows: 7 }}
            readOnly={pet?.view?.visible}
          />
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
              readOnly={pet?.view?.visible}
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
              readOnly={pet?.view?.visible}
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
              value={petCategory}
              setValue={petCategoryHandler}
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
              value={petGender}
              setValue={petGenderHandler}
            />
          </Form.Item>
        </div>
        <Form.Item name="petType" label="Type">
          <Radio.Group
            onChange={onChange}
            value={petType}
            disabled={pet?.view?.visible || item?.view?.visible}
          >
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
              readOnly={pet?.view?.visible}
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
