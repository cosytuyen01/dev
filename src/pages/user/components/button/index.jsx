const Button = ({ label, type = "primary", onClick }) => {
  // Dùng switch case để kiểm tra loại button và áp dụng lớp CSS tương ứng
  let buttonClass = "";

  switch (type) {
    case "primary":
      buttonClass = "bg-primaryColor text-white hover:opacity-75";
      break;
    case "secondary":
      buttonClass = "bg-[#F1F0FB] text-primaryColor hover:opacity-75";
      break;
    case "danger":
      buttonClass = "bg-red-500 text-white hover:opacity-80";
      break;
    case "success":
      buttonClass = "bg-green-500 text-white hover:opacity-80";
      break;
    case "warning":
      buttonClass = "bg-yellow-500 text-white hover:opacity-80";
      break;
    case "info":
      buttonClass = "bg-blue-500 text-white hover:opacity-80";
      break;
    default:
      buttonClass = "bg-gray-500 text-white hover:opacity-75"; // Button mặc định
  }

  return (
    <button
      className={`py-3 px-8 rounded-xl text-lg font-semibold transition-all duration-300 ${buttonClass}`}
      onClick={onClick}
    >
      {label ? label : "Button"}{" "}
      {/* Hiển thị label hoặc "Button" nếu không có label */}
    </button>
  );
};

export default Button;
