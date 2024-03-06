import {
  DashboardOutlined,
  DropboxOutlined,
  FileDoneOutlined,
  LaptopOutlined,
  LogoutOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Affix, Layout, Menu } from "antd";
import style from "@/styles/mainNavigation.module.css";
import { useRouter } from "next/router";
import logo from "@/assets/zyamuraLogo.svg";

const items = [
  // {
  //   key: "/dashboard",
  //   icon: <DashboardOutlined />,
  //   label: "Dashboard",
  // },
  {
    key: "/inventory",
    icon: <DropboxOutlined />,
    label: "Inventory",
  },
  {
    key: "/point-of-sales",
    icon: <LaptopOutlined />,
    label: "Point of Sales",
  },
  {
    key: "/transaction",
    icon: <FileDoneOutlined />,
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
  {
    key: "/accounts",
    icon: <UserOutlined />,
    label: "Accounts",
  },
  {
    key: "/login",
    icon: <LogoutOutlined />,
    label: "Logout",
  },
];

const MainNavigation = () => {
  const router = useRouter();
  const selectHandler = (item: any) => {
    if (item.key === "/login") {
      const auth = localStorage.getItem("token");
      fetch("http://localhost:3000/logout", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth,
        },
        credentials: "include",
      })
        .then(() => {
          localStorage.removeItem("token");
          router.push("/login");
        })
        .catch((err) => console.log(err));
    } else {
      router.push(item.key);
    }
  };

  return (
    <>
      <Affix>
        <Layout.Sider theme="light" className={style.layoutSider}>
          <div style={{ height: "130px", marginBottom: "1.5rem" }}>
            <img
              src={logo.src}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[router.pathname]}
            onSelect={selectHandler}
            items={items}
          />
        </Layout.Sider>
      </Affix>
    </>
  );
};

export default MainNavigation;
