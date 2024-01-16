import { Button } from "antd";

interface IFormButton {
  text: string;
  handleModalOnClose: () => void;
  confirmLoading: boolean;
}

const CustomFormButton = ({
  text,
  handleModalOnClose,
  confirmLoading,
}: IFormButton) => {
  return (
    <>
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
    </>
  );
};

export default CustomFormButton;
