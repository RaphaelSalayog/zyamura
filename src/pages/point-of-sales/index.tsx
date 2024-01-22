import style from "@/styles/pointOfSales.module.css";
import PosItemCard from "@/components/card/PosItemCard";
import PosOrderedItemCard from "@/components/card/PosOrderedItemCard";
import SearchBar from "@/components/filter/inventory/SearchBar";
import { Button, Divider, Empty, Modal } from "antd";
import Title from "antd/es/typography/Title";
import { useDispatch, useSelector } from "react-redux";
import { addCommas, generateUniqueId } from "@/components/util/customMethods";
import { resetOrder } from "@/store/reducers/pointOfSalesSlice";
import { addTransaction } from "@/store/reducers/transactionSlice";
import moment from "moment";

const PointOfSales = () => {
  const data = useSelector((store: any) => store.inventory.inventory);
  const orderedItem = useSelector(
    (store: any) => store.pointOfSales.orderedItems
  );
  const totalPrice = useSelector((store: any) => store.pointOfSales.totalPrice);
  const transaction = useSelector(
    (store: any) => store.transaction.transaction
  );
  const dispatch = useDispatch();
  const currentDate = moment();
  const formattedDate = currentDate.format("MMMM D YYYY, h:mm a");

  const confirmTransactionHandler = () => {
    Modal.confirm({
      title: "Confirm Transaction",
      content: `Are you sure you want to confirm the transaction? This action cannot be undone.`,
      onOk: async () => {
        dispatch(
          addTransaction({
            transactionId: generateUniqueId(
              transaction.map((item: any) => item.transactionId),
              "transaction"
            ),
            transactionDate: formattedDate,
            orderedItems: orderedItem,
            totalPrice: totalPrice,
          })
        );
      },
      centered: true,
    });
  };
  return (
    <>
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
                dispatch(resetOrder());
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
    </>
  );
};

export default PointOfSales;
