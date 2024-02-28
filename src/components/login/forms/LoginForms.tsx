import { Button, Form, Input, Row, Typography } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import logo from "@/assets/zyamuraLogo.svg";

const { Title, Text } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginForms = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (username && password) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [username, password]);

  const submitHandler = async (event: any) => {
    // try {
    //   setIsLoading(true);
    //   const response = await fetch("http://localhost:3000/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       username: username,
    //       password: password,
    //     }),
    //   });
    //   const data = await response.json();
    //   console.log(data);
    //   if (response.ok) {
    //     localStorage.setItem("token", data.token);
    //     localStorage.setItem("username", data.email);
    //     localStorage.setItem("user", data.user);
    //     localStorage.setItem("role", data.role);
    //     router.push("/dashboard");
    //   } else {
    //     if (data.message === "Invalid Username") {
    //       setIsUsernameError(true);
    //       setIsPasswordError(true);
    //     } else {
    //       setIsPasswordError(true);
    //     }
    //   }
    //   setIsLoading(false);
    // } catch (err) {
    //   console.log(err);
    // }
    if (event.username === "zyamura" && event.password === "zyamura") {
      localStorage.setItem("token", "token");
      router.push("/dashboard");
    } else {
      if (event.username !== "zyamura") {
        setIsUsernameError(true);
      }
      if (event.username !== "zyamura" || event.password !== "zyamura") {
        setIsPasswordError(true);
      }
    }
  };

  return (
    <div style={{ maxWidth: "37%" }}>
      <Row justify={"center"}>
        <img
          src={logo.src}
          style={{ height: "50%", width: "50%", objectFit: "cover" }}
        />
      </Row>
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
      {/* <p
        style={{ fontWeight: "light", color: "#8C8C8C", marginBottom: "14px" }}
      >
        LEXI is an HR online application able to provide a leave management
        system for employees
      </p> */}
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={submitHandler}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="username"
          label="Username"
          labelCol={{ span: 24 }}
          validateStatus={isUsernameError ? "error" : ""}
          help={isUsernameError ? "Invalid username." : undefined}
        >
          <Input
            onChange={(event) => {
              setIsUsernameError(false);
              setIsPasswordError(false);
              setUsername(event.target.value);
            }}
            placeholder="zyamura"
            style={{ borderRadius: "0px" }}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          label="Password"
          labelCol={{ span: 24 }}
          validateStatus={isPasswordError ? "error" : ""}
          help={isPasswordError ? "Invalid password." : undefined}
        >
          <Input.Password
            onChange={(event) => {
              setIsUsernameError(false);
              setIsPasswordError(false);
              setPassword(event.target.value);
            }}
            placeholder="zyamura"
            style={{ borderRadius: "0px" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ minWidth: "100%", borderRadius: "0px" }}
            disabled={disableSubmit}
            loading={isLoading}
          >
            Login
          </Button>
        </Form.Item>
        {/* <Link className="login-form-forgot" href="" style={{ float: "right" }}>
          Forgot password
        </Link> */}
      </Form>
    </div>
  );
};
export default LoginForms;
