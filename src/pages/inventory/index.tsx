import ItemCard from "@/components/card/ItemCard";
import { Typography } from "antd";
import style from "@/styles/inventory.module.css";
import AddButton from "@/components/filter/inventory/AddButton";
import SearchBar from "@/components/filter/inventory/SearchBar";
import DropdownMenu from "@/components/util/DropdownMenu";
import { useState } from "react";
import { useSelector } from "react-redux";

const { Title } = Typography;

const itemsQ = [
  {
    key: 1,
    image:
      "https://img.freepik.com/free-photo/portrait-young-woman-with-natural-make-up_23-2149084942.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1702857600&semt=sph",
    title: "Europe Street beat",
    quantity: 20,
    price: 5000,
  },
  {
    key: 2,
    image:
      "https://images.pexels.com/photos/5091121/pexels-photo-5091121.jpeg?cs=srgb&dl=pexels-leah-kelley-5091121.jpg&fm=jpg",
    title: "Europe Street beat",
    quantity: 20,
    price: 5000,
  },
  {
    key: 3,
    image:
      "https://img.freepik.com/free-photo/portrait-young-woman-with-natural-make-up_23-2149084942.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1702857600&semt=sph",
    title: "Europe Street beat",
    quantity: 20,
    price: 5000,
  },
  {
    key: 4,
    image:
      "https://images.pexels.com/photos/5091121/pexels-photo-5091121.jpeg?cs=srgb&dl=pexels-leah-kelley-5091121.jpg&fm=jpg",
    title: "Europe Street beat",
    quantity: 20,
    price: 5000,
  },
  {
    key: 5,
    image:
      "https://img.freepik.com/free-photo/portrait-young-woman-with-natural-make-up_23-2149084942.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1702857600&semt=sph",
    title: "Europe Street beat",
    quantity: 20,
    price: 5000,
  },
  {
    key: 6,
    image:
      "https://images.pexels.com/photos/5091121/pexels-photo-5091121.jpeg?cs=srgb&dl=pexels-leah-kelley-5091121.jpg&fm=jpg",
    title: "Europe Street beat",
    quantity: 20,
    price: 5000,
  },
  {
    key: 7,
    image:
      "https://img.freepik.com/free-photo/portrait-young-woman-with-natural-make-up_23-2149084942.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1702857600&semt=sph",
    title: "Europe Street beat",
    quantity: 20,
    price: 5000,
  },
  {
    key: 8,
    image:
      "https://images.pexels.com/photos/5091121/pexels-photo-5091121.jpeg?cs=srgb&dl=pexels-leah-kelley-5091121.jpg&fm=jpg",
    title: "Europe Street beat",
    quantity: 20,
    price: 5000,
  },
  {
    key: 9,
    image:
      "https://img.freepik.com/free-photo/portrait-young-woman-with-natural-make-up_23-2149084942.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1702857600&semt=sph",
    title: "Europe Street beat",
    quantity: 20,
    price: 5000,
  },
  {
    key: 10,
    image:
      "https://images.pexels.com/photos/5091121/pexels-photo-5091121.jpeg?cs=srgb&dl=pexels-leah-kelley-5091121.jpg&fm=jpg",
    title: "Europe Street beat",
    quantity: 20,
    price: 5000,
  },
  {
    key: 11,
    image:
      "https://img.freepik.com/free-photo/portrait-young-woman-with-natural-make-up_23-2149084942.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1702857600&semt=sph",
    title: "Europe Street beat",
    quantity: 20,
    price: 5000,
  },
  {
    key: 12,
    image:
      "https://images.pexels.com/photos/5091121/pexels-photo-5091121.jpeg?cs=srgb&dl=pexels-leah-kelley-5091121.jpg&fm=jpg",
    title: "Europe Street beat",
    quantity: 20,
    price: 5000,
  },
  {
    key: 13,
    image:
      "https://img.freepik.com/free-photo/portrait-young-woman-with-natural-make-up_23-2149084942.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1702857600&semt=sph",
    title: "Europe Street beat",
    quantity: 20,
    price: 5000,
  },
];

const inventorySortItems = [
  {
    label: "Latest",
    key: "1",
  },
  {
    label: "Oldest",
    key: "2",
  },
  {
    label: "Name (A-Z)",
    key: "3",
  },
  {
    label: "Name (Z-A)",
    key: "4",
  },
  {
    label: "Highest Price",
    key: "5",
  },
  {
    label: "Lowest Price",
    key: "6",
  },
  {
    label: "Highest Quantity",
    key: "7",
  },
  {
    label: "Lowest Quantity",
    key: "8",
  },
];

const Inventory = () => {
  const [inventorySort, setInventorySort] = useState();

  const inventory = useSelector((store: any) => store.inventory.inventory);

  const inventorySortHandler = (value: any) => {
    setInventorySort(value);
  };
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
        {inventory.map((items: any) => (
          <ItemCard
            key={items.inventoryId}
            image={items.inventoryImage[0].thumbUrl}
            title={items.inventoryName}
            quantity={items.inventoryQuantity}
            price={items.inventorySellingPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
