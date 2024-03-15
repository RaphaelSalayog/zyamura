import { Avatar, Col, Layout, Row, Space, Typography, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import style from "@/styles/mainLayout.module.css";
import MainNavigation from "../menu/MainNavigation";
import { useCallback, useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { ISocketUser, IUsers } from "@/common/model/account.model";

interface MainLayoutProps {
  children: any;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [user, setUser] = useState<any>();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const updateUserInformation = useCallback((data: IUsers) => {
    const newDataSocket = {
      ...data,
      profilePicture: `${process.env.API_URL}/` + data.profilePicture,
    };
    if (user?._id === newDataSocket._id) {
      setUser((prevState: any) => {
        return (prevState = {
          ...newDataSocket,
          credentials: prevState.credentials,
        });
      });
    }
  }, []);

  useEffect(() => {
    const socket = openSocket(`${process.env.API_URL}`, {
      transports: ["websocket"],
    });

    const socketHandler = (socketData: ISocketUser) => {
      if (socketData.action === "update information") {
        updateUserInformation(socketData.users);
      }
    };

    socket.on("user", socketHandler);
    return () => {
      socket.off("user", socketHandler);
    };
  }, []);

  const fetchUser = async () => {
    const auth = localStorage.getItem("token");
    const userId = localStorage.getItem("user");
    try {
      const response = await fetch(`${process.env.API_URL}/user/` + userId, {
        headers: {
          Authorization: "Bearer " + auth,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user!");
      }

      const userInfo = await response.json();

      userInfo.data.profilePicture = `${process.env.API_URL}/${userInfo.data.profilePicture}`;
      setUser(userInfo.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Layout>
        <MainNavigation />
        <Layout>
          <Header className={style.header}>
            <Row justify="end">
              <Col>
                <Space size="large">
                  {/* <Avatar>{username?.substring(0, 1)}</Avatar> */}
                  <Avatar src={user?.profilePicture} />
                  <Typography.Text>{user?.fullName}</Typography.Text>
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
