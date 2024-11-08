import SvgIcon from "../../assets/iconSvg";
import bgProfile from "../../assets/images/bg-profile.svg";
const UserProfileCard = () => {
  return (
    <div className="relative flex items-center rounded-lg gap-6 flex-col sm:flex-row ">
      {/* Avatar */}
      <img
        src={bgProfile} // Thay link này bằng ảnh đại diện của bạn
        alt="Profile"
        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg z-0 dark:opacity-5"
      />
      <div className="relative z-10 w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] rounded-full overflow-hidden">
        <img
          src="https://framerusercontent.com/images/nDlbFwftpGnUVLMk58lmywICJvo.jpg?scale-down-to=1024" // Thay link này bằng ảnh đại diện của bạn
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>

      {/* User Information */}
      <div className="relative z-10 flex flex-col items-center sm:items-start">
        <div className=" flex items-center text-textColor dark:text-white/90 text-[26px] md:text-[40px] font-bold">
          Van Pham Trung Tuyen
          <span className="ml-2">
            <SvgIcon name={"check"} height={30} width={30} color={"#2b9cd5"} />
          </span>
        </div>
        <div className="text-subText text-[18px] sm:text-[24px] dark:text-white/60">
          UIUX & Development &bull; Tan Phu, HCM
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
