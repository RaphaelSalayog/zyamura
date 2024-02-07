import style from "@/styles/itemCard.module.css";
import Title from "antd/es/typography/Title";
import InventoryTag from "../util/InventoryTag";
import {
  addCommas,
  capitalizeFirstLetter,
  truncateString,
} from "../util/customMethods";
import { Button, Dropdown, Modal, Typography } from "antd";
import { DeleteTwoTone, EditTwoTone, EyeOutlined } from "@ant-design/icons";
import { useContext } from "react";
import InventoryDrawerVisiblityContext from "@/common/contexts/InventoryDrawerVisibilityContext";
import SelectedDataContext from "@/common/contexts/SelectedDataContext";
import { useDispatch } from "react-redux";
import { removeInventoryItem } from "@/store/reducers/inventorySlice";
import { removeOrderItem } from "@/store/reducers/pointOfSalesSlice";

const { Text } = Typography;

interface ItemCard {
  data: any;
}

const ItemCard: React.FC<ItemCard> = ({ data }) => {
  const { pet, item } = useContext(InventoryDrawerVisiblityContext);
  const { set } = useContext(SelectedDataContext);
  const dispatch = useDispatch();
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

  const items = [
    {
      key: "view",
      label: "View",
      icon: <EyeOutlined style={{ color: "#1677ff" }} />,
      onClick: () => {
        if (inventoryObject === "Pet") {
          pet?.view?.setVisible(true);
        } else if (inventoryObject === "Item") {
          item?.view?.setVisible(true);
        }
        set(data);
      },
    },
    {
      key: "edit",
      label: "Edit",
      icon: <EditTwoTone />,
      onClick: () => {
        if (inventoryObject === "Pet") {
          pet?.edit?.setVisible(true);
        } else if (inventoryObject === "Item") {
          item?.edit?.setVisible(true);
        }
        set(data);
      },
    },
    {
      key: "delete",
      label: "Delete",
      icon: <DeleteTwoTone twoToneColor={"red"} />,
      onClick: () => {
        Modal.confirm({
          title: "Confirm Deletion",
          content: (
            <>
              <p>Are you sure you want to delete this information?</p>
              <p>This action cannot be undone.</p>
            </>
          ),
          onOk: async () => {
            await dispatch(
              removeInventoryItem({ inventoryId: data.inventoryId })
            );
            await dispatch(removeOrderItem({ productId: data.inventoryId }));
          },
          centered: true,
        });
      },
    },
    // {
    //   key: "archive",
    //   label: "Archive",
    //   icon: <DeleteTwoTone />,
    //   onClick: () => {},
    // },
  ];
  return (
    <>
      <div className={style.itemCard}>
        <div className={style.itemCardImage}>
          <div
            className={style.itemCardImageContent}
            style={{
              justifyContent: !inventoryType ? "flex-end" : "space-between",
            }}
          >
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
