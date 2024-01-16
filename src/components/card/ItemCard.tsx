import style from "@/styles/itemCard.module.css";
import Title from "antd/es/typography/Title";
import InventoryTag from "../util/InventoryTag";
import {
  addCommas,
  capitalizeFirstLetter,
  truncateString,
} from "../util/customMethods";
import { Button, Dropdown, Typography } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

const { Text } = Typography;

interface ItemCard {
  data: any;
}

const items = [
  {
    label: (
      <>
        <EditTwoTone /> Edit
      </>
    ),
    key: "edit",
    onClick: () => {
      <></>;
    },
  },
  {
    label: (
      <>
        <DeleteTwoTone /> Delete
      </>
    ),
    key: "delete",
    onClick: () => {},
  },
  {
    label: (
      <>
        <DeleteTwoTone /> Archive
      </>
    ),
    key: "archive",
    onClick: () => {},
  },
];
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
      <div className={style.itemCard}>
        <div className={style.itemCardImage}>
          <div className={style.itemCardImageContent}>
            {inventoryType && (
              <InventoryTag
                data={capitalizeFirstLetter(inventoryType)}
                color="#003eb3"
              />
            )}
            <Dropdown menu={{ items }} placement="bottom">
              <Button
                type="primary"
                className={style.itemCardImageContentButton}
              >
                ···
              </Button>
            </Dropdown>
          </div>
          <img
            alt="example"
            src={inventoryImage[0].thumbUrl}
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </div>

        <div className={style.itemCardContent}>
          <Title level={5}>{truncateString(inventoryName, 40)}</Title>
          <div>
            <div
              style={{
                display: "flex",
              }}
            >
              {inventoryObject === "Pet" ? (
                <>
                  <InventoryTag data={inventoryCategory} color="#1677ff" />
                  <InventoryTag data={inventoryGender} color="#1677ff" />
                </>
              ) : (
                <InventoryTag data={inventoryObject} color="#1677ff" />
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "5px",
              }}
            >
              <Text>Quantity: {inventoryQuantity}</Text>
              <Text style={{ fontWeight: "bold", color: "#237804" }}>
                ₱{addCommas(inventorySellingPrice)}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemCard;
