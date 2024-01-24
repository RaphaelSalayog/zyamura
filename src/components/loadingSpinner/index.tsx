import { Spin } from "antd";

export default function LoadingSpinner({
  size,
  width,
  height,
}: {
  size?: "small" | "default" | "large";
  width?: string;
  height?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: width ?? "100vw",
        height: height ?? "100vh",
      }}
    >
      <Spin tip="Loading" size={size}></Spin>
    </div>
  );
}
