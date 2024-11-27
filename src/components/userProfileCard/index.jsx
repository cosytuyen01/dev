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
          src="https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/327209766_862817568264345_9185622725308031903_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEgpwgAo3YOjmSJDSo-8mSSy1bcyOo3S8zLVtzI6jdLzDbpEhJgOrU5L-xDjcuRhCLnIhkPjUQY-mxSZVovyiJh&_nc_ohc=xIY79A7kNBsQ7kNvgGyi87N&_nc_zt=23&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=AMkOpcqIt2iJ4hvx9oswkBf&oh=00_AYB5CmN2Pepu-dgtZxz0Wz0WeSlkpf3zWcr4nH8dHknImA&oe=674D139A" // Thay link này bằng ảnh đại diện của bạn
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>

      {/* User Information */}
      <div className="relative z-10 flex flex-col items-center sm:items-start">
        <div className="text-center sm:text-start flex items-center text-textColor dark:text-white/90 text-[26px] md:text-[40px] font-bold">
          Văn Phạm Trung Tuyến
          <span className="ml-2">
            <SvgIcon name={"check"} height={30} width={30} color={"#2b9cd5"} />
          </span>
        </div>
        <div className="text-subText text-[18px] sm:text-[24px] dark:text-white/60 text-center sm:text-start">
          UIUX & Developer &bull; Tân Phú, HCM
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
