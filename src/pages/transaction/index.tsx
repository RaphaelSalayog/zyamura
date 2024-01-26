import TransactionCard from "@/components/card/TransactionCard";
import SearchBar from "@/components/filter/inventory/SearchBar";
import MainLayout from "@/components/layout/MainLayout";
import { addTransaction } from "@/store/reducers/transactionSlice";
import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useSelector } from "react-redux";

const Transaction = () => {
  // const transaction: addTransaction[] = useSelector(
  //   (store: any) => store.transaction.transaction
  // );
  return (
    <MainLayout>
      <Row justify={"space-between"}>
        <Title level={2}>TRANSACTION HISTORY</Title>
        <Row justify={"end"}>
          <SearchBar
            getValueOnChange={() => {}}
            getValueOnClick={() => {}}
            // sortedAndSearchedItems={() => {}}
          />
        </Row>
      </Row>
      <Row style={{ marginBottom: "1.5rem" }}>
        <Col
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <p>JUNE 4 </p>
          <p> TOTAL PRICE of June 4</p>
        </Col>
        <TransactionCard />
        <TransactionCard />
      </Row>
    </MainLayout>
  );
};

export default Transaction;
