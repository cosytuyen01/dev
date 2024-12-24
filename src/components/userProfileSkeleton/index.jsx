// Skeleton cho UserProfileCard
const UserProfileCardSkeleton = () => (
  <div className="relative flex items-center rounded-lg gap-6 flex-col sm:flex-row">
    {/* Avatar Background */}
    <div className="absolute top-0 left-0 w-full h-full  animate-pulse rounded-lg z-0" />

    {/* Avatar Skeleton */}
    <div className="relative z-10 w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] rounded-full overflow-hidden bg-gray-300 animate-pulse" />

    {/* User Information Skeleton */}
    <div className="relative z-10 flex flex-col items-center sm:items-start">
      {/* User Fullname */}
      <div className="text-center sm:text-start flex items-center text-textColor dark:text-white/90 text-[26px] md:text-[40px] font-bold">
        <div className="animate-pulse bg-gray-200 dark:bg-darkSubbg rounded-md h-6 w-[200px] mx-auto"></div>
      </div>

      {/* Job & Location */}
      <div className="text-subText text-[18px] sm:text-[24px] dark:text-white/60 text-center sm:text-start">
        <div className="animate-pulse bg-gray-200 dark:bg-darkSubbg rounded-md h-5 w-[150px] mx-auto mt-2"></div>
      </div>
    </div>
  </div>
);
export default UserProfileCardSkeleton;
