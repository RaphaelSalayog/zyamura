import { Form, Input, InputNumber } from "antd";
import DropdownMenu from "@/components/util/DropdownMenu";
import ImageUploader from "@/components/util/ImageUploader";
import TextArea from "antd/es/input/TextArea";
import {
  capitalizeFirstLetter,
  onKeyDownTypeNumber,
} from "@/components/util/customMethods";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/reducers/inventorySlice";
import InventoryDrawerVisiblityContext from "@/common/contexts/InventoryDrawerVisibilityContext";

interface AddItemForm {
  isCancel: boolean;
  setIsCancel: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingHandler: (boolean: boolean) => void;
  children: any;
}

const itemSupplierOption = [
  {
    key: "JXC Corporation",
    label: "JXC Corporation",
  },
  {
    key: "QC Corporation",
    label: "QC Corporation",
  },
];

const AddItemForm = ({
  isCancel,
  setIsCancel,
  isLoadingHandler,
  children,
}: AddItemForm) => {
  const { item } = useContext(InventoryDrawerVisiblityContext);
  const [itemSupplier, setItemSupplier] = useState("");
  const [itemImage, setItemImage] = useState([]);

  // State for validation. To change the border color of custom Dropdown component
  const [isSupplierNotValid, setIsSupplierNotValid] = useState(false);
  const [isImageNotValid, setIsImageNotValid] = useState(false);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // <--FORMS-->
  // >>To get value from child custom component to parent
  const itemSupplierHandler = (value: any) => {
    setItemSupplier(value);
    setIsSupplierNotValid(value && false);
    form.setFieldsValue({ itemSupplier: value }); // To set the value of Form.Item from custom Dropdown component
  };
  const itemImageHandler = (value: any) => {
    setItemImage(value);
    setIsImageNotValid(value && false);
    form.setFieldsValue({ itemImage: value }); // To set the value of Form.Item from custom Dropdown component
  };

  // <--MODAL-->
  const resetState = () => {
    setItemSupplier("");
    setItemImage([]);

    setIsSupplierNotValid(false);
    setIsImageNotValid(false);
  };

  const handleOk = (value: any) => {
    const data = {
      ...value,
      itemSupplier: itemSupplier,
      itemImage: itemImage,
    };
    //Add data to Inventory Slice in Redux
    dispatch(addItem(data));

    isLoadingHandler(true);
    setTimeout(() => {
      resetState();
      form.resetFields();
      item?.add?.setVisible(false);
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
    if (!item?.add?.visible) {
      item?.add?.setVisible(false);
    }
  }, [item?.add]);

  const onFinishFailed = (errorInfo: any) => {
    setIsSupplierNotValid(errorInfo.values.itemSupplier === undefined);
    setIsImageNotValid(errorInfo.values.itemImage.length === 0);
  };
  return (
    <>
      <Form
        form={form}
        onFinish={handleOk}
        id="addItemForm"
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
        layout="vertical"
        onFinishFailed={onFinishFailed}
        onValuesChange={(changedValues, allValues) => {
          // To capitalize the first letter for every word
          if (changedValues && changedValues.itemName) {
            form.setFieldsValue({
              ...allValues,
              itemName: capitalizeFirstLetter(changedValues.itemName),
            });
          }
        }}
      >
        <Form.Item
          name="itemName"
          label="Item Name"
          rules={[
            {
              required: true,
              message: "Please enter the item name.",
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="itemSupplier"
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
            items={itemSupplierOption}
            trigger="click"
            style={{
              width: "100%",
              borderColor: isSupplierNotValid ? "#ff4d4f" : "#d9d9d9",
            }}
            getValue={itemSupplierHandler}
          />
        </Form.Item>
        <Form.Item name="itemDescription" label="Item Description">
          <TextArea allowClear autoSize={{ minRows: 3, maxRows: 7 }} />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            name="itemSellingPrice"
            label="Selling Price"
            style={{ width: "31.33%" }}
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
            name="itemInvestmentCost"
            label="Investment Cost"
            style={{ width: "31.33%" }}
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
            name="itemQuantity"
            label="Quantity"
            style={{ width: "31.33%" }}
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
        </div>
        <Form.Item
          name="itemImage"
          label="Image"
          rules={[
            {
              required: true,
              message: "Please upload an image.",
            },
          ]}
        >
          <ImageUploader getValue={itemImageHandler} />
        </Form.Item>
        {children}
      </Form>
    </>
  );
};

export const ItemForm = { AddItemForm };