import style from "@/styles/posItemCard.module.css";
import InventoryTag from "../util/InventoryTag";
import { Button, Form, InputNumber, Typography } from "antd";
import { addCommas, truncateString } from "../util/customMethods";
import { useState } from "react";
const { Text, Title } = Typography;

const PosItemCard: React.FC<any> = ({ data }) => {
  const [value, setValue] = useState("1");
  const {
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

  const inputNumberHandler = (event: string | null) => {
    if (event) {
      setValue(event);
    }
  };

  const addHandler = () => {
    if (value <= inventoryQuantity) {
      console.log("ADD");
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
              <Title level={5}>{truncateString(inventoryName, 48)}</Title>
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
                <p style={{ marginTop: "5px" }}>
                  Quantity: {inventoryQuantity}
                </p>
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
            height: "25%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <InputNumber
            min={"0"}
            precision={0}
            value={value}
            style={{ width: "30%" }}
            onChange={inputNumberHandler}
          />
          <Button
            type="primary"
            style={{ height: "100%" }}
            onClick={addHandler}
          >
            Add
          </Button>
        </div>
      </div>
    </>
  );
};
export default PosItemCard;
