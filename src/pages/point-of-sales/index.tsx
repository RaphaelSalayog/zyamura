import style from "@/styles/pointOfSales.module.css";
import PosItemCard from "@/components/card/PosItemCard";
import PosOrderedItemCard from "@/components/card/PosOrderedItemCard";
import SearchBar from "@/components/filter/inventory/SearchBar";
import { Button, Divider } from "antd";
import Title from "antd/es/typography/Title";
import { useSelector } from "react-redux";

const PointOfSales = () => {
  const data = useSelector((store: any) => store.inventory.inventory);

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
            <PosOrderedItemCard />
            <PosOrderedItemCard />
            <PosOrderedItemCard />
            <PosOrderedItemCard />
            <PosOrderedItemCard />
            <PosOrderedItemCard />
            <PosOrderedItemCard />
            <PosOrderedItemCard />
          </div>

          <Divider style={{ margin: "0.5rem 0" }} />
          <div className={style.rightPaneFooter}>
            <div className={style.rightPaneFooterContent}>
              <p>Total</p>
              <p>P0</p>
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
