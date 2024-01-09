import style from "@/styles/posItemCard.module.css";
import InventoryTag from "../util/InventoryTag";
import { Button, InputNumber, Typography } from "antd";
import {
  addCommas,
  onKeyDownTypeNumber,
  truncateString,
} from "../util/customMethods";
import { useEffect, useState } from "react";
import WarningTooltip from "../util/WarningTooltip";
import { addOrder } from "@/store/reducers/pointOfSalesSlice";
import { useDispatch } from "react-redux";
const { Text, Title } = Typography;

const PosItemCard: React.FC<any> = ({ data }) => {
  const [quantity, setQuantity] = useState<any>("1");
  const [stock, setStock] = useState(0);

  const dispatch = useDispatch();

  const {
    inventoryId,
    inventoryName,
    inventoryQuantity,
    inventorySellingPrice,
    inventoryDescription,
    inventoryObject,
    inventoryType,
    inventoryCategory,
    inventoryGender,
    inventoryImage,
  } = data;

  //ERROR
  useEffect(() => {
    setStock(inventoryQuantity);
  }, [inventoryQuantity]);

  const inputNumberHandler = (value: string | null) => {
    if (value || value == "0") {
      setQuantity(value);
    } else {
      setQuantity(null);
    }
  };

  const addHandler = () => {
    if (quantity <= stock) {
      setStock((prevState) => prevState - quantity);
      setQuantity("1");
      dispatch(
        addOrder({
          productId: inventoryId,
          quantity: +quantity,
          price: inventorySellingPrice,
        })
      );
    }
  };
  return (
    <>
      <div className={style.itemCard}>
        <div
          style={{
            display: "flex",
            height: "75%",
          }}
        >
          <div
            style={{
              width: "30%",
              marginRight: "2%",
              borderRadius: "8px",
              overflow: "hidden",
              // border: "1px solid black",
            }}
          >
            <img
              alt="example"
              src={inventoryImage[0]?.thumbUrl}
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              width: "68%",
              justifyContent: "space-between",
              height: "100%",
              // border: "1px solid black",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "70%",
                justifyContent: "space-between",
              }}
            >
              <Title level={5} style={{ margin: "0" }}>
                {truncateString(inventoryName, 36)}
              </Title>
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
                <p style={{ marginTop: "5px" }}>Stock: {stock}</p>
              </div>
            </div>
            <Text style={{ fontWeight: "bold", color: "#237804" }}>
              ₱{addCommas(inventorySellingPrice)}
            </Text>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "5px",
            height: `calc(25% - 5px)`,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "100%" }}>
            <InputNumber
              type="number"
              min={"0"}
              precision={0}
              value={quantity}
              style={{ width: "36%" }}
              onChange={inputNumberHandler}
              onKeyDown={(event) => onKeyDownTypeNumber(event, "quantity")}
            />
            {+quantity > stock && (
              <WarningTooltip
                text="You have reached the maximum quantity available for this
                        item."
              />
            )}
            {quantity == "0" && (
              <WarningTooltip text="Minimum of 1 quantity." />
            )}
          </div>

          <Button
            type="primary"
            style={{ height: "100%" }}
            onClick={addHandler}
            disabled={!quantity || quantity > stock}
          >
            Add
          </Button>
        </div>
      </div>
    </>
  );
};
export default PosItemCard;
