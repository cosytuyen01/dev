import { Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/images/Logo.svg";
const Sidebar = () => {
  const navigate = useNavigate(); // Sử dụng hook điều hướng

  // Hàm xử lý khi chọn menu
  const handleMenuClick = (e) => {
    const { key } = e;

    navigate(`${key}`);
  };

  return (
    <div className="h-screen bg-black  text-primaryColor border-r-1 border-borderColor p-4">
      <img src={Logo} className="h-10 w-50 mb-4" />
      <Menu
        theme="dark"
        mode="vertical"
        defaultSelectedKeys={[""]}
        style={{ borderRight: 0, background: "none" }}
        onClick={handleMenuClick}
        items={[
          {
            key: "",
            icon: <UserOutlined />,
            label: "Thông tin",
          },
          {
            key: "products",
            icon: <ProductOutlined />,
            label: "Sản phẩm",
          },
          {
            key: "work",
            icon: <LaptopOutlined />,
            label: "Kinh nghiệm",
          },
        ]}
      />
    </div>
  );
};

export default Sidebar;
