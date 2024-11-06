import SvgIcon from "../../assets/iconSvg";

const iconData = [
  { name: "home", navigation: "/" },
  { name: "product", navigation: "/" },
  { name: "work", navigation: "/" },
  { name: "user", navigation: "/" },

];

const BottomMenu = () => {
  return (
    <div className="fixed bottom-4 inset-x-0 flex justify-center">
      <div className="flex space-x-2 bg-white rounded-full p-2 shadow-1xl">
        {iconData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => (window.location.href = item.navigation)} // Điều hướng khi nhấp vào icon
          >
            <div
              className="p-5 rounded-full bg-gray-100  hover:bg-gray-200 focus:bg-gray-300 transition duration-200 ease-in-out"
              tabIndex={0} // Để icon nhận được sự kiện focus
            >
              <SvgIcon
                name={item.name}
                color={"var(--textColor)"}
                height={24}
                width={24}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomMenu;
