import ItemCard from "@/components/card/ItemCard";
import { Empty, Typography } from "antd";
import style from "@/styles/inventory.module.css";
import AddButton from "@/components/filter/inventory/AddButton";
import SearchBar from "@/components/filter/inventory/SearchBar";
import DropdownMenu from "@/components/util/DropdownMenu";
import { useCallback, useEffect, useState } from "react";
import { inventorySortItem } from "@/components/util/customMethods";
import { InventoryDrawerVisiblityProvider } from "@/common/contexts/InventoryDrawerVisibilityContext";
import useInventoryDrawerVisiblity from "@/common/hooks/useInventoryDrawerVisibility";
import { SelectedDataProvider } from "@/common/contexts/SelectedDataContext";
import useSelectedData from "@/common/hooks/useSelectedData";
import { ItemModal } from "@/components/modal/inventory/ItemModal";
import { PetMainModal } from "@/components/modal/inventory/PetModal";
import { GetServerSidePropsContext } from "next";
import { IInventory, ISocketInventory } from "@/common/model/inventory.model";
import openSocket from "socket.io-client";

const { Title } = Typography;

const inventorySortItems = [
  {
    label: "Latest",
    key: "Latest",
  },
  {
    label: "Oldest",
    key: "Oldest",
  },
  {
    label: "Name (A-Z)",
    key: "Name (A-Z)",
  },
  {
    label: "Name (Z-A)",
    key: "Name (Z-A)",
  },
  {
    label: "Highest Price",
    key: "Highest Price",
  },
  {
    label: "Lowest Price",
    key: "Lowest Price",
  },
  {
    label: "Highest Quantity",
    key: "Highest Quantity",
  },
  {
    label: "Lowest Quantity",
    key: "Lowest Quantity",
  },
];

interface IProps {
  dataDb: IInventory[];
}

const Inventory: React.FC<IProps> = ({ dataDb }) => {
  const [inventory, setInventory] = useState(dataDb);
  const { pet, item } = useInventoryDrawerVisiblity();
  const { selectedData } = useSelectedData();
  const [inventorySort, setInventorySort] = useState();
  const [searchItemOnChange, setSearchItemOnChange] = useState("");
  const [searchItemOnClick, setSearchItemOnClick] = useState("");
  const [sortedAndSearchedItems, setSortedAndSearchedItems] =
    useState<IInventory[]>();

  // const data = useSelector((store: any) => store.inventory.inventory);

  //Web Socket
  const addInventory = useCallback((data: IInventory) => {
    const newDataSocket = {
      ...data,
      imageUrl: "http://localhost:3000/" + data.imageUrl,
    };
    setInventory((prevState) => [...prevState, newDataSocket]);
  }, []);

  const updateInventory = useCallback((data: IInventory) => {
    const newDataSocket = {
      ...data,
      imageUrl: "http://localhost:3000/" + data.imageUrl,
    };
    setInventory((prevState) => {
      const updateInventory = [...prevState];
      const index = updateInventory.findIndex((item) => item._id === data._id);
      if (index > -1) {
        updateInventory[index] = newDataSocket;
      }
      return updateInventory;
    });
  }, []);

  const deleteInventory = useCallback((data: string) => {
    setInventory((prevState) => {
      const updateInventory = [...prevState];
      const index = updateInventory.findIndex((item) => item._id === data);
      if (index > -1) {
        updateInventory.splice(index, 1);
      }
      return updateInventory;
    });
  }, []);

  useEffect(() => {
    const socket = openSocket("http://localhost:3000", {
      transports: ["websocket"],
    });

    const socketHandler = (socketData: ISocketInventory) => {
      if (socketData.action === "create") {
        addInventory(socketData.inventory);
      } else if (socketData.action === "update") {
        updateInventory(socketData.inventory);
      } else if (socketData.action === "delete") {
        deleteInventory(socketData.inventory);
      }
    };

    /* socket.on is an event listener kaya kahit walang dependency, gumagana pa rin siya. 
    Pag may changes sa backend kung saan naka call yung "inventory", automatic ieexecute yung addPost */
    socket.on("inventory", socketHandler);
    return () => {
      // Cleanup: Remove the event listener when the component is unmounted
      // Para hindi ma readd yung even listener
      socket.off("inventory", socketHandler);
    };
  }, []);

  const itemSearchOnChangeHandler = (value: string) => {
    setSearchItemOnChange(value);
  };

  const itemSearchOnClickHandler = (value: string) => {
    setSearchItemOnClick(value);
  };

  const inventorySortHandler = (value: any) => {
    setInventorySort(value);
  };

  useEffect(() => {
    // sorted items
    const sortedItems = inventorySortItem(inventorySort, inventory);
    // filter the sorted items by search key
    const sortedAndSearchedItem = sortedItems.filter((items: any) => {
      if (searchItemOnClick == "") {
        return items.name
          .toLowerCase()
          .includes(searchItemOnChange.toLowerCase());
      } else {
        return items.name === searchItemOnClick;
      }
    });
    setSortedAndSearchedItems(sortedAndSearchedItem);
  }, [inventorySort, inventory, searchItemOnChange, searchItemOnClick]);

  return (
    <InventoryDrawerVisiblityProvider value={{ pet, item }}>
      <SelectedDataProvider value={selectedData}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title level={2}>INVENTORY</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <SearchBar
              getValueOnChange={itemSearchOnChangeHandler}
              getValueOnClick={itemSearchOnClickHandler}
              sortedAndSearchedItems={sortedAndSearchedItems}
              type="inventory"
            />
            <AddButton />
            <DropdownMenu
              type="sort"
              items={inventorySortItems}
              trigger="hover"
              style={{
                height: "40px",
                marginLeft: "10px",
                width: "158.52px",
              }}
              setValue={inventorySortHandler}
            />
          </div>
        </div>
        <div
          className={style.itemCardParent}
          style={{
            justifyContent:
              sortedAndSearchedItems?.length === 0 ? "center" : "",
            alignContent: sortedAndSearchedItems?.length === 0 ? "center" : "",
          }}
        >
          {sortedAndSearchedItems?.map((filteredData: any) => (
            <ItemCard key={filteredData._id} data={filteredData} />
          ))}
          {sortedAndSearchedItems?.length === 0 && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              style={{ marginBottom: "100px" }}
            />
          )}
        </div>

        <PetMainModal.PetInformationModal />
        <ItemModal.AddItemModal />
      </SelectedDataProvider>
    </InventoryDrawerVisiblityProvider>
  );
};

// Mongo DB
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    // We can't get the token from localStorage because it is for client side only.
    // We use context.req.headers.cookie to access the token from Express.js middleware. ( Check it in Controllers > auth.js > res.setHeader("Set-Cookie", `token=${token}; Max-Age=${60 * 60 * 24}; HttpOnly; Secure;`); )
    const getToken = ctx.req.headers.cookie;
    const token = getToken?.split("=")[1];
    const response = await fetch("http://localhost:3000/inventory", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Failed fetching inventory");
    }

    const data = await response.json();

    const modifiedData = data.map((item: IInventory) => {
      return { ...item, imageUrl: `http://localhost:3000/${item.imageUrl}` };
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

export default Inventory;
