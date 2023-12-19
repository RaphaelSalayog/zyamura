import ItemCard from "@/components/card/ItemCard";
import { Button, Dropdown, Typography } from "antd";
import style from "@/styles/inventory.module.css";
import AddButton from "@/components/filter/inventory/AddButton";
import SearchBar from "@/components/filter/inventory/SearchBar";
import SortDropdown from "@/components/filter/inventory/SortDropdown";

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

const Inventory = () => {
  return (
    <div style={{ padding: "2rem" }}>
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
          <SortDropdown />
        </div>
      </div>
      <div className={style.itemCardParent}>
        {itemsQ.map((items) => (
          <ItemCard
            key={items.key}
            image={items.image}
            title={items.title}
            quantity={items.quantity}
            price={items.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
