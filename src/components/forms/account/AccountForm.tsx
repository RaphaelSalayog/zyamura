import ImageUploader from "@/components/util/ImageUploader";
import { Form, Input, Row, Select } from "antd";
const { Option } = Select;

const UserInformation: React.FC<any> = () => {
  const [form] = Form.useForm();

  const submitHandler = async (value: any) => {};
  const onFinishFailed = (errorInfo: any) => {};

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Form
        form={form}
        onFinish={submitHandler}
        id="addItemForm"
        layout="vertical"
        onFinishFailed={onFinishFailed}
        onValuesChange={(changedValues, allValues) => {
          // To capitalize the first letter for every word
        }}
      >
        <Row justify={"center"}>
          <Form.Item
            name="accountImage"
            //   rules={[
            //     {
            //       required: item?.view?.visible ? false : true,
            //       message: "Please upload an image.",
            //     },
            //   ]}
          >
            <ImageUploader listType="picture-circle" getValue={() => {}} />
          </Form.Item>
        </Row>
        <Form.Item name="accountName" label="Name">
          <Input allowClear /*readOnly={item?.view?.visible}*/ />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input allowClear /*readOnly={item?.view?.visible}*/ />
        </Form.Item>
      </Form>
    </>
  );
};

const UserAuthentication: React.FC<any> = () => {
  const [form] = Form.useForm();

  const submitHandler = async (value: any) => {};
  const onFinishFailed = (errorInfo: any) => {};
  return (
    <>
      <Form
        form={form}
        onFinish={submitHandler}
        id="addItemForm"
        layout="vertical"
        onFinishFailed={onFinishFailed}
        onValuesChange={(changedValues, allValues) => {
          // To capitalize the first letter for every word
        }}
      >
        <Form.Item name="username" label="Username">
          <Input allowClear /*readOnly={item?.view?.visible}*/ />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input.Password /*readOnly={item?.view?.visible}*/ />
        </Form.Item>
        {/* {children} */}
      </Form>
    </>
  );
};

export const AccountForm = { UserInformation, UserAuthentication };
