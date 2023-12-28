import ItemCard from "@/components/card/ItemCard";
import { Typography } from "antd";
import style from "@/styles/inventory.module.css";
import AddButton from "@/components/filter/inventory/AddButton";
import SearchBar from "@/components/filter/inventory/SearchBar";
import DropdownMenu from "@/components/util/DropdownMenu";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InventorySort } from "@/components/util/SortItems";

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
  const [sortedItems, setSortedItems] = useState<any>();

  const inventory = useSelector((store: any) => store.inventory.inventory);

  const inventorySortHandler = (value: any) => {
    setInventorySort(value);
  };

  useEffect(() => {
    const items = InventorySort(inventorySort, inventory);
    setSortedItems(items);
  }, [inventorySort, inventory]);
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
          <SearchBar />
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
        {sortedItems?.map((items: any) => {
          // console.log(">> qwe >> ", items.inventoryImage[0]?.thumbUrl);
          return (
            <ItemCard
              key={items.inventoryId}
              image={items.inventoryImage[0]?.thumbUrl}
              title={items.inventoryName}
              quantity={items.inventoryQuantity}
              price={items.inventorySellingPrice}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Inventory;
