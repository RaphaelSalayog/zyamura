import { WarningOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const WarningTooltip: React.FC<{ text: string }> = ({ text }) => {
  return (
    <>
      <Tooltip placement="topLeft" title={<span>{text}</span>}>
        <span
          style={{
            marginLeft: "1rem",
          }}
        >
          <WarningOutlined style={{ color: "red" }} />
        </span>
      </Tooltip>
    </>
  );
};

export default WarningTooltip;
