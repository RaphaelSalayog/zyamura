import TransactionCard from "@/components/card/TransactionCard";
import SearchBar from "@/components/filter/inventory/SearchBar";
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
import { GetServerSidePropsContext } from "next";
import {
  ITransaction,
  ITransactionModified,
} from "@/common/model/transaction.model";

const Transaction: React.FC<{ dataDb: ITransactionModified[] }> = ({
  dataDb,
}) => {
  const transaction: Transaction[] = useSelector(
    (store: any) => store.transaction.transaction
  );

  const { receiptModal } = useModalVisibility();
  const { selectedData } = useSelectedData();

  const [searchItemOnChange, setSearchItemOnChange] = useState("");
  const [searchItemOnClick, setSearchItemOnClick] = useState("");
  const [sortedAndSearchedItems, setSortedAndSearchedItems] =
    useState<ITransactionModified[]>();

  const itemSearchOnChangeHandler = (value: string) => {
    setSearchItemOnChange(value);
  };

  const itemSearchOnClickHandler = (value: string) => {
    setSearchItemOnClick(value);
  };

  useEffect(() => {
    // filter the sorted items by search key
    const sortedAndSearchedItem = dataDb.map((items) => {
      const filteredData = items.transactionData.filter((value) => {
        if (searchItemOnClick == "") {
          return value._id
            .toLowerCase()
            .includes(searchItemOnChange.toLowerCase());
        } else {
          return value._id === searchItemOnClick;
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
        {sortedAndSearchedItems?.map((item) => (
          <Row
            key={item.date}
            style={{
              width: "100%",
              height: "81vh",
              marginTop: "1rem",
              display: item.transactionData.length === 0 ? "flex" : "start",
              justifyContent:
                item.transactionData.length === 0 ? "center" : "start",
              alignContent:
                item.transactionData.length === 0 ? "center" : "start",
              overflowY: "auto",
            }}
          >
            {item.transactionData.length > 0 ? (
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
                    <TransactionCard key={value._id} data={value} />
                  ))}
                </Row>
              </Row>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ marginBottom: "100px" }}
              />
            )}
          </Row>
        ))}
        {sortedAndSearchedItems?.length === 0 && (
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
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              style={{ marginBottom: "100px" }}
            />
          </Row>
        )}
        <ReceiptModal />
      </SelectedDataProvider>
    </PosModalVisibilityProvider>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const getToken = ctx.req.headers.cookie;
    const token = getToken?.split("=")[1];
    const response = await fetch("http://localhost:3000/transaction", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Failed fetching transaction");
    }

    const data = await response.json();

    const modifiedData = data.reduce(
      (
        accumolator: ITransactionModified[],
        item: ITransaction,
        currentIndex: number,
        array: ITransaction[]
      ) => {
        if (currentIndex === 0) {
          return [
            {
              ...item,
              totalPricePerDay: item.transactionData.totalPrice,
              transactionData: [item.transactionData],
            },
          ];
        }
        if (item.date === array[currentIndex - 1].date) {
          accumolator[accumolator.length - 1].transactionData.push(
            item.transactionData
          );
          accumolator[accumolator.length - 1].totalPricePerDay +=
            item.transactionData.totalPrice;
        } else {
          accumolator.push({
            ...item,
            totalPricePerDay: item.transactionData.totalPrice,
            transactionData: [item.transactionData],
          });
        }
        return accumolator;
      },
      []
    );

    return {
      props: {
        dataDb: modifiedData,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        dataDb: [],
      },
    };
  }
};

export default Transaction;
