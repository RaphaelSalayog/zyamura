import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  supplier: string;
  contactPerson: string;
  contactNumber: string;
  address: string;
  suppliedProducts: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Supplier",
    dataIndex: "supplier",
  },
  {
    title: "Contact Person",
    dataIndex: "contactPerson",
  },
  {
    title: "Contact Number",
    dataIndex: "contactNumber",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Supplied Products",
    dataIndex: "suppliedProducts",
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    supplier: `Edward King ${i}`,
    contactPerson: "qwe",
    contactNumber: "asd",
    address: `London, Park Lane no. ${i}`,
    suppliedProducts: "32",
  });
}

const PurchaseOrderTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default PurchaseOrderTable;
