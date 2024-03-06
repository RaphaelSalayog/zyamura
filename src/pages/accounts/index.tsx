import SearchBar from "@/components/filter/inventory/SearchBar";
import { Button, Row } from "antd";
import Typography from "antd/es/typography";
import { AccountModal } from "@/components/modal/account/AccountModal";
import { DrawerVisiblityProvider } from "@/common/contexts/DrawerVisibilityContext";
import useDrawerVisibility from "@/common/hooks/useDrawerVisiblity";
import UserCard from "@/components/card/UserCard";
import { GetServerSidePropsContext } from "next";
import { IUsers } from "@/common/model/account.model";

const { Title } = Typography;

const Accounts: React.FC<{ dataDb: IUsers[] }> = ({ dataDb }) => {
  const { add, edit, remove, view } = useDrawerVisibility();

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
          {dataDb.map((item) => (
            <UserCard user={item} />
          ))}
        </Row>
        <AccountModal.AddAccountModal />
        {/* </SelectedDataProvider> */}
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
