import { Button, Dropdown, Modal, Row } from "antd";
import style from "@/styles/userCard.module.css";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { DeleteTwoTone, EditTwoTone, EyeOutlined } from "@ant-design/icons";
import Typography from "antd/es/typography";
import { IUsers } from "@/common/model/account.model";
import { useContext } from "react";
import SelectedDataContext from "@/common/contexts/SelectedDataContext";
import AccountDrawerVisibilityContext from "@/common/contexts/AccountDrawerVisibilityContext";

const { Title, Text } = Typography;

const UserCard = ({ user }: { user: IUsers }) => {
  const { edit, view } = useContext(AccountDrawerVisibilityContext);
  const { set } = useContext(SelectedDataContext);

  const items = [
    {
      key: "view",
      label: "View",
      icon: <EyeOutlined style={{ color: "#1677ff" }} />,
      onClick: () => {
        view?.setVisible(true);
        set(user);
      },
    },
    {
      key: "edit",
      label: "Edit",
      icon: <EditTwoTone />,
      children: [
        {
          key: "user-information",
          label: "User Information",
          onClick: () => {
            edit?.userInformation.setVisible(true);
            set(user);
          },
        },
        {
          key: "username",
          label: "Username",
          onClick: () => {
            edit?.username.setVisible(true);
            set(user);
          },
        },
        {
          key: "password",
          label: "Password",
          onClick: () => {
            edit?.password.setVisible(true);
            set(user);
          },
        },
      ],
    },
    {
      key: "delete",
      label: "Delete",
      icon: <DeleteTwoTone twoToneColor={"red"} />,
      onClick: () => {
        Modal.confirm({
          title: "Confirm Deletion",
          content: (
            <>
              <p>Are you sure you want to delete this user?</p>
              <p>This action cannot be undone.</p>
            </>
          ),
          onOk: async () => {
            try {
              const auth = localStorage.getItem("token");
              const response = await fetch(
                `${process.env.API_URL}/user/` + user._id,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: "Bearer " + auth,
                  },
                }
              );

              if (!response.ok) {
                throw new Error("Failed to delete user!");
              }
            } catch (err) {
              console.log(err);
            }
          },
          centered: true,
        });
      },
    },
    // {
    //   key: "archive",
    //   label: "Archive",
    //   icon: <DeleteTwoTone />,
    //   onClick: () => {},
    // },
  ];
  return (
    <>
      <Row className={style.userCard}>
        <Row
          justify={"center"}
          style={{
            // border: "1px solid black",
            height: "50%",
            width: "100%",
            marginBottom: "5px",
            position: "relative",
          }}
        >
          <Row style={{ position: "absolute", right: "0" }}>
            <Dropdown menu={{ items }} placement="bottom">
              <Button
                type="primary"
                className={style.itemCardImageContentButton}
              >
                ···
              </Button>
            </Dropdown>
          </Row>
          <img
            src={user.profilePicture}
            style={{
              height: "159px",
              width: "159px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Row>
        <Row style={{ height: "48%", width: "100%" }}>
          <Row
            style={{
              height: "57.66px",
              width: "100%",
            }}
          >
            <Title
              level={5}
              style={{
                margin: "0",
                textAlign: "center",
                width: "100%",
              }}
            >
              {user.fullName}
            </Title>
          </Row>
          <Row
            style={{
              height: "95px",
            }}
          >
            <Row
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <PhoneOutlined style={{ color: "#1677ff", marginRight: "8px" }} />
              <Text>(+63) {user.phoneNumber}</Text>
            </Row>
            <Row
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <MailOutlined style={{ color: "#1677ff", marginRight: "8px" }} />
              <Text>{user.email}</Text>
            </Row>
            <Row
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <UserOutlined style={{ color: "#1677ff", marginRight: "8px" }} />
              <Text>{user.role}</Text>
            </Row>
          </Row>
        </Row>
      </Row>
    </>
  );
};

export default UserCard;
