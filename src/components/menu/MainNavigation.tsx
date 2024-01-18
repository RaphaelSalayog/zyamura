import {
  DashboardOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Affix, Layout, Menu } from "antd";
import style from "@/styles/mainNavigation.module.css";
import { useRouter } from "next/router";

const items = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/inventory",
    icon: <VideoCameraOutlined />,
    label: "Inventory",
  },
  {
    key: "/point-of-sales",
    icon: <UploadOutlined />,
    label: "Point of Sales",
  },
  {
    key: "/transaction",
    icon: <UploadOutlined />,
    label: "Transaction",
  },
  // {
  //   key: "/orders",
  //   icon: <UploadOutlined />,
  //   label: "Orders",
  // },
  // {
  //   key: "/purchase-order",
  //   icon: <UploadOutlined />,
  //   label: "Purchase Order",
  // },
  // {
  //   key: "/archive",
  //   icon: <UploadOutlined />,
  //   label: "Archive",
  // },
  // {
  //   key: "/activity-log",
  //   icon: <UploadOutlined />,
  //   label: "Activity Log",
  // },
  // {
  //   key: "/accounts",
  //   icon: <UploadOutlined />,
  //   label: "Accounts",
  // },
  {
    key: "/login",
    icon: <UploadOutlined />,
    label: "Logout",
  },
];

const MainNavigation = () => {
  const router = useRouter();
  const selectHandler = (item: any) => {
    if (item.key === "/login") {
      localStorage.removeItem("token");
      router.push("/login");
    } else {
      router.push(item.key);
    }
  };
  return (
    <>
      <Affix>
        <Layout.Sider theme="light" className={style.layoutSider}>
          <div style={{ height: "130px" }}>LOGO</div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onSelect={selectHandler}
            items={items}
          />
        </Layout.Sider>
      </Affix>
    </>
  );
};

export default MainNavigation;
