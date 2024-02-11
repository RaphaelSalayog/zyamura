import { AccountForm } from "@/components/forms/account/AccountForm";
import CustomModal from "../CustomModal";
import { Tabs } from "antd";
import { useContext, useState } from "react";
import CustomFormButton from "@/components/forms/CustomFormButton";
import DrawerVisibilityContext from "@/common/contexts/DrawerVisibilityContext";

const items = [
  {
    key: "personal-information",
    label: "Personal Information",
    children: <AccountForm.UserInformation />,
  },
  {
    key: "user-authentication",
    label: "User Authentication",
    children: <AccountForm.UserAuthentication />,
  },
];

const AddAccountModal = () => {
  const { add, edit, remove } = useContext(DrawerVisibilityContext);
  const [activeTabKey, setActiveTabKey] = useState("personal-information");
  return (
    <>
      <CustomModal
        title={"Add New Account"}
        open={add?.visible || edit?.visible || remove?.visible}
        width={550}
        onClose={() => {
          add?.setVisible(false);
        }}
      >
        <Tabs
          defaultActiveKey={activeTabKey}
          items={items}
          onChange={(e) => {
            setActiveTabKey(e);
          }}
        />
        <CustomFormButton
          text="Next"
          handleModalOnClose={() => {}}
          confirmLoading={false}
        />
      </CustomModal>
    </>
  );
};

export const AccountModal = { AddAccountModal };
