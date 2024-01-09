import style from "@/styles/pointOfSales.module.css";
import PosItemCard from "@/components/card/PosItemCard";
import PosOrderedItemCard from "@/components/card/PosOrderedItemCard";
import SearchBar from "@/components/filter/inventory/SearchBar";
import { Button, Divider } from "antd";
import Title from "antd/es/typography/Title";
import { useSelector } from "react-redux";
import { addCommas } from "@/components/util/customMethods";

const PointOfSales = () => {
  const data = useSelector((store: any) => store.inventory.inventory);
  const orderedItem = useSelector(
    (store: any) => store.pointOfSales.orderedItems
  );
  const totalPrice = useSelector((store: any) => store.pointOfSales.totalPrice);

  console.log(orderedItem);
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

          <section className={style.leftPaneContent}>
            {data.map((value: any) => {
              return <PosItemCard key={data.inventoryId} data={value} />;
            })}
          </section>
        </div>
        <Divider type="vertical" style={{ height: "100%" }} />
        <div className={style.rightPane}>
          <div className={style.rightPaneHeader}>
            <Title level={4}>Current Transaction</Title>
            <p>CLEAR ALL</p>
          </div>
          <Divider style={{ margin: "0.5rem 0" }} />

          <div className={style.rightPaneContent}>
            {orderedItem.map((item: any) => (
              <PosOrderedItemCard orderedItem={item} />
            ))}
          </div>

          <Divider style={{ margin: "0.5rem 0" }} />
          <div className={style.rightPaneFooter}>
            <div className={style.rightPaneFooterContent}>
              <p>Total</p>
              <p>₱{addCommas(totalPrice)}</p>
            </div>
            <Button type="primary" className={style.rightPaneFooterButton}>
              Confirm Transaction
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PointOfSales;
