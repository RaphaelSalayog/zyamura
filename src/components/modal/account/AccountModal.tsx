import { AccountForm } from "@/components/forms/account/AccountForm";
import CustomModal from "../CustomModal";
import { Tabs } from "antd";
import { useState } from "react";
import CustomFormButton from "@/components/forms/CustomFormButton";

const items = [
  {
    key: "personal-information",
    label: "Personal Information",
    children: <AccountForm.UserInformation />,
  },
  {
    key: "user-authentication",
    label: "User-Authentication",
    children: <AccountForm.UserAuthentication />,
  },
];

const AddAccountModal = () => {
  const [activeTabKey, setActiveTabKey] = useState("personal-information");
  return (
    <>
      <CustomModal
        title={"Add New Account"}
        open={true}
        width={500}
        onClose={() => {}}
      >
        <Tabs
          defaultActiveKey={activeTabKey}
          items={items}
          onChange={(e) => {
            setActiveTabKey(e);
          }}
        />
        <CustomFormButton
          text="Confirm"
          handleModalOnClose={() => {}}
          confirmLoading={false}
        />
      </CustomModal>
    </>
  );
};

export const AccountModal = { AddAccountModal };
