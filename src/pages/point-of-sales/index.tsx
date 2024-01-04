import PosItemCard from "@/components/card/PosItemCard";
import SearchBar from "@/components/filter/inventory/SearchBar";
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PointOfSales = () => {
  const data = useSelector((store: any) => store.inventory.inventory);

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "90vh",
          overflow: "hidden",
          padding: "2rem 2rem 0",
        }}
      >
        <div
          style={{
            width: "75%",
          }}
        >
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Title level={2}>POINT OF SALES</Title>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <SearchBar
                getValueOnChange={() => {}}
                getValueOnClick={() => {}}
              />
              <span>Filter</span>
            </div>
          </header>

          <section
            style={{
              display: "flex",
              marginTop: "1rem",
              height: "92%",
              overflowY: "auto",
              flexFlow: "row wrap",
              position: "relative",
              justifyContent: "center",
              alignContent: "flex-start",
            }}
          >
            {data.map((value: any) => {
              return <PosItemCard key={data.inventoryId} data={value} />;
            })}
          </section>
        </div>

        <div style={{ width: "25%", border: "1px solid black" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title level={4}>Current Transaction</Title>
            <p>CLEAR ALL</p>
          </div>
          <div style={{ overflowY: "auto" }}>CARD</div>
        </div>
      </div>
    </>
  );
};

export default PointOfSales;
