import { Avatar, Col, Layout, Row, Space, Typography, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import style from "@/styles/mainLayout.module.css";
import MainNavigation from "../menu/MainNavigation";

interface MainLayoutProps {
  children: any;
}

const username = "Raphael Salayog";
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout>
        <MainNavigation />
        <Layout>
          <Header className={style.header}>
            <Row justify="end">
              <Col>
                <Space size="large">
                  <Avatar>{username?.substring(0, 1)}</Avatar>
                  <Typography.Text>{username}</Typography.Text>
                </Space>
              </Col>
            </Row>
          </Header>
          <Content className="main-content" style={{ margin: "0 16px" }}>
            <div
              style={{
                padding: "1rem",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                margin: "16px 0",
                height: "89.9vh",
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
