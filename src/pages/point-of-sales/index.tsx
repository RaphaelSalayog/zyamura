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
              <Button>FILTER</Button>
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
        <Divider type="vertical" style={{ height: "100%" }} />
        <div
          style={{
            width: "25%",
            height: "100%",
            // border: "1px solid black",
            padding: "0 1rem",
          }}
        >
          <div
            style={{
              height: "5%",
              display: "flex",
              // border: "1px solid black",
              justifyContent: "space-between",
            }}
          >
            <Title level={4}>Current Transaction</Title>
            <p>CLEAR ALL</p>
          </div>
          <Divider style={{ margin: "0.5rem 0" }} />

          <div style={{ height: "78%", border: "1px solid black" }}>
            <div style={{ overflowY: "auto" }}>
              <PosOrderedItemCard />
            </div>
          </div>

          <Divider style={{ margin: "0.5rem 0" }} />
          <div
            style={{
              height: "12%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              // border: "1px solid black",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p style={{ fontSize: "1.2rem" }}>Total</p>
              <p style={{ fontSize: "1.2rem" }}>P0</p>
            </div>
            <Button style={{ width: "100%", height: "2.5rem" }}>
              Confirm Transaction
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PointOfSales;
