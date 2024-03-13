import { AccountForm } from "@/components/forms/account/AccountForm";
import CustomModal from "../CustomModal";
import { Form, Modal, Tabs } from "antd";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import CustomAccountFormButton from "@/components/forms/CustomAccountFormButton";
import { capitalizeFirstLetter } from "@/components/util/customMethods";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsPassDoesNotMatch,
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
  const [isLoading, setIsLoading] = useState(false);

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
        dispatch(
          setIsPassDoesNotMatch({
            isError: true,
            errorMessage: "Password does not match!",
          })
        );
      } else if (data.confirmNewPassword !== data.newPassword) {
        dispatch(
          setIsPassDoesNotMatch({
            isError: true,
            errorMessage: "Password does not match!",
          })
        );
      } else {
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
        data.profilePicture &&
          formData.append(
            "profilePicture",
            typeof data.profilePicture[0] === "object"
              ? data.profilePicture[0]
              : data.profilePicture[0].split("localhost:3000/")[1]
          );

        if (add?.visible && activeTabKey === "user-authentication") {
          setIsLoading(true);
          try {
            const response = await fetch("http://localhost:3000/signup", {
              method: "POST",
              headers: {
                Authorization: "Bearer " + auth,
              },
              body: formData,
            });

            const data = await response.json();
            // if username is already exist
            if (data.statusCode) {
              dispatch(
                setIsUsernameExist({
                  isError: true,
                  errorMessage: data.message,
                })
              );
            } else {
              add?.setVisible(false);
            }
          } catch (err) {
            console.log(err);
          }
          setIsLoading(false);
        } else if (edit?.userInformation.visible) {
          Modal.confirm({
            title: "Confirm Update",
            content: `Are you sure you want to save the changes made? This action cannot be undone.`,
            onOk: async () => {
              try {
                const response = await fetch(
                  "http://localhost:3000/user/information/" + get._id,
                  {
                    method: "PUT",
                    headers: {
                      Authorization: "Bearer " + auth,
                    },
                    body: formData,
                  }
                );

                const data = await response.json();

                // if username is already exist
                if (!data.statusCode) {
                  edit?.userInformation.setVisible(false);
                }
              } catch (err) {
                console.log(err);
              }
            },
            centered: true,
          });
        } else if (edit?.username.visible) {
          Modal.confirm({
            title: "Confirm Update",
            content: `Are you sure you want to save the changes made? This action cannot be undone.`,
            onOk: async () => {
              try {
                const response = await fetch(
                  "http://localhost:3000/user/username/" + get._id,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + auth,
                    },
                    body: JSON.stringify(data),
                  }
                );

                const result = await response.json();

                // if username is already exist
                if (result.statusCode) {
                  dispatch(
                    setIsUsernameExist({
                      isError: true,
                      errorMessage: result.message,
                    })
                  );
                } else {
                  edit?.username.setVisible(false);
                }
              } catch (err) {
                console.log(err);
              }
            },
            centered: true,
          });
        } else if (edit?.password.visible) {
          Modal.confirm({
            title: "Confirm Update",
            content: `Are you sure you want to save the changes made? This action cannot be undone.`,
            onOk: async () => {
              try {
                const response = await fetch(
                  "http://localhost:3000/user/password/" + get._id,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + auth,
                    },
                    body: JSON.stringify({ newPassword: data.newPassword }),
                  }
                );

                const result = await response.json();
                console.log(result);

                // if username is already exist
                if (result.statusCode) {
                  dispatch(
                    setIsPassNotEqual({
                      isError: true,
                      errorMessage: result.message,
                    })
                  );
                } else {
                  edit?.password.setVisible(false);
                }
              } catch (err) {
                console.log(err);
              }
            },
            centered: true,
          });
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
      !(
        add?.visible ||
        edit?.userInformation.visible ||
        edit?.username.visible ||
        edit?.password.visible ||
        view?.visible
      )
    ) {
      setActiveTabKey(items[0].key);
      form.resetFields();
      set(null);
      dispatch(
        setIsUsernameExist({
          isError: false,
          errorMessage: "",
        })
      );
    }
  }, [
    get,
    add?.visible,
    edit?.userInformation.visible,
    edit?.username.visible,
    edit?.password.visible,
    view?.visible,
  ]);

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
          dispatch(setIsPassNotEqual({ isError: false, errorMessage: "" }));
          dispatch(setIsPassDoesNotMatch({ isError: false, errorMessage: "" }));
          dispatch(
            setIsUsernameExist({
              isError: false,
              errorMessage: "",
            })
          );
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
              confirmLoading={isLoading}
            />
          )}
        </Form>
      </CustomModal>
    </>
  );
};

export const AccountModal = { AddAccountModal };
