import React from "react";
import Button from "../button"; // Import Button component

const Confirm = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  title,
  type = "primary",
}) => {
  if (!isOpen) return null;

  // Định nghĩa màu chữ cho title dựa trên type
  let titleClass = "";
  switch (type) {
    case "danger":
      titleClass = "text-red-500"; // Màu đỏ cho warning
      break;
    case "success":
      titleClass = "text-green-500"; // Màu xanh lá cho thành công
      break;
    case "warning":
      titleClass = "text-yellow-500"; // Màu vàng cho cảnh báo
      break;
    case "info":
      titleClass = "text-blue-500"; // Màu xanh dương cho thông tin
      break;
    default:
      titleClass = "text-black"; // Màu chữ mặc định
  }

  return (
    <div className="rounded-xl w-[85%] lg:w-[48%] p-6 bg-white">
      <h2 className={`text-xl font-semibold mb-2 ${titleClass}`}>
        {title || "Confirm"}
      </h2>
      <p className="mb-6">{message}</p>
      <div className="flex justify-between space-x-4">
        <Button type="secondary" label="Cancel" onClick={onClose} />
        <Button label="OK" onClick={onConfirm} />
      </div>
    </div>
  );
};

export default Confirm;
