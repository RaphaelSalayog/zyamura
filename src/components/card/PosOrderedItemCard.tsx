import { Button, InputNumber, Typography } from "antd";
import {
  addCommas,
  onKeyDownTypeNumber,
  truncateString,
} from "../util/customMethods";
import InventoryTag from "../util/InventoryTag";
import { CloseOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const PosOrderedItemCard = () => {
  return (
    <>
      <div
        style={{
          padding: "10px",
          border: "1px solid black",
          borderRadius: "8px",
          height: "136.75px",
          maxWidth: "380px",
          minWidth: "380px",
          display: "flex",
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
            src={
              "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
            }
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
              width: "100%",
              justifyContent: "space-between",
              //   border: "1px solid black",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title level={5} style={{ margin: "0" }}>
                {truncateString("qweqweqwe", 36)}
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
                {"Pet" === "Pet" ? (
                  <>
                    <InventoryTag data={"Pet"} color="#1677ff" />
                    <InventoryTag data={"Female"} color="#1677ff" />
                  </>
                ) : (
                  <InventoryTag data={"Pet"} color="#1677ff" />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginTop: "5px",
                }}
              >
                <InputNumber
                  type="number"
                  min={"0"}
                  precision={0}
                  value={"2"}
                  style={{ width: "36%" }}
                  onChange={() => {}}
                  onKeyDown={(event) => onKeyDownTypeNumber(event, "quantity")}
                />
                <Text style={{ fontWeight: "bold", color: "#237804" }}>
                  ₱{addCommas(12331332)}
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
