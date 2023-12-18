import { Avatar, Col, Layout, Row, Space, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import style from "@/styles/mainLayout.module.css";
import MainNavigation from "../menu/MainNavigation";

interface MainLayoutProps {
  children: any;
}

const username = "Raphael Salayog";
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
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
          <Content className="main-content">{children}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
