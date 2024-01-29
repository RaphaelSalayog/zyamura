import TransactionCard from "@/components/card/TransactionCard";
import SearchBar from "@/components/filter/inventory/SearchBar";
import MainLayout from "@/components/layout/MainLayout";
import { Empty, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useSelector } from "react-redux";
import { Transaction } from "@/store/reducers/transactionSlice";
import { addCommas } from "@/components/util/customMethods";
import moment from "moment";
import { SelectedDataProvider } from "@/common/contexts/SelectedDataContext";
import useSelectedData from "@/common/hooks/useSelectedData";
import ReceiptModal from "@/components/modal/point-of-sales/ReceiptModal";
import { PosModalVisibilityProvider } from "@/common/contexts/PosModalVisibilityContext";
import useModalVisibility from "@/common/hooks/useModalVisibility";

const Transaction = () => {
  const transaction: Transaction[] = useSelector(
    (store: any) => store.transaction.transaction
  );

  const { receiptModal } = useModalVisibility();
  const { selectedData } = useSelectedData();
  return (
    <MainLayout>
      <PosModalVisibilityProvider value={{ receiptModal }}>
        <SelectedDataProvider value={selectedData}>
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
          <Row
            style={{
              width: "100%",
              height: "81vh",
              marginTop: "1rem",
              display: transaction.length === 0 ? "flex" : "start",
              justifyContent: transaction.length === 0 ? "center" : "start",
              alignContent: transaction.length === 0 ? "center" : "start",
              overflowY: "auto",
            }}
          >
            {transaction.map((item) => (
              <Row style={{ width: "99.5%", marginBottom: "1.5rem" }}>
                <Row
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "#0958d9",
                    }}
                  >
                    {moment(item.date, "M/D/YYYY").format("MMM D, YYYY")}
                  </p>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "#237804",
                    }}
                  >
                    ₱{addCommas(item.totalPricePerDay)}
                  </p>
                </Row>
                <Row
                  style={{
                    width: "100%",
                  }}
                >
                  {item.transactionData.map((value) => (
                    <TransactionCard data={value} />
                  ))}
                </Row>
              </Row>
            ))}
            {transaction.length === 0 && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ marginBottom: "100px" }}
              />
            )}
          </Row>
          <ReceiptModal />
        </SelectedDataProvider>
      </PosModalVisibilityProvider>
    </MainLayout>
  );
};

export default Transaction;
