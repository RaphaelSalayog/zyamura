import SearchBar from "@/components/filter/inventory/SearchBar";
import { Button, Row } from "antd";
import Typography from "antd/es/typography";
import { AccountModal } from "@/components/modal/account/AccountModal";
import UserCard from "@/components/card/UserCard";
import { GetServerSidePropsContext } from "next";
import {
  ISocketUser,
  IUsers,
  IUsersUsername,
} from "@/common/model/account.model";
import useSelectedData from "@/common/hooks/useSelectedData";
import { SelectedDataProvider } from "@/common/contexts/SelectedDataContext";
import { useCallback, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { AccountDrawerVisiblityProvider } from "@/common/contexts/AccountDrawerVisibilityContext";
import useAccountDrawerVisibility from "@/common/hooks/useAccountDrawerVisibility";
import openSocket from "socket.io-client";

const { Title } = Typography;

const Accounts: React.FC<{ dataDb: IUsers[] }> = ({ dataDb }) => {
  const [users, setUsers] = useState(dataDb);
  const { add, edit, remove, view } = useAccountDrawerVisibility();
  const { selectedData } = useSelectedData();

  const [searchItemOnChange, setSearchItemOnChange] = useState("");
  const [searchItemOnClick, setSearchItemOnClick] = useState("");
  const [sortedAndSearchedItems, setSortedAndSearchedItems] =
    useState<IUsers[]>();

  const addUser = useCallback((data: IUsers) => {
    const newDataSocket = {
      ...data,
      profilePicture: `${process.env.API_URL}/` + data.profilePicture,
    };
    setUsers((prevState) => {
      return [...prevState, newDataSocket];
    });
  }, []);

  const updateUserInformation = useCallback((data: IUsers) => {
    const newDataSocket = {
      ...data,
      profilePicture: `${process.env.API_URL}/` + data.profilePicture,
    };
    setUsers((prevState) => {
      const updateUser = [...prevState];
      const index = updateUser.findIndex((item) => item._id === data._id);
      if (index > -1) {
        updateUser[index] = {
          ...newDataSocket,
          credentials: updateUser[index].credentials,
        };
      }
      return updateUser;
    });
  }, []);

  const updateUserUsername = useCallback((data: IUsersUsername) => {
    setUsers((prevState) => {
      const updateUser = [...prevState];
      const index = updateUser.findIndex((item) => item._id === data._id);
      if (index > -1) {
        updateUser[index] = {
          ...updateUser[index],
          credentials: {
            username: data.username,
          },
        };
      }
      return updateUser;
    });
  }, []);

  const deleteUser = useCallback((data: string) => {
    setUsers((prevState) => {
      const updateUser = [...prevState];
      const index = updateUser.findIndex((item) => item._id === data);
      if (index > -1) {
        updateUser.splice(index, 1);
      }
      return updateUser;
    });
  }, []);

  useEffect(() => {
    const socket = openSocket(`${process.env.API_URL}`, {
      transports: ["websocket"],
    });

    const socketHandler = (socketData: ISocketUser) => {
      if (socketData.action === "create") {
        addUser(socketData.users);
      }
      if (socketData.action === "update information") {
        updateUserInformation(socketData.users);
      }
      if (socketData.action === "update username") {
        updateUserUsername(socketData.users);
      }
      if (socketData.action === "delete") {
        deleteUser(socketData.users);
      }
    };

    socket.on("user", socketHandler);
    return () => {
      socket.off("user", socketHandler);
    };
  }, []);

  useEffect(() => {
    // filter the sorted items by search key
    const sortedAndSearchedItem = users.filter((items) => {
      if (searchItemOnClick == "") {
        return items.fullName
          .toLowerCase()
          .includes(searchItemOnChange.toLowerCase());
      } else {
        return items.fullName === searchItemOnClick;
      }
    });
    setSortedAndSearchedItems(sortedAndSearchedItem);
  }, [users, searchItemOnChange, searchItemOnClick]);

  return (
    <>
      <AccountDrawerVisiblityProvider value={{ add, edit, remove, view }}>
        <SelectedDataProvider value={selectedData}>
          <Row justify={"space-between"}>
            <Title level={2}>ACCOUNTS</Title>
            <Row>
              <SearchBar
                getValueOnChange={setSearchItemOnChange}
                getValueOnClick={setSearchItemOnClick}
                sortedAndSearchedItems={sortedAndSearchedItems}
                type="account"
              />
              <Button
                type="default"
                icon={<PlusOutlined />}
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
            {sortedAndSearchedItems?.map((item) => (
              <UserCard key={item._id} user={item} />
            ))}
          </Row>
          <AccountModal.AddAccountModal />
        </SelectedDataProvider>
      </AccountDrawerVisiblityProvider>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const getToken = ctx.req.headers.cookie;
    const token = getToken?.split("=")[1];
    const response = await fetch(`${process.env.API_URL}/users`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();

    const modifiedData = data.map((item: IUsers) => {
      return {
        ...item,
        profilePicture: `${process.env.API_URL}/${item.profilePicture}`,
      };
    });

    return {
      props: {
        dataDb: modifiedData,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        dataDb: [],
      },
    };
  }
};

export default Accounts;
