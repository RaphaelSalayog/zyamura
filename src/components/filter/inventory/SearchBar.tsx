import React, { useEffect, useState } from "react";
import { AutoComplete, Input } from "antd";
import type { SelectProps } from "antd/es/select";
import { inventoryInitialState } from "@/store/reducers/inventorySlice";

interface SearchBar {
  getValue: (value: string) => void;
  sortedAndSearchedItems?: inventoryInitialState[] | undefined;
}

const SearchBar: React.FC<SearchBar> = ({
  getValue,
  sortedAndSearchedItems,
}) => {
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const [searchValue, setSearchValue] = useState<string>();

  const handleSearch = (value: string) => {
    getValue(value);
    setSearchValue(value);
  };

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
    // To know if the item is duplicate. If it is, it will just increment the number
    const array: { itemName: string; number: number }[] = [];
    sortedAndSearchedItems?.forEach((item) => {
      const existingItem = array.find(
        (existing) => existing.itemName === item.inventoryName
      );

      if (existingItem) {
        // If item exists, increment the number
        existingItem.number += 1;
      } else {
        // If item doesn't exist, add a new object to the array
        array.push({
          itemName: item.inventoryName,
          number: 1, // Assuming you start with 1 when adding a new item
        });
      }
    });

    return new Array(array?.length)
      .join(".")
      .split(".")
      .map((_, idx) => {
        const category = array[idx] ? array[idx].itemName : "none";
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
                Found {query} on {category}
              </span>
              <span>{array[idx] ? array[idx].number : "0"} results</span>
            </div>
          ),
        };
      });
  };

  const onSelect = (value: string) => {
    getValue(value);
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
        placeholder="input here"
        enterButton
        className="remove-border-radius"
        style={{ width: 500 }}
      />
    </AutoComplete>
  );
};

export default SearchBar;
