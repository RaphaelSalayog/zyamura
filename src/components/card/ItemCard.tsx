import style from "@/styles/itemCard.module.css";

interface ItemCard {
  image: any;
  title: string;
  quantity: number;
  price: number;
}

const ItemCard: React.FC<ItemCard> = ({ image, title, quantity, price }) => {
  return (
    <>
      <div className={style.card}>
        <img
          alt="example"
          src={image}
          style={{ objectFit: "cover", width: "100%", height: "70%" }}
        />
        <div style={{ padding: "1.5rem" }}>
          <p>{title}</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Quantity : {quantity}</p>
            <p>P{price}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemCard;
