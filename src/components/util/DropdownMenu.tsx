import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space, Tooltip, message } from "antd";
import React, { useState } from "react";

interface DropdownMenu {
  items: {
    label: string;
    key: string;
  }[];
  trigger: "hover" | "click";
  style?: any;
}

const DropdownMenu: React.FC<DropdownMenu> = ({ items, style, trigger }) => {
  const [sortName, setSortName] = useState(items[0].label);
  const handleMenuClick = ({ key }: any) => {
    const selectedItem = items.find((item) => item.key === key);
    setSortName((prev) => (selectedItem ? selectedItem.label : prev));
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {items.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={[trigger]}>
        <Button style={style}>
          <Space
            align="center"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {sortName}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </>
  );
};

export default DropdownMenu;
