import TransactionCard from "@/components/card/TransactionCard";
import SearchBar from "@/components/filter/inventory/SearchBar";
import MainLayout from "@/components/layout/MainLayout";
import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useSelector } from "react-redux";
import { Transaction } from "@/store/reducers/transactionSlice";

const Transaction = () => {
  const transaction: Transaction[] = useSelector(
    (store: any) => store.transaction.transaction
  );

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
      {transaction.map((item) => (
        <Row style={{ marginBottom: "1.5rem" }}>
          <Col
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <p>{item.date}</p>
            <p>{item.totalPricePerDay}</p>
          </Col>
          {item.transactionData.map((value) => (
            <TransactionCard data={value} />
          ))}
        </Row>
      ))}
    </MainLayout>
  );
};

export default Transaction;
