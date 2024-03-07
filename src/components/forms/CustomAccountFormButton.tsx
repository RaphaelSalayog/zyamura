import DrawerVisibilityContext from "@/common/contexts/DrawerVisibilityContext";
import { LeftOutlined, RightOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import { useContext } from "react";
import { useSelector } from "react-redux";

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
  const isChangeCredentials = useSelector(
    (store: any) => store.account.isChangeCredentials
  );

  return (
    <>
      <Row
        justify={edit?.visible && isChangeCredentials ? "end" : "space-between"}
      >
        <Row>
          {(!edit?.visible || isChangeCredentials) && (
            <Button
              type="default"
              onClick={prevHandler}
              style={{ marginRight: "8px" }}
              icon={!(edit?.visible && isChangeCredentials) && <LeftOutlined />}
              disabled={activeKey === "personal-information"}
            >
              {edit?.visible && isChangeCredentials && "Cancel"}
            </Button>
          )}
        </Row>

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
