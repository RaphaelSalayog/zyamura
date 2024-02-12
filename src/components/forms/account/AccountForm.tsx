import ImageUploader from "@/components/util/ImageUploader";
import { DatePicker, Form, Input, Radio, Row } from "antd";
import { useState } from "react";

const UserInformation = ({
  petImageHandler,
}: {
  petImageHandler: (value: any) => void;
}) => {
  const [role, setRole] = useState("");
  const [isFirstLetter, setIsFirstLetter] = useState(true);

  const onChange = (e: any) => {
    setRole(e.target.value);
  };

  return (
    <>
      <Row justify={"center"}>
        <Form.Item
          name="image"
          rules={[
            {
              required: true,
              message: "Please upload an image.",
            },
          ]}
        >
          <ImageUploader listType="picture-circle" getValue={petImageHandler} />
        </Form.Item>
      </Row>
      <Row justify={"space-between"}>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "Please input your first name!" }]}
          style={{ width: "48%" }}
        >
          <Input allowClear /*readOnly={item?.view?.visible}*/ />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Please input your last name!" }]}
          style={{ width: "48%" }}
        >
          <Input allowClear /*readOnly={item?.view?.visible}*/ />
        </Form.Item>
      </Row>
      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input allowClear /*readOnly={item?.view?.visible}*/ />
      </Form.Item>

      <Row justify={"space-between"}>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
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
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
          style={{ width: "48%" }}
        >
          <Input type="email" allowClear /*readOnly={item?.view?.visible}*/ />
        </Form.Item>
      </Row>
      <Row justify={"space-between"}>
        <Form.Item
          name="birthDate"
          label="Birth Date"
          rules={[{ required: true, message: "Please input your birth date!" }]}
          style={{ width: "48%" }}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="role" label="Job Position" style={{ width: "48%" }}>
          <Radio.Group
            onChange={onChange}
            value={role}
            // disabled={pet?.view?.visible || item?.view?.visible}
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
  return (
    <>
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input allowClear /*readOnly={item?.view?.visible}*/ />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password /*readOnly={item?.view?.visible}*/ />
      </Form.Item>
    </>
  );
};

export const AccountForm = { UserInformation, UserAuthentication };
