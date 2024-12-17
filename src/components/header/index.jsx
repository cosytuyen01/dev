import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import SvgIcon from "../../assets/iconSvg";
import avatar from "../../assets/images/avatar.png";
import Logo from "../../assets/images/Logo.svg";

import "./style.css";
// Danh sách menu cho dropdown
const handleMenuClick = () => {};

const items = [
  // {
  //   label: <p className="text-red ml-2">Đổi mật khẩu</p>,
  //   key: "1",
  //   icon: <SvgIcon name={"pass"} color={"var(--red)"} height={24} width={24} />,
  //   onClick: () => {},
  // },
  // {
  //   label: <p className="text-red ml-2">Đăng xuất</p>,
  //   key: "2",
  //   icon: (
  //     <SvgIcon name={"logOut"} color={"var(--red)"} height={24} width={24} />
  //   ),
  //   onClick: () => {},
  // },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};

const Header = () => {
  return (
    <div className="bg-black px-4 py-3 z-10 relative flex items-center custom-header">
      <img src={Logo} className="h-10 w-50 logoHeader " />
      <Dropdown
        menu={menuProps}
        placement="bottom"
        icon={<UserOutlined />}
        overlayClassName="custom-dropdown"
      >
        <div
          onClick={(e) => e.preventDefault()}
          className="flex items-center justify-center cursor-pointer" // Thêm cursor-pointer để cải thiện UX
        >
          <img
            className="w-8 h-8 rounded-full object-cover mr-2"
            src={avatar}
            alt="User Avatar"
          />
          <div className="flex flex-col items-start">
            <span className="text-sm leading-5 text-white/90">Admin</span>
            <span className="text-sm text-white/50 leading-5">Quản lý</span>
          </div>
          <DownOutlined className="ml-1 text-white/90" />
        </div>
      </Dropdown>
    </div>
  );
};

export default Header;
