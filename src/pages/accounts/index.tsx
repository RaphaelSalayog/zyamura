import { InventoryDrawerVisiblityProvider } from "@/common/contexts/InventoryDrawerVisibilityContext";
import { SelectedDataProvider } from "@/common/contexts/SelectedDataContext";
import SearchBar from "@/components/filter/inventory/SearchBar";
import { Button, Col, Dropdown, Row } from "antd";
import Typography from "antd/es/typography";
import style from "@/styles/accountCard.module.css";
import {
  DeleteTwoTone,
  EditTwoTone,
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AccountModal } from "@/components/modal/account/AccountModal";
import { DrawerVisiblityProvider } from "@/common/contexts/DrawerVisibilityContext";
import useDrawerVisibility from "@/common/hooks/useDrawerVisiblity";

const { Title, Text } = Typography;

const Accounts: React.FC<any> = () => {
  const { add, edit, remove, view } = useDrawerVisibility();
  const items = [
    {
      key: "view",
      label: "View",
      icon: <EyeOutlined style={{ color: "#1677ff" }} />,
      onClick: () => {},
    },
    {
      key: "edit",
      label: "Edit",
      icon: <EditTwoTone />,
      onClick: () => {},
    },
    {
      key: "delete",
      label: "Delete",
      icon: <DeleteTwoTone twoToneColor={"red"} />,
      onClick: () => {},
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
      <DrawerVisiblityProvider value={{ add, edit, remove, view }}>
        {/* <SelectedDataProvider value={{}}> */}
        <Row justify={"space-between"}>
          <Title level={2}>ACCOUNTS</Title>
          <Row>
            <SearchBar
              getValueOnChange={() => {}}
              getValueOnClick={() => {}}
              sortedAndSearchedItems={[]}
              type="inventory"
            />
            <Button
              type="primary"
              style={{ height: "40px", marginLeft: "10px" }}
              onClick={() => {
                add?.setVisible(true);
              }}
            >
              Add Account
            </Button>
          </Row>
        </Row>
        <Row
          style={{
            marginTop: "1rem",
            height: "81vh",
            overflowY: "auto",
            display: "flex",
            flexFlow: "row wrap",
            position: "relative",
          }}
        >
          <Row className={style.accountCard}>
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
                src="https://img.freepik.com/free-photo/portrait-young-beautiful-businesswoman-smiling_176420-9906.jpg?w=1380&t=st=1707590994~exp=1707591594~hmac=e8943c0d41be38ce805baaab070c403efb7ea3ad088a3b56b9883d4e51b32ba3"
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
                  Raphael Earl L. Salayog
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
                  <PhoneOutlined
                    style={{ color: "#1677ff", marginRight: "8px" }}
                  />
                  <Text>(+63) 9451472698</Text>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MailOutlined
                    style={{ color: "#1677ff", marginRight: "8px" }}
                  />
                  <Text>rsalayog0199@gmail.com</Text>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <UserOutlined
                    style={{ color: "#1677ff", marginRight: "8px" }}
                  />
                  <Text>Employee</Text>
                </Row>
              </Row>
            </Row>
          </Row>
        </Row>
        <AccountModal.AddAccountModal />
        {/* </SelectedDataProvider> */}
      </DrawerVisiblityProvider>
    </>
  );
};

export default Accounts;
