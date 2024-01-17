import InventoryDrawerVisiblityContext from "@/common/contexts/InventoryDrawerVisibilityContext";
import SelectedDataContext from "@/common/contexts/SelectedDataContext";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";

interface DropdownMenu {
  items: {
    label: string;
    key: string;
  }[];
  trigger: "hover" | "click";
  type: "category" | "sort";
  style?: React.CSSProperties;
  value?: string;
  setValue: (value: any) => void;
}

const DropdownMenu: React.FC<DropdownMenu> = ({
  type,
  items,
  trigger,
  style,
  value,
  setValue,
}) => {
  const { pet } = useContext(InventoryDrawerVisiblityContext);
  const [sortName, setSortName] = useState(
    type === "sort" ? items[0].label : ""
  );

  useEffect(() => {
    if (pet?.edit?.visible || pet?.view?.visible) {
      if (value) {
        setSortName(value);
      }
    }
  }, [value, pet?.edit?.visible, pet?.view?.visible]);

  const handleMenuClick = ({ key }: any) => {
    const selectedItem = items.find((item) => item.key === key);
    setSortName((prevState) => (selectedItem ? selectedItem.label : prevState));
    setValue(selectedItem?.key);
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
