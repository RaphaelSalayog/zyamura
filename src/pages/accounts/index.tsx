import SearchBar from "@/components/filter/inventory/SearchBar";
import { Button, Row } from "antd";
import Typography from "antd/es/typography";
import { AccountModal } from "@/components/modal/account/AccountModal";
import { DrawerVisiblityProvider } from "@/common/contexts/DrawerVisibilityContext";
import useDrawerVisibility from "@/common/hooks/useDrawerVisiblity";
import UserCard from "@/components/card/UserCard";
import { GetServerSidePropsContext } from "next";
import { IUsers } from "@/common/model/account.model";
import useSelectedData from "@/common/hooks/useSelectedData";
import { SelectedDataProvider } from "@/common/contexts/SelectedDataContext";
import { useEffect, useState } from "react";

const { Title } = Typography;

const Accounts: React.FC<{ dataDb: IUsers[] }> = ({ dataDb }) => {
  const { add, edit, remove, view } = useDrawerVisibility();
  const { selectedData } = useSelectedData();

  const [searchItemOnChange, setSearchItemOnChange] = useState("");
  const [searchItemOnClick, setSearchItemOnClick] = useState("");
  const [sortedAndSearchedItems, setSortedAndSearchedItems] =
    useState<IUsers[]>();

  useEffect(() => {
    // filter the sorted items by search key
    const sortedAndSearchedItem = dataDb.filter((items) => {
      if (searchItemOnClick == "") {
        return items.fullName
          .toLowerCase()
          .includes(searchItemOnChange.toLowerCase());
      } else {
        return items.fullName === searchItemOnClick;
      }
    });
    setSortedAndSearchedItems(sortedAndSearchedItem);
  }, [dataDb, searchItemOnChange, searchItemOnClick]);

  return (
    <>
      <DrawerVisiblityProvider value={{ add, edit, remove, view }}>
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
            {sortedAndSearchedItems?.map((item) => (
              <UserCard key={item._id} user={item} />
            ))}
          </Row>
          <AccountModal.AddAccountModal />
        </SelectedDataProvider>
      </DrawerVisiblityProvider>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const getToken = ctx.req.headers.cookie;
    const token = getToken?.split("=")[1];
    const response = await fetch("http://localhost:3000/users", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();

    const modifiedData = data.map((item: IUsers) => {
      return {
        ...item,
        profilePicture: `http://localhost:3000/${item.profilePicture}`,
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
