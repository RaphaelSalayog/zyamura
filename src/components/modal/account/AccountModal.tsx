import { AccountForm } from "@/components/forms/account/AccountForm";
import CustomModal from "../CustomModal";
import { Form, Tabs } from "antd";
import { useContext, useState } from "react";
import DrawerVisibilityContext from "@/common/contexts/DrawerVisibilityContext";
import CustomAccountFormButton from "@/components/forms/CustomAccountFormButton";
import { capitalizeFirstLetter } from "@/components/util/customMethods";

const AddAccountModal = () => {
  const { add, edit, remove } = useContext(DrawerVisibilityContext);
  const [activeTabKey, setActiveTabKey] = useState("personal-information");

  const [form] = Form.useForm();

  const prevHandler = () => {
    const index = items.findIndex((item) => item.key === activeTabKey) - 1;
    setActiveTabKey(items[index].key);
  };
  const nextHandler = () => {
    const index = items.findIndex((item) => item.key === activeTabKey) + 1;
    setActiveTabKey(items[index].key);
  };

  const petImageHandler = (value: any) => {
    form.setFieldsValue({ image: value }); // To set the value of Form.Item from custom Dropdown component
  };

  const items = [
    {
      key: "personal-information",
      label: "Personal Information",
      children: (
        <AccountForm.UserInformation petImageHandler={petImageHandler} />
      ),
    },
    {
      key: "user-authentication",
      label: "User Authentication",
      // activeTabKey === "user-authentication" : to remove the errorFields by re-initialize the user authentication form when clicking the back button
      children: activeTabKey === "user-authentication" && (
        <AccountForm.UserAuthentication />
      ),
    },
  ];

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
        <Form
          form={form}
          onFinish={(e) => {
            console.log(e);
            if (activeTabKey === "user-authentication") {
              console.log("submit");
            } else {
              nextHandler();
            }
          }}
          id="accountForm"
          layout="vertical"
          initialValues={{ role: "employee" }}
          onValuesChange={(changedValues, allValues) => {
            // To capitalize the first letter for every word
            if (changedValues && changedValues.firstName) {
              form.setFieldsValue({
                ...allValues,
                firstName: capitalizeFirstLetter(changedValues.firstName),
              });
            }
            if (changedValues && changedValues.lastName) {
              form.setFieldsValue({
                ...allValues,
                lastName: capitalizeFirstLetter(changedValues.lastName),
              });
            }
          }}
        >
          <Tabs
            activeKey={activeTabKey}
            items={items}
            onTabClick={(e) => {
              // if (view?.visible) {
              setActiveTabKey(e);
              // }
            }}
          />
          <CustomAccountFormButton
            activeKey={activeTabKey}
            text={
              activeTabKey === "personal-information"
                ? "Next"
                : "Create Account"
            }
            prevHandler={prevHandler}
            confirmLoading={false}
          />
        </Form>
      </CustomModal>
    </>
  );
};

export const AccountModal = { AddAccountModal };
