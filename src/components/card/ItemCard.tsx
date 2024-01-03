import style from "@/styles/itemCard.module.css";
import Title from "antd/es/typography/Title";
import InventoryTag from "../util/InventoryTag";
import { addCommas } from "../util/customMethods";
import { Typography } from "antd";

const { Text } = Typography;

interface ItemCard {
  data: any;
}

const ItemCard: React.FC<ItemCard> = ({ data }) => {
  const {
    inventoryName,
    inventoryQuantity,
    inventorySellingPrice,
    inventoryObject,
    inventoryType,
    inventoryCategory,
    inventoryGender,
    inventoryImage,
  } = data;

  return (
    <>
      <div className={style.card}>
        <div style={{ position: "relative", width: "100%", height: "65%" }}>
          <div
            style={{
              position: "absolute",
              padding: "1rem",
            }}
          >
            {inventoryType && (
              <InventoryTag data={inventoryType} color="#003eb3" />
            )}
          </div>
          <img
            alt="example"
            src={inventoryImage[0].thumbUrl}
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </div>

        <div
          style={{
            padding: "1rem",
            height: "35%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Title level={5}>{inventoryName}</Title>
          <div
            style={{
              display: "flex",
            }}
          >
            {data.inventoryObject === "Pet" ? (
              <>
                <InventoryTag data={inventoryCategory} color="#1677ff" />
                <InventoryTag data={inventoryGender} color="#1677ff" />
              </>
            ) : (
              <InventoryTag data={inventoryObject} color="#1677ff" />
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Qty: {addCommas(inventoryQuantity)}</Text>
            <Text style={{ fontWeight: "bold", color: "#237804" }}>
              ₱{addCommas(inventorySellingPrice)}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemCard;
