import { DropboxOutlined } from "@ant-design/icons";
import { Space, Tag, Typography } from "antd";
const { Text } = Typography;

const InventoryTag = ({ data, color }: any) => {
  return (
    <>
      {/* <Space size={[0, 8]} wrap> */}
      <Tag color={color}>
        <DropboxOutlined />
        <Text style={{ color: "white" }}>{data}</Text>
      </Tag>
      {/* </Space> */}
    </>
  );
};

export default InventoryTag;
