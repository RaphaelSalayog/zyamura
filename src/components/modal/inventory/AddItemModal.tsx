import DropdownMenu from "@/components/util/DropdownMenu";
import ImageUploader from "@/components/util/ImageUploader";
import { Form, Input, InputNumber, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/reducers/inventorySlice";
import { capitalizeFirstLetter } from "@/components/util/customMethods";

interface AddItemModal {
  openItemModal: boolean;
  setOpenItemModal: (boolean: boolean) => void;
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

const AddItemModal: React.FC<AddItemModal> = ({
  openItemModal,
  setOpenItemModal,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [itemSupplier, setItemSupplier] = useState("");
  const [itemImage, setItemImage] = useState([]);
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  // <--FORMS-->
  // >>To get value from child custom component to parent
  const itemSupplierHandler = (value: any) => {
    setItemSupplier(value);
  };
  const itemImageHandler = (value: any) => {
    setItemImage(value);
  };

  // <--MODAL-->
  const resetState = () => {
    itemSupplierHandler("");
    itemImageHandler([]);
  };

  const handleOk = (value: any) => {
    const data = {
      ...value,
      itemSupplier: itemSupplier,
      itemImage: itemImage,
    };
    //Add data to Inventory Slice in Redux
    dispatch(addItem(data));

    setConfirmLoading(true);
    setTimeout(() => {
      resetState();
      form.resetFields();
      setOpenItemModal(false);
      setConfirmLoading(false);
    }, 1000);
  };
  const handleCancel = () => {
    // console.log("Clicked cancel button");
    resetState();
    form.resetFields();
    setOpenItemModal(false);
  };

  return (
    <>
      <Modal
        title="Add New Item"
        open={openItemModal}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
        okText="Add New Item"
      >
        <Form
          form={form}
          onFinish={handleOk}
          id="addItemForm"
          // labelCol={{ span: 4 }}
          // wrapperCol={{ span: 14 }}
          layout="vertical"
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
          <Form.Item name="itemSupplier" label="Supplier">
            <DropdownMenu
              type="category"
              items={itemSupplierOption}
              trigger="click"
              style={{ width: "100%" }}
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
            >
              <InputNumber
                addonBefore="₱"
                min={0}
                precision={2}
                placeholder="0.00"
              />
            </Form.Item>
            <Form.Item
              name="itemInvestmentCost"
              label="Investment Cost"
              style={{ width: "31.33%" }}
            >
              <InputNumber
                addonBefore="₱"
                min={0}
                precision={2}
                placeholder="0.00"
              />
            </Form.Item>
            <Form.Item
              name="itemQuantity"
              label="Quantity"
              style={{ width: "31.33%" }}
            >
              <InputNumber
                min={0}
                precision={0}
                placeholder="0"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>
          <Form.Item name="itemImage" label="Image">
            <ImageUploader getValue={itemImageHandler} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddItemModal;
