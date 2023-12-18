import LoginCarousel from "@/components/login/carousel/LoginCarousel";
import LoginForms from "@/components/login/forms/LoginForms";
import style from "@/styles/login.module.css";
import { Col, Layout, Row } from "antd";

const Login = () => {
  return (
    <Layout>
      <Row className={style.login}>
        <Col span={12}>
          <LoginCarousel />
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoginForms />
        </Col>
      </Row>
    </Layout>
  );
};

export default Login;
