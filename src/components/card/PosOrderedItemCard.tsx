import style from "@/styles/posOrderedItemCard.module.css";
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
      <div className={style.container}>
        <div className={style.image}>
          <img
            alt="example"
            src={
              "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
            }
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </div>

        <div className={style.content}>
          <div className={style.contentSection1}>
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
              <div className={style.contentSection2}>
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
