import style from "@/styles/posOrderedItemCard.module.css";
import { Button, InputNumber, Typography } from "antd";
import {
  addCommas,
  onKeyDownTypeNumber,
  truncateString,
} from "../util/customMethods";
import InventoryTag from "../util/InventoryTag";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  onChangeOrderedQuantity,
  orderedItems,
} from "@/store/reducers/pointOfSalesSlice";

const { Text, Title } = Typography;

const PosOrderedItemCard: React.FC<{ orderedItem: orderedItems }> = ({
  orderedItem,
}) => {
  const dispatch = useDispatch();
  const {
    itemDetails,
    quantity: orderedItemQuantity,
    totalItemPrice,
  } = orderedItem;

  const inputNumberHandler = (value: number | null) => {
    if (value === 0 || (value && value <= itemDetails.inventoryQuantity)) {
      dispatch(
        onChangeOrderedQuantity({
          productId: itemDetails.inventoryId,
          quantity: value,
        })
      );
    }
  };

  const onClickHandler = () => {
    dispatch(
      onChangeOrderedQuantity({
        productId: itemDetails.inventoryId,
        quantity: 0,
      })
    );
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.image}>
          <img
            alt="example"
            src={itemDetails.inventoryImage[0]?.thumbUrl}
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </div>

        <div className={style.content}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title level={5} style={{ margin: "0" }}>
              {truncateString(itemDetails.name, 36)}
            </Title>
            <Button
              type="default"
              style={{ border: "none" }}
              onClick={onClickHandler}
            >
              <CloseOutlined />
            </Button>
          </div>

          <div>
            <div
              style={{
                display: "flex",
              }}
            >
              {itemDetails.inventoryObject === "Pet" ? (
                <>
                  <InventoryTag
                    data={itemDetails.inventoryCategory}
                    color="#1677ff"
                  />
                  <InventoryTag
                    data={itemDetails.inventoryGender}
                    color="#1677ff"
                  />
                </>
              ) : (
                <InventoryTag
                  data={itemDetails.inventoryObject}
                  color="#1677ff"
                />
              )}
            </div>
            <div className={style.contentSection1}>
              <InputNumber
                type="number"
                min={0}
                precision={0}
                value={orderedItemQuantity}
                style={{ width: "36%" }}
                onChange={inputNumberHandler}
                onKeyDown={(event) => onKeyDownTypeNumber(event, "quantity")}
              />
              <Text style={{ fontWeight: "bold", color: "#237804" }}>
                ₱{addCommas(totalItemPrice)}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PosOrderedItemCard;
