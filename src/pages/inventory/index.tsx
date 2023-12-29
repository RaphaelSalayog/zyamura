import ItemCard from "@/components/card/ItemCard";
import { Typography } from "antd";
import style from "@/styles/inventory.module.css";
import AddButton from "@/components/filter/inventory/AddButton";
import SearchBar from "@/components/filter/inventory/SearchBar";
import DropdownMenu from "@/components/util/DropdownMenu";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InventorySort } from "@/components/util/SortItems";
import { inventoryInitialState } from "@/store/reducers/inventorySlice";

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

const Inventory = () => {
  const [inventorySort, setInventorySort] = useState();
  const [searchItemOnChange, setSearchItemOnChange] = useState("");
  const [searchItemOnClick, setSearchItemOnClick] = useState("");
  const [sortedAndSearchedItems, setSortedAndSearchedItems] =
    useState<inventoryInitialState[]>();

  const inventory = useSelector((store: any) => store.inventory.inventory);

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
    const sortedItems = InventorySort(inventorySort, inventory);
    // filter the sorted items by search key
    const sortedAndSearchedItem = sortedItems.filter((items: any) => {
      if (searchItemOnClick.localeCompare("")) {
        return items.inventoryName === searchItemOnClick;
      } else {
        return items.inventoryName.includes(searchItemOnChange);
      }
    });
    setSortedAndSearchedItems(sortedAndSearchedItem);
  }, [inventorySort, inventory, searchItemOnChange, searchItemOnClick]);

  return (
    <div style={{ padding: "2rem 2rem 0" }}>
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
          />
          <AddButton />
          <DropdownMenu
            type="sort"
            items={inventorySortItems}
            trigger="hover"
            style={{ height: "40px", marginLeft: "10px", width: "158.52px" }}
            getValue={inventorySortHandler}
          />
        </div>
      </div>
      <div className={style.itemCardParent}>
        {sortedAndSearchedItems?.map((filteredItem: any) => (
          <ItemCard
            key={filteredItem.inventoryId}
            image={filteredItem.inventoryImage[0]?.thumbUrl}
            title={filteredItem.inventoryName}
            quantity={filteredItem.inventoryQuantity}
            price={filteredItem.inventorySellingPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
