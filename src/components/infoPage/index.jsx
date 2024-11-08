/* eslint-disable react/prop-types */
import bgProfile from "../../assets/images/bg-profile.svg";

function InfoPage({title, desc}) {
  return (
    <div className="relative flex items-center rounded-lg gap-6 flex-col w-[100%] h-[164px]">
        <img
        src={bgProfile} // Thay link này bằng ảnh đại diện của bạn
        alt="Profile"
        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg z-0 dark:opacity-5"
      />
       <div className="z-10 items-center flex flex-col">
       <h1 className="flex items-center text-textColor text-[26px] md:text-[40px] font-bold dark:text-white/80 ">{title}</h1>
       <p className="text-subText text-[18px] sm:text-[24px] text-center dark:text-white/60">{desc}</p>
       </div>
    </div>
  )
}

export default InfoPage