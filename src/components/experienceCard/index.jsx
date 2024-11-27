/* eslint-disable react/prop-types */
function ExperienceCard({ job }) {
  return (
    <div className="p-4 rounded-2xl flex flex-col  items-start gap-2 w-full mx-auto bg-white dark:bg-darkSubbg">
      {/* Icon công ty */}
      <div className="flex flex-row gap-2 w-full items-start sm:items-center">
        <div className="rounded w-[40px] h-[40px] flex items-center justify-center dark:bg-white/5 p-1">
          <img
            src={job.logo}
            alt="Company Logo"
            className="w-[40px] h-[40px] mt-2 sm:mt-0 object-contain rounded-md"
          />
        </div>
        <div className="flex w-full">
          <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between  w-full">
              <h3 className="text-lg font-semibold text-textLightPrimary dark:text-white/90">
                {job.title}
              </h3>
              <span className="text-[16px] text-gray-400">{job.date}</span>
            </div>
            <p className="text-subText dark:text-white/70 text-[16px]">
              {job.company}
            </p>
          </div>
        </div>
      </div>
      <p className="text-[16px]  text-subText dark:text-white/70">
        Công việc: {job?.description}
      </p>
    </div>
  );
}

export default ExperienceCard;
