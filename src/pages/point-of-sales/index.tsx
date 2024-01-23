import style from "@/styles/pointOfSales.module.css";
import PosItemCard from "@/components/card/PosItemCard";
import PosOrderedItemCard from "@/components/card/PosOrderedItemCard";
import SearchBar from "@/components/filter/inventory/SearchBar";
import { Button, Divider, Empty } from "antd";
import Title from "antd/es/typography/Title";
import { useDispatch, useSelector } from "react-redux";
import { addCommas } from "@/components/util/customMethods";
import { clearAllOrder } from "@/store/reducers/pointOfSalesSlice";
import AmountChangeModal from "@/components/modal/point-of-sales/AmountChangeModal";
import { PosModalVisibilityProvider } from "@/common/contexts/PosModalVisibilityContext";
import useModalVisibility from "@/common/hooks/useModalVisibility";

const PointOfSales = () => {
  const data = useSelector((store: any) => store.inventory.inventory);
  const orderedItem = useSelector(
    (store: any) => store.pointOfSales.orderedItems
  );
  const totalPrice = useSelector((store: any) => store.pointOfSales.totalPrice);
  const dispatch = useDispatch();

  const { modal } = useModalVisibility();

  const confirmTransactionHandler = () => {
    modal?.setVisible(true);
  };
  return (
    <>
      <PosModalVisibilityProvider value={{ modal }}>
        <div className={style.container}>
          <div className={style.leftPane}>
            <header className={style.leftPaneHeader}>
              <Title level={2}>POINT OF SALES</Title>
              <div>
                <SearchBar
                  getValueOnChange={() => {}}
                  getValueOnClick={() => {}}
                />
                <Button>FILTER</Button>
              </div>
            </header>

            <section
              className={style.leftPaneContent}
              style={{
                justifyContent: data?.length === 0 ? "center" : "",
                alignContent: data?.length === 0 ? "center" : "",
              }}
            >
              {data.map((value: any) => {
                return <PosItemCard key={data.inventoryId} data={value} />;
              })}
              {data?.length === 0 && (
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
                <li>
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
      </PosModalVisibilityProvider>
    </>
  );
};

export default PointOfSales;
