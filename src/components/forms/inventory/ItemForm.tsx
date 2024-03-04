import { Form, Input, InputNumber, Modal } from "antd";
import DropdownMenu from "@/components/util/DropdownMenu";
import ImageUploader from "@/components/util/ImageUploader";
import TextArea from "antd/es/input/TextArea";
import {
  capitalizeFirstLetter,
  generateUniqueId,
  onKeyDownTypeNumber,
} from "@/components/util/customMethods";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem } from "@/store/reducers/inventorySlice";
import InventoryDrawerVisiblityContext from "@/common/contexts/InventoryDrawerVisibilityContext";
import SelectedDataContext from "@/common/contexts/SelectedDataContext";
import { removeOrderItem } from "@/store/reducers/pointOfSalesSlice";

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
  {
    key: "Kim's Pet Accessories",
    label: "Kim's Pet Accessories",
  },
  {
    key: "Lotte's Trading",
    label: "Lotte's Trading",
  },
];

const AddItemForm = ({
  isCancel,
  setIsCancel,
  isLoadingHandler,
  children,
}: AddItemForm) => {
  const data = useSelector((store: any) => store.inventory.inventory);
  const { item, pet } = useContext(InventoryDrawerVisiblityContext);
  const { get, set } = useContext(SelectedDataContext);
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

  const submitHandler = async (value: any) => {
    // const id = generateUniqueId(data.map((item: any) => item._id));
    const newData = {
      // itemId: item?.add?.visible ? id : get._id,
      ...value,
      itemSupplier: itemSupplier,
      itemImage: itemImage,
    };

    // Mongo DB
    const formData = new FormData();
    formData.append("object", "Item");
    formData.append("name", newData.itemName);
    formData.append("supplier", newData.itemSupplier);
    formData.append("description", newData.itemDescription);
    formData.append("sellingPrice", newData.itemSellingPrice);
    formData.append("investmentCost", newData.itemInvestmentCost);
    formData.append("quantity", newData.itemQuantity);
    formData.append("imageUrl", newData.itemImage[0]);

    const auth = localStorage.getItem("token");

    // Add data to Inventory Slice in Redux
    if (item?.add?.visible) {
      isLoadingHandler(true);
      await dispatch(addItem(newData));

      try {
        const response = await fetch("http://localhost:3000/inventory", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to submit item");
        }

        resetState();
        form.resetFields();
        item?.add?.setVisible(false);
        item?.edit?.setVisible(false);
        isLoadingHandler(false);
      } catch (err) {
        console.log(err);
      }
    }

    // Update data from Inventory Slice in Redux
    if (item?.edit?.visible) {
      Modal.confirm({
        title: "Confirm Update",
        content: `Are you sure you want to save the changes made? This action cannot be undone.`,
        onOk: async () => {
          isLoadingHandler(true);
          // await dispatch(updateItem(newData));
          // await dispatch(removeOrderItem({ _id: get._id }));

          try {
            const response = await fetch(
              "http://localhost:3000/inventory/" + get._id,
              {
                method: "PUT",
                body: formData,
                headers: {
                  Authorization: "Bearer " + auth,
                },
              }
            );

            if (!response.ok) {
              throw new Error("Failed to edit item");
            }

            resetState();
            form.resetFields();
            item?.add?.setVisible(false);
            item?.edit?.setVisible(false);
            isLoadingHandler(false);
          } catch (err) {
            console.log(err);
          }
        },
        centered: true,
      });
    }
  };

  useEffect(() => {
    // Form setField for Edit and View
    if (item?.edit?.visible || item?.view?.visible) {
      if (get) {
        form.setFieldsValue({
          itemName: get.name,
          itemSupplier: get.supplier,
          itemDescription: get.description,
          itemSellingPrice: get.sellingPrice,
          itemInvestmentCost: get.investmentCost,
          itemQuantity: get.quantity,
          itemImage: get.imageUrl,
        });
        setItemSupplier(get.supplier);
        setItemImage(get.imageUrl);
      }
    }

    // Clear form fields when closing modal
    if (
      !(item?.edit?.visible || item?.view?.visible) &&
      !(pet?.edit?.visible || pet?.view?.visible)
    ) {
      resetState();
      form.resetFields();
      set(null);
    }
  }, [
    get,
    item?.edit?.visible,
    item?.view?.visible,
    pet?.edit?.visible,
    pet?.view?.visible,
  ]);

  // Reset fields when the cancel button was clicked
  useEffect(() => {
    if (isCancel) {
      if (item?.add?.visible) {
        resetState();
        form.resetFields();
      }
      setIsCancel(false);
    }
  }, [isCancel]);

  const onFinishFailed = (errorInfo: any) => {
    setIsSupplierNotValid(errorInfo.values.itemSupplier === undefined);
    setIsImageNotValid(errorInfo.values.itemImage.length === 0);
  };
  return (
    <>
      <Form
        form={form}
        onFinish={submitHandler}
        id="addItemForm"
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
              required: item?.view?.visible ? false : true,
              message: "Please enter the item name.",
            },
          ]}
        >
          <Input allowClear readOnly={item?.view?.visible} />
        </Form.Item>
        <Form.Item
          name="itemSupplier"
          label="Supplier"
          rules={[
            {
              required: item?.view?.visible ? false : true,
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
            value={itemSupplier}
            setValue={itemSupplierHandler}
          />
        </Form.Item>
        <Form.Item name="itemDescription" label="Item Description">
          <TextArea
            allowClear={!item?.view?.visible}
            autoSize={{ minRows: 3, maxRows: 7 }}
            readOnly={item?.view?.visible}
          />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            name="itemSellingPrice"
            label="Selling Price"
            style={{ width: "31.33%" }}
            rules={[
              {
                required: item?.view?.visible ? false : true,
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
              readOnly={item?.view?.visible}
            />
          </Form.Item>
          <Form.Item
            name="itemInvestmentCost"
            label="Investment Cost"
            style={{ width: "31.33%" }}
            rules={[
              {
                required: item?.view?.visible ? false : true,
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
              readOnly={item?.view?.visible}
            />
          </Form.Item>
          <Form.Item
            name="itemQuantity"
            label="Quantity"
            style={{ width: "31.33%" }}
            rules={[
              {
                required: item?.view?.visible ? false : true,
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
              readOnly={item?.view?.visible}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="itemImage"
          label="Image"
          rules={[
            {
              required: item?.view?.visible ? false : true,
              message: "Please upload an image.",
            },
          ]}
        >
          <ImageUploader
            listType={"picture-card"}
            getValue={itemImageHandler}
          />
        </Form.Item>
        {children}
      </Form>
    </>
  );
};

export const ItemForm = { AddItemForm };
