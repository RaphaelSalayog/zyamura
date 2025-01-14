import style from "@/styles/pointOfSales.module.css";
import PosItemCard from "@/components/card/PosItemCard";
import PosOrderedItemCard from "@/components/card/PosOrderedItemCard";
import SearchBar from "@/components/filter/inventory/SearchBar";
import { Button, Divider, Empty } from "antd";
import Title from "antd/es/typography/Title";
import { useDispatch, useSelector } from "react-redux";
import { addCommas, posSortItem } from "@/components/util/customMethods";
import { clearAllOrder } from "@/store/reducers/pointOfSalesSlice";
import AmountChangeModal from "@/components/modal/point-of-sales/AmountChangeModal";
import { PosModalVisibilityProvider } from "@/common/contexts/PosModalVisibilityContext";
import useModalVisibility from "@/common/hooks/useModalVisibility";
import { useCallback, useEffect, useState } from "react";
import ReceiptModal from "@/components/modal/point-of-sales/ReceiptModal";
import { SelectedDataProvider } from "@/common/contexts/SelectedDataContext";
import useSelectedData from "@/common/hooks/useSelectedData";
import { IInventory } from "@/common/model/inventory.model";
import { GetServerSidePropsContext } from "next";

interface IProps {
  dataDb: IInventory[];
}

const PointOfSales: React.FC<IProps> = ({ dataDb: data }) => {
  // const data = useSelector((store: any) => store.inventory.inventory);
  const orderedItem = useSelector(
    (store: any) => store.pointOfSales.orderedItems
  );
  const totalPrice = useSelector((store: any) => store.pointOfSales.totalPrice);
  const dispatch = useDispatch();

  const { modal, receiptModal } = useModalVisibility();
  const { selectedData } = useSelectedData();

  const [searchItemOnChange, setSearchItemOnChange] = useState("");
  const [searchItemOnClick, setSearchItemOnClick] = useState("");
  const [sortedAndSearchedItems, setSortedAndSearchedItems] =
    useState<IInventory[]>();

  useEffect(() => {
    // sorted items
    const sortedItems = posSortItem(data);
    // filter the sorted items by search key
    const sortedAndSearchedItem = sortedItems.filter((items: IInventory) => {
      if (searchItemOnClick == "") {
        return items.name
          .toLowerCase()
          .includes(searchItemOnChange.toLowerCase());
      } else {
        return items.name === searchItemOnClick;
      }
    });
    setSortedAndSearchedItems(sortedAndSearchedItem);
  }, [data, searchItemOnChange, searchItemOnClick]);

  const itemSearchOnChangeHandler = useCallback((value: string) => {
    setSearchItemOnChange(value);
  }, []);

  const itemSearchOnClickHandler = useCallback((value: string) => {
    setSearchItemOnClick(value);
  }, []);

  const confirmTransactionHandler = useCallback(() => {
    modal?.setVisible(true);
  }, []);

  return (
    <PosModalVisibilityProvider value={{ modal, receiptModal }}>
      <SelectedDataProvider value={selectedData}>
        <div className={style.container}>
          <div className={style.leftPane}>
            <header className={style.leftPaneHeader}>
              <Title level={2}>POINT OF SALES</Title>
              <div>
                <SearchBar
                  getValueOnChange={itemSearchOnChangeHandler}
                  getValueOnClick={itemSearchOnClickHandler}
                  sortedAndSearchedItems={sortedAndSearchedItems}
                  type="inventory"
                />
                {/* <Button>FILTER</Button> */}
              </div>
            </header>

            <section
              className={style.leftPaneContent}
              style={{
                justifyContent:
                  sortedAndSearchedItems?.length === 0 ? "center" : "",
                alignContent:
                  sortedAndSearchedItems?.length === 0 ? "center" : "",
              }}
            >
              {sortedAndSearchedItems?.map((value: IInventory) => (
                <PosItemCard key={value._id} data={value} />
              ))}

              {sortedAndSearchedItems?.length === 0 && (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  style={{ marginBottom: "100px" }}
                />
              )}
            </section>
          </div>
          <Divider type="vertical" style={{ height: "100%" }} />
          <div className={style.rightPane}>
            <div className={style.rightPaneHeader}>
              <Title level={4}>Current Transaction</Title>
              <Button
                onClick={() => {
                  dispatch(clearAllOrder());
                }}
              >
                CLEAR ALL
              </Button>
            </div>
            <Divider style={{ margin: "0.5rem 0" }} />

            <ul className={style.rightPaneContent}>
              {orderedItem.map((item: any) => (
                <li key={item._id}>
                  <PosOrderedItemCard orderedItem={item} />
                </li>
              ))}
            </ul>

            <Divider style={{ margin: "0.5rem 0" }} />
            <div className={style.rightPaneFooter}>
              <div className={style.rightPaneFooterContent}>
                <p>Total</p>
                <p>₱{addCommas(totalPrice)}</p>
              </div>
              <Button
                type="primary"
                disabled={orderedItem.length === 0}
                className={style.rightPaneFooterButton}
                onClick={confirmTransactionHandler}
              >
                Confirm Transaction
              </Button>
            </div>
          </div>
        </div>
        <AmountChangeModal />
        <ReceiptModal />
      </SelectedDataProvider>
    </PosModalVisibilityProvider>
  );
};

// Mongo DB
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    // We can't get the token from localStorage because it is for client side only.
    // We use context.req.headers.cookie to access the token from Express.js middleware. ( Check it in Controllers > auth.js > res.setHeader("Set-Cookie", `token=${token}; Max-Age=${60 * 60 * 24}; HttpOnly; Secure;`); )
    const getToken = ctx.req.headers.cookie;
    const token = getToken?.split("=")[1];
    const response = await fetch(`${process.env.API_URL}/inventory`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Failed fetching inventory");
    }

    const data = await response.json();

    const modifiedData = data.map((item: IInventory) => {
      return { ...item, imageUrl: `${process.env.API_URL}/${item.imageUrl}` };
    });

    return {
      props: {
        dataDb: modifiedData,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        dataDb: [],
      },
    };
  }
};

export default PointOfSales;
