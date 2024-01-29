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
import { useEffect, useState } from "react";

const Transaction = () => {
  const transaction: Transaction[] = useSelector(
    (store: any) => store.transaction.transaction
  );

  const { receiptModal } = useModalVisibility();
  const { selectedData } = useSelectedData();

  const [searchItemOnChange, setSearchItemOnChange] = useState("");
  const [searchItemOnClick, setSearchItemOnClick] = useState("");
  const [sortedAndSearchedItems, setSortedAndSearchedItems] =
    useState<Transaction[]>();

  const itemSearchOnChangeHandler = (value: string) => {
    setSearchItemOnChange(value);
  };

  const itemSearchOnClickHandler = (value: string) => {
    setSearchItemOnClick(value);
  };

  useEffect(() => {
    // filter the sorted items by search key
    const sortedAndSearchedItem = transaction.map((items) => {
      const filteredData = items.transactionData.filter((value) => {
        if (searchItemOnClick == "") {
          return value.transactionId
            .toLowerCase()
            .includes(searchItemOnChange.toLowerCase());
        } else {
          return value.transactionId === searchItemOnClick;
        }
      });
      return {
        ...items,
        transactionData: filteredData,
      };
    });
    setSortedAndSearchedItems(sortedAndSearchedItem);
  }, [transaction, searchItemOnChange, searchItemOnClick]);

  return (
    <MainLayout>
      <PosModalVisibilityProvider value={{ receiptModal }}>
        <SelectedDataProvider value={selectedData}>
          <Row justify={"space-between"}>
            <Title level={2}>TRANSACTION HISTORY</Title>
            <Row justify={"end"}>
              <SearchBar
                getValueOnChange={itemSearchOnChangeHandler}
                getValueOnClick={itemSearchOnClickHandler}
                sortedAndSearchedItems={sortedAndSearchedItems}
                type="transaction"
              />
            </Row>
          </Row>
          <Row
            style={{
              width: "100%",
              height: "81vh",
              marginTop: "1rem",
              display: sortedAndSearchedItems?.length === 0 ? "flex" : "start",
              justifyContent:
                sortedAndSearchedItems?.length === 0 ? "center" : "start",
              alignContent:
                sortedAndSearchedItems?.length === 0 ? "center" : "start",
              overflowY: "auto",
            }}
          >
            {sortedAndSearchedItems?.map(
              (item) =>
                item.transactionData.length > 0 && (
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
                )
            )}
            {sortedAndSearchedItems?.length === 0 && (
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
