import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Tooltip, message } from "antd";
import React, { useState } from "react";

const items = [
  {
    label: "Latest",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "Oldest",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "Name (A-Z)",
    key: "3",
    icon: <UserOutlined />,
  },
  {
    label: "Name (Z-A)",
    key: "4",
    icon: <UserOutlined />,
  },
  {
    label: "Highest Price",
    key: "5",
    icon: <UserOutlined />,
  },
  {
    label: "Lowest Price",
    key: "6",
    icon: <UserOutlined />,
  },
  {
    label: "Highest Quantity",
    key: "7",
    icon: <UserOutlined />,
  },
  {
    label: "Lowest Quantity",
    key: "8",
    icon: <UserOutlined />,
  },
];

const SortDropdown = () => {
  const [sortName, setSortName] = useState("Latest");
  const handleMenuClick = ({ key }: any) => {
    const selectedItem = items.find((item) => item.key === key);
    setSortName(selectedItem ? selectedItem.label : "Latest");
  };

  return (
    <>
      <Dropdown
        menu={{
          items,
          onClick: handleMenuClick,
        }}
      >
        <Button style={{ height: "40px", marginLeft: "10px" }}>
          <Space>
            {sortName}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </>
  );
};

export default SortDropdown;
