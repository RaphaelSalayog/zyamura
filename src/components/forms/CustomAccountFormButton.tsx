import AccountDrawerVisibilityContext from "@/common/contexts/AccountDrawerVisibilityContext";
import { LeftOutlined, RightOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import { useContext } from "react";

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
  confirmLoading,
}: IFormButton) => {
  const { add, edit, view } = useContext(AccountDrawerVisibilityContext);

  return (
    <>
      <Row justify={"space-between"}>
        <Row>
          {add?.visible && (
            <Button
              type="default"
              onClick={prevHandler}
              style={{ marginRight: "8px" }}
              icon={<LeftOutlined />}
              disabled={activeKey === "personal-information"}
            />
          )}
        </Row>

        {!view?.visible && (
          <Button
            icon={
              activeKey !== "user-authentication" && add?.visible ? (
                <RightOutlined />
              ) : (
                <SaveOutlined />
              )
            }
            type="primary"
            htmlType="submit"
            loading={confirmLoading}
          >
            {text}
          </Button>
        )}
      </Row>
    </>
  );
};

export default CustomAccountFormButton;
