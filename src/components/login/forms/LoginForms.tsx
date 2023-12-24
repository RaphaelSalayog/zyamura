import { Button, Form, Input, Typography } from "antd";
import style from "@/styles/loginForm.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const { Title, Text } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const LoginForms = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (email && password) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [email, password]);

  const submitHandler = (event: any) => {
    if (event.email === "qwe@gmail.com" && event.password === "zyamura") {
      localStorage.setItem("token", "qwe");
      router.push("/dashboard");
    } else {
      // console.log("error");
    }
  };

  return (
    <div style={{ maxWidth: "37%" }}>
      <div>LOGO</div>
      <Title
        level={2}
        style={{
          fontWeight: "bold",
          fontSize: "2.5em",
          padding: 0,
          margin: 0,
        }}
      >
        Welcome to Zyamura
      </Title>
      <p
        style={{ fontWeight: "light", color: "#8C8C8C", marginBottom: "14px" }}
      >
        LEXI is an HR online application able to provide a leave management
        system for employees
      </p>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={submitHandler}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="email"
          label="Email"
          labelCol={{ span: 24 }}
          rules={[
            {
              type: "email",
              message: "Please check your email address.",
              validateTrigger: "submit",
            },
          ]}
        >
          <Input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="user@zyamura.com"
            style={{ borderRadius: "0px" }}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          label="Password"
          labelCol={{ span: 24 }}
        >
          <Input.Password
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="example"
            style={{ borderRadius: "0px" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ minWidth: "100%", borderRadius: "0px" }}
            disabled={disableSubmit}
          >
            Login
          </Button>
        </Form.Item>

        <Link className="login-form-forgot" href="" style={{ float: "right" }}>
          Forgot password
        </Link>
      </Form>
    </div>
  );
};
export default LoginForms;
