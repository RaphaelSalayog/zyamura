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
import { IInventory } from "@/common/model/inventory.model";
const { Text, Title } = Typography;

interface IProps {
  data: IInventory;
}

const PosItemCard: React.FC<IProps> = ({ data }) => {
  const {
    _id,
    name,
    quantity,
    sellingPrice,
    description,
    object,
    type,
    category,
    gender,
    imageUrl,
  } = data;

  const [qty, setQty] = useState<any>("1");
  const itemStock = useSelector((store: any) => store.pointOfSales.itemStock);
  const stock = itemStock.find((item: any) => item._id === _id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setStock({
        _id: _id,
        stock: quantity,
      })
    );
  }, [_id, quantity]);

  const inputNumberHandler = (value: string | null) => {
    if (value || value == "0") {
      setQty(value);
    } else {
      setQty(null);
    }
  };

  const addHandler = () => {
    if (qty <= stock?.stock) {
      dispatch(
        deductStock({
          _id: _id,
          quantity: qty,
        })
      );
      dispatch(
        addOrder({
          _id: _id,
          itemDetails: data,
          quantity: +qty,
          price: sellingPrice,
        })
      );
      setQty("1");
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
            <img alt="example" src={imageUrl} />
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
                  {object === "Pet" ? (
                    <>
                      <InventoryTag data={category} color="#1677ff" />
                      <InventoryTag data={gender} color="#1677ff" />
                    </>
                  ) : (
                    <InventoryTag data={object} color="#1677ff" />
                  )}
                </div>
                <p style={{ marginTop: "5px" }}>Stock: {stock?.stock}</p>
              </div>
            </div>
            <Text style={{ fontWeight: "bold", color: "#237804" }}>
              ₱{addCommas(sellingPrice)}
            </Text>
          </div>
        </div>

        <div className={style.itemCardSection2}>
          <div style={{ width: "100%" }}>
            <InputNumber
              type="number"
              min={"0"}
              precision={0}
              value={qty}
              status={qty > stock?.stock || qty === 0 ? "error" : ""}
              style={{ width: "36%" }}
              onChange={inputNumberHandler}
              onKeyDown={(event) => onKeyDownTypeNumber(event, "quantity")}
            />
            {+qty > stock?.stock && (
              <WarningTooltip
                text="You have reached the maximum quantity available for this
                        item."
              />
            )}
            {qty == "0" && <WarningTooltip text="Minimum of 1 quantity." />}
          </div>

          <Button
            type="primary"
            style={{ height: "100%" }}
            onClick={addHandler}
            disabled={!qty || qty > stock?.stock}
          >
            Add
          </Button>
        </div>
      </div>
    </>
  );
};
export default PosItemCard;
