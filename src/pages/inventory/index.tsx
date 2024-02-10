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
import useDrawerVisiblity from "@/common/hooks/useDrawerVisibility";
import { SelectedDataProvider } from "@/common/contexts/SelectedDataContext";
import useSelectedData from "@/common/hooks/useSelectedData";
import { ItemModal } from "@/components/modal/inventory/ItemModal";
import { PetMainModal } from "@/components/modal/inventory/PetModal";

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

const Inventory = ({ data: qwe }: any) => {
  const { pet, item } = useDrawerVisiblity();
  const { selectedData } = useSelectedData();
  const [inventorySort, setInventorySort] = useState();
  const [searchItemOnChange, setSearchItemOnChange] = useState("");
  const [searchItemOnClick, setSearchItemOnClick] = useState("");
  const [sortedAndSearchedItems, setSortedAndSearchedItems] =
    useState<inventoryInitialState[]>();

  const data = useSelector((store: any) => store.inventory.inventory);

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
            <ItemCard key={filteredData.inventoryId} data={filteredData} />
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
// export const getServerSideProps = async () => {
//   const db = await connectToDatabase();
//   const inventoryCollection = db.collection("inventory");

//   const data = await inventoryCollection.find({}).toArray();

//   const serializedData = data.map((item) => ({
//     ...item,
//     _id: item._id.toString(),
//   }));

//   return {
//     props: {
//       data: serializedData,
//     },
//   };
// };

export default Inventory;
