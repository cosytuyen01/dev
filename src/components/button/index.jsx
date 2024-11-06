import SvgIcon from "../../assets/iconSvg";
import "./style.css"; // Tạo file css để tùy chỉnh style
// eslint-disable-next-line react/prop-types
const Button = ({ onClick, text, icon, ...style }) => {
  return (
    <button style={style} onClick={onClick} className="gradient-border-button backdrop-blur-2xl">
      {icon && (
        <SvgIcon
          name={icon}
          color={"var(--subTextDark)"}
          width={24}
          height={24}
        />
      )}
      <p>{text}</p>
    </button>
  );
};

export default Button;
