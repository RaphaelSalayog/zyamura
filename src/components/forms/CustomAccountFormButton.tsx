import { LeftOutlined, RightOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";

interface IFormButton {
  activeKey?: string;
  text: string;
  prevHandler?: () => void;
  nextHandler?: () => void;
  confirmLoading?: boolean;
}

const CustomAccountFormButton = ({
  activeKey,
  text,
  prevHandler,
  nextHandler,
  confirmLoading,
}: IFormButton) => {
  return (
    <>
      <Row justify={"space-between"}>
        <Button
          type="default"
          onClick={prevHandler}
          style={{ marginRight: "8px" }}
          icon={<LeftOutlined />}
          disabled={activeKey === "personal-information"}
        />
        <Button
          icon={
            activeKey !== "user-authentication" ? (
              <RightOutlined />
            ) : (
              <SaveOutlined />
            )
          }
          // onClick={nextHandler}
          type="primary"
          htmlType="submit"
          loading={confirmLoading}
        >
          {text}
        </Button>
      </Row>
    </>
  );
};

export default CustomAccountFormButton;
