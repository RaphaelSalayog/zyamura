import DrawerVisibilityContext from "@/common/contexts/DrawerVisibilityContext";
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
  nextHandler,
  confirmLoading,
}: IFormButton) => {
  const { add, edit, view } = useContext(DrawerVisibilityContext);

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

        {!(view?.visible && activeKey === "user-authentication") && (
          <Button
            icon={
              activeKey !== "user-authentication" && !edit?.visible ? (
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
        )}
      </Row>
    </>
  );
};

export default CustomAccountFormButton;
