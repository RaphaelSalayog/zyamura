import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space, Tooltip, message } from "antd";
import React, { useState } from "react";

interface DropdownMenu {
  items: {
    label: string;
    key: string;
  }[];
  trigger: "hover" | "click";
  style?: React.CSSProperties;
}

const DropdownMenu: React.FC<DropdownMenu> = ({ items, style, trigger }) => {
  const [sortName, setSortName] = useState(items[0].label);
  const handleMenuClick = ({ key }: any) => {
    const selectedItem = items.find((item) => item.key === key);
    setSortName((prevState) => (selectedItem ? selectedItem.label : prevState));
  };

  return (
    <>
      <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={[trigger]}>
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
