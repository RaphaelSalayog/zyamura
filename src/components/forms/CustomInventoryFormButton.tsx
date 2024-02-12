import { Button } from "antd";

interface IFormButton {
  text: string;
  handleModalOnClose: () => void;
  confirmLoading: boolean;
}

const CustomInventoryFormButton = ({
  text,
  handleModalOnClose,
  confirmLoading,
}: IFormButton) => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="default"
          onClick={handleModalOnClose}
          style={{ marginRight: "8px" }}
        >
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={confirmLoading}>
          {text}
        </Button>
      </div>
    </>
  );
};

export default CustomInventoryFormButton;
