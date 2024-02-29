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
import {
  addOrder,
  deductStock,
  setStock,
} from "@/store/reducers/pointOfSalesSlice";
import { useDispatch, useSelector } from "react-redux";
const { Text, Title } = Typography;

const PosItemCard: React.FC<any> = ({ data }) => {
  const {
    inventoryId,
    name,
    inventoryQuantity,
    inventorySellingPrice,
    inventoryDescription,
    inventoryObject,
    inventoryType,
    inventoryCategory,
    inventoryGender,
    inventoryImage,
  } = data;

  const [quantity, setQuantity] = useState<any>("1");
  const itemStock = useSelector((store: any) => store.pointOfSales.itemStock);
  const stock = itemStock.find((item: any) => item.productId === inventoryId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setStock({
        productId: inventoryId,
        stock: inventoryQuantity,
      })
    );
  }, [inventoryId, inventoryQuantity]);

  const inputNumberHandler = (value: string | null) => {
    if (value || value == "0") {
      setQuantity(value);
    } else {
      setQuantity(null);
    }
  };

  const addHandler = () => {
    if (quantity <= stock?.stock) {
      dispatch(
        deductStock({
          productId: inventoryId,
          quantity: quantity,
        })
      );
      dispatch(
        addOrder({
          productId: inventoryId,
          itemDetails: data,
          quantity: +quantity,
          price: inventorySellingPrice,
        })
      );
      setQuantity("1");
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
          <div className={style.imageItemCard}>
            <img alt="example" src={inventoryImage[0]?.thumbUrl} />
          </div>

          <div className={style.itemCardSection1}>
            <div className={style.itemCardSection1Content}>
              <Title level={5} style={{ margin: "0" }}>
                {truncateString(name, 36)}
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
                <p style={{ marginTop: "5px" }}>Stock: {stock?.stock}</p>
              </div>
            </div>
            <Text style={{ fontWeight: "bold", color: "#237804" }}>
              ₱{addCommas(inventorySellingPrice)}
            </Text>
          </div>
        </div>

        <div className={style.itemCardSection2}>
          <div style={{ width: "100%" }}>
            <InputNumber
              type="number"
              min={"0"}
              precision={0}
              value={quantity}
              status={quantity > stock?.stock || quantity === 0 ? "error" : ""}
              style={{ width: "36%" }}
              onChange={inputNumberHandler}
              onKeyDown={(event) => onKeyDownTypeNumber(event, "quantity")}
            />
            {+quantity > stock?.stock && (
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
            disabled={!quantity || quantity > stock?.stock}
          >
            Add
          </Button>
        </div>
      </div>
    </>
  );
};
export default PosItemCard;
