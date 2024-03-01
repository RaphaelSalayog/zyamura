import { AccountForm } from "@/components/forms/account/AccountForm";
import CustomModal from "../CustomModal";
import { Form, Tabs } from "antd";
import { useContext, useState } from "react";
import DrawerVisibilityContext from "@/common/contexts/DrawerVisibilityContext";
import CustomAccountFormButton from "@/components/forms/CustomAccountFormButton";
import { capitalizeFirstLetter } from "@/components/util/customMethods";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setIsUsernameExist } from "@/store/reducers/accountSlice";

const AddAccountModal = () => {
  const { add, edit, remove } = useContext(DrawerVisibilityContext);
  const dispatch = useDispatch();
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
    form.setFieldsValue({ profilePicture: value }); // To set the value of Form.Item from custom Dropdown component
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

  const submitHandler = (data: any) => {
    if (activeTabKey === "user-authentication") {
      // MongoDB
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("address", data.address);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("email", data.email);
      formData.append(
        "birthDate",
        moment(data.birthDate).format("MMM D, YYYY")
      );
      formData.append("role", data.role);
      formData.append("username", data.username);
      formData.append("password", data.password);
      formData.append("profilePicture", data.profilePicture[0]);

      const auth = localStorage.getItem("token");
      fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + auth,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // if username is already exist
          if (data.statusCode === 409) {
            dispatch(setIsUsernameExist(true));
          } else {
            dispatch(setIsUsernameExist(false));
            add?.setVisible(false);
            setActiveTabKey(items[0].key);
            form.resetFields();
          }
        })
        .catch((err) => console.log("error >>", err));
    } else {
      nextHandler();
    }
  };
  return (
    <>
      <CustomModal
        title={"Add New Account"}
        open={add?.visible || edit?.visible || remove?.visible}
        width={550}
        onClose={() => {
          add?.setVisible(false);
          form.resetFields();
          dispatch(setIsUsernameExist(false));
          setActiveTabKey(items[0].key);
        }}
      >
        <Form
          form={form}
          onFinish={submitHandler}
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
              //   setActiveTabKey(e);
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
