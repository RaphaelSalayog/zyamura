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
import { IInventory } from "@/common/model/inventory.model";

const { Text } = Typography;

interface IProps {
  data: IInventory;
}

const ItemCard: React.FC<IProps> = ({ data }) => {
  const { pet, item } = useContext(InventoryDrawerVisiblityContext);
  const { set } = useContext(SelectedDataContext);
  const dispatch = useDispatch();
  const {
    name,
    quantity,
    sellingPrice,
    object,
    type,
    category,
    gender,
    imageUrl,
  } = data;

  const items = [
    {
      key: "view",
      label: "View",
      icon: <EyeOutlined style={{ color: "#1677ff" }} />,
      onClick: () => {
        if (object === "Pet") {
          pet?.view?.setVisible(true);
        } else if (object === "Item") {
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
        if (object === "Pet") {
          pet?.edit?.setVisible(true);
        } else if (object === "Item") {
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
            try {
              const auth = localStorage.getItem("token");
              const response = await fetch(
                "http://localhost:3000/inventory/" + data._id,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: "Bearer " + auth,
                  },
                }
              );

              if (!response.ok) {
                throw new Error("Failed to delete inventory");
              }

              await dispatch(removeInventoryItem({ inventoryId: data._id }));
              await dispatch(removeOrderItem({ productId: data._id }));
            } catch (err) {
              console.log(err);
            }
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
              justifyContent: !type ? "flex-end" : "space-between",
            }}
          >
            {type && (
              <InventoryTag
                data={capitalizeFirstLetter(type)}
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
            src={imageUrl}
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </div>

        <div className={style.itemCardContent}>
          <Title level={5}>{truncateString(name, 40)}</Title>
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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "5px",
              }}
            >
              <Text>Quantity: {quantity}</Text>
              <Text style={{ fontWeight: "bold", color: "#237804" }}>
                ₱{addCommas(sellingPrice)}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemCard;
