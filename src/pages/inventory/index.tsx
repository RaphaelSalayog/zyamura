import ItemCard from "@/components/card/ItemCard";
import { Empty, Typography } from "antd";
import style from "@/styles/inventory.module.css";
import AddButton from "@/components/filter/inventory/AddButton";
import SearchBar from "@/components/filter/inventory/SearchBar";
import DropdownMenu from "@/components/util/DropdownMenu";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { inventoryInitialState } from "@/store/reducers/inventorySlice";
import { inventorySortItem } from "@/components/util/customMethods";
import { InventoryDrawerVisiblityProvider } from "@/common/contexts/InventoryDrawerVisibilityContext";
import useInventoryDrawerVisiblity from "@/common/hooks/useInventoryDrawerVisibility";
import { SelectedDataProvider } from "@/common/contexts/SelectedDataContext";
import useSelectedData from "@/common/hooks/useSelectedData";
import { ItemModal } from "@/components/modal/inventory/ItemModal";
import { PetMainModal } from "@/components/modal/inventory/PetModal";
import { GetServerSidePropsContext } from "next";

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

const Inventory = ({ data }: any) => {
  const { pet, item } = useInventoryDrawerVisiblity();
  const { selectedData } = useSelectedData();
  const [inventorySort, setInventorySort] = useState();
  const [searchItemOnChange, setSearchItemOnChange] = useState("");
  const [searchItemOnClick, setSearchItemOnClick] = useState("");
  const [sortedAndSearchedItems, setSortedAndSearchedItems] =
    useState<inventoryInitialState[]>();

  // const data = useSelector((store: any) => store.inventory.inventory);

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
    const sortedItems = inventorySortItem(inventorySort, data);
    // filter the sorted items by search key
    const sortedAndSearchedItem = sortedItems.filter((items: any) => {
      if (searchItemOnClick == "") {
        return items.inventoryName
          .toLowerCase()
          .includes(searchItemOnChange.toLowerCase());
      } else {
        return items.inventoryName === searchItemOnClick;
      }
    });
    setSortedAndSearchedItems(sortedAndSearchedItem);
  }, [inventorySort, data, searchItemOnChange, searchItemOnClick]);

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
    // We use context.req.cookies to access the token from Express.js middleware. ( Check it in Controllers > auth.js > res.setHeader("Set-Cookie", `token=${token}; Max-Age=${60 * 60 * 24}; HttpOnly; Secure;`); )
    const token = ctx?.req?.cookies;
    const response = await fetch("http://localhost:3000/inventory", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token.authToken,
      },
    });

    if (!response.ok) {
      throw new Error("Failed fetching inventory");
    }

    const data = await response.json();

    return {
      props: {
        data: data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        data: [],
      },
    };
  }
};

export default Inventory;
