import React, { useEffect, useState } from "react";
import { AutoComplete, Input } from "antd";
import type { SelectProps } from "antd/es/select";
import { inventoryInitialState } from "@/store/reducers/inventorySlice";
import { Transaction } from "@/store/reducers/transactionSlice";

interface SearchBar {
  getValueOnClick: (value: string) => void;
  getValueOnChange: (value: string) => void;
  sortedAndSearchedItems?: inventoryInitialState[] | Transaction[] | undefined;
  type: "inventory" | "transaction";
}

const SearchBar: React.FC<SearchBar> = ({
  getValueOnClick,
  getValueOnChange,
  sortedAndSearchedItems,
  type,
}) => {
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const [searchValue, setSearchValue] = useState<string>();

  // I used useEffect to update the data of useState from Inventory component (The issue is related to the asynchronous nature of state updates in React.)
  useEffect(() => {
    setOptions(
      searchValue ? searchResult(searchValue, sortedAndSearchedItems) : []
    );
  }, [sortedAndSearchedItems]);

  const searchResult = (
    query: string | undefined,
    sortedAndSearchedItems: any[] | undefined
  ) => {
    const array: { itemName: string; number: number }[] = [];
    if (type === "inventory") {
      // To know if the item is duplicate. If it is, it will just increment the number
      sortedAndSearchedItems?.map((item: inventoryInitialState) => {
        const existingItem = array.find(
          (existing) => existing.itemName === item.inventoryName
        );

        if (existingItem) {
          existingItem.number += 1; // If item exists, increment the number
        } else {
          // If item doesn't exist, add a new object to the array
          array.push({
            itemName: item.inventoryName,
            number: 1, // Assuming you start with 1 when adding a new item
          });
        }
      });
    }

    if (type === "transaction") {
      // To know if the item is duplicate. If it is, it will just increment the number
      sortedAndSearchedItems?.map((item: Transaction) => {
        item.transactionData.map((value) => {
          const existingItem = array.find(
            (existing) => existing.itemName === value.transactionId
          );

          if (existingItem) {
            existingItem.number += 1; // If item exists, increment the number
          } else {
            // If item doesn't exist, add a new object to the array
            array.push({
              itemName: value.transactionId,
              number: 1, // Assuming you start with 1 when adding a new item
            });
          }
        });
      });
    }

    return new Array(array?.length)
      .join(".")
      .split(".")
      .map((_, idx) => {
        const category = array[idx] ? array[idx].itemName : query;
        return {
          key: idx,
          value: category,
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                {array[idx]
                  ? `Found ${query} on ${category}`
                  : `Couldn't find ${query}`}
              </span>
              <span>{array[idx] ? array[idx].number : 0} results</span>
            </div>
          ),
        };
      });
  };

  // get search key from keystroke
  const handleSearch = (value: string) => {
    getValueOnChange(value);
    getValueOnClick("");
    setSearchValue(value);
  };

  // get search key from on click
  const onSelect = (value: string) => {
    getValueOnClick(value);
  };

  return (
    <AutoComplete
      popupMatchSelectWidth={480}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
    >
      <Input.Search
        size="large"
        placeholder={type === "inventory" ? "search" : "transaction id"}
        enterButton
        className="remove-border-radius"
        style={{ width: 500 }}
      />
    </AutoComplete>
  );
};

export default SearchBar;
