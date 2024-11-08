import { useLocation, useNavigate } from "react-router-dom";
import SvgIcon from "../../assets/iconSvg";

const iconData = [
  { name: "home", navigation: "/" },
  { name: "product", navigation: "/products" },
  { name: "work", navigation: "/work" },
  { name: "user", navigation: "/user" },
];

const BottomMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 w-[100%] sm:bottom-4 inset-x-0 flex justify-center">
      <div className="flex  w-[100%] sm:w-auto sm:gap-4 justify-between  bg-white sm:rounded-full p-2 ">
        {iconData.map((item, index) => {
          const isActive = location.pathname === item.navigation;

          return (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate(item.navigation)}
            >
              <div
                className={`p-4 rounded-full transition duration-200 ease-in-out ${
                  isActive ? "bg-bgFocus" : "bg-gray-100 hover:bg-gray-200"
                }`}
                tabIndex={0}
              >
                <SvgIcon
                  name={item.name}
                  color={"var(--textColor)"}
                  height={24}
                  width={24}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomMenu;
