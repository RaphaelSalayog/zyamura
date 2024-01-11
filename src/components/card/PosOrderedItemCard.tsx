import style from "@/styles/posOrderedItemCard.module.css";
import { Button, InputNumber, Typography } from "antd";
import {
  addCommas,
  onKeyDownTypeNumber,
  truncateString,
} from "../util/customMethods";
import InventoryTag from "../util/InventoryTag";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { onChangeOrderedQuantity } from "@/store/reducers/pointOfSalesSlice";

const { Text, Title } = Typography;

const PosOrderedItemCard: React.FC<any> = ({ orderedItem }) => {
  const data = useSelector((store: any) => store.inventory.inventory);
  const item = data.find(
    (item: any) => item.inventoryId === orderedItem.productId
  );

  const dispatch = useDispatch();
  const { quantity: orderedItemQuantity, totalItemPrice } = orderedItem;

  const {
    inventoryId,
    inventoryName,
    inventoryObject,
    inventoryCategory,
    inventoryGender,
    inventoryImage,
  } = item;

  const inputNumberHandler = (value: string | null) => {
    dispatch(
      onChangeOrderedQuantity({
        productId: inventoryId,
        quantity: value ? +value : 0,
      })
    );
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.image}>
          <img
            alt="example"
            src={inventoryImage[0].thumbUrl}
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </div>

        <div className={style.content}>
          <div className={style.contentSection1}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title level={5} style={{ margin: "0" }}>
                {truncateString(inventoryName, 36)}
              </Title>
              <Button>
                <CloseOutlined />
              </Button>
            </div>

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
              <div className={style.contentSection2}>
                <InputNumber
                  type="number"
                  min={"0"}
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
      </div>
    </>
  );
};

export default PosOrderedItemCard;
