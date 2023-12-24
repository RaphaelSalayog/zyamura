import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space, Tooltip, message } from "antd";
import React, { useState } from "react";

interface DropdownMenu {
  items: {
    label: string;
    key: string;
  }[];
  trigger: "hover" | "click";
  type: "category" | "sort";
  style?: React.CSSProperties;
  getValue: (value: any) => void;
}

const DropdownMenu: React.FC<DropdownMenu> = ({
  type,
  items,
  trigger,
  style,
  getValue,
}) => {
  const [sortName, setSortName] = useState(
    type === "sort" ? items[0].label : ""
  );
  const handleMenuClick = ({ key }: any) => {
    const selectedItem = items.find((item) => item.key === key);
    setSortName((prevState) => (selectedItem ? selectedItem.label : prevState));
    getValue(selectedItem?.key);
  };

  return (
    <>
      <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={[trigger]}>
        <Button style={style}>
          <Space
            align="center"
            style={{
              display: "flex",
              justifyContent: sortName ? "space-between" : "flex-end",
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
