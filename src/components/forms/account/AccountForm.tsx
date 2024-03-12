import AccountDrawerVisibilityContext from "@/common/contexts/AccountDrawerVisibilityContext";
import ImageUploader from "@/components/util/ImageUploader";
import {
  setIsPassDoesNotMatch,
  setIsPassNotEqual,
  setIsUsernameExist,
} from "@/store/reducers/accountSlice";
import { DatePicker, Form, Input, Radio, Row } from "antd";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserInformation = ({
  userImageHandler,
}: {
  userImageHandler: (value: any) => void;
  nextHandler: () => void;
}) => {
  const { add, edit, view } = useContext(AccountDrawerVisibilityContext);
  const [role, setRole] = useState("");
  const [isFirstLetter, setIsFirstLetter] = useState(true);

  const onChange = (e: any) => {
    setRole(e.target.value);
  };

  return (
    <>
      <Row justify={"center"}>
        <Form.Item
          name="profilePicture"
          rules={[
            {
              required: view?.visible ? false : true,
              message: "Please upload an image.",
            },
          ]}
          dependencies={["profilePicture"]}
        >
          <ImageUploader
            listType="picture-circle"
            getValue={userImageHandler}
          />
        </Form.Item>
      </Row>
      <Row justify={"space-between"}>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: view?.visible ? false : true,
              message: "Please input your first name!",
            },
          ]}
          style={{ width: "48%" }}
        >
          <Input allowClear readOnly={view?.visible} />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: view?.visible ? false : true,
              message: "Please input your last name!",
            },
          ]}
          style={{ width: "48%" }}
        >
          <Input allowClear readOnly={view?.visible} />
        </Form.Item>
      </Row>
      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: view?.visible ? false : true,
            message: "Please input your address!",
          },
        ]}
      >
        <Input allowClear readOnly={view?.visible} />
      </Form.Item>

      <Row justify={"space-between"}>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            {
              required: view?.visible ? false : true,
              message: "Please input your phone number!",
            },
            {
              min: 10,
              message: "Phone number must be at least 10 characters long",
              validateTrigger: "onSubmit",
            },
          ]}
          style={{ width: "48%" }}
        >
          <Input
            addonBefore={"+63"}
            onChange={(e) => {
              const data = e.target.value.split("");
              if (data.length === 0) {
                setIsFirstLetter(true);
              } else {
                setIsFirstLetter(false);
              }
            }}
            onKeyPress={(e) => {
              if (!/^[0-9\b]$/.test(e.key)) {
                e.preventDefault();
              } else {
                if (e.key === "0" && isFirstLetter) {
                  e.preventDefault();
                }
              }
            }}
            maxLength={10}
            allowClear
            readOnly={view?.visible}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: view?.visible ? false : true,
              message: "Please input your email!",
            },
          ]}
          style={{ width: "48%" }}
        >
          <Input type="email" allowClear readOnly={view?.visible} />
        </Form.Item>
      </Row>
      <Row justify={"space-between"}>
        <Form.Item
          name="birthDate"
          label="Birth Date"
          rules={[
            {
              required: view?.visible ? false : true,
              message: "Please input your birth date!",
            },
          ]}
          style={{ width: "48%" }}
        >
          <DatePicker
            style={{ width: "100%" }}
            allowClear
            disabled={view?.visible}
          />
        </Form.Item>
        <Form.Item name="role" label="Job Position" style={{ width: "48%" }}>
          <Radio.Group
            onChange={onChange}
            value={role}
            disabled={view?.visible}
          >
            <Radio value={"employee"}>Employee</Radio>
            <Radio value={"admin"}>Admin</Radio>
          </Radio.Group>
        </Form.Item>
      </Row>
    </>
  );
};

const UserAuthentication = () => {
  const { add, edit, view } = useContext(AccountDrawerVisibilityContext);
  const isUsernameExist = useSelector(
    (store: any) => store.account.isUsernameExist
  );
  const isPassNotEqual = useSelector(
    (store: any) => store.account.isPassNotEqual
  );
  const isPassDoesNotMatch = useSelector(
    (store: any) => store.account.isPassDoesNotMatch
  );

  const dispatch = useDispatch();
  return (
    <>
      {(add?.visible || view?.visible || edit?.username.visible) && (
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: view?.visible ? false : true,
              message: "Please input your username!",
            },
          ]}
          validateStatus={isUsernameExist.isError ? "error" : ""}
          help={
            isUsernameExist.isError ? isUsernameExist.errorMessage : undefined
          }
        >
          <Input
            allowClear
            readOnly={view?.visible}
            onChange={() => {
              dispatch(
                setIsUsernameExist({ isError: false, errorMessage: "" })
              );
            }}
          />
        </Form.Item>
      )}

      {(add?.visible || edit?.password.visible) && (
        <>
          <Form.Item
            name={edit?.password.visible ? "newPassword" : "password"}
            label={edit?.password.visible ? "New Password" : "Password"}
            rules={[
              {
                required: true,
                message: edit?.userInformation.visible
                  ? "Please input your new password!"
                  : "Please input your password!",
              },
            ]}
            help={
              isPassNotEqual.isError && !isPassDoesNotMatch.isError ? (
                <span style={{ color: "red" }}>
                  {isPassNotEqual.errorMessage}
                </span>
              ) : undefined
            }
          >
            <Input.Password
              onChange={() => {
                dispatch(
                  setIsPassNotEqual({ isError: false, errorMessage: "" })
                );
                dispatch(
                  setIsPassDoesNotMatch({ isError: false, errorMessage: "" })
                );
              }}
            />
          </Form.Item>

          <Form.Item
            name={
              edit?.password.visible ? "confirmNewPassword" : "confirmPassword"
            }
            label={
              edit?.password.visible
                ? "Confirm New Password"
                : "Confirm Password"
            }
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
            ]}
            help={
              isPassDoesNotMatch.isError ? (
                <span style={{ color: "red" }}>
                  {isPassDoesNotMatch.errorMessage}
                </span>
              ) : undefined
            }
          >
            <Input.Password
              onChange={() => {
                dispatch(
                  setIsPassNotEqual({ isError: false, errorMessage: "" })
                );
                dispatch(
                  setIsPassDoesNotMatch({ isError: false, errorMessage: "" })
                );
              }}
            />
          </Form.Item>
        </>
      )}
    </>
  );
};

export const AccountForm = { UserInformation, UserAuthentication };

// {(add?.visible || edit?.username.visible) && (
//   <>
//     <Form.Item
//       name={
//         edit?.userInformation.visible ? "oldPassword" : "password"
//       }
//       label={
//         edit?.userInformation.visible ? "Old Password" : "Password"
//       }
//       rules={[
//         {
//           required: true,
//           message: edit?.userInformation.visible
//             ? "Please input your old password!"
//             : "Please input your password!",
//         },
//       ]}
//     >
//       <Input.Password /*readOnly={item?.view?.visible}*/ />
//     </Form.Item>

//     {edit?.username.visible && (
//       <Form.Item
//         name="newPassword"
//         label="New Password"
//         rules={[
//           { required: true, message: "Please input your new password!" },
//         ]}
//       >
//         <Input.Password /*readOnly={item?.view?.visible}*/ />
//       </Form.Item>
//     )}
//   </>
// )}
