import { AccountForm } from "@/components/forms/account/AccountForm";
import CustomModal from "../CustomModal";
import { Form, Tabs } from "antd";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import CustomAccountFormButton from "@/components/forms/CustomAccountFormButton";
import { capitalizeFirstLetter } from "@/components/util/customMethods";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsPassNotEqual,
  setIsUsernameExist,
} from "@/store/reducers/accountSlice";
import SelectedDataContext from "@/common/contexts/SelectedDataContext";
import AccountDrawerVisibilityContext from "@/common/contexts/AccountDrawerVisibilityContext";

const AddAccountModal = () => {
  const isPassNotEqual = useSelector(
    (store: any) => store.account.isPassNotEqual
  );
  const { add, edit, view } = useContext(AccountDrawerVisibilityContext);
  const { get, set } = useContext(SelectedDataContext);
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

  const profilePictureHandler = (value: any) => {
    form.setFieldsValue({ profilePicture: value }); // To set the value of Form.Item from custom Dropdown component
  };

  const items = [
    {
      key: "personal-information",
      label: "Personal Information",
      children: (
        <AccountForm.UserInformation
          userImageHandler={profilePictureHandler}
          nextHandler={nextHandler}
        />
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

  const optionFilter = useMemo(() => {
    if (edit?.userInformation.visible) {
      setActiveTabKey("personal-information");
      return items.filter((item) => item.key === "personal-information");
    } else if (edit?.username.visible || edit?.password.visible) {
      setActiveTabKey("user-authentication");
      return items.filter((item) => item.key === "user-authentication");
    } else {
      return items;
    }
  }, [
    activeTabKey,
    edit?.userInformation.visible,
    edit?.username.visible,
    edit?.password.visible,
  ]);

  const submitHandler = useCallback(
    async (data: any) => {
      if (data.confirmPassword !== data.password) {
        dispatch(setIsPassNotEqual(true));
      } else if (data.confirmNewPassword !== data.newPassword) {
        dispatch(setIsPassNotEqual(true));
      } else {
        console.log("submit");
        // MongoDB
        const auth = localStorage.getItem("token");
        const formData = new FormData();
        data.firstName && formData.append("firstName", data.firstName);
        data.lastName && formData.append("lastName", data.lastName);
        data.address && formData.append("address", data.address);
        data.phoneNumber && formData.append("phoneNumber", data.phoneNumber);
        data.email && formData.append("email", data.email);
        data.birthDate &&
          formData.append(
            "birthDate",
            moment(data.birthDate).format("MM/DD/YYYY")
          );
        data.firstName && formData.append("role", data.role);
        data.username && formData.append("username", data.username);
        data.password && formData.append("password", data.password);
        // data.oldPassword && formData.append("oldPassword", data.oldPassword);
        data.newPassword && formData.append("newPassword", data.newPassword);
        data.firstName &&
          formData.append("profilePicture", data.profilePicture[0]);

        // if (edit?.visible) {
        //   try {
        //     const response = await fetch("http://localhost:3000/user/" + get._id, {
        //       method: "PUT",
        //       headers: {
        //         Authorization: "Bearer " + auth,
        //       },
        //       body: formData,
        //     });
        //   } catch (err) {}
        // }

        if (add?.visible && activeTabKey === "user-authentication") {
          try {
            const response = await fetch("http://localhost:3000/signup", {
              method: "POST",
              headers: {
                Authorization: "Bearer " + auth,
              },
              body: formData,
            });
            if (!response.ok) {
              throw new Error("Failed to signup account.");
            }
            const data = await response.json();
            // if username is already exist
            if (data.statusCode === 409) {
              dispatch(setIsUsernameExist(true));
            } else {
              dispatch(setIsUsernameExist(false));
              add?.setVisible(false);
              setActiveTabKey(items[0].key);
              form.resetFields();
            }
          } catch (err) {
            console.log(err);
          }
        } else if (edit?.userInformation.visible) {
        } else if (edit?.username.visible) {
        } else if (edit?.password.visible) {
        } else {
          nextHandler();
        }
      }
    },
    [
      isPassNotEqual,
      activeTabKey,
      add?.visible,
      edit?.userInformation.visible,
      edit?.username.visible,
      edit?.password.visible,
    ]
  );

  useEffect(() => {
    // Form setField for Edit and View
    if (
      edit?.userInformation.visible ||
      edit?.username.visible ||
      view?.visible
    ) {
      if (get) {
        form.setFieldsValue({
          profilePicture: get.profilePicture,
          firstName: get.firstName,
          lastName: get.lastName,
          address: get.address,
          phoneNumber: get.phoneNumber,
          email: get.email,
          birthDate: moment(get.birthDate, "MM/DD/YYYY"),
          username: get.credentials.username,
          role: get.role,
        });
        profilePictureHandler(get.profilePicture);
      }
    }

    // Clear form fields when closing modal
    if (
      !(edit?.userInformation.visible || view?.visible) &&
      !(edit?.userInformation.visible || view?.visible)
    ) {
      // resetState();
      form.resetFields();
      set(null);
    }
  }, [get, edit?.userInformation.visible, view?.visible]);

  return (
    <>
      <CustomModal
        title={
          add?.visible
            ? "Add New Account"
            : edit?.userInformation.visible
            ? "Update User Information"
            : edit?.username.visible
            ? "Update Username"
            : edit?.password.visible
            ? "Update Password"
            : "User Information"
        }
        open={
          add?.visible ||
          edit?.userInformation.visible ||
          edit?.username.visible ||
          edit?.password.visible ||
          view?.visible
        }
        width={550}
        onClose={() => {
          add?.setVisible(false);
          edit?.userInformation.setVisible(false);
          edit?.username.setVisible(false);
          edit?.password.setVisible(false);
          view?.setVisible(false);
          form.resetFields();
          dispatch(setIsPassNotEqual(false));
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
            items={optionFilter}
            onTabClick={(e) => {
              if (view?.visible) {
                setActiveTabKey(e);
              }
            }}
          />
          {!view?.visible && (
            <CustomAccountFormButton
              activeKey={activeTabKey}
              text={
                activeTabKey === "personal-information" && add?.visible
                  ? "Next"
                  : edit?.userInformation.visible ||
                    edit?.username.visible ||
                    edit?.password.visible
                  ? "Save"
                  : "Create Account"
              }
              prevHandler={prevHandler}
              confirmLoading={false}
            />
          )}
        </Form>
      </CustomModal>
    </>
  );
};

export const AccountModal = { AddAccountModal };
